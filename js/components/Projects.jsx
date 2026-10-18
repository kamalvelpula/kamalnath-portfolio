function ProjectModal({ project, onClose }) {
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
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="project-icon">
          <i className={"bi " + project.icon}></i>
        </div>
        <h3>{project.title}</h3>
        <p className="project-type">{project.type}</p>

        <p className="modal-text">{project.overview}</p>

        <h6 className="modal-heading">Key Features</h6>
        <ul className="modal-list">
          {project.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <h6 className="modal-heading">What I Learned</h6>
        <ul className="modal-list">
          {project.learnings.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>

        <h6 className="modal-heading">Tech Stack</h6>
        <div className="mb-4">
          {project.tech.map((t, i) => (
            <span className="skill-badge" key={i}>{t}</span>
          ))}
        </div>

        <div>
          <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-accent me-2 mb-2">
            <i className="bi bi-github me-1"></i> View Code
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-outline-theme mb-2">
              <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

// Mouse tho tilt ayye card
function TiltCard({ className, children }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 0.1s";
    el.style.transform =
      "perspective(800px) rotateX(" + (-y * 10).toFixed(2) + "deg) rotateY(" + (x * 10).toFixed(2) + "deg) translateY(-6px)";
  };

  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.transition = "all 0.3s";
    el.style.transform = "";
  };

  return (
    <div className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function Projects() {
  const d = portfolioData;
  const [selected, setSelected] = React.useState(null);
  const [filter, setFilter] = React.useState("All");

  // Anni projects nundi unique tags techukuntundi
  const allTags = ["All"];
  d.projects.forEach((p) => {
    (p.tags || []).forEach((t) => {
      if (!allTags.includes(t)) allTags.push(t);
    });
  });

  const visible = d.projects.filter(
    (p) => filter === "All" || (p.tags || []).includes(filter)
  );

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <h2 className="section-title text-center">My <span>Projects</span></h2>

        {/* Filter tabs */}
        <div className="filter-tabs text-center mt-4">
          {allTags.map((t) => (
            <button
              key={t}
              className={"filter-btn" + (filter === t ? " active" : "")}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="row g-4 mt-2">
          {visible.map((p) => (
            <div className="col-lg-6" key={p.title}>
              <TiltCard className="project-card h-100">
                <div className="project-icon">
                  <i className={"bi " + p.icon}></i>
                </div>
                <h4>{p.title}</h4>
                <p className="project-type">{p.type}</p>
                <ul>
                  {p.description.map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
                <div className="mb-3">
                  {p.tech.map((t, j) => (
                    <span className="skill-badge" key={j}>{t}</span>
                  ))}
                </div>
                <button className="btn btn-accent btn-sm me-2" onClick={() => setSelected(p)}>
                  <i className="bi bi-eye me-1"></i> View Details
                </button>
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline-theme btn-sm">
                  <i className="bi bi-github me-1"></i> GitHub
                </a>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}