function Certifications() {
  const d = portfolioData;

  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <h2 className="section-title text-center">Certifications & <span>Achievements</span></h2>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-8">
            {d.certifications.map((c, i) => (
              <div className="cert-item" key={i}>
                <i className="bi bi-patch-check-fill"></i>
                <span>{c}</span>
              </div>
            ))}
            <div className="cert-item">
              <i className="bi bi-trophy-fill"></i>
              <span>Solved 350+ DSA problems on LeetCode (Arrays, Strings, Trees, Dynamic Programming)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}