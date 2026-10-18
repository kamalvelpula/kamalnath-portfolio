function Experience() {
  const d = portfolioData;

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title text-center">My <span>Experience</span></h2>

        <div className="timeline mt-5">
          {d.experience.map((exp, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-period">{exp.period}</span>
                <h5 className="mt-2 mb-1">{exp.role}</h5>
                <p className="timeline-company">{exp.company}</p>
                <ul>
                  {exp.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}