"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { formatCOP } from "@/lib/formatters";
import { SITE_CONFIG } from "@/lib/config";
import { COLOMBIAN_DEPARTMENTS } from "@/lib/colombiaLocations";
import { Order, CustomerData } from "@/lib/ordersStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cart, 
    subtotalCOP, 
    shippingCOP, 
    totalCOP, 
    clearCart,
    selectedDepartmentId,
    selectedCityId,
    setShippingLocation,
    selectedCityData 
  } = useCart();

  // Pasos: 1: Revisión, 2: Datos de Entrega, 3: Medio de Pago, 4: Confirmación Final
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCopied, setIsCopied] = useState(false);

  // Formulario de datos del comprador colombiano (conforme a DIAN y Ley 1581)
  const [formData, setFormData] = useState<CustomerData>({
    fullName: "",
    documentType: "CC",
    documentNumber: "",
    email: "",
    phone: "",
    department: selectedDepartmentId,
    city: selectedCityId,
    address: "",
    addressDetails: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"wompi" | "mercadopago" | "pse" | "contraentrega">("wompi");
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Validación rápida de paso 2
  const isFormValid = 
    formData.fullName.trim().length >= 4 &&
    formData.documentNumber.trim().length >= 5 &&
    formData.email.includes("@") &&
    formData.phone.trim().length >= 7 &&
    formData.address.trim().length >= 5;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Por favor completa los campos requeridos para la factura electrónica y entrega.");
      return;
    }
    setCurrentStep(3);
  };

  const handleConfirmOrder = () => {
    // Generar ID de pedido con formato colombiano
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `REP-COL-${randomSuffix}`;

    const depName = COLOMBIAN_DEPARTMENTS.find((d) => d.id === selectedDepartmentId)?.name || "Bogotá D.C.";
    const cityName = selectedCityData?.name || "Bogotá D.C.";

    const finalOrder: Order = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      customer: {
        ...formData,
        department: depName,
        city: cityName,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        sku: item.product.sku,
        brand: item.product.brand,
        priceCOP: item.product.price,
        quantity: item.quantity,
        subtotalCOP: item.product.price * item.quantity,
      })),
      subtotalCOP,
      shippingCOP,
      totalCOP,
      paymentMethod,
      paymentStatus: paymentMethod === "contraentrega" ? "pendiente_contraentrega" : "pagado",
      status: "recibido",
      carrier: "Coordinadora Mercantil",
      isDemo: true,
    };

    setCreatedOrder(finalOrder);
    clearCart();
    setCurrentStep(4);
  };

  const copyOrderId = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.id);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Si el carrito está vacío y no hay orden generada, mostrar advertencia
  if (cart.length === 0 && !createdOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">No hay productos en tu carrito</h2>
        <p className="text-xs text-slate-500">Agrega repuestos antes de iniciar el proceso de compra.</p>
        <Link
          href="/catalogo"
          className="inline-block px-5 py-2.5 bg-brand-orange text-white rounded-xl text-xs font-bold"
        >
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Indicador de pasos */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
            currentStep >= 1 ? "bg-brand-navy text-white" : "bg-slate-200 text-slate-600"
          }`}>
            1
          </span>
          <span className="text-xs font-bold text-slate-700 hidden sm:inline">Carrito</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-2" />

        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
            currentStep >= 2 ? "bg-brand-navy text-white" : "bg-slate-200 text-slate-600"
          }`}>
            2
          </span>
          <span className="text-xs font-bold text-slate-700 hidden sm:inline">Datos de Entrega</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-2" />

        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
            currentStep >= 3 ? "bg-brand-navy text-white" : "bg-slate-200 text-slate-600"
          }`}>
            3
          </span>
          <span className="text-xs font-bold text-slate-700 hidden sm:inline">Pago en COP</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-2" />

        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
            currentStep === 4 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
          }`}>
            4
          </span>
          <span className="text-xs font-bold text-slate-700 hidden sm:inline">Confirmación</span>
        </div>
      </div>

      {/* AVISO MODO DEMOSTRACIÓN */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-blue-900">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span>
          <strong>Ambiente de Demostración:</strong> Este proceso simula el flujo de compra y pasarelas de pago colombianas (Wompi / Mercado Pago / PSE). No se realizarán cargos a tarjetas reales.
        </span>
      </div>

      {/* PASO 1: REVISIÓN DE CARRITO */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Paso 1: Revisa los repuestos de tu orden</h2>

          <div className="divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{item.product.brand} • {item.product.sku}</span>
                    <h4 className="text-xs font-bold text-slate-900">{item.product.name}</h4>
                    <span className="text-xs text-slate-500">Cantidad: {item.quantity} x {formatCOP(item.product.price)}</span>
                  </div>
                </div>
                <div className="text-xs font-black text-slate-900">
                  {formatCOP(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal repuestos (IVA incluido):</span>
              <span className="font-semibold text-slate-900">{formatCOP(subtotalCOP)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Flete de despacho ({selectedCityData?.name || "Colombia"}):</span>
              <span className="font-semibold text-slate-900">{shippingCOP === 0 ? "GRATIS" : formatCOP(shippingCOP)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
              <span>Total en Pesos Colombianos:</span>
              <span className="text-brand-orange">{formatCOP(totalCOP)}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <span>Continuar a Datos de Entrega</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: DATOS DE ENTREGA Y FACTURA DIAN */}
      {currentStep === 2 && (
        <form onSubmit={handleNextToPayment} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Paso 2: Datos de Entrega y Facturación Electrónica</h2>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs text-slate-500 hover:text-brand-orange font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Requerido para la emisión de la factura electrónica DIAN y la guía oficial de la transportadora.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo o Razón Social *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ej. Juan Carlos Pérez Rodríguez"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo Doc.</label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                >
                  <option value="CC">C.C.</option>
                  <option value="NIT">NIT</option>
                  <option value="CE">C.E.</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Número de Documento *</label>
                <input
                  type="text"
                  required
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  placeholder="Ej. 1020304050"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico (Para Factura y Guía) *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="correo@ejemplo.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Móvil (Celular de Contacto) *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ej. 310 123 4567"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Departamento de Colombia *</label>
              <select
                value={selectedDepartmentId}
                onChange={(e) => {
                  const depId = e.target.value;
                  const dep = COLOMBIAN_DEPARTMENTS.find((d) => d.id === depId);
                  const defaultCity = dep?.cities[0]?.id || "";
                  setShippingLocation(depId, defaultCity);
                  setFormData({ ...formData, department: depId, city: defaultCity });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              >
                {COLOMBIAN_DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad o Municipio *</label>
              <select
                value={selectedCityId}
                onChange={(e) => {
                  setShippingLocation(selectedDepartmentId, e.target.value);
                  setFormData({ ...formData, city: e.target.value });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              >
                {COLOMBIAN_DEPARTMENTS.find((d) => d.id === selectedDepartmentId)?.cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Entrega Exacta *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Ej. Calle 45 # 12-34 Barrio Chapinero"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Detalles adicionales (Apto, Torre, Taller, Horario de entrega)</label>
              <input
                type="text"
                value={formData.addressDetails}
                onChange={(e) => setFormData({ ...formData, addressDetails: e.target.value })}
                placeholder="Ej. Taller Mecánico Los Andes o Portería Apto 402"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">Protección de datos bajo Ley 1581 de 2012</span>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-orange hover:bg-brand-orangeHover text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <span>Continuar al Pago</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* PASO 3: SELECCIÓN DE MEDIO DE PAGO EN COLOMBIA */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Paso 3: Selecciona tu Medio de Pago en Pesos (COP)</h2>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-slate-500 hover:text-brand-orange font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Datos</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Wompi */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              paymentMethod === "wompi" ? "border-brand-orange bg-orange-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "wompi"}
                    onChange={() => setPaymentMethod("wompi")}
                    className="text-brand-orange focus:ring-brand-orange"
                  />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">Wompi Bancolombia</span>
                    <span className="text-xs text-slate-500">Tarjetas de crédito/débito, QR Bancolombia, Botón Bancolombia y Nequi.</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-white text-[10px] font-black rounded uppercase">Pasarela Oficial</span>
              </div>
            </label>

            {/* PSE */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              paymentMethod === "pse" ? "border-brand-orange bg-orange-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "pse"}
                    onChange={() => setPaymentMethod("pse")}
                    className="text-brand-orange focus:ring-brand-orange"
                  />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">PSE (Transferencia Segura en Línea)</span>
                    <span className="text-xs text-slate-500">Débito automático desde cualquier banco colombiano (Davivienda, BBVA, Banco de Bogotá, Nequi, Daviplata).</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded uppercase">PSE Colombia</span>
              </div>
            </label>

            {/* Mercado Pago */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              paymentMethod === "mercadopago" ? "border-brand-orange bg-orange-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "mercadopago"}
                    onChange={() => setPaymentMethod("mercadopago")}
                    className="text-brand-orange focus:ring-brand-orange"
                  />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">Mercado Pago Colombia</span>
                    <span className="text-xs text-slate-500">Saldo en cuenta Mercado Pago, cuotas sin interés y tarjetas aliadas.</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-sky-500 text-white text-[10px] font-black rounded uppercase">Mercado Pago</span>
              </div>
            </label>

            {/* Pago Contra Entrega */}
            <label className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              paymentMethod === "contraentrega" ? "border-brand-orange bg-orange-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "contraentrega"}
                    onChange={() => setPaymentMethod("contraentrega")}
                    className="text-brand-orange focus:ring-brand-orange"
                  />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">Pago Contra Entrega en Efectivo</span>
                    <span className="text-xs text-slate-500">Pagas en efectivo al transportador de Coordinadora o Servientrega al recibir tu paquete en mano.</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-amber-500 text-slate-900 text-[10px] font-black rounded uppercase">Efectivo</span>
              </div>
            </label>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold text-slate-900 text-sm">
              <span>Total Final a Pagar (COP):</span>
              <span className="text-brand-orange">{formatCOP(totalCOP)}</span>
            </div>
            <p className="text-[11px] text-slate-400">Sin comisiones adicionales ni conversiones ocultas.</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleConfirmOrder}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirmar Pedido ({formatCOP(totalCOP)})</span>
            </button>
          </div>
        </div>
      )}

      {/* PASO 4: CONFIRMACIÓN Y NÚMERO DE ORDEN */}
      {currentStep === 4 && createdOrder && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-sm text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ¡Pedido Registrado con Éxito!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Gracias por tu compra en {SITE_CONFIG.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Hemos generado tu orden de compra y enviado la copia a <strong>{createdOrder.customer.email}</strong>.
            </p>
          </div>

          {/* Caja con el número de orden oficial */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-2">
            <span className="text-xs text-slate-500 font-medium">Número de Pedido para Seguimiento:</span>
            <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-brand-navy">
              <span>{createdOrder.id}</span>
              <button
                onClick={copyOrderId}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                title="Copiar número"
              >
                {isCopied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">Guarda este código para rastrear el despacho con la transportadora.</p>
          </div>

          {/* Resumen del Pedido */}
          <div className="text-left bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-lg mx-auto text-xs space-y-2">
            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">Resumen de Entrega:</h4>
            <div><strong>Destinatario:</strong> {createdOrder.customer.fullName} ({createdOrder.customer.documentType} {createdOrder.customer.documentNumber})</div>
            <div><strong>Ciudad:</strong> {createdOrder.customer.city}, {createdOrder.customer.department}</div>
            <div><strong>Dirección:</strong> {createdOrder.customer.address} {createdOrder.customer.addressDetails}</div>
            <div><strong>Teléfono:</strong> {createdOrder.customer.phone}</div>
            <div><strong>Medio de Pago:</strong> {createdOrder.paymentMethod.toUpperCase()} • Total: <span className="font-bold text-brand-navy">{formatCOP(createdOrder.totalCOP)}</span></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              href={`/seguimiento?orden=${createdOrder.id}`}
              className="px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-xl text-xs font-bold transition-colors"
            >
              Rastrear Estado del Despacho
            </Link>

            <Link
              href="/catalogo"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Seguir Comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
