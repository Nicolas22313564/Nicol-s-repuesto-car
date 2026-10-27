export interface GlossaryTerm {
  term: string;
  slug: string;
  category: string;
  simpleExplanation: string;
  symptoms: string;
  replacementAdvice: string;
  warningNotice?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Pastillas de Freno",
    slug: "pastillas-de-freno",
    category: "Frenos",
    simpleExplanation: "Son pequeños bloques de material de fricción (generalmente cerámico o semimetálico) que aprietan el disco de la rueda para frenar el carro.",
    symptoms: "Chillido agudo metálico al pisar el pedal, pedal esponjoso o aumento de la distancia que necesita el carro para detenerse.",
    replacementAdvice: "Revisar cada 10.000 km. Cambiar cuando el grosor del material de desgaste sea menor a 3 milímetros.",
    warningNotice: "Requiere instalación técnica calificada. El apriete incorrecto de mordazas o no purgar el sistema compromete la seguridad.",
  },
  {
    term: "Discos de Freno",
    slug: "discos-de-freno",
    category: "Frenos",
    simpleExplanation: "Platos circulares de acero que giran solidarios a las ruedas. Sobre ellos se presionan las pastillas de freno.",
    symptoms: "Vibración en el volante o en el pedal al frenar a velocidades de más de 60 km/h, o surcos profundos visibles al tacto.",
    replacementAdvice: "Suelen durar entre 40.000 y 60.000 km. Si se han rectificado previamente o están por debajo del espesor mínimo marcado por el fabricante, deben cambiarse.",
    warningNotice: "Instalación en taller con torquímetro recomendada.",
  },
  {
    term: "Kit de Repartición (Correa o Cadena)",
    slug: "kit-reparticion",
    category: "Motor",
    simpleExplanation: "Es el conjunto de correa dentada, tensores y poleas que sincroniza el movimiento de los pistones con las válvulas que dejan entrar aire y gasolina.",
    symptoms: "No suele avisar con ruidos previos notorios. Si se revienta en marcha, las válvulas chocan contra los pistones doblando el motor.",
    replacementAdvice: "En Colombia cambiar religiosamente cada 50.000 km o 3 a 4 años. En carros con cadena de distribución, inspeccionar los patines tensores a los 120.000 km.",
    warningNotice: "¡Instalación de alta precisión técnica! Si la puesta a punto queda corrida un solo diente, el carro fallará o dañará el motor.",
  },
  {
    term: "Amortiguadores",
    slug: "amortiguadores",
    category: "Suspensión",
    simpleExplanation: "Tubos telescópicos hidráulicos o a gas que controlan el rebote de los resortes tras pasar por huecos, badenes o irregularidades del pavimento.",
    symptoms: "El carro rebota como un bote después de un policía acostado (reductor de velocidad), se inclina en exceso en curvas o se observan manchas de aceite escurriendo por el vástago.",
    replacementAdvice: "Inspeccionar cada 20.000 km. Reemplazar en pares (los dos delanteros o los dos traseros) entre los 60.000 y 80.000 km.",
    warningNotice: "Requiere compresor de espirales para su montaje seguro. No intente desarmar un amortiguador sin herramienta especializada.",
  },
  {
    term: "Filtro de Polen / Habitáculo",
    slug: "filtro-polen-habitaculo",
    category: "Filtros",
    simpleExplanation: "Filtro que limpia el aire que ingresa a la cabina a través del aire acondicionado o ventilación, reteniendo polvo, smog, hollín y bacterias.",
    symptoms: "Mal olor a humedad al encender el aire acondicionado, poco flujo de aire por las rejillas o alergias frecuentes dentro del vehículo.",
    replacementAdvice: "Reemplazar cada 10.000 km o 1 año. En ciudades con alta contaminación como Bogotá o Medellín, cambiar cada 6 meses.",
    warningNotice: "Instalación sencilla de bricolaje, usualmente detrás de la guantera.",
  },
  {
    term: "Bujías",
    slug: "bujias",
    category: "Motor",
    simpleExplanation: "Piezas cerámicas con electrodos que producen la chispa eléctrica para encender la mezcla de combustible dentro del cilindro.",
    symptoms: "Dificultad para encender el carro por las mañanas, jalones al acelerar, motor tembloroso en semáforos y alto consumo de gasolina.",
    replacementAdvice: "Bujías de cobre/níquel: cada 20.000 km. Bujías de Platino o Iridio: entre 60.000 y 100.000 km.",
    warningNotice: "Deben roscarse a mano y apretarse al torque exacto para no rodar la rosca de la culata de aluminio.",
  },
  {
    term: "Líquido Refrigerante (Anticongelante)",
    slug: "liquido-refrigerante",
    category: "Refrigeración",
    simpleExplanation: "Líquido químico diseñado con etilenglicol y aditivos anticorrosivos que enfría el motor sin hervir a 100°C ni oxidar los ductos metálicos.",
    symptoms: "Temperatura del motor subiendo por encima de la mitad del reloj, ventilador encendido constantemente o charco verde/rojo bajo el carro.",
    replacementAdvice: "Purgar y renovar completamente cada 2 años o 40.000 km. NUNCA mezclar colores ni rellenar con agua de grifo.",
    warningNotice: "¡Peligro de quemaduras! Nunca destapar el depósito de refrigerante ni el radiador con el motor caliente.",
  },
  {
    term: "Kit de Clutch / Embrague",
    slug: "kit-embrague",
    category: "Transmisión",
    simpleExplanation: "Mecanismo compuesto por prensa, disco de fricción y balinera que permite conectar o desconectar el motor de la caja de cambios al pisar el pedal izquierdo.",
    symptoms: "El carro 'se acelera pero no avanza con fuerza' (patina el embrague), pedal muy duro o cambios duros de entrar especialmente reversa y primera.",
    replacementAdvice: "Vida promedio entre 80.000 y 120.000 km según los hábitos de manejo. Al cambiarlo, rectificar el volante motor y cambiar el retén de cigüeñal.",
    warningNotice: "Requiere desmontar la transmisión. Trabajo exclusivo de taller mecánico profesional.",
  },
];

export interface GuidedQuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    suggestedCategory: string;
    adviceText: string;
  }[];
}

export const GUIDED_QUIZ_QUESTIONS: GuidedQuizQuestion[] = [
  {
    id: "symptom",
    question: "¿Qué síntoma o comportamiento inusual presenta tu carro?",
    subtitle: "Selecciona la descripción más parecida a lo que experimentas al conducir:",
    options: [
      {
        label: "Chillido agudo o vibración al frenar",
        description: "Suena un chillido metálico agudo o el volante vibra al reducir velocidad.",
        suggestedCategory: "frenos",
        adviceText: "Muy probablemente las pastillas de freno están llegando al límite de desgaste o los discos están rayados/alabeados.",
      },
      {
        label: "El motor se calienta o sube la aguja de temperatura",
        description: "Se enciende el testigo rojo de calor, hierve el depósito o sale vapor.",
        suggestedCategory: "refrigeracion",
        adviceText: "Puede haber una fuga de refrigerante, termostato pegado o el motoventilador no está activando. ¡Detén el carro para evitar daños mayores en el motor!",
      },
      {
        label: "Dificultad para encender o no arranca por la mañana",
        description: "Giras la llave y suena un 'clic clic', el arranque gira lento o no prende.",
        suggestedCategory: "baterias",
        adviceText: "La batería puede haber perdido su capacidad de carga o el alternador no está cargando adecuadamente.",
      },
      {
        label: "Golpeteo o desajuste al pasar por huecos",
        description: "Suena 'tac tac' en la parte delantera o el carro se siente inestable en curvas.",
        suggestedCategory: "suspension-direccion",
        adviceText: "Revisa amortiguadores, terminales de dirección, axiales o bujes de tijera comúnmente afectados por las vías colombianas.",
      },
      {
        label: "Jalones al acelerar o consumo alto de combustible",
        description: "El carro pierde fuerza en pendientes, tose o vibra en semáforos.",
        suggestedCategory: "motor",
        adviceText: "Suele relacionarse con bujías gastadas, bobinas de encendido defectuosas o filtros de combustible/aire taponados.",
      },
      {
        label: "Mantenimiento preventivo programado (aceite y filtros)",
        description: "Llegó el kilometraje de cambio de aceite o revisión periódica preventiva.",
        suggestedCategory: "lubricantes-mantenimiento",
        adviceText: "El mantenimiento a tiempo previene el 90% de las varadas en carretera y alarga la vida útil de tu motor.",
      },
    ],
  },
];
