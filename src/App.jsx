import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function SectionDivider({ id }) {
  return (
    <div
      id={id}
      style={{
        backgroundColor: '#5B9BD8',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(32px, 8vw, 96px)',
        gap: 14,
      }}
    >
      <div
        style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }}
      />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
          }}
        />
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#52D96A',
          }}
        />
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
          }}
        />
      </div>
      <div
        style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <About />
      <SectionDivider id="experience" />
      <Experience />
      <SectionDivider id="projects" />
      <Projects />
      <SectionDivider id="contact" />
      <Contact />
    </>
  );
}
