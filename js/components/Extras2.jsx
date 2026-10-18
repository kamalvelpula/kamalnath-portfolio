// ========== TOAST + CONFETTI HELPERS ==========
function showToast(msg) {
  window.dispatchEvent(new CustomEvent("app-toast", { detail: msg }));
}

function launchConfetti(x, y) {
  const c = document.createElement("canvas");
  c.className = "confetti-canvas";
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext("2d");

  const accent =
    getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0dcaf0";
  const colors = [accent, "#f59e0b", "#22c55e", "#ec4899", "#a855f7", "#ffffff"];

  const ps = Array.from({ length: 90 }, () => {
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 9 + 4;
    return {
      x: x,
      y: y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 4,
      w: Math.random() * 8 + 4,
      h: Math.random() * 5 + 3,
      rot: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  });

  let frame = 0;
  const tick = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach((p) => {
      p.vy += 0.25;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - frame / 110);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 120) {
      requestAnimationFrame(tick);
    } else {
      c.remove();
    }
  };
  tick();
}

// ========== TOAST HOST ==========
function ToastHost() {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const onToast = (e) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id: id, msg: e.detail }]);
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 2600);
    };
    window.addEventListener("app-toast", onToast);
    return () => window.removeEventListener("app-toast", onToast);
  }, []);

  return (
    <div className="toast-host">
      {toasts.map((t) => (
        <div className="toast-msg" key={t.id}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ========== OPEN TO WORK BADGE ==========
function OpenBadge() {
  return (
    <span className="open-badge">
      <span className="pulse-dot"></span> Open to opportunities
    </span>
  );
}

// ========== ORBITING TECH ICONS ==========
function OrbitIcons() {
  const items = [
    { icon: "bi-filetype-java", angle: 0, title: "Java" },
    { icon: "bi-boxes", angle: 90, title: "Spring Boot" },
    { icon: "bi-filetype-jsx", angle: 180, title: "React.js" },
    { icon: "bi-database-fill", angle: 270, title: "MySQL" }
  ];

  return (
    <div className="orbit">
      {items.map((o, i) => (
        <div className="orbit-item" style={{ "--a": o.angle + "deg" }} key={i} title={o.title}>
          <div className="orbit-icon">
            <i className={"bi " + o.icon}></i>
          </div>
        </div>
      ))}
    </div>
  );
}

// ========== WHAT I DO (SERVICES) ==========
const SERVICES = [
  {
    title: "Backend Development",
    icon: "bi-server",
    text: "Building Spring Boot applications with clean Controller, Service and Repository layers."
  },
  {
    title: "REST API Design",
    icon: "bi-cloud-arrow-up",
    text: "Designing RESTful APIs with full CRUD operations and testing them with Postman."
  },
  {
    title: "Full Stack Apps",
    icon: "bi-window-stack",
    text: "Connecting Spring Boot back ends with HTML, CSS, Bootstrap and React.js front ends."
  },
  {
    title: "Database Design",
    icon: "bi-database",
    text: "Designing relational schemas and mapping them with Hibernate / JPA on MySQL."
  }
];

function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <h2 className="section-title text-center">What I <span>Do</span></h2>

        <div className="row g-4 mt-4">
          {SERVICES.map((s, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="learn-card service-card h-100">
                <div className="project-icon">
                  <i className={"bi " + s.icon}></i>
                </div>
                <h5>{s.title}</h5>
                <p className="mb-0">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== SIDE DOT NAVIGATION ==========
const DOT_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "What I Do" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stats", label: "Coding Stats" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "learning", label: "Learning" },
  { id: "freelance", label: "Freelance" },
  { id: "contact", label: "Contact" }
];

function SideDots() {
  const [active, setActive] = React.useState("home");

  React.useEffect(() => {
    const onScroll = () => {
      let current = "home";
      DOT_SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 200) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="side-dots">
      {DOT_SECTIONS.map((s) => (
        <button
          key={s.id}
          className={"side-dot" + (active === s.id ? " active" : "")}
          onClick={() => go(s.id)}
          aria-label={s.label}
        >
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

// ========== TEXT SCRAMBLE (section titles) ==========
function ScrambleTitles() {
  React.useEffect(() => {
    const chars = "!<>-_/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const run = (el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let n;
      while ((n = walker.nextNode())) {
        nodes.push({ node: n, orig: n.nodeValue });
      }

      let frame = 0;
      const frames = 22;

      const step = () => {
        frame++;
        const progress = frame / frames;

        nodes.forEach((item) => {
          let out = "";
          for (let i = 0; i < item.orig.length; i++) {
            const ch = item.orig[i];
            if (ch === " " || i / item.orig.length < progress) {
              out += ch;
            } else {
              out += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          item.node.nodeValue = out;
        });

        if (frame < frames) {
          setTimeout(step, 35);
        } else {
          nodes.forEach((item) => {
            item.node.nodeValue = item.orig;
          });
        }
      };
      step();
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    document.querySelectorAll(".section-title").forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return null;
}

// ========== LIVE GREETING (IST) ==========
function Greeting() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const hour = parseInt(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "Asia/Kolkata"
    }).format(now),
    10
  );

  let greet = "Good night";
  if (hour < 12) greet = "Good morning";
  else if (hour < 17) greet = "Good afternoon";
  else if (hour < 21) greet = "Good evening";

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata"
  });

  return (
    <p className="greeting mb-0">
      {greet} 👋 Bengaluru, <strong>{time}</strong> IST
    </p>
  );
}

// ========== UPGRADED FOOTER ==========
function FooterPro() {
  const d = portfolioData;

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(d.email).then(
        () => showToast("Email copied! 📋"),
        () => showToast("Copy failed, please copy manually")
      );
    } else {
      showToast("Copy not supported in this browser");
    }
  };

  const links = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <footer className="footer footer-pro">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="footer-brand">
              Kamalnath<span className="text-accent">.</span>
            </h5>
            <p className="mb-2">Java Full Stack Developer building clean APIs and responsive UIs.</p>
            <Greeting />
          </div>

          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={"#" + l.id}>{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Let's Connect</h6>
            <div className="social-icons mb-3">
              <a href={d.github} target="_blank" rel="noreferrer">
                <i className="bi bi-github"></i>
              </a>
              <a href={d.linkedin} target="_blank" rel="noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href={"mailto:" + d.email}>
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
            <button className="btn btn-outline-theme btn-sm" onClick={copyEmail}>
              <i className="bi bi-clipboard me-1"></i> Copy Email
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kamalnath Velpula. All rights reserved.</span>
          <span>Built with React + Bootstrap</span>
        </div>
      </div>
    </footer>
  );
}