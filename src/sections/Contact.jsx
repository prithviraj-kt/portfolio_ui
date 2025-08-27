import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaPhone
} from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message is too short";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   if (validateForm()) {
  //     setLoading(true)

  //     // Simulate form submission
  //     setTimeout(() => {
  //       setLoading(false)
  //       setSubmitted(true)

  //       // Reset form
  //       setFormData({
  //         name: '',
  //         email: '',
  //         subject: '',
  //         message: ''
  //       })

  //       // Reset submission status after 5 seconds
  //       setTimeout(() => {
  //         setSubmitted(false)
  //       }, 5000)
  //     }, 1500)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbwNMWkzvIAzfDQQUSzEEZCfiOnxUiM9eF1lqtCUqZHZSlCQihyGskjtT-CfFLxodnV3oQ/exec",
          {
            method: "POST",
            mode: "no-cors", // important for Apps Script
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        console.error("Error!", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "prithvirajtagadinamani@gmail.com",
      link: "mailto:prithvirajtagadinamani@gmail.com",
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      value: "9353968791",
      link: "",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "India, Karnataka, Hubli",
      link: "https://maps.google.com/?q=Hubli",
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/prithviraj-tagadinamani-934709196",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub />,
      url: "https://github.com/prithviraj-kt",
      label: "GitHub",
    },
    // { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    // { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's connect and discuss how we can work together"
        />

        <motion.div
          className="contact-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--spacing-4)",
          }}
        >
          <motion.div variants={itemVariants} className="contact-info">
            <h3 style={{ marginBottom: "var(--spacing-3)" }}>
              Contact Information
            </h3>

            <div
              className="info-items"
              style={{ marginBottom: "var(--spacing-4)" }}
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-item glass"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-2)",
                    padding: "var(--spacing-3)",
                    borderRadius: "12px",
                    marginBottom: "var(--spacing-3)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--primary-600)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1rem" }}>
                      {info.title}
                    </h4>
                    <p
                      style={{
                        margin: "5px 0 0",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div
              className="social-links"
              style={{ marginBottom: "var(--spacing-4)" }}
            >
              <h4 style={{ marginBottom: "var(--spacing-2)" }}>
                Connect With Me
              </h4>
              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-2)",
                }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: "var(--primary-500)",
                      color: "white",
                    }}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--dark-card)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--text-primary)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              className="map-container glass"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                height: "200px",
                position: "relative",
              }}
              whileHover={{ y: -5 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.480381778225!2d75.1169977748134!3d15.364708286326468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d718a73f6f1d%3A0xdeb3e0c64c07e7e5!2sHubballi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1692712345678!5m2!1sen!2sin
"
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="contact-form-container"
          >
            <div
              className="contact-form glass"
              style={{
                padding: "var(--spacing-4)",
                borderRadius: "12px",
              }}
            >
              <h3 style={{ marginBottom: "var(--spacing-3)" }}>
                Send Me a Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                  style={{
                    padding: "var(--spacing-3)",
                    background: "rgba(76, 175, 80, 0.2)",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: "var(--spacing-3)",
                  }}
                >
                  <h4
                    style={{
                      color: "var(--success-500)",
                      marginBottom: "var(--spacing-1)",
                    }}
                  >
                    Message Sent Successfully!
                  </h4>
                  <p>
                    Thank you for reaching out. I'll get back to you as soon as
                    possible!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--spacing-3)" }}
                  >
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        background: "var(--dark-bg)",
                        border: errors.name
                          ? "1px solid var(--error-500)"
                          : "1px solid var(--dark-surface)",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "var(--error-500)",
                          margin: "5px 0 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--spacing-3)" }}
                  >
                    <label
                      htmlFor="email"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        background: "var(--dark-bg)",
                        border: errors.email
                          ? "1px solid var(--error-500)"
                          : "1px solid var(--dark-surface)",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "var(--error-500)",
                          margin: "5px 0 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--spacing-3)" }}
                  >
                    <label
                      htmlFor="subject"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        background: "var(--dark-bg)",
                        border: errors.subject
                          ? "1px solid var(--error-500)"
                          : "1px solid var(--dark-surface)",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    />
                    {errors.subject && (
                      <p
                        style={{
                          color: "var(--error-500)",
                          margin: "5px 0 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{ marginBottom: "var(--spacing-3)" }}
                  >
                    <label
                      htmlFor="message"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        background: "var(--dark-bg)",
                        border: errors.message
                          ? "1px solid var(--error-500)"
                          : "1px solid var(--dark-surface)",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                        resize: "vertical",
                      }}
                    />
                    {errors.message && (
                      <p
                        style={{
                          color: "var(--error-500)",
                          margin: "5px 0 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "3px solid rgba(255,255,255,0.3)",
                            borderTop: "3px solid white",
                            borderRadius: "50%",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              )}
            </div>

            <motion.div
              className="cta-card glass"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                padding: "var(--spacing-3)",
                borderRadius: "12px",
                marginTop: "var(--spacing-3)",
                textAlign: "center",
              }}
            >
              <h4 style={{ marginBottom: "var(--spacing-2)" }}>
                Looking for a developer for your next project?
              </h4>
              <p
                style={{
                  marginBottom: "var(--spacing-3)",
                  color: "var(--text-secondary)",
                }}
              >
                I'm currently available for freelance work and full-time
                positions.
              </p>
              <motion.a
                href="mailto:prithvirajtagadinamani@gmail.com?subject=Let's%20Work%20Together"
                className="btn btn-accent"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope /> Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <footer
        style={{
          marginTop: "var(--spacing-6)",
          padding: "var(--spacing-4) 0",
          textAlign: "center",
          borderTop: "1px solid var(--dark-surface)",
        }}
      >
        <div className="container">
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>
            © {new Date().getFullYear()} Prithviraj Tagadina. All rights
            reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
