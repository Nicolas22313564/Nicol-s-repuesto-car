import React from "react";
import Link from "next/link";
import { 
  Car, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  FileText, 
  AlertCircle 
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { CATEGORIES } from "@/lib/categoriesData";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fila superior: Valores agregados para el comprador colombiano */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-center sm:text-left">
          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Envíos a Nivel Nacional</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Cobertura con Servientrega, Coordinadora y Envía a más de 900 municipios.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Precios en Pesos COP</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Precios transparentes en COP con IVA incluido. Pagos seguros con Wompi, PSE o Contra Entrega.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantía Legal Ley 1480</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Repuestos 100% garantizados y derecho de retracto conforme a la legislación colombiana.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Compatibilidad Verificada</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Asesoría técnica automotriz antes de despachar para asegurar que el repuesto le sirva a tu carro.
              </p>
            </div>
          </div>
        </div>

        {/* Sección de 4 columnas de enlaces y datos de la empresa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-slate-800">
          {/* Columna 1: Marca y descripción legal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-brand-navy border border-slate-700 flex items-center justify-center text-white">
                <Car className="w-5 h-5 text-brand-orange" />
              </div>
              <span className="text-xl font-black text-white">
                Repuest<span className="text-brand-orange">OS</span> Colombia
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Comercializadora y distribuidora de autopartes, repuestos originales y de equipo original (OEM) para las principales marcas de vehículos en Colombia.
            </p>
            
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{SITE_CONFIG.contact.phone} • WhatsApp: {SITE_CONFIG.contact.whatsappDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{SITE_CONFIG.contact.hours}</span>
              </div>
              <div className="pt-1 text-slate-500">
                <span>Razón Social: {SITE_CONFIG.legalName} • NIT: {SITE_CONFIG.nit}</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Categorías Rápidas */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Categorías Populares
            </h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/catalogo?categoria=${c.slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    Repuestos de {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalogo" className="text-brand-orange hover:underline font-semibold">
                  Ver las 12 Categorías →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Didáctica y Ayuda al Conductor */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Aprende con RepuestOS
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/asistente" className="hover:text-brand-orange transition-colors">
                  Asistente de Síntomas del Carro
                </Link>
              </li>
              <li>
                <Link href="/glosario" className="hover:text-brand-orange transition-colors">
                  Glosario de Términos Automotrices
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-brand-orange transition-colors">
                  Rastreo de Guías en Colombia
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-brand-orange transition-colors">
                  Preguntas Frecuentes (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-brand-orange transition-colors">
                  Puntos de Atención y Recogida
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
                  Acceso Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Normatividad y Protección al Consumidor */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Seguridad y Ley Colombiana
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/politicas/garantias-retracto" className="hover:text-brand-orange transition-colors">
                  Garantías y Retracto (Ley 1480 de 2011)
                </Link>
              </li>
              <li>
                <Link href="/politicas/tratamiento-datos" className="hover:text-brand-orange transition-colors">
                  Protección de Datos (Ley 1581 de 2012)
                </Link>
              </li>
              <li>
                <Link href="/politicas/terminos" className="hover:text-brand-orange transition-colors">
                  Términos de Compraventa y Facturación
                </Link>
              </li>
              <li>
                <Link href="/politicas/envios" className="hover:text-brand-orange transition-colors">
                  Políticas y Tiempos de Entrega
                </Link>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Vigilado por la SIC
              </div>
              Superintendencia de Industria y Comercio de Colombia. Consulta tus derechos en <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">sic.gov.co</a>
            </div>
          </div>
        </div>

        {/* Fila de medios de pago y transportadoras en Colombia */}
        <div className="py-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-semibold text-slate-400 block mb-2 sm:mb-1">
              Medios de Pago Habilitados en Colombia:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-white text-[11px]">
                Wompi Bancolombia
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-blue-400 text-[11px]">
                PSE
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-emerald-400 text-[11px]">
                Mercado Pago
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-slate-200 text-[11px]">
                Tarjeta Crédito / Débito
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-bold text-amber-400 text-[11px]">
                Efectivo Contra Entrega
              </span>
            </div>
          </div>

          <div>
            <span className="font-semibold text-slate-400 block mb-2 sm:mb-1">
              Operadores Logísticos Aliados:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Coordinadora</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Servientrega</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Envía Colvanes</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Deprisa</span>
            </div>
          </div>
        </div>

        {/* Nota legal y copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name} — Todos los derechos reservados. Desarrollado para el mercado automotriz de la República de Colombia.
          </p>
          <div className="flex items-center gap-2 text-amber-500/80">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Precios expresados estrictamente en moneda de curso legal colombiana (COP).</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
