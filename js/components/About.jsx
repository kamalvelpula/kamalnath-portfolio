function Counter({ value }) {
  const ref = React.useRef(null);
  const [num, setNum] = React.useState(0);
  const target = parseInt(value, 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");

  React.useEffect(() => {
    let raf;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          const start = performance.now();
          const duration = 1800;

          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setNum(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={ref}>
      {num}
      {suffix}
    </span>
  );
}

function About() {
  const d = portfolioData;

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title text-center">About <span>Me</span></h2>

        <div className="row g-5 align-items-center mt-3">
          <div className="col-lg-6">
            {d.about.map((para, i) => (
              <p key={i} className="about-text">{para}</p>
            ))}
          </div>
          <div className="col-lg-6">
            <TerminalCard />
          </div>
        </div>

        <div className="row g-4 mt-4 text-center">
          {d.stats.map((s, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="stat-card">
                <h2><Counter value={s.value} /></h2>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}