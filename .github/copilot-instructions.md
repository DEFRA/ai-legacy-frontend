
- Adheres to GDS gov.uk design system referenced here: https://design-system.service.gov.uk Get started – GOV.UK Design System
- Meets GDS accessibility requirements referenced here: https://design-system.service.gov.uk/accessibility/ – GOV.UK Design System
- Updates the routes and index page appropriately to allow me to navigate to this page
- If the PNG has a tabbed interface, generate each tab as its own HTML page and use the tab name as the filename
- All form fields must have proper semantic HTML with appropriate labels, hints, and error handling structure
- Form must be fully navigable via keyboard and screen reader accessible
- Update the router.js file to include the new pages
- ignore any data that may be visible in the screenshots that is not explicitly part of the design, such as placeholder text or example data
- ensure all form fields have a hint text that is appropriate to the field and follows GDS guidelines

# JavaScript Conventions

- Use named functions over arrow functions
- Use kebab case for filenames
- Use ES Modules
- Use Vitest for testing
- Tests should be in a `test` directory at the root of the project
- Avoid bloated routes
- Use JSDoc to describe areas of complexity
- Proactively maintain documentation
- Focus on behaviour coverage over line coverage
- Write immutable code where possible
- Focus on simplicitly and reducing longer term maintainability
- Follow principles of Test Driven Development (TDD)
- No more than three parameters for a function
- Functions to have one role
- Do not use barrel functions
- Validate requests
- Add contributors name and email to package.json
- One controller per Hapi route
- Hapi routes and handlers (controllers) should be in one file

# Up to date README.md

Generate updated README.md documentation and keeping it in sync with the code changes.

# Starting up the frontend
To start the frontend, run the following command:
```bash
docker compose up
```
