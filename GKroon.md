# GKroon Website

## Overview

GKroon is a South African business services company website offering multiple services including company registrations, web design & development, domain & hosting packages, smartphone repairs. The site is a multi-page static website with a simple Express.js server for serving content and handling basic backend functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology**: Static HTML pages with vanilla CSS and JavaScript
- **Styling**: Single `style.css` file using CSS custom properties (variables) for theming
- **Typography**: Google Fonts (Advent Pro) with local font-face fallback
- **Icons**: Font Awesome 5.15.4 via CDN
- **Navigation**: Responsive navbar with hamburger menu for mobile devices
- **Page Structure**: Multiple standalone HTML pages (index.html, web-design.html, domains-hosting.html, etc.) with shared footer component

### Backend Architecture
- **Framework**: Express.js (v4.21.2)
- **Server File**: `server.js` serves static files and handles routing
- **Port**: Configurable via environment variable, defaults to 5000
- **Middleware**: body-parser for handling form data (JSON and URL-encoded)

### Analytics
- **Service**: Hotjar tracking integrated across all pages for user behavior analytics

## External Dependencies

### NPM Packages
- `express` (v4.21.2) - Web server framework
- `body-parser` (v2.2.0) - Request body parsing middleware
- `nodemailer` (v6.10.1) - Email sending capability (configured but usage not visible in provided files)

### CDN Resources
- Font Awesome 5.15.4 - Icon library
- Google Fonts (Advent Pro) - Typography

### Third-Party Services 
- **GitHub Pages**: Primary hosting destination (g-kroon.github.io/GKroon/)
- **Hotjar**: User analytics and behavior tracking
- **SupaBase**: Configured for User Authentication & external Database

### External Links
- WhatsApp Business integration for customer contact
- LinkedIn company page
- Separate Contact Us page hosted on GitHub Pages subdomain
- Client Login for Connectivity Services (Existing & Potential Clients)
