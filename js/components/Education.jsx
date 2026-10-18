function Education() {
  const d = portfolioData;

  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title text-center">My <span>Education</span></h2>

        <div className="row g-4 mt-4 justify-content-center">
          {d.education.map((e, i) => (
            <div className="col-md-6" key={i}>
              <div className="edu-card h-100">
                <i className="bi bi-mortarboard-fill edu-icon"></i>
                <h5>{e.degree}</h5>
                <p className="mb-1">{e.school}</p>
                <span className="timeline-period">{e.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}