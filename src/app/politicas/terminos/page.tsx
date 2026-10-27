import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-orange font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la tienda</span>
      </Link>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase">
          <FileText className="w-4 h-4 text-brand-orange" />
          Condiciones Comerciales
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Términos y Condiciones de Compraventa
        </h1>
        <p className="text-xs text-slate-500">
          Aplicable a todas las transacciones realizadas en la plataforma de {SITE_CONFIG.name}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Precios y Moneda</h2>
          <p>
            Todos los precios publicados en este sitio web están expresados <strong>exclusivamente en Pesos Colombianos (COP)</strong> y tienen incluido el Impuesto sobre las Ventas (IVA) a la tarifa general del 19%. No se aplican cobros ocultos ni conversiones de divisas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Facturación Electrónica DIAN</h2>
          <p>
            En cumplimiento de las resoluciones de la Dirección de Impuestos y Aduanas Nacionales (DIAN), por cada compra realizada se emitirá la correspondiente Factura Electrónica de Venta con el soporte XML y representación gráfica (PDF), la cual será remitida al correo electrónico suministrado por el cliente.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Disponibilidad y Despachos</h2>
          <p>
            Las existencias publicadas corresponden a nuestro inventario en bodega central en Bogotá y centros logísticos aliados. En caso de una inconsistencia fortuita de inventario, se notificará al cliente en un plazo inferior a 24 horas hábiles para proceder al reembolso total del dinero o suministro de un repuesto de igual o superior especificación previa autorización.
          </p>
        </section>
      </div>
    </div>
  );
}
