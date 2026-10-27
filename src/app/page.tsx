"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Car, 
  ShieldCheck, 
  Truck, 
  PhoneCall, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Wrench, 
  Zap, 
  Tag, 
  Clock, 
  Award,
  ThumbsUp
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { CATEGORIES } from "@/lib/categoriesData";
import { PRODUCTS } from "@/lib/productsData";
import { COLOMBIAN_VEHICLES } from "@/lib/vehiclesData";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cartContext";
import { formatCOP } from "@/lib/formatters";

export default function HomePage() {
  const router = useRouter();
  const { activeVehicle, setActiveVehicle } = useCart();

  // Estados locales para el widget de selección de vehículo en el Hero
  const [heroMakeId, setHeroMakeId] = useState(activeVehicle?.makeId || "");
  const [heroModelId, setHeroModelId] = useState(activeVehicle?.modelId || "");
  const [heroYear, setHeroYear] = useState<number | "">(activeVehicle?.year || "");
  const [heroSearchText, setHeroSearchText] = useState("");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedMake = COLOMBIAN_VEHICLES.find((m) => m.id === heroMakeId);
  const selectedModel = selectedMake?.models.find((m) => m.id === heroModelId);

  const handleHeroVehicleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMake && selectedModel && heroYear) {
      setActiveVehicle({
        makeId: selectedMake.id,
        makeName: selectedMake.name,
        modelId: selectedModel.id,
        modelName: selectedModel.name,
        year: Number(heroYear),
        engine: selectedModel.versions[0] || "Estándar",
      });
      router.push(`/catalogo?vehiculo=${selectedMake.id}-${selectedModel.id}-${heroYear}`);
    } else {
      router.push("/catalogo");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchText.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(heroSearchText.trim())}`);
    } else {
      router.push("/catalogo");
    }
  };

  // Filtrado de productos para secciones destacadas
  const offerProducts = PRODUCTS.filter((p) => p.isOffer).slice(0, 4);
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  const faqs = [
    {
      q: "¿Cómo sé si el repuesto le sirve exactamente a mi carro?",
      a: "Puedes utilizar nuestro selector de vehículo (Marca, Modelo y Año) para que el catálogo filtre solo las piezas verificadas. Adicionalmente, al realizar tu compra o antes de ella, nuestro equipo técnico revisa la compatibilidad por WhatsApp con el número de chasis (VIN) de tu carro sin costo alguno.",
    },
    {
      q: "¿En qué moneda se cobran los pedidos y qué métodos de pago aceptan?",
      a: "Todos los precios están expresados exclusivamente en Pesos Colombianos (COP) e incluyen el IVA del 19%. Aceptamos pagos seguros mediante Wompi (Bancolombia, Nequi, Tarjetas de Crédito/Débito), transferencia PSE y Pago Contra Entrega en efectivo al momento de recibir en ciudades seleccionadas.",
    },
    {
      q: "¿Cuánto tarda el envío y qué transportadoras utilizan?",
      a: "Despachamos desde nuestra bodega en Bogotá a través de Coordinadora Mercantil, Servientrega y Envía Colvanes. Los tiempos habituales son de 1 a 2 días hábiles en Bogotá y Cundinamarca, de 2 a 3 días hábiles en ciudades principales (Medellín, Cali, Barranquilla, Bucaramanga) y de 3 a 5 días hábiles en otros municipios.",
    },
    {
      q: "¿Qué garantía tienen los repuestos que compro en RepuestOS Colombia?",
      a: "Todos nuestros repuestos cuentan con garantía legal colombiana conforme a la Ley 1480 de 2011 (Estatuto del Consumidor), oscilando entre 6 meses y 2 años según el fabricante (Bosch, Brembo, Monroe, Valeo, etc.). Cubre defectos de fabricación o fallas prematuras del material.",
    },
    {
      q: "No tengo conocimientos de mecánica. ¿Cómo sé qué pieza necesito?",
      a: "¡Diseñamos RepuestOS Colombia para ti! Puedes usar nuestro Asistente Didáctico Guiado que te formula preguntas sencillas sobre el síntoma que tiene el carro (ej: chirrido al frenar, no prende en la mañana, motor caliente) y te sugiere la categoría indicada.",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. SECCIÓN HERO CON SELECTOR DE VEHÍCULO INTELIGENTE */}
      <section className="relative bg-gradient-to-br from-brand-navy via-slate-900 to-brand-blue text-white pt-10 pb-16 sm:pb-24 px-4 overflow-hidden">
        {/* Efecto de fondo sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff5e14_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Repuestos Automotrices en Colombia • 100% Garantizados
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              ¿Qué repuesto necesita <br className="hidden sm:inline" />
              <span className="text-brand-orange underline decoration-brand-orange/40">tu carro hoy?</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Encuentra repuestos originales y homologados para Chevrolet, Renault, Mazda, Kia, Toyota y más. Precios en pesos colombianos y envíos seguros a todo el país.
            </p>

            {/* Buscador de texto rápido en el Hero */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center shadow-xl">
                <input
                  type="text"
                  placeholder="Escribe el nombre o referencia del repuesto..."
                  value={heroSearchText}
                  onChange={(e) => setHeroSearchText(e.target.value)}
                  className="w-full pl-11 pr-28 py-3.5 bg-white text-slate-900 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-orange/30 placeholder-slate-400"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-5 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
                >
                  <span>Buscar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Widget de Búsqueda por Vehículo: Marca -> Modelo -> Año */}
          <div className="mt-10 sm:mt-12 bg-white text-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-navy text-brand-orange flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-brand-navy">
                    Búsqueda Rápida por Vehículo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Evita compras erróneas: te mostramos repuestos que calzan al 100%
                  </p>
                </div>
              </div>

              {activeVehicle && (
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Filtro activo: {activeVehicle.makeName} {activeVehicle.modelName} ({activeVehicle.year})</span>
                </div>
              )}
            </div>

            <form onSubmit={handleHeroVehicleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
              {/* Selector 1: Marca */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  1. Marca del Carro
                </label>
                <select
                  value={heroMakeId}
                  onChange={(e) => {
                    setHeroMakeId(e.target.value);
                    setHeroModelId("");
                    setHeroYear("");
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  <option value="">Selecciona Marca...</option>
                  {COLOMBIAN_VEHICLES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selector 2: Modelo */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  2. Modelo
                </label>
                <select
                  value={heroModelId}
                  disabled={!heroMakeId}
                  onChange={(e) => {
                    setHeroModelId(e.target.value);
                    setHeroYear("");
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-orange focus:outline-none disabled:opacity-50"
                >
                  <option value="">Selecciona Modelo...</option>
                  {selectedMake?.models.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selector 3: Año */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  3. Año
                </label>
                <select
                  value={heroYear}
                  disabled={!heroModelId}
                  onChange={(e) => setHeroYear(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-orange focus:outline-none disabled:opacity-50"
                >
                  <option value="">Selecciona Año...</option>
                  {selectedModel?.years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón de Aplicar Filtro */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={!heroMakeId || !heroModelId || !heroYear}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orangeHover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Car className="w-4 h-4" />
                  <span>Ver Compatibles</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. CATEGORÍAS VISUALES CON IMÁGENES */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              Explora Nuestro Catálogo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Repuestos por Categoría
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Las 12 líneas esenciales para el mantenimiento de tu vehículo
            </p>
          </div>

          <Link
            href="/catalogo"
            className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 transition-colors"
          >
            <span>Ver todo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogo?categoria=${cat.slug}`}
              className="group bg-white border border-slate-200 hover:border-brand-orange rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2 bg-slate-100">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-brand-orange transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {cat.itemCount}+ repuestos
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PRODUCTOS EN OFERTA CON PRECIOS COP */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl p-6 sm:p-8 border border-orange-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase">
                <Tag className="w-3 h-3" />
                Precios Especiales de Temporada
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Ofertas Destacadas en Pesos Colombianos
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Ahorra en repuestos de alta rotación con despacho inmediato
              </p>
            </div>

            <Link
              href="/catalogo?ofertas=true"
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-orange-300 text-brand-orange font-bold text-xs rounded-xl self-start sm:self-auto shadow-sm transition-colors"
            >
              Ver Todas las Ofertas →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ASISTENTE DIDÁCTICO BANNER: "¿NO SABES DE MECÁNICA?" */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Didáctica Automotriz para Todos
            </span>

            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              ¿No sabes de mecánica? <br />
              <span className="text-brand-orange">Te ayudamos a diagnosticar y comprar sin enredos.</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              En RepuestOS Colombia explicamos en palabras sencillas para qué sirve cada pieza, cómo saber si es compatible, cuándo cambiarla y qué síntomas presenta tu carro cuando falla.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/asistente"
                className="px-5 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <span>Iniciar Asistente Guiado</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/glosario"
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-colors"
              >
                Consultar Glosario Mecánico
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 hidden lg:block pointer-events-none">
            <div className="h-full flex items-center justify-center">
              <Wrench className="w-72 h-72 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. REPUESTOS MÁS VENDIDOS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              Preferidos por los Conductores
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Los Repuestos Más Vendidos en Colombia
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Calidad comprobada para las marcas más vendidas del país
            </p>
          </div>

          <Link
            href="/catalogo"
            className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 transition-colors"
          >
            <span>Ver catálogo completo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. BENEFICIOS CLAVE DE COMPRAR EN REPUESTOS COLOMBIA */}
      <section className="bg-slate-100 py-12 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
              Confianza y Respaldo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              ¿Por qué comprar tus repuestos con nosotros?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Diseñamos una experiencia de compra transparente y respaldada por la ley colombiana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Garantía Legal Ley 1480 de 2011
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Todos los repuestos tienen garantía de fábrica demostrable. Cuentas con derecho de retracto de 5 días hábiles conforme al Estatuto del Consumidor colombiano.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Envíos Seguros a Todo el Territorio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Despachamos desde Bogotá hacia más de 900 municipios vía Coordinadora, Servientrega y Envía. Envío GRATIS en compras superiores a $250.000 COP.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Asesoría Técnica por WhatsApp
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ¿Dudas con la referencia o modelo de tu carro? Nuestros mecánicos verifican la compatibilidad antes de enviar para que nunca pierdas tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            Resolvemos tus dudas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Todo lo que necesitas saber sobre envíos, pagos en COP y garantías
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:text-brand-orange transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-brand-orange" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. LLAMADO A LA ACCIÓN POR WHATSAPP */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              ¿No encuentras el repuesto o tienes la referencia en mano?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Escríbenos directamente a nuestra línea oficial de atención. Con el número de pieza o los datos de tu carro te damos cotización en minutos en pesos colombianos.
            </p>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
              "Hola RepuestOS Colombia, necesito cotizar un repuesto que no encontré en la web."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-800 rounded-xl font-black text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2 flex-shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
