import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillGroups } from '../data/skills';
import { fadeUp, geoIn, barGrow } from '../utils/animations';
import { Green } from './Hero';
import aboutMe1 from '../assets/about_me/about_me_1.jpeg';
import aboutMe2 from '../assets/about_me/about_me_2.JPG';
import '../styles/About.css';

const ABOUT_PHOTOS = [aboutMe1, aboutMe2];

function PhotoSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % ABOUT_PHOTOS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-photo">
      <AnimatePresence>
        <motion.img
          key={idx}
          src={ABOUT_PHOTOS[idx]}
          alt={`About me ${idx + 1}`}
          className="about-photo-img"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="about-photo-tint" />
    </div>
  );
}

function GeoTopLeft() {
  return (
    <motion.div
      className="absolute left-0 top-0 overflow-hidden pointer-events-none"
      style={{ width: 'var(--geo-size)', height: 'var(--geo-size)' }}
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="ab_tl">
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle cx="0" cy="0" r="108" fill="#3a7ab5" clipPath="url(#ab_tl)" />
        <circle cx="0" cy="0" r="76" fill="#52D96A" clipPath="url(#ab_tl)" />
        <circle cx="0" cy="0" r="46" fill="#2e6fa3" clipPath="url(#ab_tl)" />
      </svg>
    </motion.div>
  );
}

function GeoBottomRight() {
  return (
    <motion.div
      className="absolute right-0 overflow-hidden pointer-events-none about-geo-br"
      {...geoIn}
    >
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id="ab_bra">
          <rect x="59" y="59" width="59" height="59" />
        </clipPath>
        <circle cx="59" cy="59" r="54" fill="#2e6fa3" clipPath="url(#ab_bra)" />
        <clipPath id="ab_brb">
          <rect x="0" y="59" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="118"
          r="50"
          fill="#52D96A"
          clipPath="url(#ab_brb)"
        />
      </svg>
    </motion.div>
  );
}

function Pill({ pill, ai }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`pill${ai ? ' pill-ai' : ''}`}
      style={
        hovered
          ? { background: pill.bg, borderColor: pill.bg, color: pill.color }
          : undefined
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="about-pill-ico"
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

export default function About() {
  return (
    <section
      id="about"
      className="about-section relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <GeoTopLeft />
      <GeoBottomRight />
      <motion.div
        className="about-card relative z-10 flex w-full"
        {...fadeUp(0.1)}
      >
        <PhotoSlideshow />

        <div className="about-content">
          <motion.p
            className="about-label font-bold uppercase"
            {...fadeUp(0.18)}
          >
            01. &nbsp;About Me
          </motion.p>

          <motion.h2 className="about-h2 text-white" {...fadeUp(0.22)}>
            A bit about me.
          </motion.h2>

          <motion.div className="about-bar" {...barGrow(56, 0.3)} />

          <motion.p className="about-body" {...fadeUp(0.34)}>
            Hello! I am a <Green>Full Stack Software Engineer</Green> with
            hands-on experience building production web applications across the
            fintech and renewable energy space. I have built{' '}
            <span className="about-bold">
              third-party integrations, risk mitigation features, and workflow
              automations
            </span>
            .
          </motion.p>

          <motion.p className="about-body" {...fadeUp(0.4)}>
            I thrive under <Green>ownership</Green> — meaning when my name is
            attached, I take it personally and it drives me to deliver my best
            work. Outside of work, I enjoy running and supporting my favorite
            football team Everton from across the pond.
          </motion.p>

          <motion.p className="about-body" {...fadeUp(0.4)}>
            I'm <Green>actively seeking</Green> my next full stack role, open to
            opportunities in New York or Remote.
          </motion.p>
        </div>
      </motion.div>

      <div className="about-skills-wrapper relative z-10 w-full">
        <motion.div
          className="about-skills-header text-center"
          {...fadeUp(0.42)}
        >
          <h3 className="about-h3 text-white">Technologies</h3>
          <motion.div className="about-tech-bar" {...barGrow(40, 0.5)} />
        </motion.div>

        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            className="about-skill-group"
            {...fadeUp(0.44 + gi * 0.07)}
          >
            <p className="about-skill-label">{group.label}</p>
            <div className="about-pills">
              {group.pills.map((pill) => (
                <Pill key={pill.name} pill={pill} ai={group.ai} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
