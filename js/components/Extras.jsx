// ========== TECH MARQUEE ==========
const TECH = [
  { name: "Java", icon: "bi-filetype-java" },
  { name: "Spring Boot", icon: "bi-boxes" },
  { name: "Hibernate", icon: "bi-diagram-3" },
  { name: "MySQL", icon: "bi-database-fill" },
  { name: "REST APIs", icon: "bi-cloud-arrow-up" },
  { name: "React.js", icon: "bi-filetype-jsx" },
  { name: "JavaScript", icon: "bi-filetype-js" },
  { name: "HTML5", icon: "bi-filetype-html" },
  { name: "CSS3", icon: "bi-filetype-css" },
  { name: "Bootstrap", icon: "bi-bootstrap-fill" },
  { name: "Git", icon: "bi-git" },
  { name: "GitHub", icon: "bi-github" },
  { name: "Postman", icon: "bi-send" },
  { name: "Maven", icon: "bi-box-seam" }
];

function TechMarquee() {
  const items = [...TECH, ...TECH];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span className="marquee-item" key={i}>
            <i className={"bi " + t.icon}></i>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ========== BACKGROUND: GRID + AURORA ==========
function BgBlobs() {
  const ref = React.useRef(null);

  // Mouse daggara grid glow avutundi (desktop matrame)
  React.useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--gx", e.clientX + "px");
      ref.current.style.setProperty("--gy", e.clientY + "px");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="bg-fx" ref={ref}>
      <span className="aurora a1"></span>
      <span className="aurora a2"></span>
      <span className="aurora a3"></span>
      <div className="bg-grid"></div>
      <div className="bg-grid-glow"></div>
    </div>
  );
}

// ========== CURSOR GLOW (desktop only) ==========
function CursorGlow() {
  const glow = React.useRef(null);
  const dot = React.useRef(null);

  React.useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let x = 0, y = 0, gx = 0, gy = 0, raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (glow.current) glow.current.style.opacity = 1;
      if (dot.current) {
        dot.current.style.opacity = 1;
        dot.current.style.transform = "translate(" + x + "px," + y + "px)";
      }
    };

    const loop = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (glow.current) {
        glow.current.style.transform = "translate(" + gx + "px," + gy + "px)";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={glow}></div>
      <div className="cursor-dot" ref={dot}></div>
    </>
  );
}

// ========== RESUME PREVIEW MODAL ==========
function ResumeModal({ onClose }) {
  const d = portfolioData;

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const modal = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box resume-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>
        <h5 className="mb-3">My <span className="text-accent">Resume</span></h5>

        <iframe src={d.resume} title="Resume" className="resume-frame"></iframe>

        <div className="mt-3">
          <a href={d.resume} download className="btn btn-accent btn-sm me-2">
            <i className="bi bi-download me-1"></i> Download
          </a>
          <a href={d.resume} target="_blank" rel="noreferrer" className="btn btn-outline-theme btn-sm">
            <i className="bi bi-box-arrow-up-right me-1"></i> Open in new tab
          </a>
        </div>
        <small className="text-muted-soft d-block mt-2">
          If the preview doesn't show up on mobile, use "Open in new tab".
        </small>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

// ========== CURRENTLY LEARNING ==========
const LEARNING = [
  { title: "React.js Deep Dive", icon: "bi-filetype-jsx", status: "In Progress", note: "Hooks, state, API integration" },
  { title: "Microservices", icon: "bi-diagram-3", status: "Up Next", note: "Service communication basics" },
  { title: "JUnit & Mockito", icon: "bi-bug", status: "Up Next", note: "Unit testing for services" },
  { title: "Swagger / OpenAPI", icon: "bi-file-earmark-code", status: "Up Next", note: "Documenting REST APIs" }
];

function Learning() {
  return (
    <section id="learning" className="section section-alt">
      <div className="container">
        <h2 className="section-title text-center">Currently <span>Learning</span></h2>

        <div className="row g-4 mt-4">
          {LEARNING.map((l, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="learn-card h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="project-icon mb-0">
                    <i className={"bi " + l.icon}></i>
                  </div>
                  <span className={"learn-badge" + (l.status === "In Progress" ? " active" : "")}>
                    {l.status}
                  </span>
                </div>
                <h5>{l.title}</h5>
                <p className="mb-0">{l.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}