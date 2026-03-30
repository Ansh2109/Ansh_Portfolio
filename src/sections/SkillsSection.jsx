import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Shield, Cloud, Cpu, GitBranch, Globe, Zap, Lock, Server, Database } from 'lucide-react';

const SKILLS = [
  { name: 'React / Next.js', icon: Code2,    level: 95, color: '#00f3ff', cat: 'FRONTEND' },
  { name: 'Three.js / WebGL', icon: Zap,     level: 88, color: '#00ffcc', cat: 'FRONTEND' },
  { name: 'TypeScript',       icon: Code2,   level: 92, color: '#00f3ff', cat: 'FRONTEND' },
  { name: 'Node.js / Express', icon: Server, level: 90, color: '#bf00ff', cat: 'BACKEND' },
  { name: 'Cyber Security',   icon: Shield,  level: 85, color: '#ff00aa', cat: 'SECURITY' },
  { name: 'Penetration Test', icon: Lock,    level: 80, color: '#ff00aa', cat: 'SECURITY' },
  { name: 'AWS / Cloud Infra', icon: Cloud,  level: 82, color: '#ffaa00', cat: 'CLOUD' },
  { name: 'Docker / K8s',     icon: Database,level: 78, color: '#ffaa00', cat: 'DEVOPS' },
  { name: 'CI/CD Pipelines',  icon: GitBranch,level:80, color: '#bf00ff', cat: 'DEVOPS' },
  { name: 'API Architecture', icon: Globe,   level: 93, color: '#00f3ff', cat: 'BACKEND' },
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, type: 'spring', stiffness: 100 }}
    className="relative p-4 sm:p-5 bg-black/60 border backdrop-blur-xl group cursor-none overflow-hidden"
    style={{ borderColor: skill.color + '30' }}
    whileHover={{ scale: 1.04, borderColor: skill.color }}
  >
    {/* Scanline hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-b from-transparent via-white/3 to-transparent pointer-events-none" />
    {/* Corner bracket */}
    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r opacity-40 transition-opacity group-hover:opacity-100"
         style={{ borderColor: skill.color }} />

    <div className="flex items-start gap-3 mb-3 sm:mb-4">
      <div className="p-1.5 sm:p-2 rounded-none flex-shrink-0" style={{ backgroundColor: skill.color + '15', border: `1px solid ${skill.color}40` }}>
        <skill.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: skill.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[7px] sm:text-[8px] font-mono tracking-[0.4em] mb-1 opacity-60" style={{ color: skill.color }}>
          {skill.cat}
        </div>
        <h4 className="text-white font-black font-mono text-[10px] sm:text-[11px] tracking-wide leading-tight truncate">
          {skill.name}
        </h4>
      </div>
    </div>

    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full relative"
        style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
      />
    </div>
    <div className="mt-2 flex justify-between items-center">
      <span className="text-[7px] sm:text-[8px] font-mono text-white/20 tracking-widest">PROFICIENCY</span>
      <span className="text-[9px] sm:text-[10px] font-black font-mono" style={{ color: skill.color }}>
        {skill.level}%
      </span>
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-auto bg-transparent px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none
                      bg-[radial-gradient(#00f3ff_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full blur-[150px] pointer-events-none
                      bg-[radial-gradient(circle,rgba(0,243,255,0.06),rgba(191,0,255,0.04),transparent)]" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8 z-10 w-full relative"
      >
        <div className="relative flex items-center justify-center gap-4 sm:gap-8 mt-2">
          <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#00f3ff]" />
          <div className="text-center">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.5em] sm:tracking-[1em] uppercase font-black text-[#00f3ff]
                             drop-shadow-[0_0_10px_#00f3ff]">
              NEURAL_STACK // COMBAT_READY
            </span>
          </div>
          <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#00f3ff]" />
        </div>
        <p className="text-[8px] sm:text-[9px] text-white/30 tracking-[0.3em] sm:tracking-[0.4em] uppercase font-mono mt-3">
          Weapons Grade Technology Arsenal – v4.2 Compiled
        </p>
      </motion.div>

      {/* Skills grid — 2 cols on mobile, 3 on tablet, 5 on desktop */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-6 z-10">
        <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent" />
        <span className="text-[7px] sm:text-[8px] font-mono text-white/15 tracking-[0.6em] sm:tracking-[1em] uppercase font-black">
          GALAXY_NODE_MATRIX
        </span>
        <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#bf00ff]/30 to-transparent" />
      </div>
    </div>
  );
};

export default SkillsSection;
