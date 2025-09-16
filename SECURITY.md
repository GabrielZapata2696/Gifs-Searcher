# Política de Seguridad - Angular GIFs App

## 🛡️ Reporte de Vulnerabilidades de Seguridad

Si descubres una vulnerabilidad de seguridad en este proyecto, por favor repórtala de manera responsable.

### 📧 Cómo Reportar
- **Email**: Envía un email a [tu-email-seguridad@ejemplo.com]
- **Asunto**: `[SECURITY] Angular GIFs App - Descripción breve`
- **No reportes vulnerabilidades en issues públicos**

### ⏱️ Tiempo de Respuesta
- **Confirmación inicial**: 48 horas
- **Evaluación detallada**: 7 días
- **Fix y comunicación**: Según criticidad (1-30 días)

## 🔐 Consideraciones de Seguridad

### 🗝️ Gestión de API Keys

#### ⚠️ API Key Incluida (Solo Desarrollo)
Este proyecto incluye una API key de Giphy para **fines demostrativos y educativos**:

```typescript
// src/environments/environment.ts
apiKey: 'ZCvw75NBolXuAvbW0PduDUixl58xib6p'
```

**⚠️ IMPORTANTE**: Esta key es pública y tiene limitaciones:
- ✅ Apropiada para desarrollo y aprendizaje
- ✅ Limitada a 1000 requests/día
- ❌ NO usar en aplicaciones de producción
- ❌ NO modificar o abusar de esta key

#### ✅ Para Aplicaciones de Producción

**Paso 1**: Obtener tu propia API Key
```bash
# 1. Visitar https://developers.giphy.com/
# 2. Crear cuenta gratuita
# 3. Crear nueva app
# 4. Copiar tu API key personal
```

**Paso 2**: Configurar Variables de Entorno
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiKey: process.env['GIPHY_API_KEY'] || 'fallback-key',
  giphyUrl: 'https://api.giphy.com/v1'
};
```

**Paso 3**: Configurar Build Process
```json
// angular.json
"build": {
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}
```

### 🌐 Seguridad en Cliente (Frontend)

#### ⚠️ Limitaciones Inherentes
Las aplicaciones Angular se ejecutan en el navegador del usuario:

```typescript
// ❌ NUNCA hagas esto en producción:
const secretApiKey = 'super-secret-key-here'; // Visible en DevTools

// ✅ En su lugar:
const publicApiKey = environment.apiKey; // Key pública designada
```

**Implicaciones**:
- 🔍 Cualquier API key es **visible** en el código del cliente
- 🚫 No se pueden ocultar secrets del lado del cliente
- 🛡️ Usar API keys específicamente designadas para cliente público

#### 💡 Mejores Prácticas

**1. Usar API Keys Públicas Designadas**
```typescript
// ✅ Correcto: API key específica para frontend
const clientApiKey = 'gho_public_frontend_key_12345';

// ❌ Incorrecto: API key de servidor en frontend  
const serverApiKey = 'ghs_server_secret_key_67890';
```

**2. Implementar Rate Limiting**
```typescript
// En tu servicio
private requestQueue$ = new BehaviorSubject<boolean>(false);

searchGifs(query: string) {
  // Implementar debounce y throttle
  return this.http.get(url).pipe(
    debounceTime(300), // Esperar 300ms entre requests
    distinctUntilChanged() // Solo si la query cambió
  );
}
```

**3. Validación del Side Client**
```typescript
// Validar inputs antes de hacer requests
searchGifs(query: string) {
  if (!query || query.length < 2) {
    return EMPTY;
  }
  
  if (query.length > 50) {
    throw new Error('Query too long');
  }
  
  return this.http.get(/* ... */);
}
```

### 🔒 Content Security Policy (CSP)

Para mayor seguridad, implementa CSP headers:

```html
<!-- src/index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self';
        style-src 'self' 'unsafe-inline';
        img-src 'self' https://media.giphy.com https://*.giphy.com;
        connect-src 'self' https://api.giphy.com;
        font-src 'self';
      ">
```

### 🌍 CORS y Dominios Permitidos

La API de Giphy maneja CORS, pero para APIs propias:

```typescript
// Configuración de headers seguros
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })
};
```

## 🚨 Vulnerabilidades Conocidas

### ✅ Estado Actual: Seguro

- **Último scan**: Enero 2025
- **Vulnerabilidades críticas**: 0
- **Vulnerabilidades altas**: 0  
- **Vulnerabilidades medias**: 0
- **Vulnerabilidades bajas**: 0

### 🔍 Herramientas de Auditoría

```bash
# Auditoría automática de dependencias
npm audit

# Auditoría detallada
npm audit --audit-level=moderate

# Fix automático (cuidado en producción)
npm audit fix
```

## 📋 Checklist de Seguridad

### Para Desarrolladores

- [ ] ✅ Nunca hardcodear API keys de producción
- [ ] ✅ Usar variables de entorno para configuración
- [ ] ✅ Validar inputs del usuario
- [ ] ✅ Implementar rate limiting
- [ ] ✅ Mantener dependencias actualizadas
- [ ] ✅ Usar HTTPS en producción
- [ ] ✅ Configurar CSP apropiado
- [ ] ✅ Revisar código antes de hacer commit

### Para Producción

- [ ] ⚠️ API key propia configurada
- [ ] ⚠️ Variables de entorno configuradas
- [ ] ⚠️ HTTPS forzado
- [ ] ⚠️ CSP headers implementados
- [ ] ⚠️ Error handling robusto
- [ ] ⚠️ Logging de seguridad
- [ ] ⚠️ Monitoring de rate limits
- [ ] ⚠️ Backup y recovery plan

## 🛠️ Configuración de Desarrollo Seguro

### Variables de Entorno Locales

```bash
# .env.local (ignorado por git)
GIPHY_API_KEY=tu_key_personal_aqui
ENVIRONMENT=development
DEBUG_MODE=true
```

```typescript
// src/environments/environment.local.ts
export const environment = {
  production: false,
  apiKey: process.env['GIPHY_API_KEY'] || 'fallback-demo-key',
  giphyUrl: 'https://api.giphy.com/v1',
  debugMode: process.env['DEBUG_MODE'] === 'true'
};
```

### Git Hooks de Seguridad

```bash
# .git/hooks/pre-commit
#!/bin/sh
# Verificar que no se cometan API keys
if grep -r "api.*key.*=" src/ --include="*.ts" --exclude-dir=environments; then
  echo "⚠️  Posible API key detectada en código!"
  echo "Verifica que no estés commiteando secrets."
  exit 1
fi
```

## 📞 Contacto de Seguridad

Para cualquier consulta relacionada con seguridad:

- **Issues de Seguridad**: [Repositorio Issues](https://github.com/GabrielZapata2696/Gifs-Searcher/issues) (solo para vulnerabilidades menores)
- **Vulnerabilidades Críticas**: Email privado (ver sección de reporte)
- **Consultas Generales**: [GitHub Discussions](https://github.com/GabrielZapata2696/Gifs-Searcher/discussions)

## 📚 Recursos Adicionales

- [OWASP Frontend Security Checklist](https://owasp.org/www-project-front-end-security-checklist/)
- [Angular Security Guide](https://angular.dev/guide/security)
- [Giphy API Security](https://developers.giphy.com/docs/api/#security)
- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

**Última actualización**: Enero 2025  
**Próxima revisión**: Julio 2025
