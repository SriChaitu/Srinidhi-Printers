import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImageOff } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

export default function ProductModal({ product, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [product]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const hasImage = product?.image && !imgError;

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Product details: ${product.title}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-[#020617]/80"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40, rotateX: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={dialogRef}
            tabIndex={-1}
            style={{ perspective: 1000 }}
            className="
              relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl
              glass-card sm:rounded-[2rem] overflow-hidden
              flex flex-col
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                absolute top-6 right-6 z-20
                w-12 h-12 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                flex items-center justify-center
                text-white hover:bg-white/20 hover:scale-110 hover:rotate-90
                transition-all duration-300 hover-target
                shadow-lg
              "
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-full bg-slate-900/50 relative img-mask md:mask-none md:border-r md:border-white/10">
                {hasImage ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="w-20 h-20 text-slate-700" strokeWidth={1} />
                  </div>
                )}
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 md:hidden" />
              </div>

              {/* Content Side */}
              <div className="p-8 sm:p-10 w-full md:w-1/2 flex flex-col relative z-10 -mt-10 md:mt-0">
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                  {product.title}
                </h2>

                <p className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 font-bold text-4xl drop-shadow-sm">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </p>

                {/* Badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {product.is_in_stock ? (
                    <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-emerald-500/30 backdrop-blur-md">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-rose-500/30 backdrop-blur-md">
                      <span className="w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                      Out of Stock
                    </span>
                  )}

                  {product.is_color_printing && (
                    <span className="inline-flex items-center gap-2 bg-white/5 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                      <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                      Color Printing
                    </span>
                  )}
                </div>

                <div className="mt-10 h-px bg-gradient-to-r from-white/20 to-transparent" />

                {/* Abstract */}
                {product.abstract && (
                  <div className="mt-10">
                    <p className="text-slate-300 text-lg leading-relaxed font-light">
                      {product.abstract}
                    </p>
                  </div>
                )}

                {/* Specifications */}
                {product.detailed_specifications && (
                  <div className="mt-10 flex-1">
                    <h3 className="font-display text-2xl font-bold text-white mb-5 flex items-center gap-3">
                      <span className="w-8 h-px bg-amber-500" />
                      Specifications
                    </h3>
                    <div className="bg-[#020617]/50 rounded-2xl p-6 border border-white/5 shadow-inner">
                      <pre className="text-sm text-slate-400 font-body whitespace-pre-wrap leading-relaxed break-words">
                        {product.detailed_specifications}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Category */}
                {product.category_name && (
                  <div className="mt-10 pt-10 border-t border-white/10">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
                      Collection
                    </span>
                    <p className="mt-2 text-lg text-white font-display tracking-wide">
                      {product.category_name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-6 sm:p-8 border-t border-white/10 bg-[#020617]/80 backdrop-blur-xl relative z-20">
              <WhatsAppButton productTitle={product.title} productPrice={product.price} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
