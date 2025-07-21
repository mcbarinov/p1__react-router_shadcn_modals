pnpm create vite@latest -t react-ts p1
pnpm add -D prettier eslint-config-prettier @types/node
pnpm add react-router tailwindcss @tailwindcss/vite
echo '@import "tailwindcss";' > src/index.css
# edit .prettierrc, eslint.config.js, tsconfig.app.json, tsconfig.json, vite.config.ts
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button textarea dropdown-menu dialog input label
