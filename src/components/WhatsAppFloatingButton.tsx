"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Car, Wrench } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { useCart } from "@/lib/cartContext";

interface WhatsAppFloatingButtonProps {
  currentProduct?: {
    name: string;
    sku: string;
    brand: string;
  };
}

export function WhatsAppFloatingButton({ currentProduct }: WhatsAppFloatingButtonProps) {
  const { activeVehicle } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");

  const buildWhatsAppMessage = (userCustomText?: string): string => {
    let msg = `Hola ${SITE_CONFIG.name}, `;

    if (currentProduct) {
      msg += `tengo una consulta sobre el repuesto: *${currentProduct.name}* (Marca: ${currentProduct.brand}, Referencia: ${currentProduct.sku}).\n`;
    } else {
      msg += `quisiera consultar la disponibilidad de un repuesto para mi carro.\n`;
    }

    if (activeVehicle) {
      msg += `🚗 *Mi vehículo:* ${activeVehicle.makeName} ${activeVehicle.modelName} (Año: ${activeVehicle.year}, Motor: ${activeVehicle.engine}).\n`;
    }

    if (userCustomText && userCustomText.trim()) {
      msg += `❓ *Pregunta:* ${userCustomText.trim()}\n`;
    } else {
      msg += `¿Tienen disponibilidad para envío inmediato y asesoría para instalación?\n`;
    }

    msg += `Agradezco su pronta atención.`;
    return encodeURIComponent(msg);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = buildWhatsAppMessage(customQuestion);
    window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
    setCustomQuestion("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Ventana emergente con formulario rápido */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn text-slate-800">
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Asesoría Técnica WhatsApp</h4>
                <p className="text-[11px] text-emerald-100">
                  Respuesta habitual en menos de 10 min
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-emerald-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            {/* Contexto detectado automáticamente */}
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-700 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-brand-orange" />
                <span>Contexto de tu consulta:</span>
              </div>
              
              {currentProduct ? (
                <div className="text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-900">{currentProduct.name}</span>
                  <div className="text-slate-400 font-mono text-[10px]">Ref: {currentProduct.sku}</div>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 italic">
                  Consulta general de repuestos y catálogo
                </div>
              )}

              {activeVehicle ? (
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 pt-1 border-t border-slate-100">
                  <Car className="w-3 h-3" />
                  <span>Tu carro: {activeVehicle.makeName} {activeVehicle.modelName} ({activeVehicle.year})</span>
                </div>
              ) : (
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  No has fijado tu vehículo (puedes indicárselo al asesor).
                </div>
              )}
            </div>

            {/* Formulario de pregunta */}
            <form onSubmit={handleSendMessage} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Escribe tu duda o solicita verificación de referencia:
                </label>
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Ej: ¿Le sirve al modelo automático? ¿Tienen disponibilidad en bodega Bogotá para envío hoy?"
                  rows={3}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Abrir Chat en WhatsApp</span>
              </button>
            </form>

            <div className="text-[10px] text-slate-400 text-center">
              Horario: {SITE_CONFIG.contact.hours}
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante pulsante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300 group"
        title="Chatear con un asesor automotriz por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-current" />
        <span className="sr-only">Asesoría por WhatsApp</span>
      </button>
    </div>
  );
}
