import { motion } from 'framer-motion';

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  const tabs = [{ name: 'All', slug: null }, ...categories];

  return (
    <div className="glass sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto hide-scrollbar scroll-snap-x py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex space-x-2 sm:space-x-6 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.name || (activeCategory === null && tab.name === 'All');

              return (
                <button
                  key={tab.name}
                  onClick={() => onCategoryChange(tab.name === 'All' ? null : tab.name)}
                  className={`
                    relative px-4 py-3 text-sm font-bold tracking-wide transition-colors duration-300 scroll-snap-align-start hover-target
                    ${isActive ? 'text-amber-300' : 'text-slate-400 hover:text-white'}
                  `}
                >
                  {tab.name}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 to-amber-200"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
