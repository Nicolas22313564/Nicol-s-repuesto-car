export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  brand: string;
  priceCOP: number;
  quantity: number;
  subtotalCOP: number;
}

export interface CustomerData {
  fullName: string;
  documentType: "CC" | "NIT" | "CE" | "PASAPORTE";
  documentNumber: string;
  email: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  addressDetails?: string;
  notes?: string;
}

export type OrderStatus = "recibido" | "en_preparacion" | "despachado" | "entregado" | "cancelado";

export interface Order {
  id: string; // e.g. REP-COL-89214
  createdAt: string;
  customer: CustomerData;
  items: OrderItem[];
  subtotalCOP: number;
  shippingCOP: number;
  totalCOP: number;
  paymentMethod: "wompi" | "mercadopago" | "pse" | "contraentrega";
  paymentStatus: "pagado" | "pendiente_contraentrega" | "en_verificacion";
  status: OrderStatus;
  carrier?: string;
  trackingNumber?: string;
  isDemo: boolean;
}

// Semilla de pedidos de demostración para el panel administrativo y seguimiento
export const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: "REP-COL-74210",
    createdAt: "2026-10-26T14:30:00Z",
    customer: {
      fullName: "Carlos Andrés Montoya",
      documentType: "CC",
      documentNumber: "1020754890",
      email: "carlos.montoya@email.com",
      phone: "3104567890",
      department: "Antioquia",
      city: "Medellín",
      address: "Carrera 43A # 18 Sur - 65, El Poblado",
      addressDetails: "Apto 502 Torre 1",
    },
    items: [
      {
        productId: "pastillas-freno-delanteras-chevrolet-onix",
        name: "Juego de Pastillas de Freno Delanteras Cerámicas",
        sku: "BOS-0986-ONIX",
        brand: "Bosch",
        priceCOP: 135000,
        quantity: 1,
        subtotalCOP: 135000,
      },
      {
        productId: "filtro-aceite-mann-filter-w68",
        name: "Filtro de Aceite Blindado de Alta Eficiencia",
        sku: "MAN-W68-1",
        brand: "Mann-Filter",
        priceCOP: 38000,
        quantity: 2,
        subtotalCOP: 76000,
      },
    ],
    subtotalCOP: 211000,
    shippingCOP: 18000,
    totalCOP: 229000,
    paymentMethod: "pse",
    paymentStatus: "pagado",
    status: "despachado",
    carrier: "Coordinadora Mercantil",
    trackingNumber: "73920194821",
    isDemo: true,
  },
  {
    id: "REP-COL-74209",
    createdAt: "2026-10-25T10:15:00Z",
    customer: {
      fullName: "Sandra Milena Gómez",
      documentType: "CC",
      documentNumber: "52894123",
      email: "sandra.gomez@empresa.com.co",
      phone: "3158901234",
      department: "Bogotá D.C.",
      city: "Bogotá D.C. (Urbano)",
      address: "Calle 127 # 15-40",
      addressDetails: "Oficina 304",
    },
    items: [
      {
        productId: "amortiguadores-delanteros-renault-sandero",
        name: "Juego de Amortiguadores Delanteros a Gas OESpectrum",
        sku: "MON-742138SP",
        brand: "Monroe",
        priceCOP: 365000,
        quantity: 1,
        subtotalCOP: 365000,
      },
    ],
    subtotalCOP: 365000,
    shippingCOP: 0, // Envío gratis superó $250.000 COP
    totalCOP: 365000,
    paymentMethod: "wompi",
    paymentStatus: "pagado",
    status: "en_preparacion",
    carrier: "Envía Colvanes",
    trackingNumber: "02948175512",
    isDemo: true,
  },
  {
    id: "REP-COL-74208",
    createdAt: "2026-10-24T18:40:00Z",
    customer: {
      fullName: "Transportes del Norte S.A.S.",
      documentType: "NIT",
      documentNumber: "900543219-1",
      email: "compras@transportesnorte.co",
      phone: "3209876543",
      department: "Valle del Cauca",
      city: "Cali",
      address: "Calle 10 # 32-15, Acopi Yumbo",
    },
    items: [
      {
        productId: "aceite-mobil-1-5w30-sintetico-galon",
        name: "Aceite 100% Sintético Mobil 1 Triple Action 5W-30 (Galón 3.785 L)",
        sku: "MOB-1-5W30-GAL",
        brand: "Mobil",
        priceCOP: 189000,
        quantity: 3,
        subtotalCOP: 567000,
      },
    ],
    subtotalCOP: 567000,
    shippingCOP: 0,
    totalCOP: 567000,
    paymentMethod: "contraentrega",
    paymentStatus: "pendiente_contraentrega",
    status: "entregado",
    carrier: "Servientrega",
    trackingNumber: "98347102938",
    isDemo: true,
  },
];
