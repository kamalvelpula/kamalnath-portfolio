// ========== PRELOADER ==========
function Preloader() {
  const [hide, setHide] = React.useState(false);
  const [gone, setGone] = React.useState(false);

  React.useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 1500);
    const t2 = setTimeout(() => setGone(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={"preloader" + (hide ? " hide" : "")}>
      <div className="loader-logo">KV</div>
      <div className="loader-line"></div>
    </div>
  );
}

// ========== SCROLL PROGRESS BAR ==========
function ScrollProgress() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: width + "%" }}></div>;
}

// ========== PARTICLES BACKGROUND ==========
function Particles() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, pts = [], raf;

    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      const n = Math.min(80, Math.floor(w / 16));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 1.5 + 1
      }));
    };

    const draw = () => {
      const color =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0dcaf0";
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      pts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.35;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas"></canvas>;
}

// ========== THEME COLOR PICKER ==========
const ACCENT_COLORS = [
  { name: "Default", hex: null },
  { name: "Purple", hex: "#a855f7" },
  { name: "Green", hex: "#16a34a" },
  { name: "Orange", hex: "#f97316" },
  { name: "Pink", hex: "#ec4899" }
];

function applyAccent(hex) {
  const root = document.documentElement.style;
  const keys = ["--accent", "--accent-soft", "--accent-border", "--accent-shadow"];

  if (!hex) {
    keys.forEach((k) => root.removeProperty(k));
    return;
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  root.setProperty("--accent", hex);
  root.setProperty("--accent-soft", "rgba(" + r + "," + g + "," + b + ",0.1)");
  root.setProperty("--accent-border", "rgba(" + r + "," + g + "," + b + ",0.4)");
  root.setProperty("--accent-shadow", "rgba(" + r + "," + g + "," + b + ",0.2)");
}

function ColorPicker() {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState("");

  React.useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem("accent") || "";
    } catch (e) {}
    setCurrent(saved);
    applyAccent(saved || null);
  }, []);

  const choose = (hex) => {
    setCurrent(hex || "");
    applyAccent(hex);
    try {
      localStorage.setItem("accent", hex || "");
    } catch (e) {}
  };

  return (
    <div className="color-picker">
      {open && (
        <div className="color-options">
          {ACCENT_COLORS.map((c, i) => (
            <button
              key={i}
              title={c.name}
              className={"color-dot" + ((c.hex || "") === current ? " selected" : "")}
              style={{
                background: c.hex ? c.hex : "linear-gradient(135deg, #0dcaf0, #0284c7)"
              }}
              onClick={() => choose(c.hex)}
            ></button>
          ))}
        </div>
      )}
      <button
        className="color-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Change theme color"
        title="Theme color"
      >
        <i className="bi bi-palette-fill"></i>
      </button>
    </div>
  );
}