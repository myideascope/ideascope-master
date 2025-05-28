
# Business Evaluation Platform

A comprehensive web application that helps entrepreneurs validate their business ideas, generate financial projections, and create professional business plans and pitch decks.

## Features

- **Project Evaluation**: Answer key questions about your business idea to determine its viability and potential for success
- **Financial Projections**: Generate realistic financial forecasts with interactive charts based on industry standards
- **Business Plan Generator**: Create comprehensive, downloadable business plans covering all critical aspects of your startup
- **Pitch Deck Creator**: Design professional investor presentation slides that highlight your startup's potential
- **Market Analysis**: Get insights into market size, competition, and growth opportunities
- **AI-Powered Recommendations**: Receive intelligent suggestions for monetization strategies and scaling approaches

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible component primitives
- **Framer Motion** for animations
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching
- **Wouter** for client-side routing
- **Recharts** for data visualization

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Neon Database** (PostgreSQL)
- **Passport.js** for authentication
- **Express Session** for session management

### Additional Tools
- **jsPDF** for PDF generation
- **Lucide React** for icons
- **Date-fns** for date manipulation

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd business-evaluation-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your database connection string and other required environment variables.

4. Push database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── evaluation/ # Evaluation form components
│   │   │   ├── home/       # Landing page components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── results/    # Results display components
│   │   │   └── ui/         # Base UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configurations
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main application component
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── vite.ts            # Vite development server setup
├── shared/                 # Shared TypeScript types and schemas
└── package.json           # Project dependencies and scripts
```

## Key Features

### Evaluation Process
The platform guides users through a comprehensive evaluation process with multiple steps:

1. **Business Basics** - Core business information and industry details
2. **Market Analysis** - Target market and competitive landscape analysis
3. **Product Details** - Product/service specifications and unique value propositions
4. **Financial Projections** - Revenue models and financial forecasting

### Results Dashboard
After completing the evaluation, users receive:
- **Viability Score** - Overall business viability assessment
- **Financial Charts** - Interactive revenue and growth projections
- **Business Plan Preview** - Comprehensive business plan sections
- **Pitch Deck Preview** - Investor-ready presentation slides

### Document Generation
- Generate and download professional PDF business plans
- Create investor presentation pitch decks
- Export financial projections and market analysis

## API Endpoints

The application provides RESTful API endpoints for:
- Project management (`/api/projects`)
- Evaluation results (`/api/evaluation-results`)
- Financial projections (`/api/financial-projections`)
- Document generation (`/api/generate`)

## Database Schema

The application uses Drizzle ORM with PostgreSQL, managing:
- User projects and business information
- Evaluation responses and scores
- Financial projections and market data
- Generated documents and templates

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure the following environment variables are set in production:
- Database connection string
- Session secrets
- Any third-party API keys

### Replit Deployment
This project is optimized for deployment on Replit. Simply:
1. Import the project to Replit
2. Configure environment variables in the Secrets tab
3. Click the Run button to start the application

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.
