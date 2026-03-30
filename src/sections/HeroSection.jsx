import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Cyberpunk space typewriter effect
const TypeWriter = ({ text, delay = 0 }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(iv);
      }, 60);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return <span>{displayed}<span className="animate-pulse text-[#00f3ff]">_</span></span>;
};

const HeroSection = () => {
  const handleInitiate = () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const el = document.getElementById('projects');
    if (scrollContainer && el) scrollContainer.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  };

  const handleViewAssets = () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const el = document.getElementById('skills');
    if (scrollContainer && el) scrollContainer.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden bg-transparent">
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 border border-[#00f3ff]/30 bg-[#00f3ff]/5
                     flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse shadow-[0_0_8px_#00f3ff]" />
          <span className="text-[8px] sm:text-[9px] text-[#00f3ff] tracking-[0.4em] sm:tracking-[0.6em] uppercase font-black font-mono">
            SYSTEM.ONLINE // PORTFOLIO_V4
          </span>
        </motion.div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-20 sm:w-32 h-[2px] mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-[#00f3ff] via-white to-[#bf00ff]
                     shadow-[0_0_20px_rgba(0,243,255,0.6)]"
        />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-black tracking-tighter
                     font-orbitron relative text-white leading-none mb-4"
          style={{ textShadow: '0 0 60px rgba(0,243,255,0.2), 0 0 120px rgba(191,0,255,0.1)' }}
        >
          ANSH PATEL
        </motion.h1>

        {/* Role line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-5 sm:mb-6 text-sm sm:text-base md:text-xl font-black font-orbitron tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          style={{ background: 'linear-gradient(90deg,#00f3ff,#bf00ff,#00ffcc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Full-Stack Dev // Cyber-Sec // 3D Engineer
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-[#00f3ff]/70 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em]
                     uppercase max-w-xl leading-relaxed mb-10 sm:mb-12 px-2"
        >
          <TypeWriter text="Building digital fortresses across the cosmos..." delay={1300} />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 w-full px-4"
        >
          <motion.button
            onClick={handleInitiate}
            className="relative px-6 sm:px-10 py-3 sm:py-4 border-2 border-[#00f3ff] text-[#00f3ff]
                       font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs cursor-none
                       overflow-hidden group transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: '0 0 20px rgba(0,243,255,0.15)' }}
          >
            <span className="absolute inset-0 bg-[#00f3ff] scale-x-0 group-hover:scale-x-100
                             origin-left transition-transform duration-300 z-0" />
            <span className="relative z-10 group-hover:text-black transition-colors">
              ⚡ Initiate_Project
            </span>
          </motion.button>

          <motion.button
            onClick={handleViewAssets}
            className="relative px-6 sm:px-10 py-3 sm:py-4 border-2 border-[#bf00ff]/60 text-[#bf00ff]/70
                       font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs cursor-none
                       overflow-hidden group transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: '0 0 20px rgba(191,0,255,0.1)' }}
          >
            <span className="absolute inset-0 bg-[#bf00ff] scale-x-0 group-hover:scale-x-100
                             origin-left transition-transform duration-300 z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors">
              🪐 View_Assets
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[7px] sm:text-[8px] text-white/20 tracking-[0.4em] sm:tracking-[0.5em] uppercase font-mono font-black">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-[#00f3ff]/40 to-transparent"
          />
        </motion.div>
      </div>

      {/* CORNER BRACKETS — hidden on very small screens */}
      <div className="hidden sm:block absolute top-20 left-6 sm:left-12 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-l-2 border-[#00f3ff]/30" />
      <div className="hidden sm:block absolute top-20 right-6 sm:right-12 w-10 sm:w-14 h-10 sm:h-14 border-t-2 border-r-2 border-[#bf00ff]/30" />
      <div className="hidden sm:block absolute bottom-12 left-6 sm:left-12 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-l-2 border-[#bf00ff]/30" />
      <div className="hidden sm:block absolute bottom-12 right-6 sm:right-12 w-10 sm:w-14 h-10 sm:h-14 border-b-2 border-r-2 border-[#00f3ff]/30" />

      {/* Side data lines */}
      <div className="hidden md:block absolute top-1/2 left-6 -translate-y-1/2 w-[1px] h-40
                      bg-gradient-to-b from-transparent via-[#00f3ff]/15 to-transparent" />
      <div className="hidden md:block absolute top-1/2 right-6 -translate-y-1/2 w-[1px] h-40
                      bg-gradient-to-b from-transparent via-[#bf00ff]/15 to-transparent" />
    </div>
  );
};

export default HeroSection;
