import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  supabase,
  type ReservationInsert,
  type Reservation,
} from "../lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import {
  Mail,
  Check,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  X,
} from "lucide-react";

export function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [showEmailMock, setShowEmailMock] = useState(false);
  const [lastReservation, setLastReservation] = useState<Reservation | null>(
    null,
  );
  const [formData, setFormData] = useState<ReservationInsert>({
    name: "",
    email: "",
    phone: "",
    reservation_date: "",
    reservation_time: "",
    guests: 2,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("reservations")
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      try {
        const { data: fnData, error: fnError } =
          await supabase.functions.invoke("send-reservation-email", {
            body: data,
          });

        if (fnError) {
          console.error("Edge Function Error details:", fnError);
        } else if (fnData?.error) {
          console.error("Edge Function returned internal error:", fnData.error);
        }
      } catch (emailError: any) {
        console.error(
          "Error sending confirmation email catch block:",
          emailError,
        );
        toast.error(
          "Reserva confirmada, pero hubo un error enviando el email.",
          { duration: 5000 },
        );
      }

      setLastReservation(data);
      toast.success("¡Reserva registrada! Revisa tu email de confirmación.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        reservation_date: "",
        reservation_time: "",
        guests: 2,
        message: "",
      });
    } catch (error: any) {
      console.error("Error creating reservation:", error);
      toast.error(
        "Error al realizar la reserva. Por favor, inténtalo de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) : value,
    }));
  };

  const minDate = format(new Date(), "yyyy-MM-dd");

  return (
    <>
      <Toaster position="top-center" />
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col justify-center">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-black">
              Reserva tu Mesa
            </h1>
            <p className="text-lg text-gray-600">
              Completa el formulario y te confirmaremos tu reserva por email
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Número de personas *
                </label>
                <select
                  id="guests"
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="reservation_date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Fecha *
                </label>
                <input
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  required
                  min={minDate}
                  value={formData.reservation_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="reservation_time"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hora *
                </label>
                <select
                  id="reservation_time"
                  name="reservation_time"
                  required
                  value={formData.reservation_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="">Selecciona una hora</option>
                  <optgroup label="Almuerzo">
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                  </optgroup>
                  <optgroup label="Cena">
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                    <option value="22:30">22:30</option>
                    <option value="23:00">23:00</option>
                    <option value="23:30">23:30</option>
                    <option value="24:00">24:00</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mensaje o peticiones especiales
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                placeholder="Alergias, preferencias de mesa, celebraciones..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : "Confirmar Reserva"}
            </button>

            <p className="text-sm text-gray-500 text-center mt-6">
              * Campos obligatorios. Recibirás un email de confirmación.
            </p>
          </motion.form>
        </div>
      </section>

      <AnimatePresence>
        {showEmailMock && lastReservation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-white p-2 rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Confirmación de Reserva
                    </h3>
                    <p className="text-xs text-gray-500">
                      De: reservas@ilborsalino.com
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEmailMock(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 text-center bg-white">
                <div className="max-w-md mx-auto">
                  <h2 className="text-3xl font-serif text-black mb-4">
                    ¡Hola, {lastReservation.name}!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Gracias por elegir{" "}
                    <span className="font-bold">Il Borsalino</span>. Para
                    asegurar tu mesa, por favor confirma tu reserva haciendo
                    clic en el botón de abajo.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100 text-left space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar size={18} className="text-black" />
                      <span>
                        {format(
                          new Date(lastReservation.reservation_date),
                          "dd/MM/yyyy",
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock size={18} className="text-black" />
                      <span>{lastReservation.reservation_time}h</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users size={18} className="text-black" />
                      <span>{lastReservation.guests} personas</span>
                    </div>
                  </div>

                  <div className="mb-10 p-6 border-2 border-dashed border-gray-200 rounded-2xl inline-block bg-white shadow-sm">
                    <QRCodeSVG
                      value={lastReservation.id}
                      size={160}
                      level="H"
                      includeMargin={true}
                    />
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-4">
                      Presenta este QR al llegar
                    </p>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`/confirmar/${lastReservation.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
                    >
                      Confirmar Reserva
                      <ExternalLink size={20} />
                    </a>
                    <button
                      onClick={() => setShowEmailMock(false)}
                      className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                    >
                      Cerrar vista previa del email
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  Il Borsalino · Restaurante & Pizzería · 2024
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
