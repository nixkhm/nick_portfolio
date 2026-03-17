import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pillByName } from '../data/skills';
import { fadeUp, geoIn, barGrow } from '../utils/animations';
import { experiences } from '../data/experiences';
import '../styles/Experience.css';

function GeoTopRight() {
  return (
    <motion.div
      className="exp-geo-tl absolute left-0 overflow-hidden pointer-events-none"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="exp_tla">
          <rect x="0" y="0" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="59"
          r="54"
          fill="#2e6fa3"
          clipPath="url(#exp_tla)"
        />
        <clipPath id="exp_tlb">
          <rect x="59" y="0" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="0" r="50" fill="#52D96A" clipPath="url(#exp_tlb)" />
      </svg>
    </motion.div>
  );
}

function GeoBottomRight() {
  return (
    <motion.div
      className="exp-geo-br absolute right-0 overflow-hidden pointer-events-none"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="exp_br">
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle
          cx="118"
          cy="118"
          r="108"
          fill="#3a7ab5"
          clipPath="url(#exp_br)"
        />
        <circle
          cx="118"
          cy="118"
          r="76"
          fill="#52D96A"
          clipPath="url(#exp_br)"
        />
        <circle
          cx="118"
          cy="118"
          r="46"
          fill="#2e6fa3"
          clipPath="url(#exp_br)"
        />
      </svg>
    </motion.div>
  );
}

function ExperiencePill({ pill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="pill exp-pill-sm"
      style={
        hovered
          ? { background: pill.bg, borderColor: pill.bg, color: pill.color }
          : undefined
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="exp-pill-ico"
        style={{
          background: hovered ? 'rgba(255,255,255,0.18)' : pill.bg,
          color: pill.color,
        }}
      >
        {pill.ico}
      </div>
      {pill.name}
    </div>
  );
}

export default function Experience() {
  const [active, setActive] = useState('assoc');
  const activeExp = experiences.find((e) => e.id === active);

  return (
    <section className="exp-section relative w-full flex flex-col items-center justify-start overflow-hidden">
      <GeoTopRight />
      <GeoBottomRight />
      <motion.div
        className="exp-header text-center relative z-10"
        {...fadeUp(0.1)}
      >
        <p className="exp-label font-bold uppercase">
          02. &nbsp; My Experience
        </p>
        <h2 className="exp-h2 text-white">Where I've worked.</h2>
        <motion.div className="exp-header-bar" {...barGrow(40, 0.25)} />
      </motion.div>

      <motion.div
        className="exp-card relative z-10 w-full flex overflow-hidden"
        {...fadeUp(0.2)}
      >
        {/* Left timeline nav */}
        <div className="exp-nav">
          <div className="exp-nav-inner">
            <div className="exp-timeline-line" />
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="exp-nav-item"
                onClick={() => setActive(exp.id)}
              >
                <div
                  className={`exp-nav-dot${active === exp.id ? ' is-active' : ''}`}
                />
                <div>
                  <div
                    className={`exp-nav-company${active === exp.id ? ' is-active' : ''}`}
                  >
                    {exp.company}
                  </div>
                  <div
                    className={`exp-nav-role${active === exp.id ? ' is-active' : ''}`}
                  >
                    {exp.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="exp-edu">
            <div className="exp-edu-label">Education</div>
            <div className="exp-edu-school">St. John's University</div>
            <div className="exp-edu-degree">B.S. Computer Science · 2024</div>
            <div className="exp-edu-gpa">3.88 GPA</div>
          </div>
        </div>

        {/* Right content panel */}
        <div className="exp-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="exp-content-company">{activeExp.company}</div>
              <div className="exp-content-role text-white">
                {activeExp.role}
              </div>
              <div className="exp-content-date">{activeExp.date}</div>
              {activeExp.bullets.map((bullet, i) => (
                <div key={i} className="exp-bullet">
                  <span className="exp-bullet-arrow">▶</span>
                  <span className="exp-bullet-text">{bullet}</span>
                </div>
              ))}
              {activeExp.tags.length > 0 && (
                <div className="exp-tags-label">Relevant Technologies</div>
              )}
              <div className="exp-tags">
                {activeExp.tags.map((tag) => {
                  const pill = pillByName[tag];
                  return pill ? <ExperiencePill key={tag} pill={pill} /> : null;
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
