import { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pillByName } from '../data/skills';
import { fadeUp, geoIn, barGrow } from '../utils/animations';
import { projects } from '../data/projects';
import '../styles/Projects.css';

function GeoTopLeft() {
  return (
    <motion.div
      className="proj-geo-tl absolute left-0 overflow-hidden pointer-events-none"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="proj_tl">
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle cx="0" cy="0" r="108" fill="#3a7ab5" clipPath="url(#proj_tl)" />
        <circle cx="0" cy="0" r="76" fill="#52D96A" clipPath="url(#proj_tl)" />
        <circle cx="0" cy="0" r="46" fill="#2e6fa3" clipPath="url(#proj_tl)" />
      </svg>
    </motion.div>
  );
}

function GeoBottomRight() {
  return (
    <motion.div
      className="proj-geo-br absolute right-0 overflow-hidden pointer-events-none"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="proj_bra">
          <rect x="59" y="59" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="59"
          r="54"
          fill="#2e6fa3"
          clipPath="url(#proj_bra)"
        />
        <clipPath id="proj_brb">
          <rect x="0" y="59" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="118"
          r="50"
          fill="#52D96A"
          clipPath="url(#proj_brb)"
        />
      </svg>
    </motion.div>
  );
}

function ModalSectionLabel({ children }) {
  return <div className="proj-modal-section-label">{children}</div>;
}

function Lightbox({ slides, idx: initialIdx, onClose }) {
  const [idx, setIdx] = useState(initialIdx);
  const [zoom, setZoom] = useState(1);
  const [isSmall, setIsSmall] = useState(() => window.innerWidth < 640);
  const total = slides.length;

  function prev() {
    setIdx((i) => (i - 1 + total) % total);
    setZoom(1);
  }
  function next() {
    setIdx((i) => (i + 1) % total);
    setZoom(1);
  }

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const handler = (e) => setIsSmall(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setIdx((i) => (i - 1 + total) % total);
        setZoom(1);
      }
      if (e.key === 'ArrowRight') {
        setIdx((i) => (i + 1) % total);
        setZoom(1);
      }
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.25, 4));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    const onWheel = (e) => {
      e.preventDefault();
      setZoom((z) => Math.min(Math.max(z - e.deltaY * 0.001, 0.5), 4));
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [onClose, total]);

  return (
    <motion.div
      className="proj-lightbox fixed inset-0 z-[60] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <div className="proj-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        {total > 1 && !isSmall && (
          <button className="proj-lightbox-btn" onClick={prev}>
            ‹
          </button>
        )}
        <img
          src={slides[idx]}
          alt={`screenshot ${idx + 1}`}
          style={{
            maxWidth: isSmall ? '90vw' : '80vw',
            maxHeight: '80vh',
            objectFit: 'contain',
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s ease',
            cursor: zoom > 1 ? 'zoom-out' : 'zoom-in',
            userSelect: 'none',
          }}
          onClick={() => setZoom((z) => (z >= 2 ? 1 : z + 0.5))}
        />
        {total > 1 && !isSmall && (
          <button className="proj-lightbox-btn" onClick={next}>
            ›
          </button>
        )}
      </div>

      {total > 1 && isSmall && (
        <div
          className="proj-lightbox-small-btns"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="proj-lightbox-btn" onClick={prev}>
            ‹
          </button>
          <button className="proj-lightbox-btn" onClick={next}>
            ›
          </button>
        </div>
      )}

      <div className="proj-lightbox-hint">
        {total > 1 && `${idx + 1} / ${total} · `}scroll or click to zoom · esc
        to close
      </div>
    </motion.div>
  );
}

function Modal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const slides = project.images;
  const total = slides.length;

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

  return (
    <motion.div
      className="proj-modal-overlay fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="proj-modal-box"
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.22 }}
      >
        <button className="proj-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="proj-modal-img-area">
          <div
            className="proj-modal-img-strip"
            style={{ transform: `translateX(-${imgIdx * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide}
                alt={`${project.title} screenshot ${i + 1}`}
                className="proj-modal-slide"
                onClick={() => setLightbox(true)}
              />
            ))}
          </div>
          <button
            className="proj-modal-nav-btn prev"
            onClick={() => setImgIdx((imgIdx - 1 + total) % total)}
          >
            ‹
          </button>
          <button
            className="proj-modal-nav-btn next"
            onClick={() => setImgIdx((imgIdx + 1) % total)}
          >
            ›
          </button>
          <div className="proj-modal-counter">
            {imgIdx + 1} / {total}
          </div>
          <div className="proj-modal-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                className="proj-modal-dot"
                onClick={() => setImgIdx(i)}
                style={{
                  background:
                    i === imgIdx ? '#52D96A' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="proj-modal-body">
          <div className="proj-modal-title">{project.title}</div>
          <div className="proj-modal-sub">{project.sub}</div>

          <ModalSectionLabel>Overview</ModalSectionLabel>
          <p className="proj-modal-overview">{project.overview}</p>

          <ModalSectionLabel>What I Built</ModalSectionLabel>
          <div className="proj-modal-bullets">
            {project.bullets.map((b, i) => (
              <div key={i} className="proj-modal-bullet">
                <div className="proj-modal-bullet-dot" />
                <span className="proj-modal-bullet-text">{b}</span>
              </div>
            ))}
          </div>

          <ModalSectionLabel>Tech Stack</ModalSectionLabel>
          <div className="proj-modal-stack">
            {project.stack.map((s) => (
              <div key={s.name} className="proj-modal-stack-item">
                <div
                  className="proj-modal-stack-ico"
                  style={{ background: s.bg, color: s.fg }}
                >
                  {s.ico}
                </div>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            slides={slides}
            idx={imgIdx}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const ProjectCard = forwardRef(({ project, onClick }, ref) => (
  <div ref={ref} className="proj-card" onClick={onClick}>
    <div className="proj-card-thumb">
      <span className="proj-card-emoji">{project.emoji}</span>
    </div>
    <div className="proj-card-body">
      <div className="proj-card-title">{project.title}</div>
      <div className="proj-card-desc">{project.cardDesc}</div>
      <div className="proj-card-footer">
        <div className="proj-card-tags">
          {project.cardTags.map((tag) => {
            const pill = pillByName[tag];
            if (!pill) return null;
            return (
              <div key={tag} className="pill proj-card-pill">
                <div
                  className="proj-card-pill-ico"
                  style={{ background: pill.bg, color: pill.color }}
                >
                  {pill.ico}
                </div>
                {pill.name}
              </div>
            );
          })}
        </div>
        <span className="proj-card-view">View →</span>
      </div>
    </div>
  </div>
));

export default function Projects() {
  const [activeCard, setActiveCard] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const cardRefs = useRef([]);

  function goTo(idx) {
    const clamped = Math.max(0, Math.min(projects.length - 1, idx));
    setActiveCard(clamped);
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  return (
    <section className="proj-section relative w-full flex flex-col items-center justify-start overflow-hidden">
      <GeoTopLeft />
      <GeoBottomRight />
      <motion.div
        className="proj-header text-center relative z-10 w-full"
        {...fadeUp(0.1)}
      >
        <p className="proj-label font-bold uppercase">03. &nbsp;Projects</p>
        <h2 className="proj-h2 text-white">What I've Built.</h2>
        <motion.div className="proj-header-bar" {...barGrow(40, 0.25)} />
      </motion.div>

      <motion.div
        className="proj-carousel-wrapper relative z-10 w-full"
        {...fadeUp(0.2)}
      >
        <div className="proj-carousel-track">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {projects.length > 3 && (
          <div className="proj-carousel-nav">
            <button
              className="proj-nav-btn"
              onClick={() => goTo(activeCard - 1)}
            >
              ←
            </button>

            <div className="proj-dots">
              {projects.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    height: 6,
                    borderRadius: 3,
                    width: i === activeCard ? 20 : 6,
                    background:
                      i === activeCard ? '#52D96A' : 'rgba(255,255,255,0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>

            <button
              className="proj-nav-btn"
              onClick={() => goTo(activeCard + 1)}
            >
              →
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
