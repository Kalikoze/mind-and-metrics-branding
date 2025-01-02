# Mind & Metrics Branding

<img src="public/assets/graphics/m&m-logo.svg" alt="Mind & Metrics Logo" width="250" height="auto" />

## Overview

Mind & Metrics Branding is a Next.js-based web application for a B2B growth marketing agency. The application features a modern, accessible design with comprehensive branding, website development, SEO, and marketing services. It includes interactive components like a service assessment quiz, case studies showcase, and job application system.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Linting and Type Checking](#linting-and-type-checking)
5. [Testing](#testing)
6. [Technologies Used](#technologies-used)
7. [Project Structure](#project-structure)
8. [Environment Variables](#environment-variables)
9. [Deployment](#deployment)
10. [Continuous Integration](#continuous-integration)
11. [Code Style and Conventions](#code-style-and-conventions)
12. [Performance Optimization](#performance-optimization)
13. [Accessibility](#accessibility)
14. [Browser Support](#browser-support)
15. [Contributors](#contributors)
16. [Additional Resources](#additional-resources)

## Installation

1. Clone the repository:

```bash
git clone git@github.com:Mind-Metrics-Branding/mind-and-metrics-branding.git  
```

2. Navigate to the project directory:

```bash
cd mind-and-metrics-branding
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables (see [Environment Variables](#environment-variables) section).

## Running the Application

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Linting and Type Checking

This project uses ESLint for linting and TypeScript for type checking.  To run these checks:

- Linting:

```bash
npm run lint
```

- Type Checking:

```bash
npm run type-check
```

## Testing

This project uses Cypress for end-to-end testing. To run the tests:

- Run tests in headless mode:
  ```bash
  npm run test
  ```

- Open Cypress Test Runner:
  ```bash
  npm run test:ui
  ```

## Technologies Used

- [Next.js](https://nextjs.org/) (v14.2.13) - React framework for production-grade applications
- [React](https://reactjs.org/) (v18) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) (v5) - Typed JavaScript for enhanced development
- [Tailwind CSS](https://tailwindcss.com/) (v3.4.1) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) (v11.11.10) - Animation library for React
- [SendGrid](https://sendgrid.com/) (v8.1.4) - Email delivery service
- [React Hook Form](https://react-hook-form.com/) (v7.53.1) - Form validation and handling
- [React Dropzone](https://react-dropzone.js.org/) (v14.3.5) - File upload component
- [React Toastify](https://fkhadra.github.io/react-toastify/) (v10.0.6) - Toast notifications
- [Sharp](https://sharp.pixelplumbing.com/) (v0.33.5) - High-performance image processing
- [Cypress](https://www.cypress.io/) (v13.15.1) - End-to-end testing framework

## Project Structure

The project follows Next.js 14 app directory structure:

- `app/`: Next.js app directory
  - `about/`: About page and components
  - `careers/`: Careers section and job postings
  - `contact/`: Contact page and form
  - `get-started/`: Assessment quiz
  - `privacy-policy/`: Privacy policy
  - `services/`: Services pages
  - `layout.tsx`: Root layout
  - `page.tsx`: Home page

- `components/`: Shared components
  - `common/`: Site-wide components
  - `Contact/`: Contact form components
  - `Quiz/`: Quiz components
  - `pages/`: Page-specific components

- `cypress/`: Test files
  - `fixtures/`: Test data
  - `tests/`: Test suites

- `data/`: Static content
- `lib/`: Utility functions
- `public/`: Static assets
- `styles/`: Global styles

Key components and pages:

- `app/page.tsx`: Homepage with hero, value proposition, and case studies
- `app/about/page.tsx`: About page with team members and company information
- `app/get-started/page.tsx`: Interactive service assessment quiz
- `app/services/page.tsx`: Comprehensive service offerings
- `app/careers/page.tsx`: Job listings and application system
- `app/contact/page.tsx`: Contact form and location information

## Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root directory and add the following variables:

### Production Environment
```bash
# SendGrid Configuration
PRODUCTION_SENDGRID_API_KEY=your_sendgrid_api_key
PRODUCTION_RECEIVER_EMAIL=your_primary_email@domain.com
PRODUCTION_RECEIVER_EMAIL_CC=your_cc_email@domain.com
PRODUCTION_SENDER_EMAIL=your_sender_email@domain.com
```

### Staging Environment
```bash
# SendGrid Configuration
STAGING_SENDGRID_API_KEY=your_staging_sendgrid_api_key
STAGING_RECEIVER_EMAIL=your_staging_email@domain.com
STAGING_RECEIVER_EMAIL_CC=your_staging_cc_email@domain.com
STAGING_SENDER_EMAIL=your_staging_sender_email@domain.com
```

### Variable Descriptions:

- `PRODUCTION_SENDGRID_API_KEY`: SendGrid API key for production environment
- `PRODUCTION_RECEIVER_EMAIL`: Primary email for receiving form submissions
- `PRODUCTION_RECEIVER_EMAIL_CC`: CC email for form submissions
- `PRODUCTION_SENDER_EMAIL`: Sender email for automated messages
- `STAGING_SENDGRID_API_KEY`: SendGrid API key for staging environment
- `STAGING_RECEIVER_EMAIL`: Primary email for receiving test submissions
- `STAGING_RECEIVER_EMAIL_CC`: CC email for test submissions
- `STAGING_SENDER_EMAIL`: Sender email for test messages

Note: Never commit your `.env.local` file to version control. It's included in the `.gitignore` file by default.

To use these variables in your Next.js application, you can access them via `process.env.VARIABLE_NAME`.

## Deployment
The application is deployed using [Vercel](https://vercel.com/mind-and-metrics-branding/mind-and-metrics-branding). Note that you need to be a member of Mind and Metrics Branding to access it. There are two environments:

- Staging: [https://staging.mindandmetricsbranding.com](https://staging.mindandmetricsbranding.com)
- Production: [https://mindandmetricsbranding.com](https://mindandmetricsbranding.com)

## Continuous Integration

This project uses CircleCI for continuous integration. The configuration can be found in `.circleci/config.yml`. 

### CircleCI Configuration

The CircleCI configuration defines a job called `build-and-test` that runs on every push to branches other than `main` and `staging`. This job:

1. Uses the `cypress/browsers:latest` Docker image
2. Checks out the code
3. Installs npm packages
4. Builds the project
5. Starts the server in the background
6. Runs Cypress tests
7. Stores test artifacts (videos and screenshots)

For more details on CircleCI configuration and how to set up continuous deployment, refer to the [CircleCI documentation](https://circleci.com/docs/).

## Code Style and Conventions

This project follows specific coding conventions to maintain consistency across the codebase:

- TypeScript for type safety and better developer experience
- Next.js 14 App Router conventions and best practices
- Functional React components with hooks
- Tailwind CSS for styling with custom design system
- Comprehensive SEO metadata implementation (see examples in app/layout.tsx lines 8-41)
- Consistent file and folder structure in the app directory
- Component organization:
  - Common components in `components/common`
  - Page-specific components in `components/pages`
  - Form components in `components/Contact` and `components/Quiz`

## Performance Optimization

The project implements several performance optimization techniques:

- Sharp for image processing and optimization
- Proper image dimensions and formats in OpenGraph metadata
- Consistent metadata structure across all pages
- Optimized Opengraph and Twitter card implementations
- Proper heading hierarchy for SEO
- Next.js App Router for server-side rendering
- Proper route segmentation for optimal code splitting
- Environment-specific configurations for staging and production

## Accessibility

We strive to make this website accessible to all users.  We maintain WCAG compliance and accessibility best practices.  Some of our accessibility features include:

- Cypress axe for automated accessibility testing
- Semantic HTML structure
- ARIA attributes where necessary
- Keyboard navigation support
- Color contrast compliance
- Alt text requirements for all images

## Browser Support:
This website is tested and supported on the following browsers:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

For older browsers, we provide graceful degradation of features.

## Contributors

| Travis Rollins | 
|:----------:|
| <img src="https://avatars.githubusercontent.com/u/25714149?v=4" alt="Travis Rollins" width="125" height="auto" /> |
| [![LinkedIn](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/travisrollins/) [![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/Kalikoze) |

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - React fundamentals and advanced concepts
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Hook Form](https://react-hook-form.com/docs) - Form validation and handling
- [React Dropzone](https://react-dropzone.js.org/) - File upload component
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Toast notifications
- [Sharp Documentation](https://sharp.pixelplumbing.com/) - High-performance image processing
- [SendGrid Documentation](https://docs.sendgrid.com/) - Email delivery service
- [Cypress Documentation](https://docs.cypress.io/) - End-to-end testing framework