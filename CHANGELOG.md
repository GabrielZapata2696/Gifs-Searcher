# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere al [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Planeado
- [ ] Implementar paginación infinita
- [ ] Agregar sistema de favoritos 
- [ ] Modo oscuro/claro
- [ ] PWA capabilities
- [ ] Animaciones de transición
- [ ] Optimización de performance

## [1.0.0] - 2025-01-16

### 🎉 Release Inicial

#### ✨ Agregado
- **Búsqueda de GIFs**: Integración completa con API de Giphy
- **GIFs Trending**: Visualización de GIFs populares al cargar la app
- **Historial de Búsquedas**: Persistencia en LocalStorage con Angular Signals
- **Navegación Avanzada**: Router con lazy loading y rutas anidadas
- **Diseño Responsivo**: UI moderna con Tailwind CSS 4
- **Arquitectura Moderna**: Standalone components sin NgModules

#### 🛠️ Características Técnicas
- **Angular 20**: Última versión del framework
- **Signals**: Gestión de estado reactivo moderno
- **HttpClient**: Integración con API REST
- **Effects**: Side effects automáticos para LocalStorage
- **Mappers**: Transformación limpia de datos de API
- **TypeScript 5.8**: Tipado fuerte y moderno

#### 📦 Estructura de Componentes
- `DashboardPageComponent`: Layout principal con sidebar
- `SearchPageComponent`: Interfaz de búsqueda de GIFs
- `TrendingPageComponent`: Página de GIFs populares
- `GifHistoryComponent`: Historial por consulta específica
- `SideMenuComponent`: Navegación lateral con historial
- `GifListItemComponent`: Componente individual de GIF

#### 🌐 Integración API
- **Giphy API v1**: Endpoints de trending y búsqueda
- **Rate Limiting**: Límite de 25 GIFs por request
- **Content Rating**: Filtro de contenido apropiado
- **Error Handling**: Manejo robusto de errores de red

#### 💾 Persistencia
- **LocalStorage**: Historial automático de búsquedas
- **Auto-sync**: Sincronización con Effects de Angular
- **Data Recovery**: Recuperación de datos al recargar

### 🔧 Configuración
- **Node.js**: Soporte para versión 20.x
- **Package Scripts**: Scripts optimizados para desarrollo y producción
- **Environment**: Configuración flexible de API keys
- **Build**: Optimización automática para producción

### 📚 Documentación
- **README**: Guía completa de instalación y uso
- **CONTRIBUTING**: Guías de contribución y desarrollo
- **LICENSE**: Licencia MIT para uso educativo
- **Code Comments**: JSDoc en servicios principales

---

## Tipos de Cambios

- `✨ Agregado` para nuevas funcionalidades
- `🔄 Cambiado` para cambios en funcionalidades existentes  
- `⚠️ Deprecado` para funcionalidades que serán removidas
- `🗑️ Removido` para funcionalidades removidas
- `🐛 Arreglado` para corrección de bugs
- `🔒 Seguridad` para mejoras de seguridad
- `📚 Documentación` para cambios en documentación
- `🛠️ Técnico` para cambios técnicos internos
- `🎨 UI/UX` para mejoras visuales y de experiencia

## Convenciones de Versionado

- **MAJOR**: Cambios incompatibles de API
- **MINOR**: Nueva funcionalidad compatible hacia atrás  
- **PATCH**: Correcciones de bugs compatibles hacia atrás

## Links de Comparación

[Unreleased]: https://github.com/GabrielZapata2696/Gifs-Searcher/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/GabrielZapata2696/Gifs-Searcher/releases/tag/v1.0.0
