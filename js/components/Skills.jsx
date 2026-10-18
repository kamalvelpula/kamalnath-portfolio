function SkillBar({ name, level }) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skill-bar" ref={ref}>
      <div className="d-flex justify-content-between mb-1">
        <span>{name}</span>
        <span className="text-accent">{level}%</span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: on ? level + "%" : "0%" }}></div>
      </div>
    </div>
  );
}

function Skills() {
  const d = portfolioData;
  const half = Math.ceil(d.skillBars.length / 2);
  const left = d.skillBars.slice(0, half);
  const right = d.skillBars.slice(half);

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h2 className="section-title text-center">My <span>Skills</span></h2>

        {/* Progress bars */}
        <div className="row g-4 mt-4">
          <div className="col-md-6">
            {left.map((s, i) => (
              <SkillBar key={i} name={s.name} level={s.level} />
            ))}
          </div>
          <div className="col-md-6">
            {right.map((s, i) => (
              <SkillBar key={i} name={s.name} level={s.level} />
            ))}
          </div>
        </div>

        {/* Skill cards */}
        <div className="row g-4 mt-4">
          {d.skills.map((group, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="skill-card h-100">
                <h5 className="mb-3">
                  <i className={"bi " + group.icon + " me-2"}></i>
                  {group.title}
                </h5>
                <div>
                  {group.items.map((item, j) => (
                    <span className="skill-badge" key={j}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}