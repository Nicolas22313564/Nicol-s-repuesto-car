"use client";

import React, { useState } from "react";
import { X, Check, Car, ChevronRight, AlertCircle, PhoneCall, Sparkles } from "lucide-react";
import { COLOMBIAN_VEHICLES, VehicleMake, VehicleModel } from "@/lib/vehiclesData";
import { useCart, ActiveVehicle } from "@/lib/cartContext";
import { SITE_CONFIG } from "@/lib/config";

interface VehicleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleSelected?: (vehicle: ActiveVehicle) => void;
}

export function VehicleSelectorModal({ isOpen, onClose, onVehicleSelected }: VehicleSelectorModalProps) {
  const { activeVehicle, setActiveVehicle, clearActiveVehicle } = useCart();

  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<string>("");
  const [plateQuery, setPlateQuery] = useState<string>("");
  const [plateNotice, setPlateNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleMakeSelect = (make: VehicleMake) => {
    setSelectedMake(make);
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedEngine("");
  };

  const handleModelSelect = (model: VehicleModel) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setSelectedEngine("");
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    if (selectedModel && selectedModel.versions.length > 0) {
      setSelectedEngine(selectedModel.versions[0]);
    }
  };

  const handleConfirmVehicle = () => {
    if (!selectedMake || !selectedModel || !selectedYear) return;

    const newVehicle: ActiveVehicle = {
      makeId: selectedMake.id,
      makeName: selectedMake.name,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      year: selectedYear,
      engine: selectedEngine || (selectedModel.versions[0] ?? "Estándar"),
    };

    setActiveVehicle(newVehicle);
    if (onVehicleSelected) {
      onVehicleSelected(newVehicle);
    }
    onClose();
  };

  const handlePlateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateQuery.trim()) return;

    // Conforme a la legislación colombiana (Ley 1581 y RUNT), la consulta de placa automatizada
    // requiere token legal de RUNT y autorización del titular. No inventamos datos ficticios.
    setPlateNotice(
      `Conforme a la normativa del RUNT y protección de datos (Ley 1581), la consulta automática por placa "${plateQuery.toUpperCase()}" requiere autorización del propietario. Un asesor técnico verificará tu placa o VIN directamente por WhatsApp con el catálogo de fábrica.`
    );
  };

  const handleReset = () => {
    setSelectedMake(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedEngine("");
    setPlateNotice(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center text-white">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Configura tu Carro para Repuestos Exactos
              </h3>
              <p className="text-xs text-slate-300">
                Garantiza que cada repuesto del catálogo sea 100% compatible
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de progreso de selección */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className={selectedMake ? "text-emerald-700 font-bold" : "text-brand-orange font-bold"}>
              1. Marca {selectedMake && `(${selectedMake.name})`}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className={selectedModel ? "text-emerald-700 font-bold" : selectedMake ? "text-brand-orange font-bold" : "text-slate-400"}>
              2. Modelo {selectedModel && `(${selectedModel.name})`}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className={selectedYear ? "text-emerald-700 font-bold" : selectedModel ? "text-brand-orange font-bold" : "text-slate-400"}>
              3. Año {selectedYear && `(${selectedYear})`}
            </span>
          </div>

          {(selectedMake || activeVehicle) && (
            <button
              onClick={() => {
                handleReset();
                clearActiveVehicle();
              }}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Borrar filtro
            </button>
          )}
        </div>

        {/* Contenido interactivo por pasos */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* PASO 1: SELECCIONAR MARCA */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Paso 1: Selecciona la Marca
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLOMBIAN_VEHICLES.map((make) => {
                const isSelected = selectedMake?.id === make.id;
                return (
                  <button
                    key={make.id}
                    onClick={() => handleMakeSelect(make)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "border-brand-orange bg-orange-50/70 text-brand-orange shadow-sm font-bold"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <span className="text-sm font-semibold">{make.name}</span>
                    <span className="text-[10px] text-slate-400">{make.models.length} modelos</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASO 2: SELECCIONAR MODELO (si la marca está elegida) */}
          {selectedMake && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Paso 2: Modelo de tu {selectedMake.name}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedMake.models.map((model) => {
                  const isSelected = selectedModel?.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-brand-orange bg-orange-50/70 text-brand-orange font-bold shadow-sm"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <div className="text-sm font-semibold">{model.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {Math.min(...model.years)} - {Math.max(...model.years)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 3: SELECCIONAR AÑO Y MOTORIZACIÓN (si el modelo está elegido) */}
          {selectedModel && (
            <div className="animate-fadeIn space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Paso 3: Año de Fabricación
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 border rounded-xl bg-slate-50">
                  {selectedModel.years.map((year) => {
                    const isSelected = selectedYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-brand-navy text-white shadow"
                            : "bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedYear && selectedModel.versions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Paso 4: Motorización / Versión
                  </label>
                  <select
                    value={selectedEngine}
                    onChange={(e) => setSelectedEngine(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  >
                    {selectedModel.versions.map((ver) => (
                      <option key={ver} value={ver}>
                        {ver}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Búsqueda por Placa o VIN (Conforme a la sección 5 del requerimiento) */}
          <div className="border-t border-slate-200 pt-5">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">¿No encuentras tu vehículo o tienes la placa/VIN?</span>
                  <p className="mt-0.5">
                    En Colombia, los datos del RUNT están protegidos por Habeas Data. Puedes ingresar tu placa para recibir asesoría directa:
                  </p>
                </div>
              </div>

              <form onSubmit={handlePlateSearch} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Placa colombiana (Ej. ABC-123)"
                  value={plateQuery}
                  onChange={(e) => setPlateQuery(e.target.value)}
                  maxLength={7}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-brand-orange flex-1 max-w-[200px]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold"
                >
                  Verificar con Asesor
                </button>
              </form>

              {plateNotice && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-2">
                  <p>{plateNotice}</p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hola RepuestOS Colombia, quisiera consultar compatibilidad para la placa: ${plateQuery.toUpperCase()}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Consultar por WhatsApp con un Especialista
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pie del modal con botón de confirmación */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedMake && selectedModel && selectedYear ? (
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                Listo: {selectedMake.name} {selectedModel.name} ({selectedYear})
              </span>
            ) : (
              <span>Selecciona marca, modelo y año para continuar</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cerrar
            </button>
            <button
              onClick={handleConfirmVehicle}
              disabled={!selectedMake || !selectedModel || !selectedYear}
              className="px-5 py-2 bg-brand-orange hover:bg-brand-orangeHover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-4 h-4" />
              Aplicar y Filtrar Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
