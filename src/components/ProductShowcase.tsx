import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const menuItems = [
  {
    id: 1,
    name: 'Pasta Fresca',
    category: 'Primi Piatti',
    description: 'Tagliatelle hechas a mano con ragú de carne',
    price: '18€',
    image: 'https://images.unsplash.com/photo-1570054054068-0ad5c3f5136e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBmcmVzaCUyMGhvbWVtYWRlfGVufDF8fHx8MTc3MDY3NzkyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    name: 'Pizza Napoletana',
    category: 'Specialità',
    description: 'Horno de leña, masa tradicional napolitana',
    price: '16€',
    image: 'https://images.unsplash.com/photo-1689150911817-3e27168ab6a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emElMjB3b29kJTIwb3ZlbnxlbnwxfHx8fDE3NzA3MzI4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    name: 'Risotto ai Funghi',
    category: 'Primi Piatti',
    description: 'Risotto cremoso con hongos porcini',
    price: '20€',
    image: 'https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXNvdHRvJTIwbXVzaHJvb20lMjBpdGFsaWFufGVufDF8fHx8MTc3MDY1MTE4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    name: 'Tiramisù',
    category: 'Dolci',
    description: 'Postre clásico italiano con café y mascarpone',
    price: '8€',
    image: 'https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZGVzc2VydCUyMHRpcmFtaXN1fGVufDF8fHx8MTc3MDcxODg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function ProductShowcase() {
  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-widest text-gray-600 mb-4">NUESTRO MENÚ</p>
            <h3 className="font-serif text-4xl md:text-5xl mb-6">
              Platos Destacados
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Una selección de nuestras especialidades más populares, preparadas con ingredientes frescos y auténticos
            </p>
          </motion.div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-4">
                <div className="relative overflow-hidden w-32 h-32 flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 py-2 pr-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs tracking-widest text-gray-500 mb-1">{item.category}</p>
                      <h4 className="text-lg font-medium">{item.name}</h4>
                    </div>
                    <p className="font-serif text-lg">{item.price}</p>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors tracking-wide">
            VER MENÚ COMPLETO
          </button>
        </motion.div>
      </div>
    </section>
  );
}
