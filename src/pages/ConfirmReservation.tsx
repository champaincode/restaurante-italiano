import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export function ConfirmReservation() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function confirm() {
      if (!id) {
        setStatus('error');
        return;
      }

      try {
        // First check if reservation exists and get name
        const { data: reservation, error: fetchError } = await supabase
          .from('reservations')
          .select('name, status')
          .eq('id', id)
          .single();

        if (fetchError || !reservation) {
          throw new Error('Reserva no encontrada');
        }

        setName(reservation.name);

        // If already confirmed, don't update again but show success
        if (reservation.status === 'confirmed') {
          setStatus('success');
          return;
        }

        // Update status to confirmed
        const { error: updateError } = await supabase
          .from('reservations')
          .update({ status: 'confirmed' })
          .eq('id', id);

        if (updateError) throw updateError;

        setStatus('success');
        toast.success('¡Reserva confirmada con éxito!');
      } catch (error: any) {
        console.error('Error confirming reservation:', error);
        setStatus('error');
        toast.error('No se pudo confirmar la reserva.');
      }
    }

    confirm();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-black mb-4" size={48} />
            <h1 className="text-2xl font-serif mb-2">Confirmando reserva...</h1>
            <p className="text-gray-500">Estamos procesando tu solicitud.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 mb-6" size={64} />
            <h1 className="text-3xl font-serif mb-4">¡Hola, {name}!</h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Tu reserva en <span className="font-bold">Il Borsalino</span> ha sido confirmada correctamente.
            </p>
            <p className="text-gray-500 mb-10">
              Estamos deseando recibirte. Recuerda presentar tu código QR al llegar.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="text-red-500 mb-6" size={64} />
            <h1 className="text-2xl font-serif mb-4">Error al confirmar</h1>
            <p className="text-gray-600 mb-8">
              Hubo un problema al confirmar tu reserva o el enlace no es válido.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
