import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, AlertCircle, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function GarantiasRetractoPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Protección al Consumidor Colombiano
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Política de Garantías, Cambios y Derecho de Retracto
        </h1>
        <p className="text-xs text-slate-500">
          En cumplimiento de la Ley 1480 de 2011 (Estatuto del Consumidor de la República de Colombia)
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Nota de transparencia legal:</strong> Este documento expone las políticas de {SITE_CONFIG.legalName} en armonía con las directrices de la Superintendencia de Industria y Comercio (SIC). La garantía y el derecho de retracto se rigen exclusivamente bajo las disposiciones del marco legal colombiano vigente.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Garantía Legal de los Repuestos</h2>
          <p>
            Todos los repuestos nuevos comercializados a través de {SITE_CONFIG.name} cuentan con garantía legal de conformidad con el artículo 7 y siguientes de la Ley 1480 de 2011. Dicha garantía cubre defectos de fabricación, fallas en los materiales, o incompatibilidad debida a información errónea suministrada por nuestro catálogo.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Plazo de garantía:</strong> El término de garantía mínimo legal es de seis (6) meses o 10.000 kilómetros (lo que primero ocurra), pudiendo extenderse hasta uno (1) o dos (2) años en marcas que otorguen garantía extendida de fábrica (ej. Monroe, Bosch, Brembo).</li>
            <li><strong>Exclusiones:</strong> La garantía no cubre desgaste normal por uso (pastillas gastadas por kilometraje habitual), instalación inadecuada por personal no calificado, golpes o colisiones, o uso de lubricantes/refrigerantes no certificados.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Derecho de Retracto (Artículo 47, Ley 1480 de 2011)</h2>
          <p>
            En las ventas mediante comercio electrónico, el consumidor colombiano tiene derecho a retractarse de la compra dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha en que recibió el repuesto.
          </p>
          <p>
            Para ejercer este derecho, el producto debe devolverse en las mismas condiciones en que fue recibido: <em>completamente nuevo, sin marcas de instalación ni grasa, en su empaque original de fábrica con sellos y manuales intactos</em>. Los costos de transporte de la devolución corren por cuenta del comprador según lo establecido por la ley.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Procedimiento para Solicitar Cambios o Garantías</h2>
          <p>
            Comunícate con nuestra línea de atención en Colombia o escríbenos a nuestro correo oficial <strong>{SITE_CONFIG.contact.email}</strong> o WhatsApp con la copia de la factura de compra, descripción de la anomalía y fotografías del repuesto. Responderemos en un plazo máximo de quince (15) días hábiles.
          </p>
        </section>
      </div>
    </div>
  );
}
