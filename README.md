# 🎯 GIFs App - Buscador de GIFs con Angular 20

[![Angular](https://img.shields.io/badge/Angular-20.1.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC.svg)](https://tailwindcss.com/)
[![Giphy API](https://img.shields.io/badge/Giphy-API-FF6550.svg)](https://developers.giphy.com/)

## 📋 Descripción del Proyecto

Aplicación web desarrollada con **Angular 20** que permite buscar, visualizar y gestionar GIFs utilizando la **API de Giphy**. Este proyecto forma parte de un curso educativo de Udemy y demuestra conceptos avanzados de Angular incluyendo **Signals**, **Lazy Loading**, **HttpClient**, y arquitectura de componentes moderna.

## ✨ Características Principales

### 🔍 Búsqueda de GIFs
- Búsqueda en tiempo real usando la API de Giphy
- Visualización de GIFs trending
- Historial de búsquedas persistente
- Navegación por categorías

### 📱 Interfaz Moderna
- Diseño responsivo con **Tailwind CSS 4**
- Layout de dashboard con sidebar navegable
- Carga lazy de componentes
- Estados de loading y error

### 🚀 Arquitectura Avanzada
- **Angular Signals** para gestión de estado reactivo
- **Standalone Components** sin NgModules
- **Lazy Loading** de rutas y componentes
- **Mappers** para transformación de datos
- **Effects** para persistencia automática

### 💾 Persistencia de Datos
- Historial de búsquedas en LocalStorage
- Sincronización automática con effects
- Recuperación de datos al recargar

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **Angular** | 20.1.0 | Framework principal |
| **TypeScript** | 5.8.2 | Lenguaje de programación |
| **Tailwind CSS** | 4.1.13 | Framework de CSS |
| **RxJS** | 7.8.0 | Programación reactiva |
| **Giphy API** | v1 | Servicio de GIFs |
| **PostCSS** | 8.5.6 | Procesador de CSS |

## 📦 Estructura del Proyecto

```
src/app/
├── gifs/
│   ├── components/
│   │   ├── gif-list-item/           # Componente individual de GIF
│   │   └── side-menu/
│   │       ├── gif-list/            # Lista de GIFs en sidebar
│   │       ├── side-menu-header/    # Header del menú lateral
│   │       ├── side-menu-options/   # Opciones de navegación
│   │       └── side-menu.component  # Contenedor del sidebar
│   ├── interfaces/
│   │   ├── gif.interface.ts         # Interfaz simplificada de GIF
│   │   └── giphy.interfaces.ts      # Interfaces de la API de Giphy
│   ├── mapper/
│   │   └── gif.mapper.ts            # Transformación de datos API → App
│   ├── pages/
│   │   ├── dashboard-page/          # Layout principal con sidebar
│   │   ├── gif-history/            # Página de historial por query
│   │   ├── search-page/            # Página de búsqueda
│   │   └── trending-page/          # Página de GIFs trending
│   └── services/
│       └── gif.service.ts          # Servicio principal de GIFs
├── environments/                    # Variables de entorno
├── app.component.*                 # Componente raíz
├── app.config.ts                   # Configuración de la app
└── app.routes.ts                   # Configuración de rutas
```

## 🎯 Funcionalidades Implementadas

### 📍 Sistema de Rutas
```typescript
/dashboard                    # Layout principal
├── /trending                # GIFs trending (ruta por defecto)
├── /search                  # Búsqueda de GIFs
└── /history/:query          # Historial por consulta específica
```

### 🧠 Gestión de Estado con Signals
```typescript
// Signals principales en GifService
public trendingGifs = signal<Gif[]>([])           // GIFs trending
public trendingGifsLoading = signal(true)         // Estado de carga
public searchHistory = signal<Record<string, Gif[]>>() // Historial
public searchHistoryKeys = computed<string[]>()    // Keys computadas
```

### 📡 Integración con API de Giphy
- **Trending GIFs**: `/gifs/trending`
- **Búsqueda**: `/gifs/search?q={query}`
- **Parámetros**: `api_key`, `limit=25`, `rating=r`
- **Mapeo**: Transformación de `GiphyItem[]` → `Gif[]`

### 💾 Persistencia Automática
```typescript
// Effect para sincronización con LocalStorage
public saveToLocalStorage = effect(() => {
  localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
});
```

## 🔧 Requisitos Previos

- **Node.js** 20.x o superior
- **npm** 8.x o superior  
- **Angular CLI** 20.x
- **Cuenta en Giphy** (para API Key)

## 📥 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/GabrielZapata2696/Gifs-Searcher.git
cd Gifs-Searcher
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar API Key de Giphy

**Opción A**: Usar la API Key incluida (para desarrollo)
```typescript
// src/environments/environment.ts
apiKey: 'Ejemplo_API_KEY' // ⚠️ Solo para desarrollo
```

**Opción B**: Configurar tu propia API Key
1. Crear cuenta en [Giphy Developers](https://developers.giphy.com/)
2. Obtener API Key gratuita
3. Reemplazar en `src/environments/environment.ts`

### 4. Ejecutar en desarrollo
```bash
npm start
# o
ng serve
```

### 5. Abrir en navegador
```
http://localhost:4200
```

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Pruebas unitarias |
| `npm run watch` | Build en modo watch |

## 🎨 Características de UI/UX

### 📱 Layout Responsivo
- **Sidebar**: Navegación lateral con historial
- **Main Content**: Área principal de visualización
- **Grid System**: Layout de GIFs adaptativo
- **Loading States**: Indicadores de carga

### 🎭 Componentes Reutilizables
- **GifListItem**: Visualización individual de GIF
- **SideMenu**: Navegación y historial
- **Dashboard**: Layout principal

### Cobertura de pruebas
```bash
npm test -- --code-coverage
```

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos se generan en `dist/gifs-app/`

## 🔍 Conceptos Angular Demostrados

### ✅ Angular Signals
- **Signals básicos**: `signal()`, `computed()`
- **Effects**: `effect()` para side effects
- **Reactividad**: Actualización automática de UI

### ✅ Arquitectura Moderna
- **Standalone Components**: Sin NgModules
- **Lazy Loading**: Carga diferida de componentes
- **Barrel Exports**: Organización de imports

### ✅ HTTP Client
- **Inyección**: `inject(HttpClient)`
- **Observables**: RxJS operators (`map`, `tap`)
- **Error handling**: Manejo de errores de API

### ✅ Router Avanzado
- **Lazy Loading**: `loadComponent()`
- **Nested Routes**: Rutas anidadas
- **Route Parameters**: `:query` parameters

### ✅ Servicios y DI
- **Injectable**: `providedIn: 'root'`
- **Modern Injection**: `inject()` function
- **State Management**: Signals como store

## 🌐 API de Giphy

### Ejemplo Endpoints Utilizados

```typescript
// Trending GIFs
GET https://api.giphy.com/v1/gifs/trending
Params: { api_key, limit: '25', rating: 'r' }

// Búsqueda
GET https://api.giphy.com/v1/gifs/search  
Params: { api_key, q: query, limit: '25', rating: 'r' }
```

### Estructura de Respuesta
```typescript
interface GiphyResponse {
  data: GiphyItem[];
  pagination: Pagination;
  meta: Meta;
}

interface GiphyItem {
  id: string;
  title: string;
  images: {
    original: { url: string };
    // ... otras resoluciones
  };
}
```

## 📚 Recursos de Aprendizaje

### Documentación Official
- [Angular Signals](https://angular.dev/guide/signals)
- [Angular HTTP Client](https://angular.dev/guide/http)
- [Angular Router](https://angular.dev/guide/routing)
- [Giphy API Docs](https://developers.giphy.com/docs/api/)

### Conceptos Clave
- **Reactive Programming** con RxJS
- **Component Architecture** moderna
- **State Management** con Signals
- **API Integration** patterns
- **Responsive Design** con Tailwind

## 🌐 Demo en Vivo

🚀 **[Ver Demo]([https://github.com/GabrielZapata2696/Gifs-Searcher](https://nggiphy-searcher.netlify.app/#/dashboard/trending))** - Visita el repositorio para instrucciones de deployment

### 📱 Capturas de Pantalla

| Trending GIFs | Búsqueda | Historial |
|---------------|----------|----------|
| ![Trending](docs/trending.png) | ![Search](docs/search.png) | ![History](docs/history.png) |

*Las capturas se actualizarán próximamente*

## 🚀 Deploy a Producción

### Netlify / Vercel
```bash
# Build optimizado
npm run build:prod

# Los archivos están en dist/gifs-app/
# Subir esta carpeta a tu servicio preferido
```

### GitHub Pages
```bash
# Instalar gh-pages
npm install --save-dev angular-cli-ghpages

# Deploy a GitHub Pages
ng build --configuration production --base-href "/Gifs-Searcher/"
npx angular-cli-ghpages --dir=dist/gifs-app
```

### Docker
```dockerfile
# Dockerfile
FROM nginx:alpine
COPY dist/gifs-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📂 Archivos del Proyecto

| Archivo | Descripción |
|---------|-------------|
| `README.md` | 📖 Documentación principal |
| `CONTRIBUTING.md` | 🤝 Guía de contribución |
| `CHANGELOG.md` | 📋 Historial de cambios |
| `LICENSE` | ⚖️ Licencia MIT |
| `SECURITY.md` | 🔒 Políticas de seguridad |
| `package.json` | 📦 Configuración del proyecto |
| `.gitignore` | 🚫 Archivos ignorados por Git |

## 🔗 Enlaces Útiles

- 🏠 [Repositorio Principal](https://github.com/GabrielZapata2696/Gifs-Searcher)
- 🐛 [Reportar Issues](https://github.com/GabrielZapata2696/Gifs-Searcher/issues)
- 💬 [Discussions](https://github.com/GabrielZapata2696/Gifs-Searcher/discussions)
- 📋 [Releases](https://github.com/GabrielZapata2696/Gifs-Searcher/releases)
- 🔀 [Pull Requests](https://github.com/GabrielZapata2696/Gifs-Searcher/pulls)

## 👨‍💻 Autor

**Gabriel Zapata**
- 🐱 GitHub: [@GabrielZapata2696](https://github.com/GabrielZapata2696)
- 📧 Email: sr.gabrielzm@gmail.com
- 💼 LinkedIn: [Gabriel Zapata](https://linkedin.com/in/gabriel-andres-zapata-morera)

Proyecto desarrollado como parte del curso de Angular en Udemy, enfocado en las características más recientes del framework y mejores prácticas de desarrollo.

## 🙏 Agradecimientos

- 🎓 **Udemy Course**: Por la excelente formación en Angular
- 🎨 **Giphy**: Por proporcionar una API gratuita y fácil de usar
- 🅰️ **Angular Team**: Por crear un framework tan poderoso
- 🎨 **Tailwind CSS**: Por hacer el diseño tan sencillo
- 👥 **Comunidad Open Source**: Por compartir conocimiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

### 📋 Resumen de la Licencia
- ✅ Uso comercial permitido
- ✅ Modificación permitida
- ✅ Distribución permitida
- ✅ Uso privado permitido

---

<div align="center">

### 🌟 Si este proyecto te ha ayudado, ¡dale una estrella! 🌟

![GitHub stars](https://img.shields.io/github/stars/GabrielZapata2696/Gifs-Searcher?style=social)
![GitHub forks](https://img.shields.io/github/forks/GabrielZapata2696/Gifs-Searcher?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/GabrielZapata2696/Gifs-Searcher?style=social)

**¡Gracias por visitar este proyecto!** 🚀

</div>
