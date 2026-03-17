import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Our Capabilities",
    href: "/capabilities",
    dropdown: [
      { label: "Property Sales & Letting", href: "/capabilities/sales-letting" },
      { label: "Property Management", href: "/capabilities/property-management" },
      { label: "Property Investment", href: "/capabilities/property-investment" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
];

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-[250ms] ${open ? "rotate-180" : "rotate-0"}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l1.06-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isActive = (link: { href: string }) =>
    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 px-6 transition-all duration-[400ms] ${
        scrolled
          ? "py-2 bg-[rgba(248,246,242,0.85)] backdrop-blur-[12px] border-b border-black/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline z-10 cursor-pointer">
          <div className="w-[38px] h-[38px] rounded-[10px] overflow-hidden bg-white p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.12)] shrink-0">
            <Image
              src="/images/brand/icon-light.jpeg"
              alt="Ardhi Safi Icon"
              width={38}
              height={38}
              className="w-full h-full object-cover rounded-lg block"
            />
          </div>
          <div>
            <div
              className={`font-['Cormorant_Garamond',serif] text-[22px] font-semibold tracking-[0.03em] leading-none transition-colors duration-[400ms] ${
                scrolled ? "text-primary" : "text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]"
              }`}
            >
              ArdhiSafi
            </div>
            <div className="text-[8px] tracking-[0.25em] uppercase text-accent mt-0.5">
              Shelter for All
            </div>
          </div>
        </Link>

        {/* Desktop Nav Pill */}
        <nav
          className={`absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center backdrop-blur-[20px] rounded-full py-[5px] px-1.5 gap-0.5 transition-all duration-[400ms] ${
            scrolled
              ? "bg-white/[0.92] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]"
              : "bg-white/[0.08] border border-white/20"
          }`}
        >
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
              onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-[5px] py-2 px-4 rounded-full text-[13.5px] font-medium no-underline cursor-pointer transition-all duration-200 whitespace-nowrap tracking-[0.01em] ${
                  isActive(link)
                    ? "text-accent font-semibold " + (scrolled ? "bg-accent/10" : "bg-white/[0.15]")
                    : scrolled
                      ? "text-[#4a4a4a] hover:text-primary hover:bg-primary/[0.06]"
                      : "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] hover:bg-white/[0.15]"
                }`}
                onClick={() => { setActiveDropdown(null); }}
              >
                {link.label}
                {link.dropdown && <ChevronDown open={activeDropdown === link.label} />}
              </Link>

              {link.dropdown && activeDropdown === link.label && (
                <div
                  className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-60 bg-white/[0.98] backdrop-blur-[20px] border border-black/[0.07] rounded-[18px] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] animate-nav-drop-in"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.dropdown.map((item, i) => (
                    <div key={item.label}>
                      {i > 0 && <div className="h-px bg-black/5 mx-2.5 my-1" />}
                      <Link
                        href={item.href}
                        className="block py-2.5 px-4 text-[13px] font-medium text-[#4a4a4a] no-underline rounded-xl transition-all duration-150 tracking-[0.01em] hover:bg-primary/[0.06] hover:text-primary hover:pl-5"
                        onClick={() => { setActiveDropdown(null); }}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div
          className={`hidden lg:flex items-center gap-1.5 backdrop-blur-[20px] rounded-full pl-2 pr-[5px] py-[5px] z-10 transition-all duration-[400ms] ${
            scrolled
              ? "bg-white/[0.92] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
              : "bg-white/[0.08] border border-white/20"
          }`}
        >
          <a
            href="tel:+254780999100"
            title="+254 780 999 100"
            className={`w-[38px] h-[38px] flex items-center justify-center rounded-full transition-all duration-200 ${
              scrolled
                ? "text-[#4a4a4a] hover:bg-primary/[0.07] hover:text-primary"
                : "text-white hover:bg-white/[0.15]"
            }`}
          >
            <PhoneIcon />
          </a>
          <div className={`w-px h-5 ${scrolled ? "bg-black/10" : "bg-white/20"}`} />
          <Link
            href="/contact"
            className="bg-accent text-white text-[13px] font-semibold py-[9px] px-5 rounded-full tracking-[0.02em] whitespace-nowrap transition-all duration-200 shadow-[0_4px_12px_rgba(176,140,74,0.3)] hover:bg-accent-dark hover:shadow-[0_6px_18px_rgba(176,140,74,0.4)] hover:-translate-y-px"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`flex lg:hidden items-center justify-center w-11 h-11 rounded-full z-10 cursor-pointer transition-all duration-200 ${
            scrolled
              ? "bg-white/[0.92] border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-primary hover:bg-white"
              : "bg-white/[0.08] border border-white/20 text-white hover:bg-white/[0.15]"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 animate-nav-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white/[0.98] backdrop-blur-[24px] border border-black/[0.07] rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.15)] animate-nav-slide-down z-50">
            <div className="p-3">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <div
                      className={`flex items-center justify-between py-3 px-4 text-[15px] font-medium rounded-[14px] cursor-pointer transition-all duration-150 tracking-[0.01em] ${
                        isActive(link) ? "bg-primary/[0.06] text-accent font-semibold" : "text-[#2a2a2a] hover:bg-primary/[0.06] hover:text-primary"
                      }`}
                      onClick={() => setMobileExpandedDropdown(mobileExpandedDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown open={mobileExpandedDropdown === link.label} />
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-3 px-4 text-[15px] font-medium no-underline rounded-[14px] cursor-pointer transition-all duration-150 tracking-[0.01em] ${
                        isActive(link) ? "bg-primary/[0.06] text-accent font-semibold" : "text-[#2a2a2a] hover:bg-primary/[0.06] hover:text-primary"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.dropdown && mobileExpandedDropdown === link.label && (
                    <div className="ml-4 my-0.5 pl-3.5 py-1 border-l-2 border-accent/25">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-2 px-3 text-[13px] font-normal text-[#5a5a5a] no-underline rounded-[10px] cursor-pointer transition-all duration-150 hover:text-primary hover:bg-primary/[0.04]"
                          onClick={() => { setMobileOpen(false); }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 bg-primary/[0.03] border-t border-black/5 flex flex-col gap-2">
              <a
                href="tel:+254780999100"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-primary bg-white border border-primary/[0.15] rounded-[14px] cursor-pointer transition-all duration-150 no-underline hover:bg-primary/[0.04]"
              >
                <PhoneIcon /> +254 780 999 100
              </a>
              <Link
                href="/contact"
                className="block w-full py-3.5 text-sm font-semibold text-white bg-accent rounded-[14px] text-center tracking-[0.02em] transition-all duration-200 shadow-[0_4px_14px_rgba(176,140,74,0.3)] hover:bg-accent-dark no-underline"
                onClick={() => { setMobileOpen(false); }}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
