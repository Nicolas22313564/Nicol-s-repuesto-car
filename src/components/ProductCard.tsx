"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Wrench, 
  ArrowRight,
  Eye
} from "lucide-react";
import { Product } from "@/lib/productsData";
import { formatCOP } from "@/lib/formatters";
import { useCart } from "@/lib/cartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, activeVehicle, toggleWishlist, isWishlisted } = useCart();
  const [addedNotice, setAddedNotice] = useState(false);

  const isFavorite = isWishlisted(product.id);

  // Comprobar si el repuesto es compatible con el vehículo seleccionado
  const isCompatibleWithActiveVehicle = (): boolean | null => {
    if (!activeVehicle) return null;
    return product.compatibleVehicles.some((v) => {
      const matchMake = v.make.toLowerCase() === activeVehicle.makeId.toLowerCase();
      const matchModel = v.model.toLowerCase() === activeVehicle.modelId.toLowerCase();
      const matchYear = activeVehicle.year >= v.yearFrom && activeVehicle.year <= v.yearTo;
      return matchMake && matchModel && matchYear;
    });
  };

  const compatibilityStatus = isCompatibleWithActiveVehicle();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = addToCart(product, 1);
    if (result.success) {
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2000);
    }
  };

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-brand-blue/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Insignia de oferta o destacado */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.isOffer && (
          <span className="bg-brand-orange text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
            Oferta
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
            Más Vendido
          </span>
        )}
        {product.isDemo && (
          <span className="bg-slate-800/80 text-slate-200 text-[9px] font-medium px-1.5 py-0.5 rounded backdrop-blur-xs">
            Dato de prueba
          </span>
        )}
      </div>

      {/* Botón de favoritos */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
          isFavorite
            ? "bg-rose-50 text-rose-600 shadow"
            : "bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white"
        }`}
        title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current text-rose-500" : ""}`} />
      </button>

      {/* Fotografía del repuesto */}
      <Link href={`/producto/${product.id}`} className="block relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Agotado Temporalmente
            </span>
          </div>
        )}
      </Link>

      {/* Cuerpo de la tarjeta */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Marca fabricante y SKU Referencia */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-bold uppercase tracking-wider text-brand-navy bg-slate-100 px-2 py-0.5 rounded">
              {product.brand}
            </span>
            <span className="font-mono text-[11px] text-slate-400" title="Código de referencia de repuesto">
              Ref: {product.sku}
            </span>
          </div>

          {/* Nombre del repuesto */}
          <Link href={`/producto/${product.id}`}>
            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-brand-orange transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Breve descripción didáctica */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {product.simpleDescription}
          </p>

          {/* Indicador de compatibilidad cuando hay carro seleccionado */}
          {activeVehicle && (
            <div className="mt-2.5">
              {compatibilityStatus === true ? (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">Compatible con tu {activeVehicle.makeName} {activeVehicle.modelName}</span>
                </div>
              ) : compatibilityStatus === false ? (
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-1 rounded-md border border-rose-200">
                  <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  <span className="truncate">No compatible con tu {activeVehicle.modelName}</span>
                </div>
              ) : null}
            </div>
          )}

          {/* Stock y Garantía */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
            {product.stock > 0 ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Stock: {product.stock} unids.
              </span>
            ) : (
              <span className="text-rose-600 font-semibold">Sin existencias</span>
            )}
            <span>•</span>
            <span className="truncate" title={product.warranty}>
              {product.warranty.split(" ")[0]} {product.warranty.split(" ")[1]} gar.
            </span>
          </div>
        </div>

        {/* Sección de Precio en COP y Botones de Acción */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between gap-1 mb-3">
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Precio final (IVA incluido)</div>
              <div className="text-lg font-black text-brand-navy">
                {formatCOP(product.price)}
              </div>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {formatCOP(product.originalPrice)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/producto/${product.id}`}
              className="px-2.5 py-2 text-center rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              Detalles
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm ${
                product.stock <= 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : addedNotice
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-orange hover:bg-brand-orangeHover text-white"
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {addedNotice ? "¡Agregado!" : "Al Carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
