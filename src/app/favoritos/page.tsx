"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { PRODUCTS } from "@/lib/productsData";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-orange font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Catálogo</span>
      </Link>

      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500 fill-current" />
            <span>Mis Repuestos Guardados</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Repuestos guardados para consultar disponibilidad o comprar más adelante
          </p>
        </div>

        <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
          {wishlistedProducts.length} productos
        </span>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900">Aún no tienes repuestos guardados</h3>
          <p className="text-xs text-slate-500">
            Haz clic en el corazón de cualquier tarjeta de repuesto para guardarlo aquí.
          </p>
          <Link
            href="/catalogo"
            className="inline-block px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-xl text-xs font-bold"
          >
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
