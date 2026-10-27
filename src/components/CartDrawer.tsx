"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  AlertTriangle 
} from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { formatCOP } from "@/lib/formatters";
import { SITE_CONFIG } from "@/lib/config";
import { COLOMBIAN_DEPARTMENTS } from "@/lib/colombiaLocations";

export function CartDrawer() {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotalCOP, 
    shippingCOP, 
    isFreeShipping, 
    totalCOP,
    selectedDepartmentId,
    selectedCityId,
    setShippingLocation,
    selectedCityData
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalCOP / SITE_CONFIG.shipping.freeShippingThreshold) * 100)
  );

  const missingForFreeShipping = SITE_CONFIG.shipping.freeShippingThreshold - subtotalCOP;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro con cierre al hacer clic fuera */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cabecera del Carrito */}
          <div className="p-4 bg-brand-navy text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-orange" />
              <h2 className="text-base font-bold">Carrito de Compras</h2>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Barra de progreso de Envío Gratis Nacional */}
          <div className="bg-orange-50 px-4 py-2.5 border-b border-orange-100 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>¡Genial! Calificas para ENVÍO GRATIS a toda Colombia.</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-brand-orange" />
                    Envío gratis desde {formatCOP(SITE_CONFIG.shipping.freeShippingThreshold)}
                  </span>
                  <span className="font-bold text-brand-orange">
                    Faltan {formatCOP(missingForFreeShipping)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-brand-orange h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Lista de Repuestos en el Carrito */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Tu carrito está vacío</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explora nuestro catálogo de repuestos garantizados para tu carro con despacho a toda Colombia.
                  </p>
                </div>
                <Link
                  href="/catalogo"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Explorar Catálogo
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl relative group"
                >
                  {/* Foto miniatura */}
                  <div className="relative w-18 h-18 w-20 h-20 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Datos del producto */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {item.product.brand} • {item.product.sku}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Eliminar repuesto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                        {item.product.name}
                      </h4>

                      <div className="text-xs font-bold text-brand-navy mt-1">
                        {formatCOP(item.product.price)}
                      </div>
                    </div>

                    {/* Controles de Cantidad */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Disminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold font-mono text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-900">
                        {formatCOP(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {item.quantity >= item.product.stock && (
                      <div className="text-[10px] text-amber-700 font-medium mt-1">
                        Máximo disponible en inventario: {item.product.stock} unids.
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cálculo de Envío y Resumen en Pesos COP */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Selector Rápido de Ciudad Colombiana para Flete */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-700 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-500" />
                    Destino de entrega en Colombia:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {selectedCityData?.deliveryTimeDays}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedDepartmentId}
                    onChange={(e) => {
                      const depId = e.target.value;
                      const dep = COLOMBIAN_DEPARTMENTS.find((d) => d.id === depId);
                      const defaultCity = dep?.cities[0]?.id || "";
                      setShippingLocation(depId, defaultCity);
                    }}
                    className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    {COLOMBIAN_DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCityId}
                    onChange={(e) => setShippingLocation(selectedDepartmentId, e.target.value)}
                    className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    {COLOMBIAN_DEPARTMENTS.find((d) => d.id === selectedDepartmentId)?.cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Desglose Monetario en COP */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal repuestos (IVA incluido):</span>
                  <span className="font-semibold text-slate-900">{formatCOP(subtotalCOP)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Flete de envío ({selectedCityData?.name || "Colombia"}):</span>
                  {shippingCOP === 0 ? (
                    <span className="font-bold text-emerald-600 uppercase">Gratis</span>
                  ) : (
                    <span className="font-semibold text-slate-900">{formatCOP(shippingCOP)}</span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-slate-900">Total a Pagar:</span>
                    <span className="block text-[10px] text-slate-500">Moneda legal: Pesos Colombianos</span>
                  </div>
                  <span className="text-lg font-black text-brand-orange">
                    {formatCOP(totalCOP)}
                  </span>
                </div>
              </div>

              {/* Botón de Checkout */}
              <Link
                href="/checkout"
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-full py-3 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-center font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Tramitar Pedido Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Compra protegida • Factura electrónica DIAN • Ley 1480</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
