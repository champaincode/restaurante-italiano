import { motion } from 'motion/react';
import { Link } from 'react-router';
import videoHero from '../assets/videohero.mp4';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoHero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-widest mb-4"></p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 tracking-wide">
         COCINA ITALIANA AUTÉNTICA
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Una experiencia gastronómica italiana en el corazón de la ciudad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/carta">
            <button className="px-8 cursor-pointer py-3 bg-white text-black hover:bg-gray-100 transition-colors tracking-wide">
              VER CARTA
            </button></Link>
            <Link to="/reservas">
              <button className="px-8 cursor-pointer py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-colors tracking-wide">
                RESERVAR MESA
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}