import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Heritage() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 md:h-[600px]"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1745818016691-14c4020a73ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzA2Nzc5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Il Borsalino Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm tracking-widest text-gray-600">NUESTRA HISTORIA</p>
            <h3 className="font-serif text-4xl md:text-5xl">
              Tradición Italiana en Cada Plato
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Il Borsalino nace del amor por la cocina tradicional italiana y el deseo de 
              compartir los auténticos sabores de Italia. Cada receta ha sido cuidadosamente 
              seleccionada de las regiones más emblemáticas de Italia.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nuestros ingredientes son importados directamente de Italia y nuestras pastas 
              son elaboradas artesanalmente cada día. Creemos que la buena comida es el alma 
              de cualquier celebración.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <p className="font-serif text-3xl mb-2">100%</p>
                <p className="text-sm text-gray-600">Ingredientes Italianos</p>
              </div>
              <div>
                <p className="font-serif text-3xl mb-2">25+</p>
                <p className="text-sm text-gray-600">Años de Experiencia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}