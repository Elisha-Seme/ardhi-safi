import Image from "next/image";

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l1.06-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/>
  </svg>
);

const contactInfo = {
  phones: ["+254 780 999 100", "+254 725 403 001"],
  emails: [
    { label: "Customer Service", email: "care@ardhisafi.co.ke" },
    { label: "Buying", email: "buy@ardhisafi.co.ke" },
    { label: "Selling", email: "sell@ardhisafi.co.ke" },
    { label: "Property Mgmt", email: "pmgt@ardhisafi.co.ke" },
  ],
  address: "B2-06, Manga House, Kiambere Road, Upper Hill, Nairobi, Kenya",
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Capabilities", href: "/capabilities" },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/ardhi-safi-limited/" },
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/share/1KFH35LHsf/" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/ardhisafi" },
  { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@ardhisafi" },
];

const services = [
  "Property Sales & Letting",
  "Property Management",
  "Property Investment",
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "'Georgia', serif", background: "#1a3c34", color: "#e5e5e5", width: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem 4rem" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <a href="#" style={{ display: "inline-block", textDecoration: "none" }}>
                <div style={{
                  width: 96, height: 96,
                  borderRadius: 16,
                  background: "white",
                  padding: 4,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  marginBottom: "1rem",
                  overflow: "hidden",
                }}>
                  <Image src="/images/brand/icon-light.jpeg" alt="Ardhi Safi" width={100} height={100} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }} />
                </div>
                <p style={{ fontFamily: "'Georgia', serif", fontSize: 24, color: "white", letterSpacing: "0.05em", marginTop: 16, marginBottom: 4 }}>ArdhiSafi</p>
                <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(229,229,229,0.6)", marginTop: 4 }}>Shelter for all</p>
              </a>
              <p style={{ fontSize: 13, lineHeight: 1.8, marginTop: 20, marginBottom: 24, maxWidth: 280, color: "rgba(229,229,229,0.85)" }}>
                A professional real estate firm established in 2014, licensed by EARB. We provide integrated real estate solutions across Kenya.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", cursor: "pointer", textDecoration: "none",
                    transition: "background 0.2s",
                  }}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, color: "white", marginBottom: 20, fontWeight: 400 }}>Quick Links</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} style={{ color: "#e5e5e5", fontSize: 13, textDecoration: "none", opacity: 0.85 }}
                      onMouseEnter={e => (e.target as HTMLElement).style.opacity = "1"}
                      onMouseLeave={e => (e.target as HTMLElement).style.opacity = "0.85"}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, color: "white", marginBottom: 20, fontWeight: 400 }}>Contact Us</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 13 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "white", marginTop: 2 }}><PhoneIcon /></span>
                  <div>
                    {contactInfo.phones.map(p => (
                      <a key={p} href={`tel:${p.replace(/\s/g,"")}`} style={{ display: "block", color: "#e5e5e5", textDecoration: "none", lineHeight: 1.8 }}>{p}</a>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "white", marginTop: 2 }}><MailIcon /></span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {contactInfo.emails.map(({ label, email }) => (
                      <div key={email}>
                        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>{label}</p>
                        <a href={`mailto:${email}`} style={{ color: "#e5e5e5", textDecoration: "none", fontSize: 13 }}>{email}</a>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "white", marginTop: 2 }}><MapPinIcon /></span>
                  <p style={{ color: "rgba(229,229,229,0.85)", lineHeight: 1.7 }}>{contactInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, color: "white", marginBottom: 20, fontWeight: 400 }}>Our Services</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {services.map(s => (
                  <li key={s}>
                    <a href="#" style={{ color: "#e5e5e5", fontSize: 13, textDecoration: "none", opacity: 0.85 }}
                      onMouseEnter={e => (e.target as HTMLElement).style.opacity = "1"}
                      onMouseLeave={e => (e.target as HTMLElement).style.opacity = "0.85"}
                    >{s}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto", padding: "1.25rem 2rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12,
            fontSize: 11, color: "rgba(229,229,229,0.5)",
          }}>
            <p>© {new Date().getFullYear()} Ardhi Safi Limited. All rights reserved. Licensed by EARB Kenya. &nbsp;
              <a href="#" style={{ color: "rgba(229,229,229,0.5)", textDecoration: "underline" }}>Privacy Policy</a>
            </p>
            <a href="#" style={{ color: "rgba(229,229,229,0.5)", textDecoration: "underline" }}>Report an accessibility issue</a>
          </div>
        </div>
    </footer>
  );
}