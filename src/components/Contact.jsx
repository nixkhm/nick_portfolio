import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, geoIn, barGrow } from '../utils/animations';
import { LINKEDIN_URL } from '../utils/constants';
import '../styles/Contact.css';

function GeoTopLeft() {
  return (
    <motion.div
      className="con-geo-tl absolute left-0 overflow-hidden pointer-events-none"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="con_tla">
          <rect x="0" y="0" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="59"
          r="54"
          fill="#2e6fa3"
          clipPath="url(#con_tla)"
        />
        <clipPath id="con_tlb">
          <rect x="59" y="0" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="0" r="50" fill="#52D96A" clipPath="url(#con_tlb)" />
      </svg>
    </motion.div>
  );
}

function GeoBottomRight() {
  return (
    <motion.div
      className="con-geo-br absolute right-0 overflow-hidden pointer-events-none"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="con_br">
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle
          cx="118"
          cy="118"
          r="108"
          fill="#3a7ab5"
          clipPath="url(#con_br)"
        />
        <circle
          cx="118"
          cy="118"
          r="76"
          fill="#52D96A"
          clipPath="url(#con_br)"
        />
        <circle
          cx="118"
          cy="118"
          r="46"
          fill="#2e6fa3"
          clipPath="url(#con_br)"
        />
      </svg>
    </motion.div>
  );
}

const LinkedInLogo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="72" height="72" rx="8" fill="#0A66C2" />
    <path
      d="M13.5 27h9v31.5h-9V27zm4.5-3.5a5.25 5.25 0 110-10.5 5.25 5.25 0 010 10.5z"
      fill="white"
    />
    <path
      d="M31.5 27h8.6v4.3h.1c1.2-2.3 4.1-4.7 8.5-4.7 9.1 0 10.8 6 10.8 13.7v15.7h-9V42c0-3.4-.1-7.7-4.7-7.7-4.7 0-5.4 3.7-5.4 7.5v16.7h-9V27z"
      fill="white"
    />
  </svg>
);

const EMAIL = import.meta.env.VITE_EMAIL;
const RESUME_PATH = null;

function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="con-toast fixed z-[9999] flex items-center"
          style={{ left: '50%' }}
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.22 }}
        >
          <div className="con-toast-dot" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EmailPopup({ onClose, onToast }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    onClose();
    onToast('Email copied to clipboard ✓');
  }

  function openMailto() {
    window.location.href = `mailto:${EMAIL}`;
    onClose();
  }

  return (
    <motion.div
      className="con-overlay-dark fixed inset-0 z-[9000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="con-popup-box con-email-box"
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="con-popup-header con-popup-header-mb">
          <div className="con-popup-title">Get in touch</div>
          <button className="con-popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="con-email-display">{EMAIL}</div>

        <div className="con-popup-actions">
          <button className="con-btn-copy" onClick={copyEmail}>
            📋 &nbsp;Copy email address
          </button>
          <button className="con-btn-mailto" onClick={openMailto}>
            ✉️ &nbsp;Open in mail app
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ResumeModal({ onClose, onToast }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  function viewResume() {
    window.open(RESUME_PATH, '_blank');
    onToast('Opening resume PDF ↗');
  }

  function downloadResume() {
    const a = document.createElement('a');
    a.href = RESUME_PATH;
    a.download = 'Nicholas_Masters_Resume.pdf';
    a.click();
    onToast('Downloading resume ⬇');
  }

  return (
    <motion.div
      className="con-overlay-darker fixed inset-0 z-[9000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="con-popup-box con-resume-box"
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="con-popup-header con-popup-header-mb-lg">
          <div>
            <div className="con-popup-title">Nicholas Masters</div>
            <div className="con-popup-subtitle">
              Full Stack Software Engineer · Resume
            </div>
          </div>
          <button className="con-popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="con-resume-preview">
          <span className="con-resume-preview-emoji">📄</span>
          <span className="con-resume-preview-text">Resume coming soon</span>
        </div>

        <div className="con-resume-btns">
          <button disabled className="con-btn-disabled con-btn-disabled-dl">
            ⬇ Download PDF
          </button>
          <button disabled className="con-btn-disabled con-btn-disabled-view">
            ↗ View Full Screen
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactCard({ emoji, label, value, action, green, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="con-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? '#3a7ab5'
          : green
            ? 'rgba(82,217,106,0.1)'
            : 'rgba(255,255,255,0.13)',
        border: `1px solid ${hovered ? '#3a7ab5' : green ? 'rgba(82,217,106,0.4)' : 'rgba(255,255,255,0.22)'}`,
      }}
      animate={{ y: hovered ? -4 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="con-card-emoji">{emoji}</div>
      <span className="con-card-label">{label}</span>
      <span
        className="con-card-value"
        style={{ color: hovered ? '#52D96A' : '#fff' }}
      >
        {value}
      </span>
      <span
        className="con-card-action"
        style={{ color: hovered ? '#fff' : '#52D96A' }}
      >
        {action}
      </span>
    </motion.div>
  );
}

export default function Contact() {
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const toastTimer = useRef(null);

  function closeModal() {
    setModal(null);
  }

  function showToast(msg) {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, message: msg });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2400
    );
  }

  function openLinkedIn() {
    window.open(LINKEDIN_URL, '_blank');
    showToast('Opening LinkedIn ↗');
  }

  return (
    <section className="con-section relative w-full flex flex-col items-center justify-start overflow-hidden">
      <GeoTopLeft />
      <GeoBottomRight />
      <motion.div
        className="con-header text-center relative z-10"
        {...fadeUp(0.1)}
      >
        <p className="con-label font-bold uppercase">04. &nbsp; Contact</p>
        <h2 className="con-h2 text-white">Get In Touch.</h2>
        <motion.div className="con-header-bar" {...barGrow(40, 0.25)} />
      </motion.div>

      <motion.p
        className="con-tagline relative z-10 text-center"
        {...fadeUp(0.18)}
      >
        I'm always open to connections so please don't hesitate to reach out!
      </motion.p>

      <motion.div
        className="con-cards relative z-10 flex flex-wrap justify-center"
        {...fadeUp(0.24)}
      >
        <ContactCard
          emoji={<LinkedInLogo />}
          label="LinkedIn"
          value="Nicholas Masters"
          action="Connect ↗"
          onClick={openLinkedIn}
        />
        <ContactCard
          emoji="📄"
          label="Resume"
          value="View / Download"
          action="Open PDF →"
          green
          onClick={() => setModal('resume')}
        />
        <ContactCard
          emoji="✉️"
          label="Email"
          value={EMAIL}
          action="Say hi →"
          onClick={() => setModal('email')}
        />
      </motion.div>

      <motion.p className="con-footer relative z-10" {...fadeUp(0.3)}>
        Designed &amp; built by{' '}
        <span className="con-footer-name">Nicholas Masters</span>
      </motion.p>

      <motion.p className="con-copyright relative z-10" {...fadeUp(0.34)}>
        &copy; {new Date().getFullYear()} Nicholas Masters. All rights reserved.
      </motion.p>

      <AnimatePresence>
        {modal === 'email' && (
          <EmailPopup onClose={closeModal} onToast={showToast} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {modal === 'resume' && (
          <ResumeModal onClose={closeModal} onToast={showToast} />
        )}
      </AnimatePresence>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
