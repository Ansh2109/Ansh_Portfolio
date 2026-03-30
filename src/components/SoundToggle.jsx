import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const SoundToggle = () => {
  const [muted, setMuted] = useState(true);

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50 p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-white/50 hover:text-white hover:border-purple-500 transition-all shadow-xl"
      onClick={() => setMuted(!muted)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-space-accent text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {muted ? 'VOICE COMM OFF' : 'VOICE COMM ON'}
      </span>
    </motion.button>
  );
};

export default SoundToggle;
