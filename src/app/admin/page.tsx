"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  Truck, 
  Settings, 
  Check, 
  X, 
  Eye, 
  Car,
  AlertCircle,
  TrendingUp,
  Search
} from "lucide-react";
import { PRODUCTS, Product } from "@/lib/productsData";
import { INITIAL_DEMO_ORDERS, Order, OrderStatus } from "@/lib/ordersStore";
import { formatCOP } from "@/lib/formatters";
import { CATEGORIES } from "@/lib/categoriesData";
import { SITE_CONFIG } from "@/lib/config";

export default function AdminPage() {
  // Estado de autenticación para el panel
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [authError, setAuthError] = useState(false);

  // Pestañas: "dashboard", "productos", "pedidos", "tarifas"
  const [activeTab, setActiveTab] = useState<"dashboard" | "productos" | "pedidos" | "tarifas">("dashboard");

  // Estado local para CRUD de productos
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Estado local para gestión de pedidos
  const [orderList, setOrderList] = useState<Order[]>(INITIAL_DEMO_ORDERS);

  // Clave administrativa por defecto en ambiente demostrativo
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "admin123" || adminKey === "repuestos2025") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Métricas financieras y de inventario
  const totalSalesCOP = orderList.reduce((acc, order) => acc + order.totalCOP, 0);
  const activeOrdersCount = orderList.filter((o) => o.status !== "entregado" && o.status !== "cancelado").length;
  const lowStockProducts = productList.filter((p) => p.stock <= 10);

  // Actualizar estado de pedido
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrderList((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Eliminar producto
  const handleDeleteProduct = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este repuesto del catálogo?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Guardar edición de producto
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isCreatingProduct) {
      setProductList([editingProduct, ...productList]);
      setIsCreatingProduct(false);
    } else {
      setProductList((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
    }
    setEditingProduct(null);
  };

  const handleOpenNewProduct = () => {
    const newId = `repuesto-${Date.now()}`;
    const emptyProduct: Product = {
      id: newId,
      name: "",
      brand: "",
      sku: "REF-" + Math.floor(1000 + Math.random() * 9000),
      category: "frenos",
      price: 95000,
      stock: 10,
      imageUrl: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewsCount: 1,
      warranty: "6 meses de garantía",
      technicalInstallationRequired: true,
      simpleDescription: "Descripción sencilla del repuesto...",
      purpose: "¿Para qué sirve el repuesto?",
      compatibilityGuide: "Compatible con modelos específicos...",
      maintenanceTip: "Consejo de mantenimiento...",
      specifications: { "Origen": "Importado", "Material": "Acero" },
      compatibleVehicles: [{ make: "chevrolet", model: "onix", yearFrom: 2015, yearTo: 2024, engines: ["1.0L Turbo"] }],
      isDemo: true,
    };
    setEditingProduct(emptyProduct);
    setIsCreatingProduct(true);
  };

  // PANTALLA DE ACCESO ADMINISTRATIVO
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-navy text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8 text-brand-orange" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Panel de Administración</h2>
            <p className="text-xs text-slate-500 mt-1">
              {SITE_CONFIG.name} — Control de Inventario, Precios en COP y Despachos
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contraseña Administrativa
              </label>
              <input
                type="password"
                placeholder="Ingresa 'admin123'"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Clave de prueba: <code className="font-bold text-slate-700">admin123</code>
              </span>
            </div>

            {authError && (
              <div className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg">
                Contraseña incorrecta. Intenta con "admin123".
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-xl text-xs font-bold transition-colors shadow"
            >
              Ingresar al Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PANEL ADMINISTRATIVO PRINCIPAL
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Cabecera del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">
              Panel Administrativo • {SITE_CONFIG.name}
            </h1>
            <p className="text-xs text-slate-500">
              Gestión centralizada de catálogo, inventario en pesos colombianos y pedidos nacionales
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cerrar Sesión
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 bg-brand-navy text-white rounded-lg text-xs font-bold hover:bg-brand-blue"
          >
            Ver Tienda Pública
          </Link>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-t-xl transition-colors ${
            activeTab === "dashboard"
              ? "bg-brand-navy text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Resumen y Estadísticas
        </button>
        <button
          onClick={() => setActiveTab("productos")}
          className={`px-4 py-2 rounded-t-xl transition-colors ${
            activeTab === "productos"
              ? "bg-brand-navy text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Gestión de Productos ({productList.length})
        </button>
        <button
          onClick={() => setActiveTab("pedidos")}
          className={`px-4 py-2 rounded-t-xl transition-colors ${
            activeTab === "pedidos"
              ? "bg-brand-navy text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Pedidos y Envíos ({orderList.length})
        </button>
        <button
          onClick={() => setActiveTab("tarifas")}
          className={`px-4 py-2 rounded-t-xl transition-colors ${
            activeTab === "tarifas"
              ? "bg-brand-navy text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Configuración y Tarifas
        </button>
      </div>

      {/* 1. TAB: RESUMEN Y ESTADÍSTICAS */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Ventas Totales (COP)</span>
              <div className="text-2xl font-black text-brand-navy mt-1">{formatCOP(totalSalesCOP)}</div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +14% vs mes anterior
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Pedidos en Proceso</span>
              <div className="text-2xl font-black text-brand-orange mt-1">{activeOrdersCount} órdenes</div>
              <span className="text-[10px] text-slate-500 mt-1 block">Por despachar con transportadoras</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Repuestos Bajos en Stock</span>
              <div className="text-2xl font-black text-rose-600 mt-1">{lowStockProducts.length} items</div>
              <span className="text-[10px] text-rose-500 font-medium mt-1 block">Menos de 10 unidades</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Referencias Activas</span>
              <div className="text-2xl font-black text-slate-800 mt-1">{productList.length} repuestos</div>
              <span className="text-[10px] text-slate-500 mt-1 block">12 categorías automotrices</span>
            </div>
          </div>

          {/* Últimos pedidos recibidos */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Últimos Pedidos Registrados</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase border-b">
                  <tr>
                    <th className="p-3">ID Pedido</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Destino</th>
                    <th className="p-3">Total COP</th>
                    <th className="p-3">Método</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orderList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-brand-navy">{ord.id}</td>
                      <td className="p-3 font-medium">{ord.customer.fullName}</td>
                      <td className="p-3">{ord.customer.city}, {ord.customer.department}</td>
                      <td className="p-3 font-bold text-slate-900">{formatCOP(ord.totalCOP)}</td>
                      <td className="p-3 uppercase font-semibold text-slate-600">{ord.paymentMethod}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                          {ord.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB: GESTIÓN DE PRODUCTOS CRUD */}
      {activeTab === "productos" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Catálogo de Repuestos y Existencias</h3>
            <button
              onClick={handleOpenNewProduct}
              className="px-4 py-2 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Repuesto</span>
            </button>
          </div>

          {/* Modal / Formulario de edición o creación de producto */}
          {editingProduct && (
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-brand-orange space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-sm text-slate-900">
                  {isCreatingProduct ? "Crear Nuevo Repuesto" : `Editar: ${editingProduct.name}`}
                </h4>
                <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nombre del Repuesto *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2 bg-white border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marca del Fabricante *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full p-2 bg-white border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU / Referencia *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full p-2 bg-white border rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2 bg-white border rounded-lg"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio en COP (con IVA) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2 bg-white border rounded-lg font-bold text-brand-navy"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Disponible en Bodega *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full p-2 bg-white border rounded-lg font-bold"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-bold text-slate-700 mb-1">URL de la Fotografía</label>
                  <input
                    type="url"
                    value={editingProduct.imageUrl}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    className="w-full p-2 bg-white border rounded-lg"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-bold text-slate-700 mb-1">Descripción Sencilla</label>
                  <textarea
                    rows={2}
                    value={editingProduct.simpleDescription}
                    onChange={(e) => setEditingProduct({ ...editingProduct, simpleDescription: e.target.value })}
                    className="w-full p-2 bg-white border rounded-lg"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border rounded-lg text-slate-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-orange text-white font-bold rounded-lg"
                  >
                    Guardar Repuesto en Base de Datos
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tabla de Repuestos */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                  <th className="p-3">Foto</th>
                  <th className="p-3">Repuesto & Referencia</th>
                  <th className="p-3">Marca</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Precio COP</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productList.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">Ref: {p.sku}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-700">{p.brand}</td>
                    <td className="p-3 capitalize">{p.category}</td>
                    <td className="p-3 font-bold text-brand-navy">{formatCOP(p.price)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        p.stock > 10 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      }`}>
                        {p.stock} unids.
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setIsCreatingProduct(false);
                        }}
                        className="p-1.5 text-slate-500 hover:text-brand-orange"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TAB: PEDIDOS Y ACTUALIZACIÓN DE ESTADOS */}
      {activeTab === "pedidos" && (
        <div className="space-y-6">
          <h3 className="font-bold text-base text-slate-900">Administración de Órdenes y Envíos</h3>

          <div className="space-y-4">
            {orderList.map((ord) => (
              <div key={ord.id} className="bg-white p-5 rounded-2xl border border-slate-200 text-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-brand-navy">{ord.id}</span>
                    <span className="text-slate-400">{new Date(ord.createdAt).toLocaleDateString("es-CO")}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="font-bold text-slate-600">Cambiar Estado:</label>
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="p-1.5 bg-slate-50 border rounded-lg font-bold"
                    >
                      <option value="recibido">Recibido</option>
                      <option value="en_preparacion">En Preparación</option>
                      <option value="despachado">Despachado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="font-bold text-slate-700 block">Cliente:</span>
                    <div>{ord.customer.fullName} ({ord.customer.documentType}: {ord.customer.documentNumber})</div>
                    <div>Tel: {ord.customer.phone}</div>
                    <div>Email: {ord.customer.email}</div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block">Dirección de Entrega:</span>
                    <div>{ord.customer.address} {ord.customer.addressDetails}</div>
                    <div>{ord.customer.city}, {ord.customer.department}</div>
                    <div className="text-slate-400">Transportadora: {ord.carrier || "Asignando"}</div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block">Pago:</span>
                    <div>Método: {ord.paymentMethod.toUpperCase()}</div>
                    <div>Subtotal: {formatCOP(ord.subtotalCOP)}</div>
                    <div>Envío: {formatCOP(ord.shippingCOP)}</div>
                    <div className="font-bold text-brand-orange text-sm">Total: {formatCOP(ord.totalCOP)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB: TARIFAS Y CONFIGURACIÓN */}
      {activeTab === "tarifas" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="font-bold text-base text-slate-900">Parámetros Operativos del Sistema</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block text-sm">Línea Oficial de WhatsApp</span>
              <p className="text-slate-500">Configurada en variables de entorno:</p>
              <input
                type="text"
                readOnly
                value={SITE_CONFIG.contact.whatsappDisplay}
                className="w-full p-2 bg-white border rounded-lg font-mono font-bold"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block text-sm">Umbral de Envío Gratis Nacional</span>
              <p className="text-slate-500">Monto mínimo en COP para flete bonificado:</p>
              <input
                type="text"
                readOnly
                value={formatCOP(SITE_CONFIG.shipping.freeShippingThreshold)}
                className="w-full p-2 bg-white border rounded-lg font-mono font-bold text-brand-navy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
