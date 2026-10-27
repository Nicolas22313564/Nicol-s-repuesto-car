"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  Wrench, 
  CheckCircle, 
  ArrowRight,
  HelpCircle,
  FileText
} from "lucide-react";
import { GLOSSARY_TERMS, GlossaryTerm } from "@/lib/glossaryData";

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const categories = ["todas", "Frenos", "Motor", "Suspensión", "Filtros", "Refrigeración", "Transmisión"];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    if (selectedCategory !== "todas" && term.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        term.term.toLowerCase().includes(q) ||
        term.simpleExplanation.toLowerCase().includes(q) ||
        term.symptoms.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Encabezado */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Diccionario Automotriz en Español Claro
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Glosario de Términos de Mecánica
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Aprende qué significa cada repuesto, cómo detectar fallas por ruidos o sensaciones, y cuándo es momento de cambiarlo.
        </p>
      </div>

      {/* Guía didáctica: ¿Cómo encontrar la referencia exacta de tu repuesto? */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-blue text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-brand-orange" />
          <h2 className="text-lg sm:text-xl font-bold">
            Guía: ¿Cómo encontrar la referencia del repuesto de tu carro?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-extrabold text-amber-300 block text-sm">1. En la pieza usada</span>
            <p>
              La mayoría de repuestos originales tienen grabada una referencia alfanumérica en el cuerpo metálico o plástico (ej: 0986479, 742138SP).
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-extrabold text-amber-300 block text-sm">2. En la Tarjeta de Propiedad</span>
            <p>
              Revisa la <strong>Línea</strong>, <strong>Cilindrada (C.C.)</strong>, <strong>Modelo (Año)</strong> y <strong>Número de Chasis (VIN)</strong> de tu carro.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-extrabold text-amber-300 block text-sm">3. Consulta a nuestro Asesor</span>
            <p>
              Envíanos una fotografía de la pieza por WhatsApp y nuestro equipo técnico buscará la referencia exacta en el catálogo OEM.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros de búsqueda del Glosario */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar término (ej. bujía, clutch)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === c
                  ? "bg-brand-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c === "todas" ? "Todos" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Términos Explicados */}
      <div className="space-y-6">
        {filteredTerms.map((t) => (
          <div
            key={t.slug}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">{t.term}</h3>
              <span className="bg-slate-100 text-slate-600 font-bold text-xs px-2.5 py-1 rounded-md">
                Categoría: {t.category}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="font-bold text-brand-navy block mb-1">¿Qué es y para qué sirve?</span>
              {t.simpleExplanation}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-950">
                <span className="font-bold block mb-1">Síntomas comunes de fallo:</span>
                <p>{t.symptoms}</p>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-950">
                <span className="font-bold block mb-1">¿Cuándo se debe cambiar?</span>
                <p>{t.replacementAdvice}</p>
              </div>
            </div>

            {t.warningNotice && (
              <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <p>{t.warningNotice}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
