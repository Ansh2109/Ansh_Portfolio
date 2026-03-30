import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';

const REAL_PROJECTS = [
  {
    id: 1, title: 'Round-Off Pay', tag: 'FINTECH APP',
    description: 'A smart payment app that rounds off transactions and auto-saves the spare change. Features QR scanning, savings wallet, bank integration, and real-time balance tracking.',
    tech: ['React', 'Node.js', 'QR-Code', 'Auth'],
    link: 'https://github.com/Ansh2109', color: '#00f3ff', stars: 42, status: 'LIVE',
  },
  {
    id: 2, title: 'ANTI-GRAVITY AI', tag: 'AI SYSTEM',
    description: 'Autonomous Multi-Variate Intelligence System with dynamic real-time learning, holistic data ingestion, and automated instant execution. Built for mission-critical applications.',
    tech: ['Python', 'ML', 'FastAPI', 'Docker'],
    link: 'https://github.com/Ansh2109', color: '#bf00ff', stars: 87, status: 'ACTIVE',
  },
  {
    id: 3, title: 'Space Portfolio V4', tag: 'CREATIVE / 3D',
    description: 'This very portfolio — a hyper-creative 3D space-cyber experience built with React Three Fiber, Framer Motion, and advanced GLSL shaders for an immersive user journey.',
    tech: ['React', 'Three.js', 'GLSL', 'Framer'],
    link: 'https://github.com/Ansh2109', color: '#00ffcc', stars: 56, status: 'LIVE',
  },
  {
    id: 4, title: 'NetScan Pro', tag: 'CYBER-SEC TOOL',
    description: 'Advanced network scanning and vulnerability assessment CLI tool. Automates port scanning, service enumeration, and generates executive-level security reports.',
    tech: ['Python', 'Scapy', 'NMap', 'SQLite'],
    link: 'https://github.com/Ansh2109', color: '#ff00aa', stars: 31, status: 'BETA',
  },
  {
    id: 5, title: 'NADCINE Redesign', tag: 'UI/UX',
    description: "Netflix-inspired streaming platform redesign with real movie data integration, poster APIs, complete auth flow, and a fully responsive layout matching Netflix's design language.",
    tech: ['React', 'API', 'CSS', 'Auth'],
    link: 'https://github.com/Ansh2109', color: '#ffaa00', stars: 23, status: 'DONE',
  },
];

const statusColors = { LIVE: '#00f3ff', ACTIVE: '#00ffcc', BETA: '#ffaa00', DONE: '#bf00ff' };

const ProjectCard = ({ project, index, isActive, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, type: 'spring', stiffness: 80 }}
    onClick={onClick}
    className="relative p-4 sm:p-5 border backdrop-blur-xl cursor-none group overflow-hidden"
    style={{
      backgroundColor: isActive ? project.color + '10' : 'rgba(0,0,0,0.6)',
      borderColor: isActive ? project.color : project.color + '25',
      boxShadow: isActive ? `0 0 40px ${project.color}30` : 'none',
    }}
    whileHover={{ scale: 1.02, y: -4 }}
  >
    <div className="absolute top-0 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500 origin-left"
         style={{ backgroundColor: project.color }} />

    <div className="flex items-start justify-between mb-3">
      <div className="flex-1 min-w-0 pr-2">
        <div className="text-[7px] sm:text-[8px] font-mono tracking-[0.4em] mb-1 font-black"
             style={{ color: project.color }}>
          {project.tag}
        </div>
        <h3 className="text-white font-black font-orbitron text-[11px] sm:text-sm tracking-wide leading-tight">
          {project.title}
        </h3>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" />
          <span className="text-[8px] sm:text-[9px] text-white/40 font-mono">{project.stars}</span>
        </div>
        <div className="px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8px] font-black font-mono tracking-widest border"
             style={{ color: statusColors[project.status], borderColor: statusColors[project.status] + '60',
                      backgroundColor: statusColors[project.status] + '15' }}>
          {project.status}
        </div>
      </div>
    </div>

    <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed font-mono mb-3 sm:mb-4">
      {project.description}
    </p>

    <div className="flex items-center justify-between">
      <div className="flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span key={t} className="px-1.5 sm:px-2 py-0.5 text-[7px] sm:text-[8px] font-mono font-black tracking-widest"
                style={{ backgroundColor: project.color + '10', color: project.color + 'cc',
                         border: `1px solid ${project.color}30` }}>
            {t}
          </span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noopener noreferrer"
         className="flex items-center gap-1 text-[8px] sm:text-[9px] font-black font-mono tracking-widest
                    hover:drop-shadow-[0_0_8px_currentColor] transition-all flex-shrink-0 ml-2"
         style={{ color: project.color }}
         onClick={(e) => e.stopPropagation()}>
        <Github className="w-3 h-3" />
        <ArrowRight className="w-3 h-3" />
      </a>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden px-4 sm:px-6 py-4 pt-20 sm:pt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[400px] sm:w-[800px] h-[300px] sm:h-[500px] rounded-full blur-[180px] pointer-events-none
                      bg-[radial-gradient(circle,rgba(191,0,255,0.06),transparent)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-4 sm:mb-6 z-10 w-full relative flex-shrink-0"
      >
        <div className="relative flex items-center justify-center gap-4 sm:gap-8 pt-2">
          <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#bf00ff]" />
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.5em] sm:tracking-[1em] uppercase font-black text-[#bf00ff]
                           drop-shadow-[0_0_10px_#bf00ff]">
            PROJECT_REGISTRY // ACCESS_GRANTED
          </span>
          <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#bf00ff]" />
        </div>
        <p className="text-[8px] sm:text-[9px] text-white/30 tracking-[0.3em] sm:tracking-[0.4em] uppercase font-mono mt-2">
          5 Operational Assets — Real Deployments
        </p>
      </motion.div>

      {/* Projects grid — 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-y-auto"
           style={{ maxHeight: '75vh' }}>
        {REAL_PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isActive={activeId === project.id}
            onClick={() => setActiveId(activeId === project.id ? null : project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
