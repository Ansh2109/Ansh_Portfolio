import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Satellite } from 'lucide-react';

const playTransmitSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(ctx.currentTime);

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1800, ctx.currentTime + 0.1);
    osc1.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.5);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime + 0.1);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc1.connect(gain1); gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime + 0.1); osc1.stop(ctx.currentTime + 0.6);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(60, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.4);
    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime); osc2.stop(ctx.currentTime + 0.5);
  } catch (e) {}
};

const GlowInput = ({ label, type = 'text', placeholder, rows, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const Component = rows ? 'textarea' : 'input';

  return (
    <div className="space-y-1 sm:space-y-2">
      <label className="text-[8px] sm:text-[9px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-black font-mono ml-1"
             style={{ color: focused ? '#00f3ff' : 'rgba(255,255,255,0.3)' }}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none transition-all duration-300 rounded-none"
             style={{ boxShadow: focused ? '0 0 20px rgba(0,243,255,0.25), inset 0 0 10px rgba(0,243,255,0.05)' : 'none' }} />
        <Component
          type={type} placeholder={placeholder} rows={rows}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          required={required}
          className="w-full bg-black/60 rounded-none px-4 sm:px-5 py-3 sm:py-4 font-mono text-sm text-white
                     placeholder:text-white/15 focus:outline-none resize-none transition-all duration-300"
          style={{ border: `1px solid ${focused ? '#00f3ff' : 'rgba(255,255,255,0.08)'}` }}
        />
        {focused && (
          <>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00f3ff] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00f3ff] pointer-events-none" />
          </>
        )}
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    playTransmitSound();
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-6 bg-transparent overflow-auto">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8
                      bg-black/50 p-5 sm:p-8 border border-[#00f3ff]/10 backdrop-blur-3xl
                      shadow-[0_0_60px_rgba(0,243,255,0.05)] relative overflow-hidden my-2">

        {/* Top glow line */}
        <div className="absolute top-0 left-0 w-full h-[1px]
                        bg-gradient-to-r from-transparent via-[#00f3ff]/40 to-transparent" />

        {/* Left info column */}
        <div className="space-y-5 sm:space-y-8 relative z-10">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f3ff]" />
            <h3 className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] sm:tracking-[0.5em] uppercase font-black text-[#00f3ff]">
              Communication Terminal
            </h3>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight
                         font-orbitron uppercase tracking-tight">
            Ready to{' '}
            <span className="relative">
              <span className="text-[#00f3ff] drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">Connect</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px]
                               bg-gradient-to-r from-[#00f3ff] to-[#bf00ff]" />
            </span>
            {' '}Your Mission?
          </h2>

          <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-mono italic">
            "Distance is just a variable. Let's close the gap and launch something cosmic together."
          </p>

          <div className="space-y-3 sm:space-y-4 pt-2">
            {[
              { label: 'SATELLITE', value: 'GEOSYNC-07 // ACTIVE', color: '#00f3ff' },
              { label: 'ENCRYPTION', value: 'AES-256-GALAXY', color: '#bf00ff' },
              { label: 'CHANNEL', value: 'SECURE_UPLINK', color: '#00ffcc' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 sm:gap-4 text-xs font-mono font-black flex-wrap">
                <div className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                <span className="text-white/30 tracking-widest">{item.label}:</span>
                <span style={{ color: item.color }} className="tracking-widest">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Satellite className="w-4 h-4 sm:w-5 sm:h-5 text-[#bf00ff] animate-pulse" />
            <span className="text-[8px] sm:text-[9px] text-[#bf00ff]/60 font-mono tracking-widest uppercase">
              Orbital relay active — signal clear
            </span>
          </div>
        </div>

        {/* Right form column */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 relative z-10"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlowInput label="Identity [Name]" placeholder="Your Name"
            value={form.name} onChange={handleChange('name')} required />
          <GlowInput label="Frequency [Email]" type="email" placeholder="your@email.com"
            value={form.email} onChange={handleChange('email')} required />
          <GlowInput label="Signal Content [Message]" placeholder="What's the mission?"
            rows={3} value={form.message} onChange={handleChange('message')} required />

          <motion.button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full flex items-center justify-center gap-3 py-4 sm:py-5 font-black
                       tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs relative overflow-hidden group
                       disabled:opacity-50 transition-all"
            style={{
              border: '2px solid #00f3ff', color: '#00f3ff', backgroundColor: 'transparent',
              boxShadow: status === 'success' ? '0 0 40px rgba(0,243,255,0.5)' : '0 0 20px rgba(0,243,255,0.15)',
            }}
            whileHover={{ boxShadow: '0 0 50px rgba(0,243,255,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-[#00f3ff] origin-left scale-x-0
                             group-hover:scale-x-100 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors">
              {status === 'idle' && <><Send className="w-4 h-4" /><span>Transmit Signal</span></>}
              {status === 'sending' && <><span className="animate-pulse">◈</span><span>Transmitting...</span></>}
              {status === 'success' && <><span>✓</span><span>Signal Received</span></>}
            </span>
          </motion.button>
        </motion.form>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px]
                        bg-gradient-to-r from-transparent via-[#bf00ff]/30 to-transparent" />
      </div>
    </div>
  );
};

export default ContactSection;
