import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { LINKEDIN_URL } from '../utils/constants';
import '../styles/Hero.css';

export const Green = ({ children }) => (
  <span className="hero-green">{children}</span>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, delay, ease: 'easeOut' },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.3,
    delay,
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
});

const barSlide = {
  initial: { width: 0 },
  animate: { width: 72 },
  transition: { duration: 0.35, delay: 0.3, ease: 'easeOut' },
};

function GeoTopLeft() {
  return (
    <div className="absolute left-0 overflow-hidden z-10 top-0 sm:top-[var(--nav-h)] hero-geo hero-geo-tl">
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="tl_clip">
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle cx="0" cy="0" r="108" fill="#3a7ab5" clipPath="url(#tl_clip)" />
        <circle cx="0" cy="0" r="76" fill="#52D96A" clipPath="url(#tl_clip)" />
        <circle cx="0" cy="0" r="46" fill="#2e6fa3" clipPath="url(#tl_clip)" />
      </svg>
    </div>
  );
}

function GeoTopRight() {
  return (
    <div className="absolute right-0 overflow-hidden z-10 top-0 sm:top-[var(--nav-h)] hero-geo hero-geo-tr">
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="tra">
          <rect x="59" y="0" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="59" r="54" fill="#3a7ab5" clipPath="url(#tra)" />
        <clipPath id="trb">
          <rect x="0" y="0" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="0" r="50" fill="#52D96A" clipPath="url(#trb)" />
      </svg>
    </div>
  );
}

function GeoBottomLeft() {
  return (
    <div className="absolute left-0 overflow-hidden z-10 hero-geo hero-geo-bl">
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="bla2">
          <rect x="0" y="59" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="59" r="54" fill="#2e6fa3" clipPath="url(#bla2)" />
        <clipPath id="blb2">
          <rect x="59" y="59" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="118" r="50" fill="#52D96A" clipPath="url(#blb2)" />
      </svg>
    </div>
  );
}

function GeoBottomRight() {
  return (
    <div className="absolute right-0 overflow-hidden z-10 hero-geo hero-geo-br">
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="br_clip">
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle
          cx="118"
          cy="118"
          r="108"
          fill="#3a7ab5"
          clipPath="url(#br_clip)"
        />
        <circle
          cx="118"
          cy="118"
          r="76"
          fill="#52D96A"
          clipPath="url(#br_clip)"
        />
        <circle
          cx="118"
          cy="118"
          r="46"
          fill="#2e6fa3"
          clipPath="url(#br_clip)"
        />
      </svg>
    </div>
  );
}

const PersonIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const LaptopIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M0 21h24" />
    <path d="M7 21l2-4h6l2 4" />
  </svg>
);

const FolderIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);

const navLinks = [
  { label: 'About Me', icon: <PersonIcon />, href: '#about' },
  { label: 'My Experience', icon: <LaptopIcon />, href: '#experience' },
  { label: 'Projects', icon: <FolderIcon />, href: '#projects' },
];

function Nav() {
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 hidden sm:flex items-center justify-between z-30 nav-padding"
      initial={{ opacity: 0, height: 72 }}
      animate={{ opacity: 1, height: scrolled ? 48 : 72 }}
      transition={{
        opacity: { duration: 0.2 },
        height: { duration: 0.3, ease: 'easeOut' },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 z-0 nav-bg"
        animate={{ scaleY: hovered || scrolled ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      <a
        href="#hero"
        className="relative z-10 font-bold cursor-pointer nav-logo"
      >
        NM
      </a>

      <div className="relative z-10 flex items-center nav-links-gap">
        {navLinks.map(({ label, icon, href }) => (
          <motion.a
            key={label}
            href={href}
            className="hidden sm:flex items-center justify-center cursor-pointer nav-link"
            title={scrolled ? label : undefined}
            animate={{ width: scrolled ? 24 : 'auto' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.span
              className="nav-link-label"
              animate={{
                opacity: scrolled ? 0 : 1,
                width: scrolled ? 0 : 'auto',
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
            <motion.span
              className={`nav-link-icon${scrolled ? ' is-scrolled' : ''}`}
              animate={{
                opacity: scrolled ? 1 : 0,
                width: scrolled ? 'auto' : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          </motion.a>
        ))}

        <a
          href="#contact"
          className={`font-semibold cursor-pointer flex items-center justify-center nav-cta${scrolled ? ' nav-cta-scrolled' : ''}`}
        >
          {scrolled ? <PhoneIcon /> : 'Contact'}
        </a>
      </div>
    </motion.nav>
  );
}

function BottomStrip() {
  const items = [
    { label: 'Based In', value: 'New York', mobileHidden: true },
    { label: 'YoE', value: '2 +' },
    { label: 'LinkedIn', linkedin: true },
    { label: 'Status', value: 'Open to Work', green: true },
  ];

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-white/[0.13] flex items-center z-20 bottom-strip"
      {...fadeUp(0.44)}
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex items-center ${item.mobileHidden ? 'hidden sm:flex' : ''}`}
        >
          {i > 0 && (
            <div className="strip-divider bg-white/20 hidden sm:block" />
          )}
          <div className="flex flex-col strip-item">
            <span className="uppercase text-white/50 strip-label">
              {item.label}
            </span>
            {item.linkedin ? (
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="linkedin-link"
              >
                <FaLinkedin className="linkedin-icon" />
              </a>
            ) : (
              <span
                className={`font-bold strip-value ${item.green ? 'strip-value-green' : 'strip-value-white'}`}
              >
                {item.value}
              </span>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute hidden sm:flex flex-col items-center z-20 scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.65 }}
    >
      <motion.div
        className="flex flex-col items-center scroll-indicator-inner"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.9,
        }}
      >
        <span className="uppercase scroll-text">scroll</span>
        <div className="scroll-chevron" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden hero-section"
    >
      <GeoTopLeft />
      <GeoTopRight />
      <GeoBottomLeft />
      <GeoBottomRight />
      <Nav />

      <div className="absolute inset-0 flex items-center justify-center z-10 hero-content-area">
        <div className="text-center w-full hero-content-inner">
          <motion.div
            className="inline-flex items-center bg-white/[0.18] hero-badge"
            {...fadeUp(0.12)}
          >
            <span className="hero-badge-dot" />
            <span className="font-semibold text-white hero-badge-text">
              Full Stack Software Engineer
            </span>
          </motion.div>

          <motion.h1 className="text-white block hero-title" {...scaleIn(0.18)}>
            Nicholas <span className="hero-title-accent">Masters</span>
          </motion.h1>

          <motion.div
            className="hero-bar"
            initial={barSlide.initial}
            animate={barSlide.animate}
            transition={barSlide.transition}
          />

          <motion.p className="mx-auto hero-bio" {...fadeUp(0.33)}>
            I am a software engineer who takes{' '}
            <Green>end-to-end ownership</Green> across the stack, from
            delivering <Green>third-party integrations</Green> to
            customer-facing features supporting{' '}
            <Green>various business initiatives</Green>
          </motion.p>

          <motion.div
            className="flex justify-center flex-wrap hero-btn-group"
            {...fadeUp(0.38)}
          >
            <a
              href="#projects"
              className="font-bold cursor-pointer hero-btn-primary"
            >
              View My Work ↓
            </a>
            <a href="#contact" className="cursor-pointer hero-btn-secondary">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
      <BottomStrip />
    </section>
  );
}
