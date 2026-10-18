const EMAILJS_SERVICE_ID = "service_7m1u2cr";
const EMAILJS_TEMPLATE_ID = "template_bd9wi6j";
const EMAILJS_PUBLIC_KEY = "XX9qKwJlgOrz3pYvA";

const MAIL_TO = "kamalnath645@gmail.com";

function emailErrorText(err) {
  console.error("EmailJS error:", err);
  if (!err) return "Unknown error";
  const status = err.status ? "Error " + err.status + ": " : "";
  return status + (err.text || err.message || "Unknown error");
}

function gmailFallbackUrl(subject, body) {
  return (
    "https://mail.google.com/mail/?view=cm&fs=1&to=" +
    encodeURIComponent(MAIL_TO) +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body)
  );
}

function Contact() {
  const d = portfolioData;
  const formRef = React.useRef(null);
  const [status, setStatus] = React.useState({ type: "", msg: "", link: "" });
  const [sending, setSending] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = formRef.current;

    const subject = "Portfolio message: " + f.subject.value;
    const body =
      "Name: " + f.from_name.value + "\n" +
      "Email: " + f.from_email.value + "\n\n" +
      f.message.value;

    if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
      window.open(gmailFallbackUrl(subject, body), "_blank");
      setStatus({
        type: "info",
        msg: "Gmail opened. Click Send to send your request.",
        link: ""
      });
      return;
    }

    setSending(true);
    setStatus({ type: "", msg: "", link: "" });

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, f, {
        publicKey: EMAILJS_PUBLIC_KEY
      })
      .then(() => {
        setStatus({ type: "success", msg: "I’ve sent a message! I’ll reply soon 😊", link: "" });
        f.reset();
      })
      .catch((err) => {
        setStatus({
          type: "danger",
          msg: "Could not send: " + emailErrorText(err),
          link: gmailFallbackUrl(subject, body)
        });
      })
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title text-center">Get In <span>Touch</span></h2>
        <p className="text-center text-secondary mt-2">
         Please send a message if you would like to discuss job opportunities or projects.
        </p>

        <div className="row g-5 mt-3">
          {/* Left: Contact info */}
          <div className="col-lg-5">
            <div className="contact-info">
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <div>
                  <h6>Email</h6>
                  <a href={"mailto:" + d.email}>{d.email}</a>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <div>
                  <h6>Phone</h6>
                  <a href={"tel:" + d.phone.replace(/\s/g, "")}>{d.phone}</a>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-geo-alt-fill"></i>
                <div>
                  <h6>Location</h6>
                  <span>{d.location}</span>
                </div>
              </div>

              <div className="social-icons mt-4">
                <a href={d.github} target="_blank" rel="noreferrer">
                  <i className="bi bi-github"></i>
                </a>
                <a href={d.linkedin} target="_blank" rel="noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="col-lg-7">
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="from_name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="from_email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-accent px-4" disabled={sending}>
                    {sending ? "Sending..." : "Send Message"}
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
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer text-center">
      <p className="mb-0">
        © {new Date().getFullYear()} Kamalnath Velpula. All rights reserved.
      </p>
    </footer>
  );
}