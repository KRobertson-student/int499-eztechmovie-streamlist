# EZTechMovie StreamList Capstone Project

This repository contains project planning, design, development, security, and final implementation materials for the EZTechMovie StreamList application completed for INT499: Information Technology Capstone.

StreamList is planned as a subscription-based movie discovery and watchlist application. The project focuses on helping users search for movies, view basic movie information, identify available streaming providers, manage a personal watchlist, review subscription status, and support secure payment-related workflows.

## Project Overview

EZTechMovie is a fictional private video streaming company preparing to expand the StreamList concept into a subscription-ready movie discovery and watchlist platform. The system is designed to reduce the frustration of searching across multiple streaming services by giving users one organized place to search, save, and launch movies through legal provider links.

The application is not intended to host movie files directly. Instead, StreamList is designed to connect users with third-party streaming providers while supporting account management, watchlist features, subscription status, local storage behavior, usability improvements, and secure payment planning.

## Course Project Timeline

### Week 1: Software Requirements Specification

The Week 1 deliverable focused on creating the Software Requirements Specification for the EZTechMovie StreamList application.

Key Week 1 items include:

- Product scope and value
- Intended audience and intended use
- Functional requirements
- User interface requirements
- Security requirements
- Compatibility, reliability, scalability, maintainability, and usability requirements
- Definitions and acronyms
- References

### Week 2: Gantt Chart, Wireframes, and Project Status Report

The Week 2 deliverables focus on program design and project tracking. This includes a Gantt chart, task key, low-fidelity wireframes, explanation of planned functionality, and a project status report.

Key Week 2 items include:

- Realistic solo-development Gantt timeline for a group-sized project scope
- Task estimates and dependencies
- Low-fidelity wireframes for the planned application screens
- Cart behavior planning
- Local storage planning
- Subscription guard to prevent duplicate active StreamList subscriptions
- CSS usability and responsive design planning
- Movie search and detail page planning
- Account, watchlist, and subscription status planning
- Credit card security and ethics planning
- Project status report

### Week 3: React Cart System and CSS Implementation

The Week 3 deliverable turns the cart design into a working React application with a subscription catalog, accessory products, cart controls, local storage persistence, and responsive CSS styling.

Key Week 3 items include:

- React cart application in the [Week 3 folder](Week%203/)
- Working live preview: [Open the EZ Tech Cart app](https://htmlpreview.github.io/?https://github.com/KRobertson-student/int499-eztechmovie-streamlist/blob/main/Week%203/dist/index.html)
- Navigation bar with Subscriptions and Cart sections
- Cart item count displayed in the navigation bar
- One-subscription-at-a-time rule with a visible warning message
- Accessories that can be added multiple times
- Cart summary with quantity controls, remove buttons, and total pricing
- Local storage persistence so cart contents remain after reload
- Responsive custom CSS for usability and presentation
- Automated tests for cart logic and UI behavior
