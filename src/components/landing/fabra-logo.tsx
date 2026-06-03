import type React from "react";
import { motion } from "framer-motion";

type FabraLogoProps = {
  logoRef?: React.Ref<HTMLDivElement>;
  className?: string;
};

export function FabraLogo({ logoRef, className = "" }: FabraLogoProps) {
  return (
    <motion.div
      ref={logoRef}
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative size-24 sm:size-28 lg:size-32 select-none group transition-all duration-500 ease-out origin-center ${className}`}
      whileHover={{ scale: 1.06, rotate: 5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Soft glowing background behind the logo */}
      <div className="logo-glow absolute inset-0 rounded-full bg-violet-500/20 blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse pointer-events-none" />
      
      <svg
        width="306"
        height="353"
        viewBox="0 0 306 353"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="title desc"
        className="relative w-full h-full object-contain filter drop-shadow-[0_6px_20px_rgba(93,92,255,0.35)] transition-all duration-500 pointer-events-none"
      >
        <title id="title">Fabra mark</title>
        <desc id="desc">A constructed vector folded ribbon mark for Fabra.</desc>
        <defs>
          <filter id="mark-soft-shadow" x="51" y="32" width="229" height="301" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000416" floodOpacity="0.32"/>
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#070A20" floodOpacity="0.26"/>
          </filter>
          <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        <g filter="url(#mark-soft-shadow)" fill="#5D5CFF">
          <path
            className="transition-all duration-500 ease-out origin-center"
            d="M72.1 318.7V274.5C72.1 255.7 83.4 238.8 100.8 231.6L197.1 191.9C208.4 187.2 219.1 195.5 219.1 207.8V229.9C219.1 248.9 207.6 265.9 190 273.3L77.8 322.8C75.2 324 72.1 321.8 72.1 318.7Z"
          />
          <path
            className="transition-all duration-500 ease-out origin-center"
            d="M72.1 318.7V274.5C72.1 255.7 83.4 238.8 100.8 231.6L197.1 191.9C208.4 187.2 219.1 195.5 219.1 207.8V215.6C214.7 207.4 205.8 204.1 196 208.2L100.8 247.4C83.4 254.6 72.1 271.5 72.1 290.3V318.7Z"
          />
          <path
            className="transition-all duration-500 ease-out origin-center"
            d="M258.8 53.3V94.1C258.8 113.9 246.7 131.7 228.3 139L95.2 191.6C83.5 196.2 72 187.6 72 175V144.5C72 128.3 81.9 113.7 97 107.9L253.2 49.5C256 48.5 258.8 50.6 258.8 53.3Z"
          />
          <path
            className="transition-all duration-500 ease-out origin-center"
            d="M95.2 191.6L156.6 156.5L228.3 139C246.7 131.7 258.8 113.9 258.8 94.1C258.1 118.2 244.7 133.9 225.4 141.5L95.2 191.6Z"
          />
          <path
            className="transition-all duration-500 ease-out origin-center"
            d="M72 174.8C72 187.8 79.6 199.6 91.6 204.7L168.5 237.9L207 221.4C222.1 214.9 223.4 193.5 209.3 185.4L156.6 156.5L95.2 191.6C83.5 196.2 72 187.6 72 174.8Z"
          />
          <path
            className="transition-all duration-500 ease-out origin-center"
            d="M72 174.8C72 187.8 79.6 199.6 91.6 204.7L168.5 237.9L207 221.4C214.3 218.3 218.4 211.6 218.5 204.5C212.8 213.6 203.7 218.1 190.5 223.4L168.6 232.3L91.8 204.8C79.7 199.7 72 187.8 72 174.8Z"
          />
        </g>
      </svg>
    </motion.div>
  );
}
