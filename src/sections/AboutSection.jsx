import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Zap } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 bg-transparent overflow-auto pt-20 sm:pt-24">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center py-8">
        
        {/* Holographic Avatar Area */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative flex items-center justify-center"
        >
          {/* Animated rings */}
          <div className="absolute inset-0 border border-[#00f3ff]/10 rounded-full animate-ping-slow" />
          <div className="absolute inset-8 border border-[#bf00ff]/20 rounded-full animate-pulse-slow" />

          <div className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 bg-black/80 rounded-none overflow-hidden border border-[#00f3ff]/30 backdrop-blur-3xl group shadow-[0_0_50px_rgba(0,243,255,0.1)]">
            {/* Hologram scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f3ff]/10 to-transparent h-24 animate-scanline" />

            <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center font-mono relative">
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00f3ff]/50" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00f3ff]/50" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00f3ff]/50" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00f3ff]/50" />

              <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#00f3ff]/5 border border-[#00f3ff]/30 mb-4 sm:mb-6 flex items-center justify-center relative overflow-hidden">
                <Cpu className="w-10 h-10 sm:w-14 sm:h-14 text-[#00f3ff] shadow-[0_0_20px_#00f3ff]" />
                <div className="absolute inset-0 bg-[#00f3ff]/5 animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-2 font-orbitron tracking-tight">ANSH_PATEL.SYS</h3>
              <p className="text-[9px] sm:text-[10px] text-[#00f3ff]/80 uppercase tracking-[0.4em] font-black">Access Level: <span className="text-white">Alpha-01</span></p>

              <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-3 sm:w-4 h-1 bg-[#00f3ff] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-[#bf00ff] tracking-[0.3em] font-black">DECRYPTING_CORE...</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6 md:space-y-10"
        >
          <div className="inline-block px-4 sm:px-5 py-2 bg-[#00f3ff]/5 border border-[#00f3ff]/20 rounded-none font-mono">
            <span className="text-[10px] sm:text-xs text-[#00f3ff] tracking-[0.3em] sm:tracking-[0.5em] uppercase font-black">SECURITY_PROTOCOL: AES-256</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white font-orbitron leading-tight drop-shadow-[0_0_20px_rgba(0,243,255,0.2)]">
            Security thru <span className="text-[#00f3ff] italic underline underline-offset-[12px] decoration-[#00f3ff]/30">Innovation_</span>
          </h2>
          <p className="text-white/90 text-base sm:text-xl md:text-2xl leading-relaxed font-mono border-l-4 border-[#bf00ff]/30 pl-5 sm:pl-8 tracking-tighter">
            I build digital fortresses in the vast expanse of the web.
            By merging **Full-Stack Development** with <span className="text-[#00f3ff]">Cyber Security</span> protocols,
            I ensure that every astronomical idea I launch is as secure as it is breathtaking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-12">
            <div className="p-5 sm:p-8 bg-black/60 border border-white/10 rounded-none hover:border-[#00f3ff] transition-all group shadow-xl">
              <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-[#00f3ff] mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-black font-orbitron text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">SecDevOps</h4>
              <p className="text-[9px] sm:text-[10px] text-[#00f3ff]/40 mt-2 sm:mt-3 font-mono uppercase tracking-[0.3em]">Safe_Cycle_Access</p>
            </div>
            <div className="p-5 sm:p-8 bg-black/60 border border-white/10 rounded-none hover:border-[#bf00ff] transition-all group shadow-xl">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#bf00ff] mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-black font-orbitron text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">Threat Intel</h4>
              <p className="text-[9px] sm:text-[10px] text-[#bf00ff]/40 mt-2 sm:mt-3 font-mono uppercase tracking-[0.3em]">Star_Map_Analytix</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
