const PACKAGES = [
  {
    title: "Landing Page",
    icon: "bi-window",
    price: "Starting from ₹3,000",
    points: ["Single page responsive website", "Contact form + WhatsApp link", "Basic SEO + fast loading"]
  },
  {
    title: "Business Website",
    icon: "bi-shop",
    price: "Starting from ₹8,000",
    points: ["Multi-page responsive website", "Services, gallery, contact pages", "Deployment on free hosting"],
    popular: true
  },
  {
    title: "Custom Web App",
    icon: "bi-hdd-network",
    price: "",
    points: ["Spring Boot REST API + MySQL", "Login, dashboard, CRUD features", "React / Bootstrap front end"]
  }
];

const PROCESS = [
  { icon: "bi-chat-dots", title: "Discuss", text: "You share your idea and requirements." },
  { icon: "bi-pencil-square", title: "Plan", text: "We agree on scope, timeline and cost." },
  { icon: "bi-code-slash", title: "Build", text: "I build it and share regular updates." },
  { icon: "bi-rocket-takeoff", title: "Launch", text: "Deploy, test and hand over." }
];

// ========== QUOTE POPUP FORM (EmailJS) ==========
function QuoteModal({ pkg, onClose }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    pkg: pkg,
    details: ""
  });
  const [sending, setSending] = React.useState(false);
  const [status, setStatus] = React.useState({ type: "", msg: "", link: "" });

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

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();

    const message =
      "Package: " + form.pkg + "\n" +
      "Phone: " + (form.phone || "Not given") + "\n\n" +
      "Project details:\n" + form.details;

    const subject = "Website enquiry: " + form.pkg;
    const gmailUrl = gmailFallbackUrl(
      subject,
      "Name: " + form.name + "\nEmail: " + form.email + "\n\n" + message
    );

    if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
      window.open(gmailUrl, "_blank");
      setStatus({ type: "info", msg: "Gmail opened. Click Send to send your request.", link: "" });
      return;
    }

    setSending(true);
    setStatus({ type: "", msg: "", link: "" });

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: subject,
          message: message
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      .then(() => {
        setStatus({ type: "success", msg: "Request sent! I'll reply soon 😊", link: "" });
        showToast("Quote request sent ✅");
        setTimeout(onClose, 1800);
      })
      .catch((err) => {
        setStatus({
          type: "danger",
          msg: "Could not send: " + emailErrorText(err),
          link: gmailUrl
        });
        setSending(false);
      });
  };

  const modal = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <i className="bi bi-x-lg"></i>
        </button>

        <h4 className="mb-1">Request a <span className="text-accent">Quote</span></h4>
        <p className="text-muted-soft mb-4">
          Tell me about your project, I'll reply with scope, timeline and cost.
        </p>

        <form onSubmit={submit} className="contact-form">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={change}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={change}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                name="phone"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={change}
              />
            </div>
            <div className="col-md-6">
              <select className="form-select" name="pkg" value={form.pkg} onChange={change}>
                {PACKAGES.map((p) => (
                  <option key={p.title} value={p.title}>{p.title}</option>
                ))}
              </select>
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                name="details"
                rows="4"
                placeholder="Describe your project (pages, features, deadline...)"
                value={form.details}
                onChange={change}
                required
              ></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-accent px-4" disabled={sending}>
                {sending ? "Sending..." : "Send Request"}
                <i className="bi bi-send ms-2"></i>
              </button>
            </div>
            {status.msg && (
              <div className="col-12">
                <div className={"alert alert-" + status.type + " mb-0"}>
                  {status.msg}
                  {status.link && (
                    <div className="mt-2">
                      <a
                        href={status.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-dark"
                      >
                        <i className="bi bi-envelope me-1"></i> Send via Gmail instead
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

function Freelance() {
  const d = portfolioData;
  const [quotePkg, setQuotePkg] = React.useState(null);

  // Gmail compose link (mail app avasaram ledu)
  const gmailLink = (pkg) => {
    const subject = encodeURIComponent("Website enquiry: " + pkg);
    const body = encodeURIComponent(
      "Hi Kamalnath,\n\nI am interested in: " + pkg + "\n\nAbout my project:\n\n"
    );
    return (
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(d.email) +
      "&su=" + subject +
      "&body=" + body
    );
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(d.email).then(
        () => showToast("Email copied! 📋"),
        () => showToast("Copy failed, please copy manually")
      );
    } else {
      showToast("Copy not supported in this browser");
    }
  };

  return (
    <section id="freelance" className="section">
      <div className="container">
        <h2 className="section-title text-center">Build Your <span>Website</span></h2>
        <p className="text-center text-secondary mt-2">
          Open for freelance projects alongside full-time opportunities.
        </p>

        <div className="row g-4 mt-3">
          {PACKAGES.map((p, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className={"learn-card pkg-card h-100" + (p.popular ? " popular" : "")}>
                {p.popular && <span className="pkg-tag">Most Requested</span>}
                <div className="project-icon">
                  <i className={"bi " + p.icon}></i>
                </div>
                <h5>{p.title}</h5>
                <h4 className="pkg-price">{p.price ? p.price : "Custom Quote"}</h4>
                <ul className="pkg-list">
                  {p.points.map((pt, j) => (
                    <li key={j}>
                      <i className="bi bi-check2-circle"></i> {pt}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-accent btn-sm me-2 mb-2"
                  onClick={() => setQuotePkg(p.title)}
                >
                  <i className="bi bi-chat-square-text me-1"></i> Request Quote
                </button>
                <a
                  href={gmailLink(p.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-theme btn-sm me-2 mb-2"
                >
                  <i className="bi bi-envelope me-1"></i> Gmail
                </a>
                <button className="btn btn-outline-theme btn-sm mb-2" onClick={copyEmail}>
                  <i className="bi bi-clipboard me-1"></i> Copy Email
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-secondary small mt-4 mb-0">
          Final price depends on pages, features and timeline. Contact me for an exact quote.
        </p>

        <div className="row g-4 mt-2">
          {PROCESS.map((s, i) => (
            <div className="col-6 col-lg-3" key={i}>
              <div className="process-step">
                <span className="process-no">{i + 1}</span>
                <i className={"bi " + s.icon}></i>
                <h6>{s.title}</h6>
                <p className="mb-0">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {quotePkg && <QuoteModal pkg={quotePkg} onClose={() => setQuotePkg(null)} />}
    </section>
  );
}