"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  ShieldCheck, 
  PhoneCall,
  AlertCircle
} from "lucide-react";
import { INITIAL_DEMO_ORDERS, Order } from "@/lib/ordersStore";
import { formatCOP } from "@/lib/formatters";
import { SITE_CONFIG } from "@/lib/config";

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orden") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (id: string) => {
    const cleanId = id.trim().toUpperCase();
    const found = INITIAL_DEMO_ORDERS.find((o) => o.id.toUpperCase() === cleanId);
    setCurrentOrder(found || null);
    setHasSearched(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery) {
      handleSearch(orderQuery);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Encabezado */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase">
          <Truck className="w-3.5 h-3.5 text-brand-orange" />
          Logística Nacional Asegurada
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Rastreo de Pedidos y Guías de Envío
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Consulta en tiempo real el estado de preparación y despacho de tus repuestos hacia cualquier municipio de Colombia.
        </p>
      </div>

      {/* Buscador de pedido */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={onSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Ingresa tu número de orden (Ej: REP-COL-74210)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-xs font-bold transition-colors shadow"
          >
            Consultar Estado
          </button>
        </form>

        <div className="mt-3 text-center text-xs text-slate-400">
          Pedidos de prueba disponibles para rastrear: <code className="text-brand-navy font-bold">REP-COL-74210</code>, <code className="text-brand-navy font-bold">REP-COL-74209</code> o <code className="text-brand-navy font-bold">REP-COL-74208</code>.
        </div>
      </div>

      {/* Resultados de Búsqueda */}
      {hasSearched && (
        currentOrder ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 font-mono">Orden de Compra:</span>
                <h3 className="text-xl font-black text-brand-navy">{currentOrder.id}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-emerald-100 text-emerald-800">
                  Estado: {currentOrder.status.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Línea de tiempo de la entrega */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">1. Pago Confirmado</span>
                <span className="text-xs font-bold text-slate-800 block mt-1">Recibido en sistema</span>
              </div>

              <div className={`p-3 rounded-xl border ${
                currentOrder.status === "en_preparacion" || currentOrder.status === "despachado" || currentOrder.status === "entregado"
                  ? "bg-slate-50 border-slate-200"
                  : "bg-white border-slate-100 opacity-50"
              }`}>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">2. En Bodega Bogotá</span>
                <span className="text-xs font-bold text-slate-800 block mt-1">Empacado y verificado</span>
              </div>

              <div className={`p-3 rounded-xl border ${
                currentOrder.status === "despachado" || currentOrder.status === "entregado"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-white border-slate-100 opacity-50"
              }`}>
                <span className="text-[10px] text-emerald-700 uppercase font-bold block">3. En Ruta Nacional</span>
                <span className="text-xs font-bold block mt-1">Con transportadora</span>
              </div>

              <div className={`p-3 rounded-xl border ${
                currentOrder.status === "entregado"
                  ? "bg-emerald-100 border-emerald-300 text-emerald-950"
                  : "bg-white border-slate-100 opacity-50"
              }`}>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">4. Entrega Final</span>
                <span className="text-xs font-bold block mt-1">Entregado en destino</span>
              </div>
            </div>

            {/* Guía y Transportadora */}
            {currentOrder.trackingNumber && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Transportadora Asignada:</span>
                  <div className="font-extrabold text-slate-900 text-sm">{currentOrder.carrier}</div>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Número de Guía de Envío:</span>
                  <div className="font-mono font-bold text-brand-orange text-sm">{currentOrder.trackingNumber}</div>
                </div>
              </div>
            )}

            {/* Datos de entrega */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Destinatario:</span>
                <p>{currentOrder.customer.fullName}</p>
                <p>{currentOrder.customer.documentType}: {currentOrder.customer.documentNumber}</p>
                <p>{currentOrder.customer.phone}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Dirección de Destino:</span>
                <p>{currentOrder.customer.address} {currentOrder.customer.addressDetails}</p>
                <p>{currentOrder.customer.city}, {currentOrder.customer.department}</p>
              </div>
            </div>

            {/* Productos en el envío */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Contenido del paquete:</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {currentOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{item.name}</span>
                      <div className="text-[11px] text-slate-400">Ref: {item.sku} • Cant: {item.quantity}</div>
                    </div>
                    <span className="font-bold text-brand-navy">{formatCOP(item.subtotalCOP)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right text-xs">
              <span className="text-slate-500">Total pagado en COP: </span>
              <span className="text-base font-black text-brand-navy">{formatCOP(currentOrder.totalCOP)}</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="font-bold text-slate-800">No encontramos la orden solicitada</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Verifica que el código coincida con el número enviado a tu correo o escríbenos a soporte técnico por WhatsApp.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Cargando módulo de rastreo...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
