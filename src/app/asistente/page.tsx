"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Wrench, 
  ShieldAlert, 
  Car, 
  RefreshCcw,
  Sparkles
} from "lucide-react";
import { GUIDED_QUIZ_QUESTIONS } from "@/lib/glossaryData";
import { CATEGORIES } from "@/lib/categoriesData";
import { PRODUCTS } from "@/lib/productsData";
import { ProductCard } from "@/components/ProductCard";

export default function AssistantPage() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const question = GUIDED_QUIZ_QUESTIONS[0];
  const selectedOption = selectedOptionIndex !== null ? question.options[selectedOptionIndex] : null;

  // Repuestos recomendados según la opción seleccionada
  const recommendedCategory = selectedOption
    ? CATEGORIES.find((c) => c.slug === selectedOption.suggestedCategory)
    : null;

  const recommendedProducts = selectedOption
    ? PRODUCTS.filter((p) => p.category === selectedOption.suggestedCategory).slice(0, 3)
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Encabezado del Asistente */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          Orientación Mecánica para Conductores
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Asistente de Búsqueda Guiada
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          ¿Tu carro presenta un ruido extraño o una falla y no sabes qué repuesto buscar? Responde esta pregunta para orientarte hacia la categoría adecuada.
        </p>
      </div>

      {/* AVISO LEGAL OBLIGATORIO */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-amber-950 block">Aviso Importante al Conductor:</span>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            Las orientaciones de este asistente son de carácter meramente didáctico y preventivo. <strong>No sustituyen bajo ninguna circunstancia una inspección o diagnóstico mecánico profesional</strong> en un taller especializado.
          </p>
        </div>
      </div>

      {/* PREGUNTA INTERACTIVA */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {question.question}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {question.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedOptionIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-4 ${
                  isSelected
                    ? "border-brand-orange bg-orange-50/60 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {idx + 1}
                    </span>
                    <span>{option.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-7 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="flex-shrink-0 pt-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-brand-orange bg-brand-orange text-white" : "border-slate-300"
                  }`}>
                    {isSelected && <CheckCircle className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULTADO Y RECOMENDACIÓN DIDÁCTICA */}
      {selectedOption && recommendedCategory && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Diagnóstico Didáctico Sugerido
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                Línea recomendada: Repuestos de {recommendedCategory.name}
              </h3>

              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-2xl">
                {selectedOption.adviceText}
              </p>
            </div>

            <button
              onClick={() => setSelectedOptionIndex(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 flex-shrink-0"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>

          <div className="pt-4 border-t border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900">
                Repuestos sugeridos para este caso:
              </h4>
              <Link
                href={`/catalogo?categoria=${recommendedCategory.slug}`}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>Ver toda la categoría {recommendedCategory.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
