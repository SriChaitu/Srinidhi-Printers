import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-4 group">
            {/* Custom Lord Balaji Namam Logo */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-200 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-500 p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                {/* Outer White U-shape (Thiruman) */}
                <path 
                  d="M 25 10 L 35 10 Q 35 65 50 75 Q 65 65 65 10 L 75 10 Q 75 75 50 85 Q 25 75 25 10 Z" 
                  fill="#ffffff" 
                />
                {/* Small base/nose mark */}
                <path 
                  d="M 40 86 Q 50 100 60 86 Q 50 92 40 86 Z" 
                  fill="#ffffff" 
                />
                {/* Inner Red Line (Srichurnam) */}
                <path 
                  d="M 46 20 L 54 20 L 52 70 L 48 70 Z" 
                  fill="#dc2626" 
                />
              </svg>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-white tracking-wide group-hover:text-amber-200 transition-colors duration-300">
                Srinidhi Printers
              </h1>
              <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-[0.3em]">
                Divine Printing
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="User Login"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
