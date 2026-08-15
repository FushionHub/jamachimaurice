"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export const AIAvatar = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  return (
    <div className="relative">
      {/* Avatar Container */}
      <motion.div
        className="relative size-32 md:size-40 lg:size-48"
        animate={isSpeaking ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3, repeat: isSpeaking ? Infinity : 0 }}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-2xl opacity-30 animate-pulse" />
        
        {/* Avatar Circle */}
        <div className="relative size-full rounded-full bg-gradient-to-br from-emerald-400/20 to-sky-400/20 p-1 backdrop-blur-sm border border-white/20">
          <div className="size-full rounded-full bg-gray-900/80 flex items-center justify-center overflow-hidden">
            {/* AI Face */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-4">
                <motion.div
                  className="w-4 h-4 bg-emerald-400 rounded-full"
                  animate={isThinking ? { scale: [1, 0.5, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isThinking ? Infinity : 0 }}
                />
                <motion.div
                  className="w-4 h-4 bg-emerald-400 rounded-full"
                  animate={isThinking ? { scale: [1, 0.5, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isThinking ? Infinity : 0, delay: 0.1 }}
                />
              </div>
              
              {/* Mouth */}
              {isSpeaking && (
                <motion.div
                  className="absolute bottom-8 w-8 h-2 bg-emerald-400 rounded-full"
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                />
              )}
              
              {/* Thinking Indicator */}
              {isThinking && (
                <motion.div
                  className="absolute top-4 w-2 h-2 bg-sky-400 rounded-full"
                  animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Status Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
          animate={isSpeaking ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isSpeaking ? Infinity : 0, ease: "linear" }}
        />
        
        {/* Outer Ring */}
        <motion.div
          className="absolute -inset-2 rounded-full border border-sky-400/30"
          animate={isSpeaking ? { rotate: -360 } : {}}
          transition={{ duration: 3, repeat: isSpeaking ? Infinity : 0, ease: "linear" }}
        />
      </motion.div>

      {/* Status Badge */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse' : isThinking ? 'bg-sky-400 animate-pulse' : 'bg-white/40'}`} />
          <span className="text-xs font-medium text-white/80">
            {isSpeaking ? 'Speaking' : isThinking ? 'Thinking' : 'Online'}
          </span>
        </div>
      </div>

      {/* Floating Particles */}
      {isSpeaking && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 0.5, 0],
                x: [0, (i - 1) * 20],
                y: [0, -30],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

// Hook to control avatar state
export function useAIAvatar() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const startSpeaking = () => {
    setIsSpeaking(true);
    setIsThinking(false);
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
  };

  const startThinking = () => {
    setIsThinking(true);
    setIsSpeaking(false);
  };

  const stopThinking = () => {
    setIsThinking(false);
  };

  return {
    isSpeaking,
    isThinking,
    startSpeaking,
    stopSpeaking,
    startThinking,
    stopThinking,
  };
}
