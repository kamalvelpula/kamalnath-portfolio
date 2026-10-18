function GitHubStats() {
  const d = portfolioData;
  const user = d.githubUsername;
  const valid = user && user !== "YOUR-GITHUB-USERNAME";
  const [gh, setGh] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!valid) return;

    const getJson = (url) =>
      fetch(url).then((r) => {
        if (!r.ok) throw new Error("fail");
        return r.json();
      });

    Promise.all([
      getJson("https://api.github.com/users/" + user),
      getJson("https://api.github.com/users/" + user + "/repos?per_page=100")
    ])
      .then(([profile, repos]) => {
        const own = repos.filter((r) => !r.fork);
        const stars = own.reduce((sum, r) => sum + r.stargazers_count, 0);

        const counts = {};
        own.forEach((r) => {
          if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
        });
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const total = top.reduce((sum, t) => sum + t[1], 0) || 1;

        setGh({
          repos: profile.public_repos,
          followers: profile.followers,
          stars: stars,
          langs: top.map(([name, count]) => ({
            name: name,
            pct: Math.round((count * 100) / total)
          }))
        });
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className="stats-card h-100">
      <h5 className="mb-3">
        <i className="bi bi-github me-2 text-accent"></i>GitHub Stats
      </h5>

      {!valid && (
        <p className="text-muted-soft">
          <code>data.js</code> lo <code>githubUsername</code> ni nee GitHub username tho marchu.
        </p>
      )}
      {valid && error && (
        <p className="text-muted-soft">GitHub data load kaaledu. Username check chey leka konchem sepu tarvata try chey.</p>
      )}
      {valid && !error && !gh && <p className="text-muted-soft">Loading...</p>}

      {gh && (
        <>
          <div className="row text-center g-2 mb-4">
            <div className="col-4">
              <h3 className="text-accent mb-0">{gh.repos}</h3>
              <small className="text-muted-soft">Repos</small>
            </div>
            <div className="col-4">
              <h3 className="text-accent mb-0">{gh.stars}</h3>
              <small className="text-muted-soft">Stars</small>
            </div>
            <div className="col-4">
              <h3 className="text-accent mb-0">{gh.followers}</h3>
              <small className="text-muted-soft">Followers</small>
            </div>
          </div>

          <h6 className="mb-2">Top Languages</h6>
          {gh.langs.map((l, i) => (
            <div className="mb-2" key={i}>
              <div className="d-flex justify-content-between small">
                <span>{l.name}</span>
                <span>{l.pct}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: l.pct + "%" }}></div>
              </div>
            </div>
          ))}
        </>
      )}

      {valid && (
        <div className="contrib-box mt-4">
          <img
            src={"https://ghchart.rshah.org/0284c7/" + user}
            alt="GitHub contributions"
            className="img-fluid"
          />
        </div>
      )}

      {valid && (
        <a href={"https://github.com/" + user} target="_blank" rel="noreferrer" className="btn btn-outline-theme btn-sm mt-3">
          View Profile
        </a>
      )}
    </div>
  );
}

function LeetCodeStats() {
  const d = portfolioData;
  const user = d.leetcodeUsername;
  const valid = user && user !== "YOUR-LEETCODE-USERNAME";
  const [lc, setLc] = React.useState(d.leetcodeFallback);

  React.useEffect(() => {
    if (!valid) return;
    fetch("https://leetcode-stats-api.herokuapp.com/" + user)
      .then((r) => r.json())
      .then((j) => {
        if (j.status !== "success") throw new Error("fail");
        setLc({
          solved: j.totalSolved,
          easy: j.easySolved,
          medium: j.mediumSolved,
          hard: j.hardSolved
        });
      })
      .catch(() => setLc(d.leetcodeFallback));
  }, []);

  const total = lc.solved || 1;
  const rows = [
    { label: "Easy", value: lc.easy, cls: "easy" },
    { label: "Medium", value: lc.medium, cls: "medium" },
    { label: "Hard", value: lc.hard, cls: "hard" }
  ];

  return (
    <div className="stats-card h-100">
      <h5 className="mb-3">
        <i className="bi bi-code-square me-2 text-accent"></i>LeetCode Stats
      </h5>

      <div className="text-center mb-4">
        <h1 className="text-accent mb-0">{lc.solved}+</h1>
        <small className="text-muted-soft">Problems Solved</small>
      </div>

      {rows.map((r, i) => (
        <div className="mb-3" key={i}>
          <div className="d-flex justify-content-between small">
            <span>{r.label}</span>
            <span>{r.value}</span>
          </div>
          <div className="bar-track">
            <div
              className={"bar-fill lc-" + r.cls}
              style={{ width: Math.round((r.value * 100) / total) + "%" }}
            ></div>
          </div>
        </div>
      ))}

      {valid && (
        <a
          href={"https://leetcode.com/u/" + user}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-theme btn-sm mt-2"
        >
          View Profile
        </a>
      )}
    </div>
  );
}

function Stats() {
  return (
    <section id="stats" className="section">
      <div className="container">
        <h2 className="section-title text-center">Coding <span>Stats</span></h2>
        <div className="row g-4 mt-4">
          <div className="col-lg-6">
            <GitHubStats />
          </div>
          <div className="col-lg-6">
            <LeetCodeStats />
          </div>
        </div>
      </div>
    </section>
  );
}