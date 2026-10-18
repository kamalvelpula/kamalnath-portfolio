// ========== 1. FLOATING CODE CARD ==========
function CodeCard() {
  const code = `<span class="tk-ann">@Service</span>
<span class="tk-key">public class</span> <span class="tk-type">Developer</span> {
  <span class="tk-type">String</span> name = <span class="tk-str">"Kamalnath"</span>;
  <span class="tk-type">String</span> role = <span class="tk-str">"Full Stack"</span>;
  <span class="tk-type">String</span>[] stack = {
    <span class="tk-str">"Java"</span>, <span class="tk-str">"Spring Boot"</span>,
    <span class="tk-str">"React"</span> };

  <span class="tk-key">void</span> build() {
    <span class="tk-com">// ship it 🚀</span>
  }
}`;

  return (
    <div className="code-card">
      <div className="code-bar">
        <span></span>
        <span></span>
        <span></span>
        <small>Developer.java</small>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: code }}></pre>
    </div>
  );
}

// ========== 2. COMMAND PALETTE (Ctrl + K) ==========
function CommandPalette() {
  const d = portfolioData;
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [sel, setSel] = React.useState(0);
  const inputRef = React.useRef(null);

  const go = (id) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const commands = [
    { label: "Go to Home", icon: "bi-house", hint: "Section", run: go("home") },
    { label: "Go to About", icon: "bi-person", hint: "Section", run: go("about") },
    { label: "Go to Skills", icon: "bi-lightning-charge", hint: "Section", run: go("skills") },
    { label: "Go to Experience", icon: "bi-briefcase", hint: "Section", run: go("experience") },
    { label: "Go to Projects", icon: "bi-folder2-open", hint: "Section", run: go("projects") },
    { label: "Go to Coding Stats", icon: "bi-bar-chart", hint: "Section", run: go("stats") },
    { label: "Go to Education", icon: "bi-mortarboard", hint: "Section", run: go("education") },
    { label: "Go to Certifications", icon: "bi-patch-check", hint: "Section", run: go("certifications") },
    { label: "Go to Currently Learning", icon: "bi-book", hint: "Section", run: go("learning") },
    { label: "Go to Contact", icon: "bi-envelope", hint: "Section", run: go("contact") },
    {
      label: "Toggle Dark / Light theme",
      icon: "bi-circle-half",
      hint: "Action",
      run: () => {
        const b = document.querySelector(".theme-btn");
        if (b) b.click();
      }
    },
    { label: "Open Resume", icon: "bi-file-earmark-person", hint: "Link", run: () => window.open(d.resume, "_blank") },
    { label: "Open GitHub", icon: "bi-github", hint: "Link", run: () => window.open(d.github, "_blank") },
    { label: "Open LinkedIn", icon: "bi-linkedin", hint: "Link", run: () => window.open(d.linkedin, "_blank") },
    { label: "Send Email", icon: "bi-envelope-paper", hint: "Link", run: () => (window.location.href = "mailto:" + d.email) },
    {
      label: "Copy Email address",
      icon: "bi-clipboard",
      hint: "Action",
      run: () => {
        if (navigator.clipboard) navigator.clipboard.writeText(d.email);
      }
    }
  ];

  const list = commands.filter((c) =>
    c.label.toLowerCase().includes(q.trim().toLowerCase())
  );

  // Ctrl + K open/close, Esc close
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // The item selected using the arrow keys should remain visible.
  React.useEffect(() => {
    const el = document.getElementById("cmd-" + sel);
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const run = (c) => {
    setOpen(false);
    setTimeout(c.run, 150);
  };

  const onInputKey = (e) => {
    if (!list.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((sel + 1) % list.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((sel - 1 + list.length) % list.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(list[sel]);
    }
  };

  const overlay = (
    <div className="palette-overlay" onClick={() => setOpen(false)}>
      <div className="palette-box" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <i className="bi bi-search"></i>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Type a command... (projects, contact, theme)"
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="palette-list">
          {list.length === 0 && <li className="palette-empty">No results found</li>}
          {list.map((c, i) => (
            <li
              key={c.label}
              id={"cmd-" + i}
              className={"palette-item" + (i === sel ? " active" : "")}
              onMouseEnter={() => setSel(i)}
              onClick={() => run(c)}
            >
              <i className={"bi " + c.icon}></i>
              <span>{c.label}</span>
              <small>{c.hint}</small>
            </li>
          ))}
        </ul>

        <div className="palette-foot">
          <span>↑ ↓ navigate</span>
          <span>Enter select</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="palette-btn"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        title="Command palette (Ctrl + K)"
      >
        <i className="bi bi-terminal"></i>
      </button>
      {open && ReactDOM.createPortal(overlay, document.body)}
    </>
  );
}

// ========== 3. TERMINAL ABOUT CARD ==========
function TerminalCard() {
  const d = portfolioData;

  const lines = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: d.name + " - " + d.role },
    { type: "cmd", text: "cat location.txt" },
    { type: "out", text: d.location },
    { type: "cmd", text: "skills --top" },
    { type: "out", text: "Java | Spring Boot | Hibernate | MySQL | React.js" },
    { type: "cmd", text: "experience --summary" },
    { type: "out", text: "Java Full Stack Intern + Trainee Software Engineer" },
    { type: "cmd", text: "leetcode --solved" },
    { type: "out", text: d.leetcodeFallback.solved + " problems solved" },
    { type: "cmd", text: "cat goals.txt" },
    { type: "out", text: "Build scalable full stack apps with Spring Boot + React" }
  ];

  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);
  const [li, setLi] = React.useState(0);
  const [ci, setCi] = React.useState(0);

  // Card screen lo ki vachinappudu start avutundi
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started || li >= lines.length) return;
    const line = lines[li];
    let t;

    if (line.type === "cmd") {
      if (ci < line.text.length) {
        t = setTimeout(() => setCi(ci + 1), 45);
      } else {
        t = setTimeout(() => {
          setLi(li + 1);
          setCi(0);
        }, 350);
      }
    } else {
      t = setTimeout(() => {
        setLi(li + 1);
        setCi(0);
      }, 250);
    }
    return () => clearTimeout(t);
  }, [started, li, ci]);

  const done = li >= lines.length;

  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <small>kamalnath@portfolio: ~</small>
      </div>

      <div className="terminal-body">
        {lines.slice(0, li).map((l, i) => (
          <div key={i} className={l.type === "cmd" ? "t-cmd" : "t-out"}>
            {l.type === "cmd" && <span className="t-prompt">$ </span>}
            {l.text}
          </div>
        ))}

        {!done && started && lines[li].type === "cmd" && (
          <div className="t-cmd">
            <span className="t-prompt">$ </span>
            {lines[li].text.slice(0, ci)}
            <span className="cursor">█</span>
          </div>
        )}

        {done && (
          <div className="t-cmd">
            <span className="t-prompt">$ </span>
            <span className="cursor">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ========== 4. SPOTLIGHT CARDS (mouse follow glow) ==========
function SpotlightEffect() {
  React.useEffect(() => {
    const sel =
      ".stat-card, .skill-card, .timeline-card, .project-card, .edu-card, .cert-item, .contact-info, .stats-card, .learn-card";

    const onMove = (e) => {
      const card = e.target.closest ? e.target.closest(sel) : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}

// ========== 5. NAVBAR AUTO-HIDE ==========
function NavAutoHide() {
  React.useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const nav = document.querySelector(".custom-navbar");
      if (!nav) return;

      const y = window.scrollY;
      const menu = document.getElementById("navMenu");
      const menuOpen = menu && menu.classList.contains("show");

      if (y > 150 && y > last + 2 && !menuOpen) {
        nav.classList.add("nav-hidden");
      } else if (y < last - 2 || y <= 150) {
        nav.classList.remove("nav-hidden");
      }
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}