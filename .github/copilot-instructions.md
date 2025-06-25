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
