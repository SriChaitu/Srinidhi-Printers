import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getCategories, getProducts } from '../api/client';
import Navbar from '../components/Navbar';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function CatalogPage() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const filters = activeCategory ? { category__name: activeCategory } : {};
        const data = await getProducts(filters);
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-500/30">
      <Navbar />

      {/* Parallax Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, opacity }}
        >
          <img 
            src="/hero-bg.png" 
            alt="Luxurious dark ink background" 
            className="w-full h-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/40 to-[#020617]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl"
          >
            Premium Printing <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
              for Every Occasion
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-8 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium tracking-wide drop-shadow-lg"
          >
            Explore our collection of meticulously crafted designs. We turn your ideas into stunning printed realities.
          </motion.p>
        </div>
      </section>

      <div className="relative z-20 bg-[#020617]">
        {/* Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {error && (
            <div className="text-center py-16 glass-card rounded-2xl">
              <p className="text-rose-400 mb-4 font-medium">{error}</p>
              <button
                onClick={() => setActiveCategory(activeCategory)}
                className="bg-white/10 text-white border border-white/20 px-6 py-2 rounded-lg hover:bg-white/20 transition-colors hover-target"
              >
                Try Again
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card rounded-3xl p-5">
                  <div className="aspect-[4/3] skeleton rounded-xl mb-5 opacity-50" />
                  <div className="h-6 skeleton w-3/4 mb-4 opacity-50" />
                  <div className="h-7 skeleton w-1/3 mb-5 opacity-50" />
                  <div className="h-4 skeleton w-full mb-3 opacity-30" />
                  <div className="h-4 skeleton w-5/6 opacity-30" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 glass-card rounded-3xl"
            >
              <p className="text-xl text-slate-400 font-medium tracking-wide">No products found in this category.</p>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-16 mt-12 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-slate-400">
            <div className="text-center md:text-left">
              <h3 className="text-white font-display text-2xl mb-4 font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
                Srinidhi Printers
              </h3>
              <p className="mb-2"><strong className="text-slate-300 font-medium">Owner:</strong> Kattamuri Sekhar</p>
              <p className="mb-2"><strong className="text-slate-300 font-medium">Phone:</strong> <a href="tel:+919290859945" className="hover:text-amber-400 transition-colors">+91 9290859945</a></p>
            </div>
            
            <div className="text-center md:text-right max-w-md">
              <h3 className="text-white font-display text-xl mb-4 font-bold tracking-wide">Location</h3>
              <p className="leading-relaxed text-sm">
                Opposite Old Head Post Office, near Krishna Bazar,<br/>
                Chintapalli Road, Narsipatnam - 531116,<br/>
                Anakapalli District, Andhra Pradesh
              </p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-xs tracking-widest uppercase font-bold">
            <p>&copy; {new Date().getFullYear()} Srinidhi Printers. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
