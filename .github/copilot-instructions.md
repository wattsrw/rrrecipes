<!-- Workspace-specific custom instructions for Copilot -->

## Project Setup Checklist

- [x] Create copilot-instructions.md file
- [x] Scaffold React TypeScript project with Vite
- [x] Install dependencies
- [x] Verify build setup and resolve issues
- [x] Create and run dev task
- [x] Update documentation

### Project Details
- **Name**: RRRecipes
- **Type**: React TypeScript
- **Build Tool**: Vite
- **Template**: react-ts
- **React Version**: 19.2.5
- **TypeScript Version**: ~6.0.2
- **Vite Version**: 8.0.10

### Getting Started

**Development Server:**
```bash
npm run dev
```
Development server runs at: http://localhost:5173/

**Build for Production:**
```bash
npm run build
```

**Lint Code:**
```bash
npm run lint
```

**Preview Production Build:**
```bash
npm run preview
```

**Generate routes:**
```bash
npm run generate-routes
```

### Project Structure
- `/src` - React components and application code
- `/public` - Static assets
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration


### Design Considerations
- Use Joy UI package for styling and components
- Use Joy UI's layout components for responsive design
- Optimize for mobile devices, but design for desktop too