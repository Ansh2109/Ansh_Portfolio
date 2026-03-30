import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, Briefcase, Mail, Orbit } from 'lucide-react';

const ITEMS = [
  { id: 'home',     icon: Home,      label: 'HOME',     color: '#00f3ff', angle: 270 },
  { id: 'about',    icon: User,      label: 'ABOUT',    color: '#bf00ff', angle: 342 },
  { id: 'skills',   icon: Cpu,       label: 'SKILLS',   color: '#00ffcc', angle: 54  },
  { id: 'projects', icon: Briefcase, label: 'PROJECTS', color: '#ff00aa', angle: 126 },
  { id: 'contact',  icon: Mail,      label: 'CONTACT',  color: '#ffaa00', angle: 198 },
];

// Desktop size
const RADIUS_D = 70;
const HUB_SIZE_D = 52;
const ICON_SIZE_D = 38;
const CONTAINER_D = RADIUS_D * 2 + ICON_SIZE_D + 8;

// Mobile size (smaller)
const RADIUS_M = 48;
const HUB_SIZE_M = 36;
const ICON_SIZE_M = 28;
const CONTAINER_M = RADIUS_M * 2 + ICON_SIZE_M + 8;

const OrbitRing = ({ radius, hub, icon, container }) => {
  const [hovered, setHovered] = useState(null);

  const navigate = (id) => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const target = document.getElementById(id);
    if (scrollContainer && target) {
      scrollContainer.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: container, height: container }}>
      {/* Ring */}
      <div style={{ position: 'absolute', inset: 0, animation: 'orbitSpin 30s linear infinite' }}>
        {ITEMS.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const cx = container / 2 + Math.cos(rad) * radius - icon / 2;
          const cy = container / 2 + Math.sin(rad) * radius - icon / 2;
          const isHovered = hovered === item.id;

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute', left: cx, top: cy,
                width: icon, height: icon,
                animation: 'orbitCounterSpin 30s linear infinite',
              }}
            >
              <motion.a
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); navigate(item.id); }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onTouchStart={() => setHovered(item.id)}
                onTouchEnd={() => setHovered(null)}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '100%', height: '100%', borderRadius: '50%',
                  border: `1.5px solid ${isHovered ? item.color : 'rgba(255,255,255,0.18)'}`,
                  backgroundColor: isHovered ? item.color + '22' : 'rgba(0,0,0,0.65)',
                  boxShadow: isHovered ? `0 0 18px ${item.color}99` : 'none',
                  backdropFilter: 'blur(10px)', cursor: 'none',
                  transition: 'border-color 0.25s, background-color 0.25s, box-shadow 0.25s',
                  textDecoration: 'none',
                }}
              >
                <item.icon
                  style={{
                    width: icon * 0.42, height: icon * 0.42,
                    color: isHovered ? item.color : 'rgba(255,255,255,0.65)',
                    filter: isHovered ? `drop-shadow(0 0 6px ${item.color})` : 'none',
                    transition: 'color 0.25s',
                  }}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: 'absolute', left: '110%', top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#000', color: item.color,
                        border: `1px solid ${item.color}88`,
                        boxShadow: `0 0 10px ${item.color}44`,
                        padding: '2px 8px', fontSize: 9, fontFamily: 'monospace',
                        fontWeight: 900, letterSpacing: '0.3em',
                        whiteSpace: 'nowrap', pointerEvents: 'none',
                        textTransform: 'uppercase', zIndex: 100,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            </div>
          );
        })}
      </div>

      {/* Orbit rings */}
      <div style={{
        position: 'absolute', borderRadius: '50%',
        border: '1px solid rgba(0,243,255,0.1)',
        left: (container - radius * 2) / 2, top: (container - radius * 2) / 2,
        width: radius * 2, height: radius * 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%',
        border: '1px solid rgba(191,0,255,0.06)',
        left: (container - radius * 2 - 14) / 2, top: (container - radius * 2 - 14) / 2,
        width: radius * 2 + 14, height: radius * 2 + 14, pointerEvents: 'none',
      }} />

      {/* Hub */}
      <div style={{
        position: 'absolute',
        left: container / 2 - hub / 2, top: container / 2 - hub / 2,
        width: hub, height: hub, zIndex: 10,
      }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'rgba(0,0,0,0.85)', border: '2px solid rgba(0,243,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(0,243,255,0.25)', backdropFilter: 'blur(16px)',
            cursor: 'none',
          }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
            <Orbit style={{ width: hub * 0.42, height: hub * 0.42, color: '#00f3ff' }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const OrbitNavbar = () => {
  return (
    <>
      {/* Desktop version */}
      <div className="fixed z-50 hidden sm:block" style={{ top: 16, left: 16 }}>
        <OrbitRing
          radius={RADIUS_D} hub={HUB_SIZE_D} icon={ICON_SIZE_D} container={CONTAINER_D}
        />
      </div>
      {/* Mobile version — smaller, bottom-left */}
      <div className="fixed z-50 sm:hidden" style={{ bottom: 20, left: 16 }}>
        <OrbitRing
          radius={RADIUS_M} hub={HUB_SIZE_M} icon={ICON_SIZE_M} container={CONTAINER_M}
        />
      </div>
    </>
  );
};

export default OrbitNavbar;
