"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ShoppingCart, 
  Car, 
  HelpCircle, 
  BookOpen, 
  Truck, 
  ShieldCheck, 
  Menu, 
  X, 
  Heart, 
  PhoneCall,
  UserCheck,
  ChevronDown
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { useCart } from "@/lib/cartContext";
import { formatCOP } from "@/lib/formatters";
import { CATEGORIES } from "@/lib/categoriesData";

interface HeaderProps {
  onOpenVehicleSelector?: () => void;
}

export function Header({ onOpenVehicleSelector }: HeaderProps) {
  const router = useRouter();
  const { totalItems, subtotalCOP, setIsCartDrawerOpen, activeVehicle, clearActiveVehicle, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalogo");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Barra superior de anuncios y beneficios colombianos */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-amber-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Envíos a toda Colombia
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-200">
              Despacho asegurado desde Bogotá a más de 900 municipios
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline font-semibold text-emerald-300">
              Precios en Pesos Colombianos (COP) • IVA incluido
            </span>
            <a 
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">{SITE_CONFIG.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cabecera Principal */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logotipo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-navy">
                  Repuest<span className="text-brand-orange">OS</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  CO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Autopartes y Repuestos en Colombia
              </p>
            </div>
          </Link>

          {/* Barra de Búsqueda Destacada */}
          <form 
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl mx-2 hidden lg:block"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="¿Qué repuesto necesita tu carro? (Ej. Pastillas Onix, Filtro Duster, Bujías...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 bg-slate-50 border-2 border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Botón Selector de Vehículo Activo */}
          <button
            onClick={onOpenVehicleSelector}
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              activeVehicle
                ? "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
            }`}
            title="Seleccionar marca, modelo y año de vehículo para filtrar compatibilidad"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              activeVehicle ? "bg-emerald-600 text-white" : "bg-brand-navy text-white"
            }`}>
              <Car className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-semibold uppercase text-slate-500">
                {activeVehicle ? "Vehículo Seleccionado" : "Compatibilidad"}
              </div>
              <div className="font-bold truncate max-w-[150px]">
                {activeVehicle ? `${activeVehicle.makeName} ${activeVehicle.modelName} (${activeVehicle.year})` : "¿Cuál es tu carro?"}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Accesos de Usuario y Carrito */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Seguimiento de Pedidos */}
            <Link
              href="/seguimiento"
              className="hidden sm:flex flex-col items-center p-2 text-slate-600 hover:text-brand-orange transition-colors"
              title="Rastrear mi pedido en Colombia"
            >
              <Truck className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-0.5">Rastreo</span>
            </Link>

            {/* Panel Admin Shortcut */}
            <Link
              href="/admin"
              className="hidden sm:flex flex-col items-center p-2 text-slate-600 hover:text-brand-navy transition-colors"
              title="Panel Administrativo"
            >
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              <span className="text-[10px] font-medium mt-0.5">Admin</span>
            </Link>

            {/* Favoritos */}
            <Link
              href="/favoritos"
              className="relative p-2 text-slate-700 hover:text-brand-orange transition-colors"
              title="Lista de Repuestos Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Botón Carrito de Compras */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white px-3.5 py-2.5 rounded-xl font-medium transition-all shadow-sm group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-brand-navy">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="text-left hidden xl:block">
                <div className="text-[10px] text-slate-300 uppercase leading-none">Mi Carrito</div>
                <div className="text-xs font-bold text-amber-300 leading-tight">
                  {formatCOP(subtotalCOP)}
                </div>
              </div>
            </button>

            {/* Botón menú móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-brand-orange focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Buscador móvil visible en pantallas pequeñas */}
        <div className="mt-3 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="¿Qué repuesto necesita tu carro?..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-2 bg-slate-50 border border-slate-300 focus:border-brand-orange rounded-lg text-sm focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-brand-orange text-white rounded text-xs font-bold"
            >
              Buscar
            </button>
          </form>

          {/* Selector de vehículo en móvil */}
          <button
            onClick={onOpenVehicleSelector}
            className={`mt-2 w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium ${
              activeVehicle
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-slate-50 border-slate-300 text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-brand-orange" />
              <span>
                {activeVehicle
                  ? `Filtro Activo: ${activeVehicle.makeName} ${activeVehicle.modelName} ${activeVehicle.year}`
                  : "Selecciona tu vehículo para verificar compatibilidad"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Sub-barra de Navegación de Categorías y Didáctica */}
      <nav className="bg-slate-50 border-t border-slate-200 hidden lg:block overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-medium text-slate-700">
          <div className="flex items-center space-x-1 py-1">
            <Link
              href="/catalogo"
              className="px-3 py-2 rounded-lg hover:bg-white hover:text-brand-orange transition-colors font-bold text-brand-navy"
            >
              Todos los Repuestos
            </Link>

            {CATEGORIES.slice(0, 7).map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}`}
                className="px-3 py-2 rounded-lg hover:bg-white hover:text-brand-orange transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}

            <Link
              href="/catalogo"
              className="px-2.5 py-2 text-slate-500 hover:text-brand-navy flex items-center gap-1 font-semibold"
            >
              Más categorías +
            </Link>
          </div>

          <div className="flex items-center gap-3 py-1">
            <Link
              href="/asistente"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 hover:bg-amber-100 rounded-lg font-semibold border border-amber-200 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              Asistente: ¿Qué le pasa a tu carro?
            </Link>

            <Link
              href="/glosario"
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-brand-navy rounded-lg transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Glosario Didáctico
            </Link>
          </div>
        </div>
      </nav>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 p-4 space-y-4 shadow-xl">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Navegación Principal
            </div>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-brand-navy hover:bg-slate-100"
            >
              Catálogo Completo de Repuestos
            </Link>
            <Link
              href="/asistente"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Asistente de Búsqueda Guiada
            </Link>
            <Link
              href="/glosario"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              Glosario y Consejos de Mecánica
            </Link>
            <Link
              href="/seguimiento"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              Rastrear Pedido en Colombia
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              Panel Administrativo
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Categorías de Repuestos
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-brand-orange truncate rounded hover:bg-slate-50"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Atención Telefónica y WhatsApp:</p>
            <p>{SITE_CONFIG.contact.phone}</p>
            <p className="text-emerald-600 font-bold">{SITE_CONFIG.contact.whatsappDisplay}</p>
          </div>
        </div>
      )}
    </header>
  );
}
