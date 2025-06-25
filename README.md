# Data Visualization Platform

A modern React application for data visualization and scenario analysis with a focus on user experience and performance.

## Features

- **Authentication System**
  - Email/Password authentication with Firebase
  - Google Sign-In integration
  - Form validation using React Hook Form and Zod
  - Protected routes and authentication state management

- **Dashboard**
  - Interactive data visualization charts
  - KPI cards with key metrics
  - Profit analysis section with customizable charts
  - Scenario results visualization

- **Variable Configuration**
  - Dynamic variable selection and configuration
  - Collapsible variable sections for better organization
  - Search functionality for variables
  - Information cards for variable details

- **UI Components**
  - Responsive design with mobile support
  - Dark/Light mode toggle
  - Sidebar navigation with collapsible sections
  - Modern UI components built with Radix UI and styled with Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Yarn or npm
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/suraj1294/data-viz-platform.git
   cd data-viz-platform
   ```

2. Install dependencies
   ```bash
   yarn install
   # or
   npm install
   ```

3. Environment Setup
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Fill in your Firebase configuration values in the `.env` file:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Local Development

1. Start the development server
   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

3. For production build
   ```bash
   yarn build
   # or
   npm run build
   ```

## Technical Decisions and Trade-offs

### Architecture

- **Component Structure**: Organized components by feature and functionality for better maintainability
- **Code Splitting**: Implemented lazy loading with Suspense for improved initial load performance
- **State Management**: Used React Context for authentication and local component state for UI interactions

### Libraries and Tools

- **Firebase**: Chosen for authentication to simplify backend requirements and provide secure authentication
- **React Hook Form + Zod**: Selected for form validation to improve user experience and reduce form-related bugs
- **Radix UI + Tailwind CSS**: Used for accessible, customizable UI components with consistent styling
- **Recharts**: Implemented for data visualization with good performance and customization options

### Performance Optimizations

- Lazy loading of page components
- Memoization of expensive calculations
- Responsive design with mobile-first approach
- Optimized re-renders using proper React patterns

## Known Limitations

- Limited offline support
- No server-side rendering for SEO optimization
- Mobile experience could be further improved for complex data visualizations
- No automated testing implemented yet
- Limited error handling for edge cases

## Future Improvements

- Add comprehensive test suite (unit, integration, and E2E tests)
- Implement data persistence with Firestore
- Add user profile management
- Enhance mobile experience
- Add export functionality for charts and data
- Implement more advanced data visualization options

## Time Spent

- Initial setup and project structure: 2 hours
- Authentication system implementation: 1.5 hours
- Dashboard and visualization components: 5-6 hours
- Variable configuration panel: 1 hours
- UI components and styling: 1/2 hours
- Testing and bug fixes: 2 hours
- Documentation: 1 hours

Total: Approximately 38 hours

## License

MIT
