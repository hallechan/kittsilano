import React from "react";

export const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      title: "Phone",
      value: "(604) 731-2913",
      link: "tel:+16047312913",
      description: "Call us for adoption inquiries and support"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: "Email",
      value: "info@vokra.ca",
      link: "mailto:info@vokra.ca",
      description: "Send us an email for general inquiries"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      title: "Mailing Address",
      value: "PO Box 74571\nVancouver, BC\nV6K 4P4 Canada",
      link: null,
      description: "Send us mail at our Vancouver location"
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2 className="contact-title">
          <svg className="me-3" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"/>
          </svg>
          Contact VOKRA
        </h2>
        <p className="contact-subtitle">
          Get in touch with us for adoption inquiries, volunteer opportunities, or general questions about our cat rescue organization.
        </p>
      </div>

      <div className="contact-grid">
        {contactInfo.map((info, index) => (
          <div key={index} className="contact-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="contact-icon">
              {info.icon}
            </div>
            <div className="contact-content">
              <h3 className="contact-item-title">{info.title}</h3>
              {info.link ? (
                <a 
                  href={info.link} 
                  className="contact-value contact-link"
                  target={info.link.startsWith('mailto:') ? undefined : '_blank'}
                  rel={info.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                >
                  {info.value}
                </a>
              ) : (
                <div className="contact-value contact-address">
                  {info.value.split('\n').map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </div>
              )}
              <p className="contact-description">{info.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-info-section">
        <div className="info-card">
          <h3 className="info-title">
            <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            About VOKRA
          </h3>
          <p className="info-text">
            VOKRA (Vancouver Orphan Kitten Rescue Association) is a registered charity dedicated to the rescue, rehabilitation, and rehoming of cats and kittens in the Greater Vancouver area. We are a no-kill organization committed to finding loving homes for every cat in our care.
          </p>
        </div>

        <div className="info-card">
          <h3 className="info-title">
            <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Our Mission
          </h3>
          <p className="info-text">
            We rescue, rehabilitate, and rehome cats and kittens in need, providing them with medical care, love, and attention until they find their forever homes. Our volunteers work tirelessly to ensure every cat receives the care they deserve.
          </p>
        </div>

        <div className="info-card">
          <h3 className="info-title">
            <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.27c-.41.55-.63 1.24-.63 1.93V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2z"/>
            </svg>
            Get Involved
          </h3>
          <p className="info-text">
            We're always looking for volunteers, foster homes, and donations to help us continue our mission. Whether you can give your time, provide a temporary home, or make a financial contribution, every bit helps us save more cats.
          </p>
        </div>
      </div>

      <div className="contact-footer">
        <div className="footer-content">
          <p className="footer-text">
            Thank you for your interest in VOKRA. Together, we can make a difference in the lives of cats and kittens in need.
          </p>
          <div className="footer-actions">
            <a href="tel:+16047312913" className="footer-btn primary">
              <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call Now
            </a>
            <a href="mailto:info@vokra.ca" className="footer-btn secondary">
              <svg className="me-2" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 