# Business Evaluation Platform - IdeaScope

## Overview

IdeaScope is a comprehensive web application that helps entrepreneurs validate their business ideas, generate financial projections, and create professional business plans and pitch decks. The platform provides AI-powered recommendations and generates professional deliverables to help startups secure funding and launch successfully.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern development
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing
- **TanStack Query** for efficient data fetching, caching, and synchronization
- **React Hook Form** with Zod validation for robust form handling
- **Tailwind CSS** with **Radix UI** for accessible, consistent styling
- **Framer Motion** for smooth animations and transitions
- **Recharts** for interactive data visualization

### Backend Architecture
- **Express.js** with TypeScript for the REST API server
- **Drizzle ORM** for type-safe database operations and schema management
- **Neon Database** (PostgreSQL) for reliable cloud-hosted data storage
- **Passport.js** for authentication (though not fully implemented in current codebase)
- **Express Session** for session management

### Database Design
The database follows a relational model with the following key entities:
- **Users**: User accounts and authentication
- **Projects**: Business evaluation projects with basic information
- **Market Analysis**: Detailed market research and competitive analysis
- **Product Details**: Product/service specifications and development stage
- **Financial Projections**: Revenue forecasts, costs, and financial modeling
- **Evaluation Results**: Computed viability scores and recommendations

## Key Components

### Data Flow
1. **Project Creation**: Users input basic business information
2. **Multi-step Evaluation**: Progressive data collection through market analysis, product details, and financial projections
3. **Score Calculation**: AI-powered evaluation generates viability scores across different dimensions
4. **Document Generation**: Professional business plans and pitch decks created from collected data
5. **Results Dashboard**: Comprehensive view of analysis with interactive charts and downloadable documents

### Form Management
- Multi-step wizard interface for data collection
- Zod schemas for validation ensuring data integrity
- React Hook Form for optimized form performance
- Progressive saving to prevent data loss

### Document Generation
- **jsPDF** for business plan PDF generation
- **HTML-to-Print** functionality for pitch deck creation
- Template-based document generation with professional formatting
- Downloadable deliverables in multiple formats

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: Cloud PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI components
- **recharts**: Chart and visualization library
- **jspdf**: PDF document generation
- **date-fns**: Date manipulation utilities

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Fast development and build tooling
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Development
- Uses Vite dev server with HMR for fast development cycles
- Replit-specific configurations for cloud development environment
- Environment-specific configurations via `NODE_ENV`

### Production Build
1. Frontend built with Vite to static assets in `dist/public`
2. Backend bundled with ESBuild to `dist/index.js`
3. Database migrations handled via Drizzle Kit
4. Single-server deployment serving both API and static assets

### Database Management
- Schema defined in TypeScript with Drizzle ORM
- Migrations managed through `drizzle-kit push`
- Connection pooling for production scalability

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup