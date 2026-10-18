function Typing({ words }) {
  const [text, setText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const word = words[index % words.length];
    const delay = deleting ? 40 : text === word ? 1500 : 90;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex(index + 1);
      } else {
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span>
      {text}
      <span className="cursor">|</span>
    </span>
  );
}

function Hero() {
  const d = portfolioData;
  const [showResume, setShowResume] = React.useState(false);

  const typingWords = [
    "Java Full Stack Developer",
    "Spring Boot Developer",
    "REST API Developer",
    "React.js Enthusiast"
  ];

  const onDownload = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    launchConfetti(r.left + r.width / 2, r.top + r.height / 2);
    showToast("Resume downloading 🎉");
  };

  return (
    <section id="home" className="hero d-flex align-items-center">
      <Particles />

      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left: Text */}
          <div className="col-lg-7 text-center text-lg-start order-2 order-lg-1">
            <OpenBadge />
            <p className="text-accent fw-semibold mb-2">Hello, I'm</p>
            <h1 className="display-4 fw-bold hero-name gradient-text">{d.name}</h1>
            <h3 className="text-accent mb-3 typing-text">
              <Typing words={typingWords} />
            </h3>
            <p className="hero-summary mb-4">{d.summary}</p>

            <div className="mb-4">
              <a
                href={d.resume}
                download
                className="btn btn-accent me-2 mb-2"
                onClick={onDownload}
              >
                <i className="bi bi-download me-1"></i> Download Resume
              </a>
              <button
                className="btn btn-outline-theme me-2 mb-2"
                onClick={() => setShowResume(true)}
              >
                <i className="bi bi-eye me-1"></i> Preview
              </button>
              <a href="#contact" className="btn btn-outline-theme mb-2">
                <i className="bi bi-envelope me-1"></i> Contact Me
              </a>
            </div>

            <div className="social-icons">
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

            <p className="kbd-hint mt-3 mb-0 d-none d-lg-block">
              Tip: press <kbd>Ctrl</kbd> + <kbd>K</kbd> to navigate quickly
            </p>
          </div>

          {/* Right: Photo + orbit icons + floating code card */}
          <div className="col-lg-5 text-center order-1 order-lg-2">
            <div className="hero-visual">
              <div className="photo-wrap">
                <img
                  src={d.photo}
                  alt={d.name}
                  className="profile-img"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x300?text=KV";
                  }}
                />
                <OrbitIcons />
              </div>
              <CodeCard />
            </div>
          </div>
        </div>
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </section>
  );
}