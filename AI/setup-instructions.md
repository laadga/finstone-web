# Complete Setup Instructions for SparklesCore Integration

## Step 1: Install Node.js
1. Download Node.js from https://nodejs.org/
2. Install the LTS version (recommended)
3. Restart your terminal/PowerShell
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Create New Next.js Project

Navigate to your desired directory and run:

```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest finstone-ai-audit --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project directory
cd finstone-ai-audit
```

Answer the prompts:
- ✅ Would you like to use TypeScript? → **Yes**
- ✅ Would you like to use ESLint? → **Yes**  
- ✅ Would you like to use Tailwind CSS? → **Yes**
- ✅ Would you like to use `src/` directory? → **Yes**
- ✅ Would you like to use App Router? → **Yes**
- ✅ Would you like to customize the default import alias (@/*)? → **No**

## Step 3: Initialize shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Follow the prompts:
# ✅ Would you like to use TypeScript (recommended)? → yes
# ✅ Which style would you like to use? → Default
# ✅ Which color would you like to use as base color? → Slate
# ✅ Where is your global CSS file? → src/app/globals.css
# ✅ Would you like to use CSS variables for colors? → yes
# ✅ Where is your tailwind.config.js located? → tailwind.config.ts
# ✅ Configure the import alias for components? → src/components
# ✅ Configure the import alias for utils? → src/lib/utils
# ✅ Are you using React Server Components? → yes
```

## Step 4: Install Required Dependencies

```bash
# Install SparklesCore dependencies
npm install framer-motion @tsparticles/slim @tsparticles/react @tsparticles/engine

# Install additional UI dependencies
npm install lucide-react class-variance-authority clsx tailwind-merge
```

## Step 5: Create Required Directories

```bash
# Create components/ui directory (if not exists)
mkdir -p src/components/ui

# Create lib directory (if not exists)  
mkdir -p src/lib
```

## Step 6: Verify Project Structure

Your project should now have this structure:
```
finstone-ai-audit/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Step 7: Test the Setup

```bash
# Start development server
npm run dev
```

Visit http://localhost:3000 to see your Next.js app running.

## Why components/ui Directory is Important

The `/components/ui` directory is crucial for shadcn/ui because:

1. **Convention**: shadcn/ui expects components in this specific path
2. **Organization**: Separates reusable UI components from page components  
3. **Import Aliases**: The `@/components/ui/` import path is configured
4. **CLI Integration**: shadcn/ui CLI automatically installs components here
5. **Best Practices**: Follows React component architecture patterns

## ✅ Integration Complete!

All files have been created and the SparklesCore component is fully integrated:

### Created Files:
- ✅ `src/components/ui/sparkles.tsx` - SparklesCore component
- ✅ `src/components/ui/demo.tsx` - Demo components with Finstone branding
- ✅ `src/app/page.tsx` - Main landing page with SparklesCore integration
- ✅ `src/app/layout.tsx` - Next.js layout
- ✅ `src/app/globals.css` - Tailwind CSS with custom Finstone styles
- ✅ `src/lib/utils.ts` - Utility functions
- ✅ `package.json` - All required dependencies
- ✅ Configuration files (tailwind.config.ts, tsconfig.json, etc.)

### Features Integrated:
- ✅ SparklesCore with Finstone brand colors (#00BFA6, #4DD0E1)
- ✅ Hero section with animated particles background
- ✅ Multiple SparklesCore demos showcasing different configurations
- ✅ Responsive design with Tailwind CSS
- ✅ Custom Finstone gradient utilities
- ✅ All original landing page content converted to React components
- ✅ Lucide React icons integration

## Troubleshooting

If you encounter issues:

1. **Node.js not found**: Restart terminal after Node.js installation
2. **Permission errors**: Run terminal as Administrator on Windows
3. **Port 3000 busy**: Use `npm run dev -- -p 3001` for different port
4. **TypeScript errors**: Ensure all dependencies are installed correctly
