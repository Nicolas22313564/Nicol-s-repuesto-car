/**
 * Utilidades de formateo para RepuestOS Colombia
 * Todos los precios se manejan estrictamente en Pesos Colombianos (COP) con configuración regional es-CO.
 */

export function formatCOP(amount: number): string {
  if (isNaN(amount)) return "$0 COP";
  
  // Formatea el número entero con separador de miles en punto (ej: 45.000)
  const formattedNumber = new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(amount));

  return `$${formattedNumber} COP`;
}

export function formatNumberCO(amount: number): string {
  return new Intl.NumberFormat("es-CO").format(amount);
}
