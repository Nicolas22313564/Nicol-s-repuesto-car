# RepuestOS Colombia 🇨🇴
### Tienda Web de Repuestos y Autopartes para el Mercado Colombiano

RepuestOS Colombia es una plataforma integral de comercio electrónico de autopartes y repuestos automotrices diseñada específicamente para Colombia. Combina una experiencia de usuario moderna, ágil y visualmente atractiva con un enfoque **didáctico y accesible para personas sin conocimientos de mecánica automotriz**.

---

## 🚀 Características Principales

### 1. Identidad Visual y Estilo Automotriz
* **Paleta de Colores:** Azul oscuro automotriz (`#0f2744`), Blanco puro y Naranja dinámico (`#ff5e14`).
* **Configuración Centralizada:** El nombre, colores, datos de contacto, NIT y dirección física se gestionan en [`src/lib/config.ts`](file:///C:/Users/Lab.Financiero/.gemini/antigravity/scratch/repuestos-colombia/src/lib/config.ts).
* **Idioma y Región:** Redacción 100% en español colombiano contextualizado con términos del mercado local (pernos, pastillas, discos alabeados, amortiguadores, kits de repartición, SOAT, RUNT, etc.).
* **Diseño Responsivo:** Adaptado para teléfonos celulares, tablets y pantallas de escritorio.

### 2. Precios Exclusivos en Pesos Colombianos (COP)
* Formateo estricto con `Intl.NumberFormat('es-CO')` y la moneda `COP`.
* Presentación clara: `$45.000 COP`, `$120.000 COP`, `$350.000 COP`.
* No muestra dólares ni monedas extranjeras.
* IVA del 19% incluido en los precios finales de catálogo.
* Desglose detallado en checkout: Subtotal de repuestos, Flete de envío según destino nacional y Total a pagar en COP.

### 3. Buscador Inteligente y Motor de Compatibilidad
* **Flujo Guiado de Vehículo:** Marca ➔ Modelo ➔ Año ➔ Motorización/Versión.
* Marcas populares en Colombia: Chevrolet (Onix, Sail, Tracker, Spark), Renault (Duster, Sandero, Logan, Kwid), Mazda (Mazda 2, 3, CX-30), Kia (Picanto, Rio, Sportage), Toyota (Hilux, Corolla, Fortuner, Prado), Nissan (Versa, March, Frontier), Volkswagen, Hyundai, Ford, Suzuki, etc.
* **Compatibilidad Verificada:** Si el usuario selecciona un vehículo, el catálogo valida automáticamente si la referencia calza al 100%, alertando en caso de incompatibilidad para evitar compras erradas.
* **Consulta por Placa / VIN:** Conforme al marco legal colombiano (Ley 1581 y RUNT), se orienta al usuario para realizar la validación asistida directa con un especialista técnico por WhatsApp.

### 4. Experiencia Didáctica para Conductores
* **¿Para qué sirve?:** Explicación clara y sin tecnicismos incomprensibles de cada componente.
* **¿Cómo saber si es compatible?:** Guía visual para comprobar la compatibilidad con el carro.
* **Consejos de Mantenimiento Preventivo:** Recomendaciones prácticas para alargar la vida útil del vehículo en las carreteras colombianas.
* **Glosario Automotriz Interactivo:** Diccionario explicativo con síntomas de fallo auditivos y visuales (chillidos al frenar, sobrecalentamiento, pedal esponjoso, etc.).
* **Asistente de Búsqueda Guiada (`/asistente`):** Test interactivo por síntomas que orienta al usuario hacia la categoría exacta (con advertencia legal de que no sustituye un taller mecánico).
* **Advertencias de Instalación:** Notificación cuando el repuesto requiere montaje con herramientas especializadas o torquímetro en taller.

### 5. Carrito Funcional y Checkout Colombiano
* Carrito lateral deslizable persistente en `localStorage`.
* Control estricto de existencias: impide agregar más unidades de las disponibles en inventario.
* **Proceso de Compra en 4 Pasos:**
  1. Revisión de repuestos y cantidades.
  2. Datos de entrega y facturación electrónica (Cédula de Ciudadanía CC, NIT, Correo, Celular, Dirección, Departamento y Municipio).
  3. Selección de medio de pago colombiano: Wompi Bancolombia, PSE, Mercado Pago Colombia o Pago Contra Entrega en Efectivo.
  4. Confirmación con voucher oficial y número de seguimiento `#REP-COL-XXXXX`.

### 6. Envíos y Cobertura Nacional
* Cobertura para los principales departamentos y municipios: Bogotá D.C., Antioquia (Medellín, Envigado, Rionegro), Valle del Cauca (Cali, Palmira), Atlántico (Barranquilla), Santander (Bucaramanga), Eje Cafetero, Tolima, Huila, Meta, etc.
* Cálculo en tiempo real de flete según destino.
* **Envío GRATIS** a nivel nacional por compras superiores a `$250.000 COP`.
* Tiempos estimados reales (1-2 días Bogotá, 2-3 días principales, 3-5 días otros).
* Integración lógica preparada para Coordinadora Mercantil, Servientrega, Envía y Deprisa.

### 7. Integración Dinámica con WhatsApp
* Botón flotante siempre visible.
* Generador de mensajes con contexto automático:
  * Si estás viendo un repuesto, incluye el nombre, marca y referencia (SKU).
  * Si tienes tu carro seleccionado, incluye la marca, modelo, año y motor.
  * Formulario rápido para redactar preguntas técnicas antes de abrir WhatsApp.
* Número y horarios de atención completamente configurables en [`src/lib/config.ts`](file:///C:/Users/Lab.Financiero/.gemini/antigravity/scratch/repuestos-colombia/src/lib/config.ts).

### 8. Panel Administrativo Protegido (`/admin`)
* Acceso protegido por contraseña (clave de prueba: `admin123`).
* **Métricas en tiempo real:** Ventas acumuladas en COP, órdenes activas, alertas de stock bajo y referencias totales.
* **CRUD de Repuestos:** Crear nuevos repuestos, editar precios en COP, ajustar existencias de inventario, modificar imágenes y eliminar piezas.
* **Gestión de Órdenes:** Visualizar detalles de clientes colombianos, cambiar estado (`Recibido`, `En preparación`, `Despachado`, `Entregado`) y asignar número de guía de transportadora.
* **Tarifas y Parámetros:** Visualización y control del umbral de flete gratuito y datos de contacto.

### 9. Normativa Colombiana y Protección al Consumidor
* Cumplimiento con la **Ley 1480 de 2011** (Estatuto del Consumidor, derecho de retracto de 5 días hábiles y garantías legales mínimas).
* Cumplimiento con la **Ley 1581 de 2012** (Habeas Data y Tratamiento de Datos Personales).
* Espacios y páginas dedicadas para políticas de garantías, retracto, términos de compraventa y facturación electrónica DIAN.
* Enlaces visibles a la Superintendencia de Industria y Comercio (SIC).

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** Next.js 14 (App Router con Server Components y Client Components).
* **Lenguaje:** TypeScript 5.
* **Estilos:** Tailwind CSS 3.4 con paleta personalizada `brand-navy` y `brand-orange`.
* **Iconografía:** Lucide React.
* **Formateo Regional:** JavaScript `Intl` con locale `es-CO` y moneda `COP`.

---

## 📦 Instrucciones para Ejecutar el Proyecto

### 1. Requisitos Previos
* Node.js v18.17+ o v20+ (ya instalado en el entorno en `%LOCALAPPDATA%\Programs\nodejs`).

### 2. Navegar al Directorio del Proyecto
```powershell
cd "C:\Users\Lab.Financiero\.gemini\antigravity\scratch\repuestos-colombia"
```

### 3. Iniciar el Servidor de Desarrollo
```powershell
npm run dev
```
Abre tu navegador en `http://localhost:3000`.

### 4. Compilar para Producción y Probar
```powershell
npm run build
npm run start
```

---

## 🔑 Cuentas y Accesos de Prueba

* **Panel Administrativo:** Ingresa a `/admin`.
* **Contraseña de Administrador:** `admin123` o `repuestos2025`.
* **Pedidos de Prueba para Rastreo:** Ingresa a `/seguimiento` y prueba con los códigos:
  * `REP-COL-74210`
  * `REP-COL-74209`
  * `REP-COL-74208`
