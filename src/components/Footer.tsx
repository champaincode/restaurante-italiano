import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src="/src/assets/logoblanco.png"
              alt="Il Borsalino"
              className="h-20 w-auto mb-4 block"
            />
            <p className="text-md text-gray-400 mb-4">
              Cocina mediterránea donde encontrarás pizzas, pastas, ensaladas,
              carnes, pescados frescos y de gran calidad en la Playa de Gandia.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/restauranteilborsalino/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/IlBorsalinoPlayadeGandia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Horario */}
          <div>
            <h4 className="text-sm tracking-widest mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              HORARIO
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Lunes a Jueves</li>
              <li className="text-white">13:00-16:00 | 20:00-24:00</li>
              <li className="mt-2">Viernes</li>
              <li className="text-white">13:00-16:00 | 20:00-0:30</li>
              <li className="mt-2">Sábados</li>
              <li className="text-white">13:00-16:30 | 20:00-0:30</li>
              <li className="mt-2">Domingos</li>
              <li className="text-white">13:00-16:30 | 20:00-24:00</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm tracking-widest mb-4">CONTACTO</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="relative group flex items-start cursor-pointer">
                <a
                  href="https://www.google.com/maps/place/Restaurante+Il+Borsalino/@38.999634,-0.15925,15z/data=!4m6!3m5!1s0xd61c2ba99835621:0xeac733152a2cc54d!8m2!3d38.9996344!4d-0.15925!16s%2Fg%2F1tm2c01_?hl=es&entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>
                    Calle la Rabida, 3<br />
                    Grao De Gandia, Valenciana, Spain 46730
                  </span>

                  {/* Map Hover Bubble */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-[300px] h-[450px] bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden border border-gray-200 pointer-events-none">
                    <iframe
                      title="Map of Il Borsalino"
                      src="https://maps.google.com/maps?q=Il%20Borsalino,%20Calle%20la%20Rabida,%203,%20Grao%20De%20Gandia&t=&z=17&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-200"></div>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:962847154"
                  className="hover:text-white transition-colors"
                >
                  96 284 71 54
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:info@ilborsalino.com"
                  className="hover:text-white transition-colors"
                >
                  info@ilborsalino.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Haz Tu Reserva CTA */}
        <div className="bg-[#1a1a1a] rounded-lg px-8 py-6 mb-10 inline-block">
          <h3 className="text-white text-xl font-semibold mb-2">
            Haz Tu Reserva
          </h3>
          <p className="text-gray-300 text-sm flex items-center gap-2">
            ¡Llámanos! Tel.{" "}
            <Phone className="w-4 h-4 inline-block text-gray-300" />
            <a
              href="tel:962847154"
              className="hover:text-white transition-colors"
            >
              96 284 71 54
            </a>
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2026 Il Borsalino. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a
              href="/privacidad"
              className="hover:text-white transition-colors"
            >
              Política de Privacidad
            </a>
            <a href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
