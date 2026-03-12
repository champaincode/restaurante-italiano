import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { Gallery } from '../components/Gallery';

export function Galeria() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#1a1a1a] overflow-x-hidden">

      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: '85vh', backgroundColor: '#1a1a1a', paddingTop: '72px' }}
      >
        <motion.div style={{ y: heroImageY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt="Galería Il Borsalino"
            className="w-full object-cover"
            style={{ height: '120%', opacity: 0.55 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1a1a1a 0%, rgba(26,26,26,0.3) 50%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.5) 0%, transparent 40%)' }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-5xl px-6 w-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto mb-8"
            style={{ height: '1px', backgroundColor: '#c9a84c' }}
          />
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-serif italic block tracking-wide mb-6"
            style={{ color: '#c9a84c', fontSize: '1.2rem' }}
          >
            Immagini & Atmosfera
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif text-white uppercase"
            style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', lineHeight: 0.85, letterSpacing: '-0.02em' }}
          >
            Galería
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="mx-auto"
            style={{ height: '1px', maxWidth: '28rem', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)', marginTop: '2.5rem', marginBottom: '2.5rem' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="uppercase text-white/50"
            style={{ letterSpacing: '0.4em', fontSize: '0.7rem' }}
          >
            A unos metros de la Playa de Gandía
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Explorar</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-[#c9a84c]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery content */}
      <Gallery />
    </div>
  );
}

