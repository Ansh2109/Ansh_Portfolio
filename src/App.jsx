import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Experience from './components/Experience';
import SplashScene from './components/SplashScene';
import OrbitNavbar from './components/OrbitNavbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import CustomCursor from './components/CustomCursor';
import SoundToggle from './components/SoundToggle';
import TopHUD from './components/TopHUD';

// ── Intro Overlay ─────────────────────────────────────────────────────────────
const IntroOverlay = ({ onEnter }) => {
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => setPulse((p) => !p), 700);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      onClick={onEnter}
      onKeyDown={(e) => e.key === 'Enter' && onEnter()}
      tabIndex={0}
      style={{
        position: 'fixed', inset: 0, zIndex: 20,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'auto',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,4,0.6) 100%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{ textAlign: 'center', fontFamily: 'monospace', position: 'relative', zIndex: 1, padding: '0 20px' }}
      >
        <div style={{ fontSize: 'clamp(7px, 1.5vw, 10px)', letterSpacing: '0.7em', color: 'rgba(0,243,255,0.5)', marginBottom: 20, textTransform: 'uppercase', fontWeight: 900 }}>
          SYSTEM_BOOT // V4.0 INITIALIZED
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 9vw, 7rem)', fontFamily: "'Orbitron', monospace",
          fontWeight: 900, color: 'white', letterSpacing: '-0.02em',
          margin: 0, lineHeight: 1,
          textShadow: '0 0 80px rgba(0,243,255,0.3), 0 0 160px rgba(191,0,255,0.15)',
        }}>
          ANSH PATEL
        </h1>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          style={{
            height: 2, margin: '20px auto', width: 'clamp(160px, 40vw, 300px)',
            background: 'linear-gradient(90deg, transparent, #00f3ff, #bf00ff, transparent)',
            boxShadow: '0 0 20px rgba(0,243,255,0.6)',
          }}
        />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(0.5rem, 2vw, 0.85rem)',
            background: 'linear-gradient(90deg, #00f3ff, #bf00ff, #00ffcc)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 900,
            margin: '0 0 36px',
          }}
        >
          Full-Stack Dev // Cyber-Sec // 3D Engineer
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <motion.div
            animate={{ boxShadow: pulse ? '0 0 28px rgba(0,243,255,0.6)' : '0 0 8px rgba(0,243,255,0.15)' }}
            style={{
              padding: 'clamp(10px,2vw,14px) clamp(24px,5vw,48px)',
              border: '2px solid #00f3ff', color: '#00f3ff',
              fontSize: 'clamp(8px, 1.5vw, 11px)', fontWeight: 900,
              letterSpacing: '0.5em', textTransform: 'uppercase',
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
              transition: 'box-shadow 0.4s',
            }}
          >[ CLICK TO INITIATE ]</motion.div>
          <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
            or press any key
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [intro, setIntro] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionIndex = Math.round(scrollProgress * 5);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - clientHeight <= 0) return;
    setScrollProgress(scrollTop / (scrollHeight - clientHeight));
  };

  useEffect(() => {
    if (!intro) return;
    const fn = () => setIntro(false);
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [intro]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000004', fontFamily: 'monospace' }}>
      <CustomCursor />

      {/* ── ALWAYS-VISIBLE 3D BACKGROUND — renders on load, stays throughout */}
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 22], fov: 50, near: 0.1, far: 1000 }}
          style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        >
          {/* Show SplashScene during intro, Experience after */}
          {intro ? <SplashScene /> : <Experience scrollProgress={scrollProgress} />}
        </Canvas>
      </Suspense>

      {/* ── INTRO overlay (text/button only, 3D is behind it) */}
      <AnimatePresence>
        {intro && (
          <motion.div key="intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }} style={{ position: 'fixed', inset: 0, zIndex: 50 }}
          >
            <IntroOverlay onEnter={() => setIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PORTFOLIO UI (fixed elements + scrollable sections) */}
      <AnimatePresence>
        {!intro && (
          <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1 }} style={{ position: 'absolute', inset: 0 }}
          >
            <SoundToggle />

            {/* Fixed UI elements — OUTSIDE scroll container */}
            <TopHUD scrollProgress={scrollProgress} />
            <OrbitNavbar />

            {/* Scrollable sections */}
            <div
              onScroll={handleScroll}
              data-scroll-container="true"
              style={{
                position: 'relative', zIndex: 10,
                width: '100%', height: '100%',
                overflowY: 'auto', overflowX: 'hidden',
                scrollSnapType: 'y mandatory', scrollBehavior: 'smooth',
              }}
            >
              <section id="home"     style={{ scrollSnapAlign: 'start', width: '100%', minHeight: '100vh' }}><HeroSection /></section>
              <section id="about"    style={{ scrollSnapAlign: 'start', width: '100%', minHeight: '100vh' }}><AboutSection /></section>
              <section id="skills"   style={{ scrollSnapAlign: 'start', width: '100%', minHeight: '100vh' }}><SkillsSection /></section>
              <section id="projects" style={{ scrollSnapAlign: 'start', width: '100%', minHeight: '100vh' }}><ProjectsSection /></section>
              <section id="contact"  style={{ scrollSnapAlign: 'start', width: '100%', minHeight: '100vh' }}><ContactSection /></section>
              <section id="footer"   style={{ scrollSnapAlign: 'start', width: '100%', minHeight: '100vh' }}><FooterSection /></section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Loader />
    </div>
  );
}

export default App;
