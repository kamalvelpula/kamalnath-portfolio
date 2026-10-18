function Navbar() {
  const [active, setActive] = React.useState("home");
  const [theme, setTheme] = React.useState(
    document.documentElement.getAttribute("data-theme") || "dark"
  );

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Stats", id: "stats" },
    { name: "Education", id: "education" },
    { name: "Certifications", id: "certifications" },
    { name: "Contact", id: "contact" }
  ];

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  React.useEffect(() => {
    const onScroll = () => {
      let current = "home";
      links.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = link.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    const el = document.getElementById("navMenu");
    if (el && el.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(el).hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#home">
          Kamalnath<span className="text-accent">.</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {links.map((link) => (
              <li className="nav-item" key={link.id}>
                <a
                  className={"nav-link" + (active === link.id ? " active-link" : "")}
                  href={"#" + link.id}
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title="Dark / Light mode"
              >
                <i className={"bi " + (theme === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill")}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}