import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const SOCIALS = [
  { icon: Github,   label: 'GITHUB',   color: '#00f3ff',  href: 'https://github.com/Ansh2109' },
  { icon: Linkedin, label: 'LINKEDIN', color: '#bf00ff',  href: 'https://www.linkedin.com/in/ansh-patel-7a9b72372' },
  { icon: Twitter,  label: 'X_CORP',  color: '#00ffcc',  href: 'https://x.com/anshpatel' },
  { icon: Mail,     label: 'EMAIL',   color: '#ff00aa',  href: 'mailto:ansh@example.com' },
];

const FooterSection = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-transparent">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px]
                      bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent" />

      <div className="relative z-10 flex flex-col items-center space-y-8 sm:space-y-12 w-full max-w-5xl text-center">
        {/* DATA VOID heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:block w-14 md:w-20 h-[1px]
                            bg-gradient-to-r from-transparent via-[#00f3ff]/60 to-[#00f3ff]" />
            <h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase
                         tracking-[0.3em] sm:tracking-[0.4em] font-orbitron"
              style={{ textShadow: '0 0 30px rgba(0,243,255,0.5), 0 0 60px rgba(191,0,255,0.3)' }}
            >
              THE DATA VOID
            </h2>
            <div className="hidden sm:block w-14 md:w-20 h-[1px]
                            bg-gradient-to-l from-transparent via-[#bf00ff]/60 to-[#bf00ff]" />
          </div>

          <p className="text-[9px] sm:text-[10px] font-mono tracking-[1em] sm:tracking-[1.5em] uppercase font-black animate-pulse"
             style={{ color: '#00f3ff', textShadow: '0 0 10px #00f3ff88' }}>
            End_of_Stream // Session_Finalized_Secure
          </p>
        </motion.div>

        {/* Social icons */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-14">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 sm:gap-4"
              whileHover={{ scale: 1.2, y: -8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border flex items-center justify-center
                           relative overflow-hidden transition-all duration-300 backdrop-blur-md"
                style={{ borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ backgroundColor: social.color + '18' }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ border: `1px solid ${social.color}`, boxShadow: `inset 0 0 15px ${social.color}22, 0 0 25px ${social.color}44` }} />
                <social.icon
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-white/40 group-hover:text-white
                             z-10 transition-all duration-300 relative group-hover:drop-shadow-[0_0_12px_currentColor]" />
                <social.icon
                  className="absolute w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 opacity-0 group-hover:opacity-100
                             z-10 transition-opacity duration-300"
                  style={{ color: social.color, filter: `drop-shadow(0 0 8px ${social.color})` }} />
              </div>
              <span className="text-[8px] sm:text-[9px] text-white/30 font-mono tracking-[0.4em] sm:tracking-[0.5em] uppercase font-black
                               group-hover:text-white transition-colors">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl h-[1px]
                        bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Copyright */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col items-center gap-2">
          <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.5em] sm:tracking-[0.8em] uppercase font-black flex flex-wrap justify-center gap-1">
            <span style={{ color: '#00f3ff', textShadow: '0 0 8px rgba(0,243,255,0.6)' }}>©</span>
            <span className="text-white/30"> 2026 </span>
            <span style={{ color: '#bf00ff', textShadow: '0 0 8px rgba(191,0,255,0.6)' }}> ANSH PATEL</span>
            <span className="text-white/15 mx-2">|</span>
            <span style={{ color: '#00ffcc', textShadow: '0 0 8px rgba(0,255,204,0.4)' }}>ALL_RIGHTS_RESERVED</span>
          </p>
          <p className="text-[7px] sm:text-[8px] text-white/15 font-mono tracking-[0.3em] sm:tracking-[0.4em] uppercase">
            Built with React Three Fiber // Framer Motion // Three.js
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FooterSection;
