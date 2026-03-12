import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

// Design Palette
const colors = {
  gold: '#c9a84c',
  goldLight: '#d4af37',
  bg: '#faf9f6',
  cream: '#f5f0e8',
  dark: '#1a1a1a',
  darkSoft: '#2a2a2a',
  neutral: '#71717a',
  warmGray: '#a8a29e',
};

const menuSections = [
  {
    id: 'entrantes',
    number: '01',
    title: 'Entrantes',
    subtitle: 'Per Cominciare',
    image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?q=80&w=1600&auto=format&fit=crop',
    items: [
      { name: 'Provolone al Forno', desc: 'Queso provolone fundido al horno de leña con salsa de tomate casera y orégano', price: '12.50€' },
      { name: 'Carpaccio de Ternera', desc: 'Finas láminas de ternera con rúcula, lascas de parmesano y aceite de trufa', price: '14.00€' },
      { name: 'Bruschetta Pomodoro', desc: 'Pan tostado con tomate fresco, albahaca y aceite de oliva virgen extra', price: '8.50€' },
      { name: 'Fritto Misto', desc: 'Fritura de calamares y gambas crujientes con salsa tártara', price: '16.00€' },
    ]
  },
  {
    id: 'carnes',
    number: '02',
    title: 'Carnes',
    subtitle: 'Dalla Griglia',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
    items: [
      { name: 'Costata di Manzo', desc: 'Entrecot de ternera a la parrilla con patatas al romero y verduras asadas', price: '24.00€' },
      { name: 'Scaloppine al Limone', desc: 'Finos filetes de ternera con suave salsa de limón y vino blanco', price: '18.50€' },
      { name: 'Pollo alla Parmigiana', desc: 'Pechuga de pollo empanada gratinada con tomate y mozzarella', price: '16.50€' },
    ]
  },
  {
    id: 'ensaladas',
    number: '03',
    title: 'Ensaladas',
    subtitle: 'Insalate Fresche',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop',
    items: [
      { name: 'Insalata Caprese', desc: 'Mozzarella de búfala fresca, tomate buey y albahaca', price: '13.00€' },
      { name: 'Insalata Caesar', desc: 'Lechuga romana, pollo a la parrilla, picatostes, parmesano y salsa césar', price: '14.50€' },
      { name: 'Insalata di Gorgonzola', desc: 'Mezclum de lechugas, pera caramelizada, nueces y queso gorgonzola', price: '13.50€' },
    ]
  },
  {
    id: 'pastas',
    number: '04',
    title: 'Pastas',
    subtitle: 'Pasta Fresca',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1600&auto=format&fit=crop',
    items: [
      { name: 'Spaghetti Carbonara', desc: 'La auténtica receta romana con guanciale, yema de huevo, pecorino y pimienta', price: '15.00€' },
      { name: 'Pappardelle al Ragù', desc: 'Pasta ancha con tradicional salsa de carne cocinada a fuego lento', price: '16.50€' },
      { name: 'Ravioli Tartufo', desc: 'Raviolis rellenos de ricotta y trufa en suave salsa de parmesano', price: '18.00€' },
      { name: 'Linguine allo Scoglio', desc: 'Pasta larga con frutos del mar frescos, tomate cherry y ajo', price: '19.50€' },
    ]
  },
  {
    id: 'risottos',
    number: '05',
    title: 'Risottos',
    subtitle: 'Riso Cremoso',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2000&auto=format&fit=crop',
    items: [
      { name: 'Risotto Funghi', desc: 'Arroz cremoso con setas porcini silvestres y parmesano', price: '17.50€' },
      { name: 'Risotto Nero', desc: 'Risotto con tinta de sepia y calamares frescos', price: '18.50€' },
    ]
  }
];

const pizzasClassicas = [
  { name: 'Margherita', desc: 'Tomate San Marzano, mozzarella fior di latte, albahaca fresca', price: '11.00€' },
  { name: 'Prosciutto e Funghi', desc: 'Tomate, mozzarella, jamón cocido y champiñones', price: '13.50€' },
  { name: 'Diavola', desc: 'Tomate, mozzarella, salami picante de Calabria', price: '14.00€' },
  { name: 'Quattro Stagioni', desc: 'Tomate, mozzarella, alcachofas, jamón, setas y aceitunas negras', price: '15.00€' },
];

const pizzasGourmet = [
  { name: 'Burrata e Tartufo', desc: 'Base blanca, mozzarella, burrata fresca, láminas de trufa negra, mortadella', price: '19.50€' },
  { name: 'Pistacchio', desc: 'Crema de pistacho, mozzarella, mortadella, stracciatella di burrata, granos de pistacho', price: '18.00€' },
  { name: 'Bresaola', desc: 'Tomate, mozzarella, bresaola, rúcula, lascas de parmesano', price: '17.50€' },
];

// Animation Variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Decorative Divider component
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]/50" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
    </div>
  );
}

// Menu Item component
function MenuItem({ item, index }: { item: { name: string; desc: string; price: string }; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative h-full flex flex-col justify-start"
    >
      {/* Subtle hover background */}
      <div className="absolute inset-0 rounded-lg bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/[0.03] transition-colors duration-500" />
      
      <div className="relative">
        <div className="flex flex-nowrap items-baseline gap-2 mb-2 w-full">
          <h3 className="text-xl md:text-2xl font-serif text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors duration-300 min-w-0">
            {item.name}
          </h3>
          <div className="flex-1 opacity-40 border-b-2 border-dotted border-[#1a1a1a] translate-y-[-6px] mx-2 group-hover:border-[#c9a84c] transition-colors" />
          <span className="text-lg font-bold tracking-wider text-[#1a1a1a] font-sans whitespace-nowrap shrink-0">
            {item.price}
          </span>
        </div>
        <p className="text-[#71717a] text-sm font-sans font-light italic leading-relaxed max-w-[90%] group-hover:text-[#57534e] transition-colors duration-500 pl-0.5">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Carta() {
  const [activeSection, setActiveSection] = useState('entrantes');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const allSections = [
    ...menuSections.map(s => ({ id: s.id, label: s.title })),
    { id: 'pizze', label: 'Pizzas' },
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#1a1a1a] selection:bg-[#c9a84c]/20 relative overflow-x-hidden">

      {/* Hero Header — Parallax Style */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: '85vh', backgroundColor: '#1a1a1a', paddingTop: '72px' }}
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
            alt="Il Borsalino Kitchen"
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
            Sapore & Tradizione
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif text-white uppercase"
            style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', lineHeight: 0.85, letterSpacing: '-0.02em' }}
          >
            La Carta
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
            Cocina Italiana de Autor
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
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-[#c9a84c]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="sticky top-[72px] z-40 w-full overflow-hidden bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#c9a84c]/10"
      >
        <div className="w-full max-w-7xl mx-auto px-6 h-14 md:h-auto">
          <div className="hidden md:flex items-center gap-1 py-4">
            {allSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className={`
                  px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium whitespace-nowrap
                  transition-all duration-300 flex-shrink-0
                  ${activeSection === s.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'text-[#71717a] hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                  }
                `}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Main Content Sections */}
      <div>
        {menuSections.map((section, idx) => (
          <motion.section
            key={section.id}
            id={section.id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            onViewportEnter={() => setActiveSection(section.id)}
            className="relative scroll-mt-32"
          >
            {/* Full-bleed hero-sized image */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: '85vh' }}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
                style={{ transform: 'scale(1.04)' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.3) 45%, transparent 80%)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.4) 0%, transparent 25%)' }} />

              {/* Section number + subtitle — top left */}
              <div className="absolute top-8 left-8 z-20">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">
                  {section.number} — {section.subtitle}
                </span>
              </div>

              {/* Title — bottom of the image */}
              <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-10 z-20">
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Menu items — below the image */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 divide-y divide-[#e7e5e0]/70 md:divide-y-0"
                style={{ columnGap: '6rem' }}
              >
                {section.items.map((item, i) => {
                  const isSecondRow = i >= 2;
                  const isLeftCol = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      className={[
                        'py-8',
                        isSecondRow ? 'md:border-t md:border-[#e7e5e0]/70' : '',
                        isLeftCol ? 'md:pr-12' : 'md:pl-4',
                      ].join(' ')}
                    >
                      <MenuItem item={item} index={i} />
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Section separator */}
            {idx < menuSections.length - 1 && (
              <div className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
              </div>
            )}
          </motion.section>
        ))}

        {/* ═══════════════════════════════════════ */}
        {/* The Pizza Editorial Section             */}
        {/* ═══════════════════════════════════════ */}
      </div>{/* close sections wrapper */}

      <motion.section
        id="pizze"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        onViewportEnter={() => setActiveSection('pizze')}
        className="relative scroll-mt-32"
      >
        {/* Full-bleed hero-sized image */}
        <div className="relative w-full overflow-hidden" style={{ height: '85vh' }}>
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop"
            alt="Nuestras Pizzas"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.04)' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.3) 45%, transparent 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,26,0.4) 0%, transparent 25%)' }} />

          {/* Section number + subtitle — top left */}
          <div className="absolute top-8 left-8 z-20">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">
              06 — Tradizione Napoletana
            </span>
          </div>

          {/* Title — bottom of the image */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-10 z-20">
            <h2 className="font-serif text-white" style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>
              Pizzas
            </h2>
            <p className="text-white/40 text-sm font-light mt-4 tracking-widest uppercase">
              Masa fermentada 48h · Harinas tipo 00 · Horno de piedra volcánica
            </p>
          </div>
        </div>

        {/* Pizza items — separated by category */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16" style={{ columnGap: '6rem' }}>
            {/* Clásicas Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col md:pr-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#c9a84c] font-medium">Clásicas</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#c9a84c]/30 to-transparent" />
              </div>
              <div className="divide-y divide-[#e7e5e0]/70">
                {pizzasClassicas.map((item, i) => (
                  <div key={i} className="py-8 break-inside-avoid">
                    <MenuItem item={item} index={i} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gourmet Column */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col md:border-l md:border-[#e7e5e0]/70 md:pl-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#71717a] font-medium">Gourmet</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#71717a]/30 to-transparent" />
              </div>
              <div className="divide-y divide-[#e7e5e0]/70">
                {pizzasGourmet.map((item, i) => (
                  <div key={i} className="py-8 break-inside-avoid">
                    <MenuItem item={item} index={i} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
