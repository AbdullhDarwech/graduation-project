# Graduation Project

**Graduation Project Management System**  
نظام لإدارة مشاريع التخرج الجامعية، يتيح للطلاب تقديم مشاريعهم، البحث عن فرق، وللأساتذة قبول المشاريع والإشراف عليها.

## Features

### 🧑‍🎓 Student
- تقديم مشروع تخرج لاختيار أستاذ مشرف.
- البحث عن فرق والانضمام إليها.
- نشر إعلان بحث عن أعضاء فريق.

### 👨‍🏫 Teacher
- استعراض المشاريع المقدمة إليه.
- قبول أو رفض المشاريع وتحديد موعد إشراف.
- متابعة المشاريع الحالية وإضافة طلاب للمشاريع.

### ⚙️ Backend
- Node.js / Express (أو أي Backend تستخدمه)
- MySQL / MongoDB
- API لإدارة المشاريع والطلاب والإعلانات.

### 💻 Frontend
- React + Ant Design
- واجهات تسجيل دخول، لوحة تحكم للطلاب والأساتذة، فلترة وإعلانات الفرق.

## Installation

# Clone the repository
git clone https://github.com/username/graduation-project.git

# Install dependencies
cd graduation-project
npm install

# Run the project
npm start




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
