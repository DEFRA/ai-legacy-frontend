#CONTEXT
Within the input_prompts/tbcms-screenshots/tb-case-forms folder is a PNG screenshot of each tab that I want to implement on a single webpage.

#ANALYSIS
For each webpage, I want you to analyse the PNG screenshot to determine the required elements, fields, and structure. Generate a checklist of all visible elements.

#IMPLEMENTATION
Important: Only implement elements and fields that are explicitly visible in the screenshots , create the elements in keeping with:

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
