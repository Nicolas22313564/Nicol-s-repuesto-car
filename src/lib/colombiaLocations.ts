export interface ColombianCity {
  id: string;
  name: string;
  shippingCost: number;
  deliveryTimeDays: string;
  isCoverage: boolean;
}

export interface ColombianDepartment {
  id: string;
  name: string;
  cities: ColombianCity[];
}

export const COLOMBIAN_DEPARTMENTS: ColombianDepartment[] = [
  {
    id: "bogota",
    name: "Bogotá D.C.",
    cities: [
      { id: "bogota-dc", name: "Bogotá D.C. (Urbano)", shippingCost: 12000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "soacha", name: "Soacha", shippingCost: 14000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "chia", name: "Chía", shippingCost: 14000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "cajica", name: "Cajicá", shippingCost: 14000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "zipaquira", name: "Zipaquirá", shippingCost: 15000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "facatativa", name: "Facatativá", shippingCost: 15000, deliveryTimeDays: "1 a 3 días hábiles", isCoverage: true },
      { id: "madrid", name: "Madrid", shippingCost: 15000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "mosquera", name: "Mosquera", shippingCost: 14000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
      { id: "funza", name: "Funza", shippingCost: 14000, deliveryTimeDays: "1 a 2 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "antioquia",
    name: "Antioquia",
    cities: [
      { id: "medellin", name: "Medellín", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "envigado", name: "Envigado", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "itagui", name: "Itagüí", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "bello", name: "Bello", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "rionegro", name: "Rionegro", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "sabaneta", name: "Sabaneta", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "apartado", name: "Apartadó", shippingCost: 26000, deliveryTimeDays: "3 a 5 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "valle",
    name: "Valle del Cauca",
    cities: [
      { id: "cali", name: "Cali", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "palmira", name: "Palmira", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "yumbo", name: "Yumbo", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "tulua", name: "Tuluá", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "buga", name: "Guadalajara de Buga", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "buenaventura", name: "Buenaventura", shippingCost: 24000, deliveryTimeDays: "3 a 5 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "atlantico",
    name: "Atlántico",
    cities: [
      { id: "barranquilla", name: "Barranquilla", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "soledad", name: "Soledad", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "malambo", name: "Malambo", shippingCost: 22000, deliveryTimeDays: "3 a 4 días hábiles", isCoverage: true },
      { id: "puerto-colombia", name: "Puerto Colombia", shippingCost: 22000, deliveryTimeDays: "3 a 4 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "santander",
    name: "Santander",
    cities: [
      { id: "bucaramanga", name: "Bucaramanga", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "floridablanca", name: "Floridablanca", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "giron", name: "Girón", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "piedecuesta", name: "Piedecuesta", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "barrancabermeja", name: "Barrancabermeja", shippingCost: 24000, deliveryTimeDays: "3 a 5 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "bolivar",
    name: "Bolívar",
    cities: [
      { id: "cartagena", name: "Cartagena de Indias", shippingCost: 21000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "turbaco", name: "Turbaco", shippingCost: 22000, deliveryTimeDays: "3 a 4 días hábiles", isCoverage: true },
      { id: "magangue", name: "Magangué", shippingCost: 27000, deliveryTimeDays: "3 a 5 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "risaralda",
    name: "Risaralda",
    cities: [
      { id: "pereira", name: "Pereira", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "dosquebradas", name: "Dosquebradas", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "santa-rosa", name: "Santa Rosa de Cabal", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "caldas",
    name: "Caldas",
    cities: [
      { id: "manizales", name: "Manizales", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "villamaria", name: "Villamaría", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "chinchina", name: "Chinchiná", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "quindio",
    name: "Quindío",
    cities: [
      { id: "armenia", name: "Armenia", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "calarca", name: "Calarcá", shippingCost: 19000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "tebaida", name: "La Tebaida", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "norte-santander",
    name: "Norte de Santander",
    cities: [
      { id: "cucuta", name: "Cúcuta", shippingCost: 22000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "los-patios", name: "Los Patios", shippingCost: 23000, deliveryTimeDays: "3 a 4 días hábiles", isCoverage: true },
      { id: "villa-rosario", name: "Villa del Rosario", shippingCost: 23000, deliveryTimeDays: "3 a 4 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "tolima",
    name: "Tolima",
    cities: [
      { id: "ibague", name: "Ibagué", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "espinal", name: "El Espinal", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "melgar", name: "Melgar", shippingCost: 20000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "huila",
    name: "Huila",
    cities: [
      { id: "neiva", name: "Neiva", shippingCost: 21000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
      { id: "pitalito", name: "Pitalito", shippingCost: 25000, deliveryTimeDays: "3 a 5 días hábiles", isCoverage: true },
    ],
  },
  {
    id: "meta",
    name: "Meta",
    cities: [
      { id: "villavicencio", name: "Villavicencio", shippingCost: 18000, deliveryTimeDays: "2 a 3 días hábiles", isCoverage: true },
      { id: "acacias", name: "Acacías", shippingCost: 21000, deliveryTimeDays: "2 a 4 días hábiles", isCoverage: true },
    ],
  },
];
