"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { 
  CheckCircle2, 
  XCircle, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Wrench, 
  Truck, 
  PhoneCall, 
  ArrowLeft,
  Share2,
  FileText,
  Clock,
  Sparkles,
  Car
} from "lucide-react";
import { PRODUCTS } from "@/lib/productsData";
import { useCart } from "@/lib/cartContext";
import { formatCOP } from "@/lib/formatters";
import { SITE_CONFIG } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const product = PRODUCTS.find((p) => p.id === productId);

  const { addToCart, activeVehicle, toggleWishlist, isWishlisted } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-800">Repuesto no encontrado</h2>
        <p className="text-slate-500 text-sm">El producto que buscas no existe o fue descontinuado.</p>
        <Link
          href="/catalogo"
          className="inline-block px-5 py-2.5 bg-brand-orange text-white rounded-xl text-xs font-bold"
        >
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const isFavorite = isWishlisted(product.id);

  // Comprobar compatibilidad con vehículo activo
  const isCompatible = activeVehicle
    ? product.compatibleVehicles.some((v) => {
        const matchMake = v.make.toLowerCase() === activeVehicle.makeId.toLowerCase();
        const matchModel = v.model.toLowerCase() === activeVehicle.modelId.toLowerCase();
        const matchYear = activeVehicle.year >= v.yearFrom && activeVehicle.year <= v.yearTo;
        return matchMake && matchModel && matchYear;
      })
    : null;

  const handleAddToCart = () => {
    const result = addToCart(product, quantity);
    setActionNotice(result.message);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Repuestos relacionados de la misma categoría
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // WhatsApp dinámico con datos exactos del repuesto y vehículo
  const buildWhatsAppUrl = () => {
    let msg = `Hola ${SITE_CONFIG.name}, tengo una consulta sobre el repuesto: *${product.name}* (Ref: ${product.sku}, Marca: ${product.brand}).\n`;
    if (activeVehicle) {
      msg += `🚗 *Mi vehículo:* ${activeVehicle.makeName} ${activeVehicle.modelName} ${activeVehicle.year} (${activeVehicle.engine}).\n`;
    }
    msg += `¿Me confirman si tienen disponibilidad en bodega y si es 100% compatible?`;
    return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Migas de pan y retorno */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-orange font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo de Repuestos</span>
        </Link>

        {product.isDemo && (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
            Producto de Demostración
          </span>
        )}
      </div>

      {/* BLOQUE PRINCIPAL: FOTO + DATOS COMERCIALES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Fotografía en alta resolución */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-96 md:h-[450px] w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm group">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.isOffer && (
              <span className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-black uppercase px-3 py-1 rounded-lg shadow">
                Oferta Especial
              </span>
            )}
          </div>

          {/* Garantía y Facturación Legal */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Garantía Certificada</span>
                <span className="text-[11px] text-slate-500">{product.warranty}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Envío Nacional</span>
                <span className="text-[11px] text-slate-500">Despacho desde Bogotá</span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Especificaciones comerciales y compra */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-black text-brand-navy uppercase bg-slate-100 px-2.5 py-1 rounded-md">
                  Marca: {product.brand}
                </span>
                <span className="font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                  Ref / SKU: {product.sku}
                </span>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full border transition-colors ${
                  isFavorite
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "border-slate-200 text-slate-400 hover:text-rose-500"
                }`}
                title="Favorito"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              {product.simpleDescription}
            </p>
          </div>

          {/* Estado de compatibilidad con el carro del usuario */}
          <div className="p-4 rounded-2xl border transition-all">
            {activeVehicle ? (
              isCompatible ? (
                <div className="flex items-center gap-3 text-emerald-800 bg-emerald-50/50 p-2 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">
                      ¡100% Compatible con tu {activeVehicle.makeName} {activeVehicle.modelName} ({activeVehicle.year})!
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      Verificado según especificaciones oficiales del fabricante.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-rose-800 bg-rose-50/50 p-2 rounded-xl">
                  <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">
                      Atención: No es compatible con tu {activeVehicle.modelName}
                    </span>
                    <span className="text-[11px] text-rose-700">
                      Revisa la lista de vehículos compatibles más abajo o pregúntanos por WhatsApp.
                    </span>
                  </div>
                </div>
              )
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-medium">
                  ¿Dudas si le sirve a tu carro?
                </span>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Preguntar a un asesor
                </a>
              </div>
            )}
          </div>

          {/* Caja de Precio Exclusivamente en COP */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">
                  Precio de contado (IVA 19% incluido):
                </span>
                <span className="text-2xl sm:text-3xl font-black text-brand-navy">
                  {formatCOP(product.price)}
                </span>
              </div>

              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block">
                    {formatCOP(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-brand-orange">
                    Ahorras {formatCOP(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Disponibilidad de Inventario */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <span className="text-slate-600">Disponibilidad en bodega:</span>
              {product.stock > 0 ? (
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {product.stock} unidades disponibles para despacho inmediato
                </span>
              ) : (
                <span className="font-bold text-rose-600">Agotado temporalmente</span>
              )}
            </div>
          </div>

          {/* Selector de Cantidad y Botones de Compra */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-slate-100 text-slate-700 font-bold"
                  title="Restar unidad"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold font-mono text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="px-3 py-2.5 hover:bg-slate-100 text-slate-700 font-bold disabled:opacity-40"
                  title="Sumar unidad"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-3 px-6 bg-brand-orange hover:bg-brand-orangeHover disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar al Carrito ({formatCOP(product.price * quantity)})</span>
              </button>
            </div>

            {/* Botón WhatsApp de consulta rápida sobre esta referencia */}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Consultar Disponibilidad y Asesoría por WhatsApp</span>
            </a>

            {actionNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                {actionNotice}
              </div>
            )}
          </div>

          {/* Advertencia de instalación técnica calificada */}
          {product.technicalInstallationRequired && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-amber-950">
                  Advertencia de Instalación Técnica Calificada
                </span>
                <p className="mt-0.5 text-amber-800 leading-relaxed">
                  Este componente automotriz requiere montaje por parte de un mecánico profesional con herramienta adecuada y torquímetro según manual de taller. Una instalación inadecuada puede comprometer la garantía y la seguridad vial.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN DIDÁCTICA: "¿PARA QUÉ SIRVE?" Y "¿CÓMO SABER SI ES COMPATIBLE?" */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-sm">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            Aprende con RepuestOS
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Información Técnica y Didáctica del Repuesto
          </h2>
          <p className="text-xs text-slate-500">
            Explicado en español claro para que tomes la mejor decisión de mantenimiento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ¿Para qué sirve? */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-black text-brand-navy text-sm sm:text-base">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3>¿Para qué sirve esta pieza?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {product.purpose}
            </p>
          </div>

          {/* ¿Cómo saber si es compatible? */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-black text-brand-navy text-sm sm:text-base">
              <Car className="w-5 h-5 text-brand-orange" />
              <h3>¿Cómo saber si es compatible con tu vehículo?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {product.compatibilityGuide}
            </p>
          </div>
        </div>

        {/* Consejo de mantenimiento preventivo */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3.5">
          <Wrench className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-emerald-950">
            <span className="font-extrabold text-sm text-emerald-900 block">
              Consejo de Mantenimiento Preventivo
            </span>
            <p className="leading-relaxed">{product.maintenanceTip}</p>
          </div>
        </div>

        {/* Ficha técnica y especificaciones */}
        <div>
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
            Ficha Técnica del Fabricante
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-400 font-medium block">{key}</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista detallada de vehículos compatibles verificados */}
        <div>
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
            Vehículos Compatibles Verificados en Colombia
          </h4>
          <div className="space-y-2">
            {product.compatibleVehicles.map((v, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-black text-brand-navy uppercase">{v.make}</span>
                  <span className="font-bold text-slate-800">{v.model}</span>
                  <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                    {v.yearFrom} - {v.yearTo}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  Motorizaciones: {v.engines.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTOS RELACIONADOS */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">
            Otros repuestos de la categoría {product.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
