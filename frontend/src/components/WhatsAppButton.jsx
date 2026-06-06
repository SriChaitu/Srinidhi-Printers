import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ productTitle, productPrice, productImage }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic spring physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // 20% pull
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const PLACEHOLDER_NUMBER = "919290859945";
  let text = `Hi, I'm interested in: ${productTitle} (₹${productPrice}). Please share more details.`;
  if (productImage) {
    text += `\n\nImage: ${productImage}`;
  }
  const url = `https://wa.me/${PLACEHOLDER_NUMBER}?text=${encodeURIComponent(text)}`;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrap w-full"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group relative flex items-center justify-center gap-3 w-full
          bg-slate-900/80 backdrop-blur-md text-white font-bold text-lg px-6 py-4 rounded-xl
          border border-white/10 hover:border-amber-500/50 hover:bg-slate-800
          transition-colors duration-300 hover-target overflow-hidden
          shadow-[0_0_20px_rgba(0,0,0,0.5)]
        "
      >
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <MessageCircle size={24} className={`relative z-10 transition-transform duration-300 ${isHovered ? 'scale-110 text-amber-400' : 'text-slate-300'}`} />
        <span className="relative z-10 tracking-wide">Contact for Order via WhatsApp</span>
      </a>
    </motion.div>
  );
}
