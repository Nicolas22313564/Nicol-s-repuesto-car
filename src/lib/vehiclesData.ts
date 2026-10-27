export interface VehicleModel {
  id: string;
  name: string;
  years: number[];
  versions: string[];
}

export interface VehicleMake {
  id: string;
  name: string;
  logoText: string;
  models: VehicleModel[];
}

const generateYears = (start: number, end: number): number[] => {
  const years: number[] = [];
  for (let y = end; y >= start; y--) {
    years.push(y);
  }
  return years;
};

export const COLOMBIAN_VEHICLES: VehicleMake[] = [
  {
    id: "chevrolet",
    name: "Chevrolet",
    logoText: "CHEVROLET",
    models: [
      {
        id: "onix",
        name: "Onix / Onix Turbo",
        years: generateYears(2013, 2025),
        versions: ["1.0L Turbo (3 cil)", "1.4L 8V LT / LTZ", "1.0L Premier Turbo", "Sedán 1.4L"],
      },
      {
        id: "sail",
        name: "Sail",
        years: generateYears(2012, 2020),
        versions: ["1.4L 16V DOHC (LS)", "1.4L 16V DOHC (LT)", "1.4L 16V DOHC (LTZ)", "Hatchback 1.4L"],
      },
      {
        id: "tracker",
        name: "Tracker / Tracker Turbo",
        years: generateYears(2013, 2025),
        versions: ["1.2L Turbo Premier", "1.8L Ecotec LTZ", "1.8L FWD / AWD", "1.2L Turbo LS"],
      },
      {
        id: "spark",
        name: "Spark GT / Spark Life",
        years: generateYears(2006, 2022),
        versions: ["1.2L 16V S-TEC II (GT)", "1.0L 8V (Life / Chronos)", "1.2L Activ"],
      },
      {
        id: "dmax",
        name: "D-Max",
        years: generateYears(2008, 2025),
        versions: ["2.5L Turbo Diésel 4x4", "3.0L Diésel CRDi", "2.5L Cabina Doble", "V6 3.5L Gasolina"],
      },
      {
        id: "aveo",
        name: "Aveo / Aveo Emotion",
        years: generateYears(2005, 2014),
        versions: ["1.6L 16V Emotion", "1.4L 16V Sedán", "1.5L Family"],
      },
    ],
  },
  {
    id: "renault",
    name: "Renault",
    logoText: "RENAULT",
    models: [
      {
        id: "duster",
        name: "Duster",
        years: generateYears(2012, 2025),
        versions: ["1.3L Turbo TCe 4x4", "1.6L 16V SCe", "2.0L 16V 4x4", "1.6L 16V K4M"],
      },
      {
        id: "sandero",
        name: "Sandero / Stepway",
        years: generateYears(2009, 2024),
        versions: ["1.6L 16V H4M (Intens)", "1.6L 8V K7M (Life/Zen)", "2.0L 16V (R.S.)", "1.6L Stepway Rip Curl"],
      },
      {
        id: "logan",
        name: "Logan",
        years: generateYears(2006, 2024),
        versions: ["1.6L 16V SCe", "1.6L 8V K7M", "1.4L 8V K7J"],
      },
      {
        id: "kwid",
        name: "Kwid",
        years: generateYears(2019, 2025),
        versions: ["1.0L 12V 3 Cilindros (Zen)", "1.0L 12V (Outsider)", "1.0L 12V (Intens)"],
      },
    ],
  },
  {
    id: "mazda",
    name: "Mazda",
    logoText: "MAZDA",
    models: [
      {
        id: "mazda2",
        name: "Mazda 2",
        years: generateYears(2010, 2025),
        versions: ["1.5L SkyActiv-G (Touring)", "1.5L SkyActiv-G (Grand Touring)", "1.5L MHEV Híbrido", "1.5L Sedán"],
      },
      {
        id: "mazda3",
        name: "Mazda 3",
        years: generateYears(2005, 2025),
        versions: ["2.0L SkyActiv-G", "2.5L SkyActiv-G (Grand Touring LX)", "2.0L MHEV Mild Hybrid", "2.0L All New (2010-2014)"],
      },
      {
        id: "cx30",
        name: "CX-30",
        years: generateYears(2020, 2025),
        versions: ["2.0L SkyActiv-G FWD", "2.5L SkyActiv-G AWD", "2.0L MHEV Híbrida"],
      },
      {
        id: "cx5",
        name: "CX-5",
        years: generateYears(2013, 2025),
        versions: ["2.0L SkyActiv-G", "2.5L SkyActiv-G AWD", "2.5L Turbo Signature"],
      },
    ],
  },
  {
    id: "kia",
    name: "Kia",
    logoText: "KIA",
    models: [
      {
        id: "picanto",
        name: "Picanto (Ion / GT-Line)",
        years: generateYears(2006, 2025),
        versions: ["1.25L 4 Cilindros (GT Line)", "1.0L 3 Cilindros (Emotion)", "1.0L Ion R", "1.1L (2006-2011)"],
      },
      {
        id: "rio",
        name: "Rio (Spice / Stylus)",
        years: generateYears(2008, 2024),
        versions: ["1.4L CVVT (Spice)", "1.25L CVVT", "1.6L EX / LX"],
      },
      {
        id: "sportage",
        name: "Sportage",
        years: generateYears(2007, 2025),
        versions: ["2.0L Gasolina Revolution", "2.0L CRDi Turbo Diésel", "2.0L All New", "1.6L Turbo Híbrida"],
      },
    ],
  },
  {
    id: "toyota",
    name: "Toyota",
    logoText: "TOYOTA",
    models: [
      {
        id: "hilux",
        name: "Hilux",
        years: generateYears(2006, 2025),
        versions: ["2.4L Turbo Diésel (2GD-FTV)", "2.8L Turbo Diésel (1GD-FTV)", "2.7L Gasolina (2TR-FE)"],
      },
      {
        id: "corolla",
        name: "Corolla / Corolla Cross",
        years: generateYears(2008, 2025),
        versions: ["1.8L Híbrido (SEG/XEI)", "2.0L Dynamic Force", "1.8L Dual VVT-i"],
      },
      {
        id: "fortuner",
        name: "Fortuner",
        years: generateYears(2007, 2025),
        versions: ["2.4L Diésel", "2.8L Diésel 4x4", "2.7L Gasolina 4x2 / 4x4", "V6 4.0L"],
      },
      {
        id: "prado",
        name: "Land Cruiser Prado",
        years: generateYears(2005, 2025),
        versions: ["3.0L Diésel TX / TXL (1KD-FTV)", "2.8L Diésel TXL", "4.0L V6 Gasolina (1GR-FE)"],
      },
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    logoText: "NISSAN",
    models: [
      {
        id: "versa",
        name: "Versa",
        years: generateYears(2012, 2025),
        versions: ["1.6L 16V HR16DE (Sense/Advance/Exclusive)", "1.6L Generación Anterior"],
      },
      {
        id: "march",
        name: "March",
        years: generateYears(2012, 2024),
        versions: ["1.6L 16V (Active)", "1.6L 16V (Sense)", "1.6L 16V (Advance)"],
      },
      {
        id: "frontier",
        name: "Frontier / NP300",
        years: generateYears(2008, 2025),
        versions: ["2.5L Turbo Diésel YD25", "2.5L Diésel Bi-Turbo", "2.4L / 2.5L Gasolina"],
      },
      {
        id: "kicks",
        name: "Kicks",
        years: generateYears(2017, 2025),
        versions: ["1.6L 16V (Sense)", "1.6L 16V (Advance)", "1.6L 16V (Exclusive CVT)"],
      },
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    logoText: "HYUNDAI",
    models: [
      {
        id: "tucson",
        name: "Tucson / ix35",
        years: generateYears(2007, 2025),
        versions: ["2.0L DOHC Gasolina", "2.0L CRDi Diésel", "1.6L Turbo (TL)"],
      },
      {
        id: "grand-i10",
        name: "Grand i10",
        years: generateYears(2014, 2024),
        versions: ["1.25L Kappa", "1.0L 3 Cilindros"],
      },
    ],
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    logoText: "VOLKSWAGEN",
    models: [
      {
        id: "gol",
        name: "Gol / Voyage",
        years: generateYears(2009, 2023),
        versions: ["1.6L 8V MSI (Trendline)", "1.6L 16V MSI"],
      },
      {
        id: "jetta",
        name: "Jetta / Clasico",
        years: generateYears(2006, 2025),
        versions: ["1.4L TSI Turbo", "2.0L 8V (2.0 Normal)", "2.5L 5 Cilindros", "2.0L GLI Turbo"],
      },
      {
        id: "amarok",
        name: "Amarok",
        years: generateYears(2011, 2025),
        versions: ["2.0L TDI Bi-Turbo 4Motion", "3.0L V6 TDI"],
      },
    ],
  },
  {
    id: "ford",
    name: "Ford",
    logoText: "FORD",
    models: [
      {
        id: "fiesta",
        name: "Fiesta",
        years: generateYears(2011, 2019),
        versions: ["1.6L Ti-VCT (SE / Titanium)", "1.6L Hatchback / Sedán"],
      },
      {
        id: "ecosport",
        name: "EcoSport",
        years: generateYears(2008, 2021),
        versions: ["2.0L Duratec 4x2/4x4", "1.5L Dragon 3 Cil", "1.6L Sigma"],
      },
      {
        id: "ranger",
        name: "Ranger",
        years: generateYears(2008, 2025),
        versions: ["3.2L Puma 5 Cil Diésel", "2.2L Diésel", "2.0L Bi-Turbo Raptor", "2.5L Gasolina"],
      },
    ],
  },
  {
    id: "suzuki",
    name: "Suzuki",
    logoText: "SUZUKI",
    models: [
      {
        id: "swift",
        name: "Swift",
        years: generateYears(2012, 2025),
        versions: ["1.2L Dualjet Mild-Hybrid", "1.2L K12M Sedán (Dzire)", "1.4L Boosterjet Sport"],
      },
      {
        id: "vitara",
        name: "Vitara / Grand Vitara",
        years: generateYears(2007, 2025),
        versions: ["1.6L VVT Live", "1.4L Boosterjet Turbo", "2.0L Grand Vitara 4x4", "2.4L Grand Vitara"],
      },
    ],
  },
];
