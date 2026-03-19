import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pillByName } from '../data/skills';
import { fadeUp, barGrow } from '../utils/animations';
import { experiences } from '../data/experiences';
import { GeoDuoUpper, GeoTripleBR } from './GeoShapes';
import '../styles/geo.css';
import '../styles/Experience.css';

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
      <GeoDuoUpper className="geo-tl" />
      <GeoTripleBR className="geo-br" />
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
