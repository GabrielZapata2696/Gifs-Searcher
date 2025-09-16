# Guía de Contribución - Angular GIFs App

¡Gracias por tu interés en contribuir a **Angular GIFs App**! Esta guía te ayudará a participar en el desarrollo y mejora de este proyecto educativo.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Reportar Issues](#reportar-issues)
- [Pull Requests](#pull-requests)
- [Estructura del Commit](#estructura-del-commit)

## 🤝 Código de Conducta

Este proyecto adhiere a un código de conducta para mantener un ambiente colaborativo y respetuoso:

### Comportamientos Esperados:
- Usar lenguaje inclusivo y profesional
- Respetar diferentes puntos de vista y experiencias
- Aceptar críticas constructivas con elegancia
- Enfocarse en lo que es mejor para el proyecto y la comunidad
- Mostrar empatía hacia otros colaboradores

### Comportamientos No Aceptados:
- Lenguaje o imágenes sexualizadas
- Comentarios despectivos o ataques personales
- Acoso público o privado
- Publicar información privada de otros sin permiso

## 🚀 Cómo Contribuir

### 📝 Mejoras en Documentación
- Corregir errores tipográficos o gramaticales
- Mejorar explicaciones técnicas
- Agregar ejemplos de uso
- Traducir contenido
- Actualizar enlaces rotos

### 🐛 Reportar Bugs
- Problemas con la integración de Giphy API
- Errores en la funcionalidad de búsqueda
- Issues con el historial o LocalStorage
- Problemas de responsive design
- Errores de compilación o build

### ✨ Nuevas Funcionalidades
- Implementar paginación infinita
- Agregar sistema de favoritos
- Mejorar el manejo de errores
- Implementar modo oscuro
- Agregar animaciones y transiciones
- Optimizar performance
- Agregar PWA features

### 🧪 Testing
- Escribir pruebas unitarias para componentes
- Agregar pruebas de integración
- Mejorar cobertura de tests
- Implementar E2E testing

## 🛠️ Configuración del Entorno

### Requisitos Previos
```bash
# Node.js (versión requerida)
node --version  # >= 20.0.0

# Angular CLI
npm install -g @angular/cli@20.x

# Git
git --version
```

### Instalación Local
```bash
# 1. Fork del repositorio en GitHub
# 2. Clonar tu fork
git clone https://github.com/[tu-username]/angular-gifs-app.git
cd angular-gifs-app

# 3. Instalar dependencias
npm install

# 4. Configurar upstream
git remote add upstream https://github.com/[original-repo]/angular-gifs-app.git

# 5. Crear rama de desarrollo
git checkout -b feature/nombre-de-tu-feature

# 6. Configurar API Key de Giphy (si es necesario)
# Editar src/environments/environment.ts

# 7. Verificar que todo funciona
npm start
```

### Variables de Entorno
Para desarrollo, puedes usar la API Key incluida o configurar la tuya:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiKey: 'TU_GIPHY_API_KEY', // Opcional: reemplazar con tu key
  giphyUrl: 'https://api.giphy.com/v1',
};
```

## 📏 Estándares de Código

### TypeScript/Angular
```typescript
// ✅ Correcto: Usar inject() moderno
export class GifService {
  private http = inject(HttpClient);
  
  // ✅ Correcto: Signals con tipos explícitos
  public searchHistory = signal<Record<string, Gif[]>>({});
  
  // ✅ Correcto: Computed values descriptivos
  public searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
}

// ❌ Incorrecto: Constructor injection antiguo
export class GifService {
  constructor(private http: HttpClient) {}
}
```

### Estructura de Componentes
```typescript
// ✅ Correcto: Standalone component
@Component({
  selector: 'app-gif-list',
  imports: [CommonModule, GifListItemComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.css'
})
export default class GifListComponent {
  private gifService = inject(GifService);
  
  // Signals como propiedades públicas
  public gifs = this.gifService.trendingGifs;
  public loading = this.gifService.trendingGifsLoading;
}
```

### Nomenclatura
- **Componentes**: PascalCase (`GifListComponent`)
- **Archivos**: kebab-case (`gif-list.component.ts`)
- **Variables**: camelCase (`searchHistory`, `trendingGifs`)
- **Constantes**: UPPER_SNAKE_CASE (`API_KEY`, `GIF_STORAGE_KEY`)
- **Interfaces**: PascalCase (`Gif`, `GiphyResponse`)
- **Signals**: camelCase descriptivo (`trendingGifs`, `searchHistory`)

### Comentarios JSDoc
```typescript
/**
 * Servicio para gestionar GIFs usando la API de Giphy
 * Implementa búsqueda, trending y persistencia con Signals
 */
@Injectable({
  providedIn: 'root'
})
export class GifService {
  
  /**
   * Busca GIFs usando un término específico
   * @param query - Término de búsqueda
   * @returns Observable con array de GIFs encontrados
   */
  searchGifs(query: string): Observable<Gif[]> {
    // implementación
  }
}
```

## 🔄 Proceso de Desarrollo

### 1. Antes de Empezar
```bash
# Sincronizar con upstream
git checkout main
git pull upstream main
git push origin main

# Crear nueva rama descriptiva
git checkout -b feat/infinite-scroll
# o
git checkout -b fix/search-validation
# o
git checkout -b docs/api-integration-guide
```

### 2. Durante el Desarrollo
```bash
# Commits frecuentes con mensajes claros
git add .
git commit -m "feat(search): implement infinite scroll pagination"

# Mantener rama actualizada
git pull upstream main
```

### 3. Antes de Enviar PR
```bash
# Verificar que todo funciona
npm run build
npm test
npm run lint  # Si está configurado

# Verificar que no hay archivos sensibles
git status
# Asegurar que .env o API keys no están en el commit
```

## 🐛 Reportar Issues

### Antes de Reportar
1. Buscar issues similares existentes
2. Verificar con la última versión
3. Reproducir en entorno limpio
4. Verificar que no sea problema de configuración de API Key

### Template de Issue
```markdown
## 🐛 Descripción del Bug
[Descripción clara del problema]

## 🔄 Pasos para Reproducir
1. Ir a la página de búsqueda
2. Escribir término de búsqueda
3. Hacer clic en buscar
4. Observar el error

## ✅ Comportamiento Esperado
[Lo que debería suceder]

## ❌ Comportamiento Actual
[Lo que realmente sucede]

## 📱 Entorno
- OS: [Windows 11]
- Browser: [Chrome 120]
- Node: [20.x]
- Angular: [20.1.0]

## 📋 Información Adicional
- ¿Tienes configurada tu propia API Key?
- ¿El error aparece en consola del navegador?
- ¿Funciona con otros términos de búsqueda?

## 📸 Screenshots
[Si aplica, agregar capturas de pantalla]
```

## 🔀 Pull Requests

### Checklist antes de Enviar
- [ ] ✅ El código compila sin errores
- [ ] ✅ Las pruebas pasan (si existen)
- [ ] ✅ El código sigue las convenciones del proyecto
- [ ] ✅ Los cambios están documentados
- [ ] ✅ No hay API keys hardcodeadas
- [ ] ✅ Se actualizó README si es necesario
- [ ] ✅ Los commits siguen la convención establecida
- [ ] ✅ La funcionalidad fue probada manualmente

### Template de Pull Request
```markdown
## 🎯 Descripción
[Breve descripción de los cambios realizados]

## 📋 Tipo de Cambio
- [ ] 🐛 Bug fix
- [ ] ✨ Nueva funcionalidad  
- [ ] 💥 Breaking change
- [ ] 📚 Actualización de documentación
- [ ] 🎨 Mejoras de UI/UX
- [ ] ⚡ Optimización de performance

## 🧪 Cómo se ha Probado
- [ ] Pruebas manuales realizadas
- [ ] Funciona en diferentes navegadores
- [ ] Responsive design verificado
- [ ] API integration probada
- [ ] LocalStorage functionality verificada

## 📸 Screenshots (si aplica)
[Agregar capturas de antes y después]

## ✅ Checklist Final
- [ ] Código limpio y comentado
- [ ] No hay console.log() olvidados
- [ ] Variables y funciones tienen nombres descriptivos
- [ ] Componentes siguen principios de responsabilidad única
- [ ] Se mantiene consistencia con el diseño existente
```

## 📝 Estructura del Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(alcance): descripción

[cuerpo opcional]

[footer opcional]
```

### Tipos Permitidos
- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (no afectan funcionalidad)
- **refactor**: Refactorización de código
- **test**: Agregar o modificar pruebas
- **chore**: Tareas de mantenimiento
- **perf**: Mejoras de performance

### Alcances Sugeridos
- **search**: Funcionalidad de búsqueda
- **trending**: GIFs trending
- **history**: Historial de búsquedas
- **ui**: Interfaz de usuario
- **api**: Integración con Giphy API
- **service**: Servicios de Angular
- **component**: Componentes específicos

### Ejemplos de Commits
```bash
# Nueva funcionalidad
git commit -m "feat(search): add infinite scroll pagination"

# Corrección de bug
git commit -m "fix(history): resolve localStorage sync issue"

# Documentación
git commit -m "docs(readme): add API key configuration guide"

# Refactoring
git commit -m "refactor(service): migrate to modern inject() syntax"

# UI/UX
git commit -m "style(search): improve responsive design on mobile"

# Performance
git commit -m "perf(gif-list): implement virtual scrolling"
```

## 🎓 Recursos Adicionales

### Documentación Angular
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Angular HTTP Client](https://angular.dev/guide/http)
- [Angular Router](https://angular.dev/guide/routing)
- [Angular Testing](https://angular.dev/guide/testing)

### API de Giphy
- [Giphy API Documentation](https://developers.giphy.com/docs/api/)
- [Giphy SDK](https://developers.giphy.com/docs/sdk)

### Herramientas Útiles
- [Angular DevTools](https://angular.dev/tools/devtools)
- [RxJS Marbles](https://rxmarbles.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🙋‍♀️ ¿Necesitas Ayuda?

### Canales de Comunicación
- **Issues**: Para bugs y requests de features
- **Discussions**: Para preguntas y ideas generales
- **Email**: Para asuntos privados o sensibles

### Preguntas Frecuentes

**Q: ¿Necesito mi propia API Key de Giphy?**
A: No es necesario para desarrollo. El proyecto incluye una API key de prueba.

**Q: ¿Puedo agregar nuevas dependencias?**
A: Sí, pero justifica su necesidad en el PR y mantén el bundle size bajo control.

**Q: ¿Cómo pruebo la funcionalidad offline?**
A: Usa DevTools > Network > Offline para simular pérdida de conexión.

## 🎉 Reconocimientos

Agradecemos a todos los contribuidores que hacen este proyecto mejor:

- Contribuidores de código
- Reportadores de bugs  
- Mejoradores de documentación
- Community managers
- Testers y reviewers

---

¡Gracias por contribuir a **Angular GIFs App**! 🚀
