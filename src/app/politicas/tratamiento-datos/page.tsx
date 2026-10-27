import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function TratamientoDatosPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
          <Shield className="w-4 h-4 text-blue-600" />
          Habeas Data Colombia
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Política de Tratamiento y Protección de Datos Personales
        </h1>
        <p className="text-xs text-slate-500">
          En cumplimiento de la Ley Estatutaria 1581 de 2012 y el Decreto Reglamentario 1377 de 2013
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Responsable del Tratamiento</h2>
          <p>
            <strong>Razón Social:</strong> {SITE_CONFIG.legalName} • <strong>NIT:</strong> {SITE_CONFIG.nit} • <strong>Domicilio:</strong> {SITE_CONFIG.contact.address} • <strong>Correo de contacto:</strong> {SITE_CONFIG.contact.email}.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Finalidad de la Recolección de Datos</h2>
          <p>
            Los datos personales suministrados por el comprador (nombre, cédula/NIT, teléfono, dirección, correo y datos de vehículo) serán utilizados exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Procesamiento, facturación electrónica legal ante la DIAN y entrega de pedidos a través de empresas transportadoras colombianas.</li>
            <li>Verificación de compatibilidad técnica automotriz previa al despacho.</li>
            <li>Atención de requerimientos, garantías y servicio posventa.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Derechos del Titular (Habeas Data)</h2>
          <p>
            Conforme a la Ley 1581 de 2012, usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos personales en cualquier momento escribiendo a <strong>{SITE_CONFIG.contact.email}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
