function ScrollTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={"scroll-top" + (show ? " show" : "")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}

function App() {
  React.useEffect(() => {
    const targets = document.querySelectorAll(
      ".section-title, .section > .container > .row > div, .timeline-item, .cert-item"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      if (el.parentElement && el.parentElement.classList.contains("row")) {
        el.style.transitionDelay = (i % 4) * 0.1 + "s";
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Preloader />
      <BgBlobs />
      <CursorGlow />
      <SpotlightEffect />
      <NavAutoHide />
      <ScrambleTitles />
      <ScrollProgress />
      <Navbar />
      <SideDots />
      <Hero />
      <TechMarquee />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <Stats />
      <Education />
      <Certifications />
      <Learning />
      <Freelance />
      <Contact />
      <FooterPro />
      <ScrollTop />
      <ColorPicker />
      <CommandPalette />
      <ToastHost />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);