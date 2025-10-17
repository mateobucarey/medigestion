Frontend básico para proyecto Medigestion

Cómo instalar:

- Ir a la carpeta `frontend/react`
- Ejecutar `npm install`
- Crear un archivo `.env` opcional con `VITE_API_BASE` si el backend no está en `http://localhost:3001/api`.
- Ejecutar `npm run dev` para iniciar el dev server de Vite.

Notas:
- Login usa el endpoint `POST /api/auth/login` y guarda el token en `localStorage`.
- Dashboard consulta `GET /api/auth/me` para obtener datos del usuario.
- Esto es una base funcional sin estilos; sigue agregando vistas por rol.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
