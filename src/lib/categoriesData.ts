export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  imageUrl: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "frenos",
    name: "Frenos",
    slug: "frenos",
    description: "Pastillas de freno, discos, bandas, mordazas, líquidos de freno DOT 4 y cilindros.",
    iconName: "Disc",
    imageUrl: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    itemCount: 48,
  },
  {
    id: "filtros",
    name: "Filtros",
    slug: "filtros",
    description: "Filtros de aceite, aire de motor, combustible y filtro de habitáculo o polen.",
    iconName: "Filter",
    imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    itemCount: 64,
  },
  {
    id: "suspension-direccion",
    name: "Suspensión y dirección",
    slug: "suspension-direccion",
    description: "Amortiguadores, espirales, terminales de dirección, axiales, tijeras y bujes.",
    iconName: "Activity",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    itemCount: 52,
  },
  {
    id: "motor",
    name: "Motor",
    slug: "motor",
    description: "Kits de repartición, correas de accesorios, bujías, bobinas, empaquetaduras y sensores.",
    iconName: "Cog",
    imageUrl: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    itemCount: 78,
  },
  {
    id: "baterias",
    name: "Baterías",
    slug: "baterias",
    description: "Baterías automotrices selladas libres de mantenimiento 12V MAC, Willard y Bosch.",
    iconName: "Zap",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&auto=format&fit=crop&q=80",
    itemCount: 22,
  },
  {
    id: "sistema-electrico",
    name: "Sistema eléctrico",
    slug: "sistema-electrico",
    description: "Alternadores, motores de arranque, pitos automotrices, fusibles y sensores de oxígeno.",
    iconName: "Cpu",
    imageUrl: "https://images.unsplash.com/photo-1558441719-72f534438340?w=600&auto=format&fit=crop&q=80",
    itemCount: 36,
  },
  {
    id: "refrigeracion",
    name: "Refrigeración",
    slug: "refrigeracion",
    description: "Radiadores, bombas de agua, termostatos, motoventiladores y líquido refrigerante.",
    iconName: "ThermometerSnowflake",
    imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    itemCount: 30,
  },
  {
    id: "embrague-transmision",
    name: "Embrague y transmisión",
    slug: "embrague-transmision",
    description: "Kits de clutch (prensa, disco, balinera), guayas de embrague, ejes y fuelles homocinéticos.",
    iconName: "Gauge",
    imageUrl: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&auto=format&fit=crop&q=80",
    itemCount: 28,
  },
  {
    id: "luces-bombillos",
    name: "Luces y bombillos",
    slug: "luces-bombillos",
    description: "Bombillería halógena y LED H4, H7, H1, exploradoras, cocuyos y stops traseros.",
    iconName: "Lightbulb",
    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
    itemCount: 42,
  },
  {
    id: "carroceria",
    name: "Carrocería",
    slug: "carroceria",
    description: "Espejos retrovisores, manijas, persianas, plumillas limpiaparabrisas y tapas de combustible.",
    iconName: "Shield",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
    itemCount: 34,
  },
  {
    id: "accesorios",
    name: "Accesorios para vehículos",
    slug: "accesorios",
    description: "Tapetes de alta resistencia, botiquines reglamentarios de carretera, kits de carretera y copas.",
    iconName: "Wrench",
    imageUrl: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80",
    itemCount: 40,
  },
  {
    id: "lubricantes-mantenimiento",
    name: "Lubricantes y mantenimiento",
    slug: "lubricantes-mantenimiento",
    description: "Aceites 5W-30, 10W-40, 20W-50 Mobil, Castrol, aditivos de inyectores y limpiadores de frenos.",
    iconName: "Droplet",
    imageUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&auto=format&fit=crop&q=80",
    itemCount: 55,
  },
];
