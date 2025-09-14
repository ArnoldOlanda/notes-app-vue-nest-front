# 📝 Notes App - Frontend

Una aplicación moderna de notas desarrollada con Vue.js 3 que permite a los usuarios crear, editar, organizar y gestionar sus notas de forma intuitiva con soporte para temas claro/oscuro.

## ✨ Características

- 🔐 **Autenticación completa**: Login, registro, recuperación de contraseña
- 🌐 **OAuth**: Integración con Google y GitHub
- 📝 **Editor rico**: Editor de texto avanzado con sintaxis highlighting
- 🏷️ **Organización**: Categorías y etiquetas para organizar notas
- 🌙 **Temas**: Soporte para tema claro y oscuro
- 🌍 **Internacionalización**: Múltiples idiomas (EN/ES)
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **GraphQL**: API moderna y eficiente
- 🧪 **Testing**: Suite de pruebas incluida

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **Vue.js 3** - Framework principal con Composition API
- **Vite** - Build tool y desarrollo
- **Vue Router** - Enrutamiento SPA
- **Pinia** - Gestión de estado

### UI & Styling
- **Tailwind CSS** - Framework de utilidades CSS
- **DaisyUI** - Componentes UI basados en Tailwind
- **Vue3-Quill** - Editor de texto rico
- **Sass** - Preprocesador CSS

### GraphQL & API
- **Apollo Client** - Cliente GraphQL
- **@vue/apollo-composable** - Integración Apollo con Vue 3
- **GraphQL** - Lenguaje de consulta

### Autenticación & Validación
- **@vuelidate** - Validación de formularios
- **JWT Decode** - Manejo de tokens JWT

### UX & Utilidades
- **Vue I18n** - Internacionalización
- **SweetAlert2** - Alertas y modales elegantes
- **Oh Vue Icons** - Biblioteca de iconos
- **@vueuse/core** - Utilidades composables
- **Highlight.js** - Sintaxis highlighting para código

### Testing
- **Vitest** - Framework de testing
- **@testing-library/vue** - Testing utilities
- **Happy DOM** - DOM simulation

## 🚀 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone <repository-url>
cd notes-app-vue-nest/frontend
```

2. **Instala las dependencias**
```bash
npm install
# o
yarn install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Testing
npm run test         # Ejecuta tests
npm run coverage     # Genera reporte de cobertura
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Home/           # Componentes de la página principal
│   ├── Sidebar/        # Componentes del sidebar
│   └── common/         # Componentes comunes
├── views/              # Páginas principales
├── store/              # Gestión de estado (Pinia)
├── router/             # Configuración de rutas
├── composables/        # Composables de Vue
├── graphql/           # Queries y mutations GraphQL
├── services/          # Servicios y API calls
├── lang/              # Archivos de idiomas
└── assets/            # Recursos estáticos
```

## 🎨 Temas

La aplicación soporta temas claro y oscuro que se sincronizan automáticamente:

- **Tema claro**: Diseño limpio con colores suaves
- **Tema oscuro**: Perfecto para trabajo nocturno
- **Persistencia**: El tema seleccionado se guarda automáticamente

## 🌐 Internacionalización

Idiomas soportados:
- 🇺🇸 Inglés (por defecto)
- 🇪🇸 Español

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Ver cobertura
npm run coverage

# Tests en modo watch
npm run test:watch
```

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🔗 Enlaces Relacionados

- [Backend Repository](https://github.com/ArnoldOlanda/notes-app-api) - API NestJS + GraphQL
- [Documentación de Vue.js](https://vuejs.org/)
- [Documentación de Apollo Client](https://www.apollographql.com/docs/react/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

---

Desarrollado con ❤️ por [ArnoldOlanda](https://github.com/ArnoldOlanda)
