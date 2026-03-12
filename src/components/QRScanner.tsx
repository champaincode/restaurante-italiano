import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { X, Camera, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const handleScan = (results: any) => {
    if (results && results.length > 0) {
      const decodedText = results[0].rawValue;
      if (decodedText) {
        onScan(decodedText);
        onClose();
      }
    }
  };

  const handleError = (err: any) => {
    // Ignore routine "not found" errors, only show meaningful errors
    if (err && typeof err === "string" && err.includes("NotFound")) return;
    if (err && err.message && err.message.includes("NotFound")) return;
    if (
      err &&
      typeof err === "string" &&
      err.includes("No barcode or QR code detected")
    )
      return;

    // console.error(err);
    if (err?.name === "NotAllowedError") {
      setError(
        "Permiso de cámara denegado. Por favor, actívalo en tu navegador.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
      >
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2 text-black">
            <Camera size={20} />
            <h3 className="font-semibold">Escanear QR de Reserva</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="w-full overflow-hidden rounded-xl bg-gray-100 border-2 border-dashed border-gray-200">
            <Scanner
              key={retryKey}
              onScan={handleScan}
              onError={handleError}
              formats={["qr_code"]}
              components={{
                audio: false,
                finder: true,
              }}
              styles={{
                container: {
                  width: "100%",
                  height: "100%",
                  aspectRatio: "1/1",
                },
              }}
            />
          </div>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Apunta con la cámara al código QR que el cliente presenta en su
              email.
            </p>
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t flex justify-center">
          <button
            onClick={() => setRetryKey((prev) => prev + 1)}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw size={12} />
            <span>¿Problemas con la cámara? Recargar</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
