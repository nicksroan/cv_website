# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Nick Roan (Academic Manager/Audio Producer/Composer) built as a single-page application using vanilla HTML, CSS, and JavaScript.

## Architecture

- **HTML file (`index.html`)**: Contains page structure and content
- **CSS file (`styles.css`)**: All styling moved to external stylesheet
- **JavaScript file (`script.js`)**: All interactive functionality moved to external script
- **Images directory**: Contains profile headshot (`nick-roan-headshot.png`)

## Key Features

- Responsive design with CSS Grid and Flexbox
- Smooth scrolling navigation
- Fade-in animations on scroll with mobile-optimized timing
- Interactive project modals with dynamic content
- 3D tilt effect on profile image
- Custom scrollbar styling
- Mobile-responsive breakpoints (1024px, 768px, 480px)
- Mobile-optimized name and title stacking for better readability on small screens
- Flexible contact section width that expands on smaller screens
- Staggered content animations that adapt to mobile layout (qualifications section animates only when in view)

## Styling Architecture

- Uses Google Fonts: Cormorant Garamond, EB Garamond, Libre Baskerville, Oswald
- Color scheme: #fefaf5 (cream), #a86234 (brown), #7aa39a (teal), #636c6e (gray), #929292 (light gray)
- CSS Grid layout for main sections
- All styles organized in external `styles.css` file
- Responsive design with mobile breakpoints

## JavaScript Components

- **External script file (`script.js`)** contains:
  - Smooth scrolling navigation handler
  - Intersection Observer for fade-in animations
  - Separate mobile observer for qualifications section animation timing
  - Dynamic modal system for project details
  - 3D mouse tracking for profile image tilt effect
  - Project data stored in JavaScript object

## Content Structure

- Header with name (split into first/last name spans for mobile stacking) and professional titles (split at '/' for mobile stacking)
- CV section with Experience and Qualifications columns
- Projects section with clickable items that open detailed modals
- Contact section with professional information (responsive width: 50% desktop, 80% tablet, 95% mobile)

## Development Notes

- No build process or package manager - pure static files
- Clean separation of concerns: HTML structure, CSS styling, and JavaScript functionality
- All styles moved to external `styles.css` for better maintainability
- All JavaScript moved to external `script.js` for better organization
- Project content is hardcoded in JavaScript object
