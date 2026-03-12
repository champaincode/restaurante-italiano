import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChefHat, Award } from 'lucide-react';

export function Collection() {
  return (
    <section id="chef" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Chef Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm tracking-widest text-gray-600">MAESTRO CULINARIO</p>
            <h3 className="font-serif text-4xl md:text-5xl">
              Chef Marco Rossi
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Con más de 25 años de experiencia en las mejores cocinas de Italia, 
              el Chef Marco Rossi trae consigo la autenticidad y pasión de la 
              gastronomía italiana tradicional.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Formado en la prestigiosa escuela de cocina de Bologna, el Chef Marco 
              ha trabajado en restaurantes con estrellas Michelin en Roma, Florencia 
              y Milán antes de llegar a España para compartir su arte culinario.
            </p>
            <div className="flex gap-6 pt-4">
              <div className="flex items-center gap-3">
                <ChefHat className="w-8 h-8" />
                <div>
                  <p className="font-medium">Cocina Tradicional</p>
                  <p className="text-sm text-gray-600">Recetas Auténticas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8" />
                <div>
                  <p className="font-medium">Reconocimientos</p>
                  <p className="text-sm text-gray-600">Múltiples Premios</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 md:h-[600px]"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1570054054068-0ad5c3f5136e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwY2hlZiUyMGNvb2tpbmclMjBraXRjaGVufGVufDF8fHx8MTc3MDY3NzkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Chef Marco Rossi"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Wine Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group cursor-pointer relative overflow-hidden h-96"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1642169791287-ca59eaf67059?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwd2luZSUyMGJvdHRsZXMlMjByZWR8ZW58MXx8fHwxNzcwNzMyODE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Vinos Italianos"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h4 className="font-serif text-3xl mb-2">Bodega Premium</h4>
              <p className="text-sm mb-4">Más de 200 etiquetas de vinos italianos seleccionados</p>
              <button className="text-sm tracking-widest border-b border-white pb-1 hover:border-gray-300 transition-colors">
                VER CARTA DE VINOS →
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer relative overflow-hidden h-96"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1745818016691-14c4020a73ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzA2Nzc5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Ambiente"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h4 className="font-serif text-3xl mb-2">Eventos Privados</h4>
              <p className="text-sm mb-4">Espacios exclusivos para celebraciones especiales</p>
              <button className="text-sm tracking-widest border-b border-white pb-1 hover:border-gray-300 transition-colors">
                MÁS INFORMACIÓN →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-center"
        >
          {[
            { number: '25+', label: 'Años de Experiencia' },
            { number: '200+', label: 'Vinos Seleccionados' },
            { number: '100%', label: 'Ingredientes Italianos' },
            { number: '50+', label: 'Platos en Menú' }
          ].map((stat, index) => (
            <div key={index}>
              <p className="font-serif text-4xl mb-2">{stat.number}</p>
              <p className="text-sm tracking-widest text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
