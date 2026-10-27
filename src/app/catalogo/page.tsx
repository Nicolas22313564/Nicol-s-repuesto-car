"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  Car, 
  X, 
  ArrowUpDown, 
  Check, 
  Sparkles,
  AlertCircle
} from "lucide-react";
import { PRODUCTS, Product } from "@/lib/productsData";
import { CATEGORIES } from "@/lib/categoriesData";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cartContext";
import { formatCOP } from "@/lib/formatters";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { activeVehicle, clearActiveVehicle } = useCart();

  // Parámetros URL iniciales
  const initialCategory = searchParams.get("categoria") || "todas";
  const initialSearch = searchParams.get("q") || "";
  const initialOnlyOffers = searchParams.get("ofertas") === "true";

  // Estados de filtros
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState<string>("todas");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyCompatible, setOnlyCompatible] = useState<boolean>(false);
  const [priceMax, setPriceMax] = useState<number>(600000);
  const [sortBy, setSortBy] = useState<"populares" | "precio-asc" | "precio-desc" | "novedades">("populares");

  // Lista única de marcas
  const allBrands = useMemo(() => {
    const brandsSet = new Set(PRODUCTS.map((p) => p.brand));
    return Array.from(brandsSet);
  }, []);

  // Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Filtro por Categoría
      if (selectedCategory !== "todas" && product.category !== selectedCategory) {
        return false;
      }

      // Filtro por Marca
      if (selectedBrand !== "todas" && product.brand !== selectedBrand) {
        return false;
      }

      // Filtro por Stock
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      // Filtro por Precio Máximo en COP
      if (product.price > priceMax) {
        return false;
      }

      // Filtro por Ofertas
      if (initialOnlyOffers && !product.isOffer) {
        return false;
      }

      // Filtro de Búsqueda por Texto (nombre, sku, marca, simpleDescription)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSKU = product.sku.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.simpleDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesSKU && !matchesBrand && !matchesDesc) {
          return false;
        }
      }

      // Filtro estricto por compatibilidad con vehículo activo
      if (onlyCompatible && activeVehicle) {
        const isCompatible = product.compatibleVehicles.some((v) => {
          const matchMake = v.make.toLowerCase() === activeVehicle.makeId.toLowerCase();
          const matchModel = v.model.toLowerCase() === activeVehicle.modelId.toLowerCase();
          const matchYear = activeVehicle.year >= v.yearFrom && activeVehicle.year <= v.yearTo;
          return matchMake && matchModel && matchYear;
        });
        if (!isCompatible) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "precio-asc") return a.price - b.price;
      if (sortBy === "precio-desc") return b.price - a.price;
      if (sortBy === "novedades") return b.id.localeCompare(a.id);
      return b.rating - a.rating; // Populares por rating
    });
  }, [selectedCategory, selectedBrand, onlyInStock, onlyCompatible, priceMax, searchTerm, sortBy, activeVehicle, initialOnlyOffers]);

  const handleResetFilters = () => {
    setSelectedCategory("todas");
    setSelectedBrand("todas");
    setSearchTerm("");
    setOnlyInStock(false);
    setOnlyCompatible(false);
    setPriceMax(600000);
    setSortBy("populares");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Cabecera del catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Inicio</span>
            <span>/</span>
            <span className="text-brand-orange font-bold">Catálogo de Repuestos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Catálogo Oficial de Repuestos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Precios exclusivos en Pesos Colombianos (COP) • Inventario en bodega y despacho nacional
          </p>
        </div>

        {/* Notificación de Vehículo Seleccionado */}
        {activeVehicle ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-900">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-[11px] uppercase text-emerald-700">Vehículo Seleccionado</div>
                <div className="font-bold text-slate-900">
                  {activeVehicle.makeName} {activeVehicle.modelName} ({activeVehicle.year})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnlyCompatible(!onlyCompatible)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  onlyCompatible
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-emerald-400 text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                {onlyCompatible ? "✓ Filtrando Solo Compatibles" : "Ver Solo Compatibles"}
              </button>
              <button
                onClick={clearActiveVehicle}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Quitar filtro de vehículo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 p-2.5 rounded-xl text-xs text-slate-600 flex items-center gap-2">
            <Car className="w-4 h-4 text-brand-orange" />
            <span>Fija tu carro en la cabecera para ver compatibilidad verificada</span>
          </div>
        )}
      </div>

      {/* Layout de dos columnas: Filtros laterales y Cuadrícula de productos */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* PANEL LATERAL DE FILTROS */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
              <span>Filtros de Búsqueda</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-400 hover:text-brand-orange font-medium"
            >
              Limpiar
            </button>
          </div>

          {/* Buscador de texto dentro del catálogo */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Buscar por palabra clave
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Pastillas, Bujía, Bosch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Categoría
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory("todas")}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === "todas"
                    ? "bg-brand-navy text-white font-bold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Todas las categorías ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-brand-navy text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Marca de Fabricante */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Marca del Fabricante
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
            >
              <option value="todas">Todas las marcas</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Rango de Precio Máximo en COP */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase mb-2">
              <span>Precio Máximo</span>
              <span className="text-brand-navy font-black">{formatCOP(priceMax)}</span>
            </div>
            <input
              type="range"
              min={30000}
              max={600000}
              step={10000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-brand-orange cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$30.000 COP</span>
              <span>$600.000 COP</span>
            </div>
          </div>

          {/* Opciones de Disponibilidad */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
              />
              <span>Solo repuestos con inventario disponible</span>
            </label>

            {activeVehicle && (
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-emerald-800">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={(e) => setOnlyCompatible(e.target.checked)}
                  className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Solo compatibles con {activeVehicle.modelName}</span>
              </label>
            )}
          </div>
        </aside>

        {/* ÁREA PRINCIPAL: LISTA DE PRODUCTOS */}
        <div className="lg:col-span-3 space-y-6">
          {/* Barra superior de conteo y ordenamiento */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="text-xs text-slate-600">
              Mostrando <span className="font-black text-slate-900">{filteredProducts.length}</span> repuestos encontrados en COP
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-semibold text-slate-600">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              >
                <option value="populares">Más Populares (Calificación)</option>
                <option value="precio-asc">Precio: Menor a Mayor en COP</option>
                <option value="precio-desc">Precio: Mayor a Menor en COP</option>
                <option value="novedades">Novedades e Ingresos</option>
              </select>
            </div>
          </div>

          {/* Cuadrícula de Repuestos */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                No encontramos repuestos con los filtros seleccionados
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Prueba relajando los filtros de precio o buscando por otra categoría. Si no encuentras la referencia exacta, consúltanos directamente por WhatsApp.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-xl text-xs font-bold transition-colors"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Cargando catálogo RepuestOS Colombia...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
