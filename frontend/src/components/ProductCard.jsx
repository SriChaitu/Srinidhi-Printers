import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ImageOff } from 'lucide-react';

export default function ProductCard({ product, onClick, index }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.image && !imgError;

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative rounded-3xl overflow-hidden glass-card cursor-pointer hover-target
        ${!product.is_in_stock ? 'opacity-60 grayscale-[0.8]' : ''}
      `}
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.title} — ₹${product.price}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(product);
        }
      }}
    >
      {/* Glare Effect */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
        }}
      />

      {/* Stock Badge */}
      {!product.is_in_stock && (
        <div className="absolute top-4 right-4 z-10 bg-rose-500/80 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-rose-500/20" style={{ transform: "translateZ(30px)" }}>
          Out of Stock
        </div>
      )}
      {product.is_in_stock && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-emerald-500/80 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-emerald-500/20" style={{ transform: "translateZ(30px)" }}>
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          In Stock
        </div>
      )}

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-900/50 relative img-mask">
        {hasImage ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-125 hover:rotate-3"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-slate-700" strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="font-display text-xl font-bold text-white truncate drop-shadow-md">
          {product.title}
        </h3>
        <p className="mt-1 text-amber-300 font-bold text-2xl drop-shadow-md">
          ₹{Number(product.price).toLocaleString('en-IN')}
        </p>
        
        {product.abstract && (
          <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-2">
            {product.abstract}
          </p>
        )}
        
        {product.is_color_printing && (
          <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            Color Printing
          </div>
        )}
      </div>
    </motion.article>
  );
}
