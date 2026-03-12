import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, type Reservation } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { LogOut, Search, Filter, Calendar, Clock, Users, Mail, Phone, X, AlertCircle, Camera, CheckSquare, Trash2 } from 'lucide-react';
import { QRScanner } from '../components/QRScanner';

export function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'attended'>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('reservations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => {
        fetchReservations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: false })
        .order('reservation_time', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error: any) {
      console.error('Error fetching reservations:', error);
      toast.error('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleScanSuccess = async (reservationId: string) => {
    try {
      // Find the reservation
      const { data: reservation, error: fetchError } = await supabase
        .from('reservations')
        .select('name')
        .eq('id', reservationId)
        .single();

      if (fetchError || !reservation) {
        toast.error('Código QR no válido o reserva no encontrada');
        return;
      }

      // Update the reservation as attended
      const { error: updateError } = await supabase
        .from('reservations')
        .update({ 
          attended: true, 
          attended_at: new Date().toISOString() 
        })
        .eq('id', reservationId);

      if (updateError) throw updateError;

      toast.success(`Reserva de ${reservation.name} registrada correctamente`);
      fetchReservations();
    } catch (error: any) {
      console.error('Error recording attendance:', error);
      toast.error('Error al registrar la llegada');
    }
  };

  const handleCancelReservation = async () => {
    if (!selectedReservation) return;

    try {
      const { error } = await supabase
        .from('reservations')
        .update({
          status: 'cancelled',
          cancelled_by: 'restaurant',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', selectedReservation.id);

      if (error) throw error;

      toast.success('Reserva cancelada. Se enviará un email al cliente.');
      setShowCancelModal(false);
      setSelectedReservation(null);
      fetchReservations();
    } catch (error: any) {
      console.error('Error cancelling reservation:', error);
      toast.error('Error al cancelar la reserva');
    }
  };

  const handleDeleteAllReservations = async () => {
    try {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .not('id', 'is', null);

      if (error) throw error;

      toast.success('Todas las reservas han sido eliminadas.');
      setShowDeleteAllModal(false);
      fetchReservations();
    } catch (error: any) {
      console.error('Error deleting all reservations:', error);
      toast.error('Error al eliminar todas las reservas');
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm);
    
    let matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    if (statusFilter === 'attended') {
      matchesStatus = !!reservation.attended;
    }
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string, attended?: boolean) => {
    if (attended) return 'bg-blue-100 text-blue-800';
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string, attended?: boolean) => {
    if (attended) return 'Atendida';
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'confirmed':
        return 'Confirmada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando reservas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-[60]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl text-black leading-none mb-1">Il Borsalino</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Panel de Administración</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowScanner(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-all font-medium"
                >
                  <Camera size={20} />
                  <span className="hidden md:inline">Escanear QR</span>
                </button>
                <div className="h-8 w-px bg-gray-200 mx-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Scanner Component */}
        <AnimatePresence>
          {showScanner && (
            <QRScanner 
              onScan={handleScanSuccess} 
              onClose={() => setShowScanner(false)} 
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total</p>
              <p className="text-3xl font-bold">{reservations.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600">
                {reservations.filter(r => r.status === 'pending' && !r.attended).length}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Confirmadas</p>
              <p className="text-3xl font-bold text-green-600">
                {reservations.filter(r => r.status === 'confirmed').length}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Atendidas</p>
              <p className="text-3xl font-bold text-blue-600">
                {reservations.filter(r => r.attended).length}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Canceladas</p>
              <p className="text-3xl font-bold text-red-600">
                {reservations.filter(r => r.status === 'cancelled').length}
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                >
                  <option value="all">Todas las reservas</option>
                  <option value="pending">Pendientes</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="attended">Atendidas (Llegaron)</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions & Reservations List */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowDeleteAllModal(true)}
              disabled={reservations.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                reservations.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
              }`}
            >
              <Trash2 size={18} />
              Borrar Todas las Reservas
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron reservas</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha & Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Personas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{reservation.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Mail size={14} className="mr-1" />
                                {reservation.email}
                              </span>
                              <span className="flex items-center">
                                <Phone size={14} className="mr-1" />
                                {reservation.phone}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <Calendar size={14} className="mr-1 text-gray-400" />
                              {format(new Date(reservation.reservation_date), 'dd MMM yyyy', { locale: es })}
                            </span>
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1 text-gray-400" />
                              {reservation.reservation_time}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center text-sm">
                            <Users size={14} className="mr-1 text-gray-400" />
                            {reservation.guests}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status, reservation.attended)}`}>
                            {getStatusText(reservation.status, reservation.attended)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {reservation.status !== 'cancelled' && (
                            <button
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setShowCancelModal(true);
                              }}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Cancelar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        {/* Cancel Modal */}
        {showCancelModal && selectedReservation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-red-600" size={24} />
                  <h3 className="text-xl font-semibold">Cancelar Reserva</h3>
                </div>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedReservation(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres cancelar la reserva de <strong>{selectedReservation.name}</strong>?
                <br /><br />
                Se enviará un email de notificación al cliente.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedReservation(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  No, mantener
                </button>
                <button
                  onClick={handleCancelReservation}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sí, cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete All Modal */}
        {showDeleteAllModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-red-600" size={24} />
                  <h3 className="text-xl font-semibold">Eliminar TODAS las reservas</h3>
                </div>
                <button
                  onClick={() => setShowDeleteAllModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium mb-2">¡Atención! Acción destructiva</p>
                <p className="text-red-600 text-sm">
                  Estás a punto de eliminar permanentemente <strong>todas ({reservations.length})</strong> las reservas de la base de datos.
                  <br /><br />
                  Esta acción <strong>no se puede deshacer</strong> y los clientes no recibirán notificación de cancelación.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteAllModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteAllReservations}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex justify-center items-center"
                >
                  Sí, eliminar todas
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
