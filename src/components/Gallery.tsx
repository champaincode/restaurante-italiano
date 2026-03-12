import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    alt: "Interior del restaurante Il Borsalino",
    category: "restaurant"
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    alt: "Comedor del restaurante",
    category: "restaurant"
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Ambiente acogedor",
    category: "restaurant"
  },
  {
    src: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80",
    alt: "Pizza artesanal en horno de leña",
    category: "food"
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    alt: "Pizza napolitana",
    category: "food"
  },
  {
    src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    alt: "Pasta fresca italiana",
    category: "food"
  },
  {
    src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
    alt: "Platos mediterráneos",
    category: "food"
  },
  {
    src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80",
    alt: "Horno de leña tradicional",
    category: "kitchen"
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    alt: "Cocina mediterránea",
    category: "kitchen"
  }
];

export function Gallery() {
  return (
    <section id="galería" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Galería */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-black">
            Galería
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            A unos metros de la arena de la Playa de Gandía
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed">
              El Restaurante & Pizzería Il Borsalino está situado a escasos metros del paseo Marítimo Neptuno de la Playa de Gandia, 
              un amplio espacio donde podrá disfrutar de una buena comida y compartirlo con sus familiares y amigos. 
              Nuestro comedor ha sido reformado recientemente y está adaptado para el frío invierno y el caluroso verano, 
              además cuenta con una extensa cristalera que puede abatirse y parte del comedor queda al aire libre.
            </p>
          </div>
        </motion.div>

        {/* Restaurant Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {galleryImages.filter(img => img.category === 'restaurant').map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer aspect-[4/3]"
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 2: Nuestra Cocina */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-black">
            Nuestra Cocina
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6">
              La cocina del Restaurante Il Borsalino es característica de un clima mediterráneo haciendo especial énfasis en la tradición italiana. 
              En pleno corazón del restaurante tenemos ubicado nuestro horno de leña, donde el maestro pizzero demuestra su sabiduría y 
              profesionalidad tanto al voltear la masa como en el control de la temperatura del horno para conseguir un horneado perfecto 
              de las pizzas y un fabuloso gratinado de nuestros platos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Los clientes nos recomiendan por la calidad de nuestros productos y por la abundancia de los platos, 
              en nuestra casa nadie se queda con hambre.
            </p>
          </div>
        </motion.div>

        {/* Food & Kitchen Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.filter(img => img.category === 'food' || img.category === 'kitchen').map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer aspect-[4/3]"
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
