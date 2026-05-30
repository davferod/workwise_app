# Auth Frontend — Contexto de módulo

## Rama activa
`feat/auth-ui`

## Operaciones GQL implementadas en XauthService

| Método | GQL Tipo | Operación | Campos solicitados | Status |
|--------|----------|-----------|-------------------|--------|
| `login(email, password)` | Mutation | `Login` | accessToken, refreshToken, user{_id,username,email,role,isActive} | ✅ |
| `register(username, email, password)` | Mutation | `Signup` | accessToken, refreshToken, user{_id,username,email,role,isActive} | ✅ |
| `revalidateToken()` | Query | `Revalidate` | accessToken, refreshToken, user{_id,username,email,role,isActive} | ✅ |
| `isAvailable(email)` | Query | `IsValidate` | Boolean | ✅ |
| `logout()` | — | — | — | ✅ Limpia AuthStore |
| `registerAndLogin()` | — | Helper | register → login pipeline | ✅ |

## Modelos

```typescript
AuthUser {
  _id: string;
  username: string;
  email: string;
  role: string[];
  isActive: boolean;
}

ResponseLogin {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
```

## AuthStore (nativo — Signals)

**Archivo:** `src/app/domains/shared/stores/auth.store.ts`

```
- #currentUser: signal<AuthUser | null>  [privado]
- currentUser: computed()                 [read-only, expuesto]
- isAuthenticated: computed()             [true si user && isActive]
- setUser(user: AuthUser): void
- clearUser(): void
```

**Integración:**
- `login()` → setUser() en tap
- `register()` → setUser() en tap
- `revalidateToken()` → setUser() en tap
- `logout()` → clearUser()

## Guards

- `authGuard` — valida `TokenService.isValidToken()` (JWT expiración local) → redirige a `/login` si inválido
- `redirectGuard` — si token válido → redirige a `/app` (protege la página de login de usuarios ya autenticados)

## APP_INITIALIZER — Sesión persistente

**Archivo:** `src/app/app.config.ts`

Al cargar la app:
1. Lee token con `TokenService.getToken()`
2. Si existe y es válido (no expirado) → llama `revalidateToken()`
3. `revalidateToken()` obtiene nuevo access token + usuario del backend
4. Popula `AuthStore` con usuario
5. Si no hay token o falla → `clearUser()` (no hace error, solo no autentica)
6. Usa `firstValueFrom()` para que Angular espere la resolución

**Efecto:** Refrescar página en `/app` → sesión restaurada automáticamente sin redirigir a login

## Token Rotation — Interceptor

**Archivo:** `src/app/interceptors/token.interceptor.ts`

Función `updateAccessTokenAndRefreshToken()`:
- Si `TokenService.isValidToken()` (token aún válido) → llama `revalidateToken()` → `addToken(req, next)` con token renovado
- Si token expirado → redirige a `/login` + pasa request sin token (backend rechazará con 401)

**Uso:** Requests en vuelo con token próximo a expirar — se renuevan automáticamente sin interruption

## Error Handling 401

**Archivo:** `src/app/interceptors/error-resp.interceptor.ts`

En `handleErrorResponse()`:
- Si `err.status === 401` → `clearUser()` + `removeToken()` + redirige a `/login`
- Sin retry — si llegó 401 al servidor, el token ya expiró en backend

## MeService — Observable pattern

**Archivo:** `src/app/domains/shared/services/me.service.ts`

Métodos retornan Observable (se pueden encadenar):
- `getProfile(): Observable<...>`  — carga perfil actual + popula `ProfileStore`
- `getAllProfiles(): Observable<...>` — carga todos los perfiles (admin)
- `updateProfile(): Observable<...>` — actualiza perfil + synca store

**Integración:** Llamadores de estos métodos deben `.subscribe()`

## Componentes principales

- `LoginFormComponent` — Reactive Forms, email + password, validación, status states
- `RegisterFormComponent` — Signals, validación email previa (isAvailable), match password
- `RecoveryFormComponent` — STUB — fuera del sprint actual

## Flujos validados

| Flujo | Pasos | ¿Qué validar? |
|-------|-------|---------------|
| **Login fresco** | Login → token cookie → AuthStore populado → `/app` | DevTools: `token-trello` + store signal |
| **Registro** | Signup → igual que login | Mismo |
| **Recarga página** | F5 en `/app` → APP_INITIALIZER → revalidate → AuthStore restaurado | Sin redirect a login |
| **Token expirado** | Guard detecta vencimiento → `/login` | Redirect automático |
| **401 servidor** | Endpoint rechaza → error-resp → limpia + redirect | Mismo flujo |

## Pendiente / TODO

- [ ] RecoveryForm — implementar flujo de reset password (backend dependency)
- [ ] Tests unitarios de AuthStore + interceptores
- [ ] Logout con token rotation (refrescar backend state)

## Estado actual

**Frontend auth:** ✅ 100% MVP — login, signup, sesión persistente, 401 handling, token rotation. Listo para cierre de módulo.
