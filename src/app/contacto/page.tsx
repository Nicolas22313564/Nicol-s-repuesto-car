"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Car, 
  Wrench,
  ArrowLeft
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-orange font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la tienda</span>
      </Link>

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Contacto y Atención al Cliente
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          ¿Tienes dudas sobre la compatibilidad de una pieza, cotizaciones especiales para flotas o estado de un pedido? Contáctanos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Información y canales directos */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Puntos de Atención en Colombia</h2>

          <div className="space-y-4 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Bodega y Despacho Principal</span>
                <p>{SITE_CONFIG.contact.address}</p>
                <span className="text-[11px] text-slate-400">Recogida disponible previa confirmación de pago</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Línea Oficial de WhatsApp</span>
                <p className="font-bold text-emerald-700">{SITE_CONFIG.contact.whatsappDisplay}</p>
                <span className="text-[11px] text-slate-400">Asesoría mecánica y verificación de códigos de chasis</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Línea Telefónica Fija</span>
                <p>{SITE_CONFIG.contact.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-sm">Horarios de Atención al Público</span>
                <p>{SITE_CONFIG.contact.hours}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                "Hola RepuestOS Colombia, quisiera consultar sobre un repuesto para mi vehículo."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear ahora por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Formulario de consulta */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Envíanos un Mensaje</h2>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-base">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs text-emerald-800">
                Uno de nuestros asesores técnicos automotrices te responderá en menos de 2 horas hábiles.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono Móvil *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. 312 345 6789"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vehículo (Marca, Modelo y Año)</label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  placeholder="Ej. Renault Duster 2021 1.6L o Chevrolet Onix 2019"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">¿Qué repuesto buscas o qué duda tienes? *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe la pieza, falla o número de referencia si lo tienes..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Consulta Técnica</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
