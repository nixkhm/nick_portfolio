import { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pillByName } from '../data/skills';
import { fadeUp, barGrow } from '../utils/animations';
import { projects } from '../data/projects';
import { GITHUB_URL } from '../utils/constants';
import { GeoTripleTL, GeoDuoLower } from './GeoShapes';
import '../styles/geo.css';
import '../styles/Projects.css';

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

function Modal({
  project,
  onClose,
  onPrev,
  onNext,
  selectedIndex,
  total: projectTotal,
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const slides = project.images;
  const total = slides.length;

  useEffect(() => {
    setImgIdx(0);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && !lightbox) onPrev();
      if (e.key === 'ArrowRight' && !lightbox) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext, lightbox]);

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
      <button
        className="proj-seek-btn proj-seek-prev"
        onClick={onPrev}
        aria-label="Previous project"
      >
        ‹
      </button>
      <button
        className="proj-seek-btn proj-seek-next"
        onClick={onNext}
        aria-label="Next project"
      >
        ›
      </button>

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
          <div className="proj-modal-title">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-modal-title-link"
              >
                {project.title}
                <svg
                  className="proj-modal-title-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : (
              project.title
            )}
          </div>
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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const cardRefs = useRef([]);

  const selectedProject =
    selectedIndex !== null ? projects[selectedIndex] : null;

  function openProject(i) {
    setSelectedIndex(i);
  }

  function closeProject() {
    setSelectedIndex(null);
  }

  function prevProject() {
    setSelectedIndex((i) => (i - 1 + projects.length) % projects.length);
  }

  function nextProject() {
    setSelectedIndex((i) => (i + 1) % projects.length);
  }

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
      <GeoTripleTL className="geo-tl" />
      <GeoDuoLower className="geo-br" />
      <motion.div
        className="proj-header text-center relative z-10 w-full"
        {...fadeUp(0.1)}
      >
        <p className="proj-label font-bold uppercase">03. &nbsp;Projects</p>
        <h2 className="proj-h2 text-white">What I've Built.</h2>
        <motion.div className="proj-header-bar" {...barGrow(40, 0.25)} />
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-github-link"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="proj-github-icon"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          View on GitHub
        </a>
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
              onClick={() => openProject(i)}
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
            onClose={closeProject}
            onPrev={prevProject}
            onNext={nextProject}
            selectedIndex={selectedIndex}
            total={projects.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
