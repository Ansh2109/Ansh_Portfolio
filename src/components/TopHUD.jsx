import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavItems = [
  { label: 'Home',     id: 'home',     color: '#00f3ff' },
  { label: 'About',    id: 'about',    color: '#bf00ff' },
  { label: 'Skills',   id: 'skills',   color: '#00ffcc' },
  { label: 'Projects', id: 'projects', color: '#ff00aa' },
  { label: 'Contact',  id: 'contact',  color: '#ffaa00' },
];

const TopHUD = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const target = document.getElementById(id);
    if (scrollContainer && target) {
      scrollContainer.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[40] pointer-events-none font-mono">
      {/* HUD Backdrop */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

      {/* ── Desktop nav (hidden on mobile) ── */}
      <div className="hidden md:flex w-full px-6 py-4 justify-end items-start relative z-10">
        {/* Offset so it doesn't overlap the OrbitNavbar (≈248px wide from left) */}
        <motion.div
          className="flex items-center gap-4 lg:gap-6 pointer-events-auto bg-black/50
                     backdrop-blur-xl px-5 lg:px-8 py-3 border border-white/10
                     shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {NavItems.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-[10px] text-white/50 tracking-[0.4em] uppercase transition-all
                         font-black border-b border-transparent px-2 py-1 pointer-events-auto"
              style={{ cursor: 'none' }}
              whileHover={{
                y: -2,
                color: item.color,
                borderBottomColor: item.color,
                textShadow: `0 0 12px ${item.color}`,
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <span className="mr-1 opacity-40">/</span>
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ── Mobile Hamburger Button (visible only on mobile) ── */}
      <div className="md:hidden absolute top-4 right-4 z-50 pointer-events-auto">
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-10 h-10 border border-[#00f3ff]/40
                     bg-black/70 backdrop-blur-xl"
          style={{ cursor: 'none' }}
          whileHover={{ scale: 1.1, borderColor: '#00f3ff' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {menuOpen
            ? <X className="w-5 h-5 text-[#00f3ff]" />
            : <Menu className="w-5 h-5 text-[#00f3ff]" />
          }
        </motion.button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 right-4 z-50 pointer-events-auto
                       bg-black/90 backdrop-blur-xl border border-[#00f3ff]/20
                       shadow-[0_0_30px_rgba(0,243,255,0.15)]"
          >
            {NavItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="block w-full text-left px-8 py-3 text-[11px] font-black
                           font-mono tracking-[0.4em] uppercase text-white/50
                           border-b border-white/5 last:border-0 transition-colors"
                style={{ cursor: 'none' }}
                whileHover={{ color: item.color, backgroundColor: item.color + '10' }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <span className="opacity-40 mr-2">/</span>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Status Bar (desktop only, starts after orbit nav) ── */}
      <div className="hidden md:block absolute top-[68px] left-0 px-6 pointer-events-none">
        <div className="ml-[248px] flex items-center gap-4 bg-black/40 backdrop-blur-lg
                        px-4 py-1.5 border-l-2 border-[#00f3ff]/40 inline-flex">
          <div className="w-2 h-2 rounded-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff] animate-pulse" />
          <span className="text-[9px] text-white/60 tracking-[0.4em] uppercase font-black">
            SYSTEM_ONLINE
            <span className="text-[#00f3ff]/80 ml-3">// SECURE_CHANNEL</span>
          </span>
          <span className="text-[9px] text-[#00f3ff]/50 tracking-[0.3em] uppercase font-black animate-pulse">
            SCANNING...
          </span>
        </div>
      </div>

      {/* Decorative vertical line (desktop only) */}
      <div className="hidden md:block absolute top-0 right-[28%] opacity-15 pointer-events-none">
        <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-[#bf00ff] to-transparent" />
      </div>
    </div>
  );
};

export default TopHUD;
