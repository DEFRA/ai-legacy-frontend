### Prompt to create webpage for slide 6

#CONTEXT
Within the input_prompts folder is a PNG screenshot of each Webpage that I want to implement, these are stored in a sub folder called TBCMS- System Mapping V0.1_png. The TBCMS_User_Stories_Detailed.md contains the user story that accompanies the screenshot, they are matched based on the name of the Webpage for User Story 6 and Slide6.png.

#ANALYSIS
I want you to create a webpage for Slide6.png after reading its associated user story 'User Story 6'. The rest of the stories will be worked on iteratively after I verify that this works.

#IMPLEMENTATION
Important: Only implement elements and fields that are explicitly visible in Slide6.png or specifically mentioned in User Story 6, update the elements you add to be in keeping with GDS gov.uk design system and GDS accessibility requirements as shown in the section below. Do not create or populate form fields or other content that isn't clearly shown in these materials. If the screenshot doesn't show specific form fields for a tab, implement only the tab structure with placeholder content indicating "Form fields to be implemented based on Slide6.png requirements."

Ensure that your implementation meets the following requirements:

- Adheres to GDS gov.uk design system referenced here: https://design-system.service.gov.uk Get started – GOV.UK Design System
- Meets GDS accessibility requirements referenced here: https://design-system.service.gov.uk/accessibility/ – GOV.UK Design System
- Updates the routes and index page appropriately to allow me to navigate to this page
- If the PNG has a tabbed interface, generate each tab as its own HTML page and use the tab name as the filename

#EVALUATION
After generating the webpage for Slide6.png, please evaluate the implementation against these criteria:

1. Visual Fidelity

   - Does the layout match Slide6.png precisely?
   - Are all visual elements from the screenshot present?
   - Are the proportions and placement of elements correct?

2. User Story Coverage

   - Does the implementation address all requirements mentioned in User Story 6?
   - Are any user story requirements missing or incorrectly implemented?

3. GDS Compliance

   - Does the implementation use proper GOV.UK Design System components?
   - Is the styling consistent with GOV.UK guidelines?
   - Are the proper typography, spacing and color patterns applied?

4. Accessibility Compliance

   - Are all elements properly labeled for screen readers?
   - Is the tab order logical and functional?
   - Does the implementation pass WCAG 2.1 AA requirements?
   - Are there appropriate aria attributes where needed?

5. Code Quality
   - Is the HTML semantically correct?
   - Is the code well-organized and commented where appropriate?
   - Are there any redundancies or inefficiencies to address?

## Please identify any gaps or issues in the implementation that need to be addressed before proceeding

### Enhanced Prompt to create comprehensive webpage for slide 26

#CONTEXT
Within the input_prompts folder is a PNG screenshot of each Webpage that I want to implement, these are stored in a sub folder called TBCMS- System Mapping V0.1_png. The TBCMS_User_Stories_Detailed.md contains the user story that accompanies the screenshot, they are matched based on the name of the Webpage for User Story 26 and Slide26.png.

#PRE-IMPLEMENTATION ANALYSIS
Before beginning implementation, complete this checklist:

□ **Screenshot Analysis**: Examine Slide26.png carefully and list every visible form element
□ **Field Count**: Identify approximately how many individual data points need to be captured (expect 15-20+ fields for this form)
□ **User Story Mapping**: Map each visible element to a requirement in User Story 26
□ **Component Planning**: List which GDS components will be needed (govukInput, govukSelect, govukTextarea, govukDateInput, govukCheckboxes, etc.)
□ **Data Structure Planning**: Outline the form's data structure for backend integration
□ **Section Grouping**: Plan how to logically group related fields using fieldsets
□ **Accessibility Planning**: Identify any complex interactions requiring special accessibility consideration

If any item cannot be completed, flag for clarification before proceeding.

#ANALYSIS
I want you to create a webpage for Slide26.png after reading its associated user story 'User Story 26'.

**CRITICAL: Before implementing, please:**

1. **Examine the Slide26.png image carefully and identify EVERY field, input, dropdown, button, and data element visible**
2. **List all the fields you can see in the screenshot** - don't assume what should be there, document exactly what IS there
3. **Cross-reference with User Story 26 to ensure nothing is missed**
4. **Provide a field inventory** showing what you plan to implement before starting

#IMPLEMENTATION
**Field Implementation Requirements:**

- Create ALL form fields, inputs, dropdowns, and data elements that are explicitly visible in Slide26.png
- Each field should have appropriate GDS components (govukInput, govukSelect, govukTextarea, govukDateInput, govukCheckboxes, etc.)
- Pre-populate fields with the exact values shown in the screenshot where visible
- Ensure all fields have proper name attributes for backend integration
- Group related fields into logical sections using fieldsets with proper legends
- Apply appropriate field validation (character limits, required fields, data format validation)

**Important:** This is a data-heavy form that will connect to backend systems for a TB Case Management System. Every field visible in the screenshot represents a critical data point that needs to be captured, displayed, or processed. Do not create simplified placeholder versions - implement the full form structure with production-ready field implementations.

**Technical Requirements:**

- Adheres to GDS gov.uk design system referenced here: https://design-system.service.gov.uk Get started – GOV.UK Design System
- Meets GDS accessibility requirements referenced here: https://design-system.service.gov.uk/accessibility/ – GOV.UK Design System
- Updates the routes and index page appropriately to allow me to navigate to this page
- If the PNG has a tabbed interface, generate each tab as its own HTML page and use the tab name as the filename
- All form fields must have proper semantic HTML with appropriate labels, hints, and error handling structure
- Form must be fully navigable via keyboard and screen reader accessible

#ENHANCED EVALUATION
After generating the webpage for Slide26.png, please evaluate the implementation against these comprehensive criteria:

1. **Visual Fidelity & Data Completeness**

   - Does the layout match Slide26.png precisely?
   - Are ALL visual elements from the screenshot present? (Provide a count)
   - **Field Completeness Check**: List each form field visible in the screenshot and confirm it's implemented
   - Are the proportions and placement of elements correct?
   - **Data Accuracy**: Do pre-populated values match those shown in the screenshot exactly?
   - Are section groupings and visual hierarchy maintained?

2. **Functional Completeness**

   - **Form Structure**: Are all input fields, dropdowns, checkboxes, and text areas implemented?
   - **Field Types**: Are appropriate form controls used (date inputs for dates, selects for dropdowns, etc.)?
   - **Data Binding**: Do all fields have proper name attributes for backend integration?
   - **Pre-population**: Are sample values populated as shown in the screenshot?
   - **Field Validation**: Are appropriate constraints applied (character limits, required fields, etc.)?

3. **User Story Coverage & Requirements Traceability**

   - Does the implementation address all requirements mentioned in User Story 26?
   - **Field Mapping**: Can each visible field in the screenshot be traced to a requirement?
   - Are any user story requirements missing or incorrectly implemented?
   - **Workflow Support**: Does the form support the intended business processes?
   - **Data Completeness**: Would this form capture all data needed for the TB case management use case?

4. **Backend Integration Readiness**

   - **API Compatibility**: Are field names and structure suitable for API integration?
   - **Data Types**: Are form controls appropriate for expected data types?
   - **Validation Ready**: Are client-side validations in place for server requirements?
   - **CRUD Operations**: Does the form support Create, Read, Update, Delete operations as needed?
   - **Error Handling**: Is the form structured to handle and display server-side validation errors?

5. **GDS Compliance & Design System Adherence**

   - Does the implementation use proper GOV.UK Design System components?
   - Is the styling consistent with GOV.UK guidelines?
   - Are the proper typography, spacing and color patterns applied?
   - Are form patterns following GDS best practices for complex forms?
   - Is the grid system used appropriately for responsive design?

6. **Enhanced Accessibility Compliance (WCAG 2.1 AA+)**

   - Are all elements properly labeled for screen readers?
   - Is the tab order logical and functional across the entire form?
   - **Form Navigation**: Can users efficiently navigate between related fields?
   - **Group Semantics**: Are related fields properly grouped with fieldsets and legends?
   - **Error Association**: Are error messages properly associated with their fields?
   - Are there appropriate aria attributes where needed?
   - **Form Length Considerations**: For long forms, are there landmarks and shortcuts for screen readers?

7. **Code Quality & Architecture**

   - Is the HTML semantically correct and well-structured?
   - Is the code well-organized with proper component usage?
   - Are there any redundancies or inefficiencies to address?
   - Is the template structure maintainable and extensible?
   - Are proper imports included for all required GDS components?

8. **Data Quality & Business Logic**

- **Business Rules**: Are domain-specific validation rules considered (e.g., CPH number format)?
- **Data Relationships**: Are interdependent fields properly structured (e.g., dates in sequence)?
- **Reference Data**: Are dropdown options realistic and business-appropriate?
- **Data Completeness**: Would this form provide complete information for TB case decision-making?

**Success Criteria:**

- All visible fields from Slide26.png are implemented with appropriate GDS components
- Form is fully accessible and meets WCAG 2.1 AA standards
- Implementation supports realistic backend integration scenarios
- Code quality is production-ready
- Form provides complete data capture for TB case management workflows

**Technical Requirements:**

- Adheres to GDS gov.uk design system referenced here: https://design-system.service.gov.uk Get started – GOV.UK Design System
- Meets GDS accessibility requirements referenced here: https://design-system.service.gov.uk/accessibility/ – GOV.UK Design System
- Updates the routes and index page appropriately to allow me to navigate to this page
- If the PNG has a tabbed interface, generate each tab as its own HTML page and use the tab name as the filename
- All form fields must have proper semantic HTML with appropriate labels, hints, and error handling structure
- Form must be fully navigable via keyboard and screen reader accessible

#ENHANCED EVALUATION
After generating the webpage for Slide26.png, please evaluate the implementation against these comprehensive criteria:

1. **Visual Fidelity & Data Completeness**

   - Does the layout match Slide26.png precisely?
   - Are ALL visual elements from the screenshot present? (Provide a count)
   - **Field Completeness Check**: List each form field visible in the screenshot and confirm it's implemented
   - Are the proportions and placement of elements correct?
   - **Data Accuracy**: Do pre-populated values match those shown in the screenshot exactly?
   - Are section groupings and visual hierarchy maintained?

2. **Functional Completeness**

   - **Form Structure**: Are all input fields, dropdowns, checkboxes, and text areas implemented?
   - **Field Types**: Are appropriate form controls used (date inputs for dates, selects for dropdowns, etc.)?
   - **Data Binding**: Do all fields have proper name attributes for backend integration?
   - **Pre-population**: Are sample values populated as shown in the screenshot?
   - **Field Validation**: Are appropriate constraints applied (character limits, required fields, etc.)?

3. **User Story Coverage & Requirements Traceability**

   - Does the implementation address all requirements mentioned in User Story 26?
   - **Field Mapping**: Can each visible field in the screenshot be traced to a requirement?
   - Are any user story requirements missing or incorrectly implemented?
   - **Workflow Support**: Does the form support the intended business processes?
   - **Data Completeness**: Would this form capture all data needed for the TB case management use case?

4. **Backend Integration Readiness**

   - **API Compatibility**: Are field names and structure suitable for API integration?
   - **Data Types**: Are form controls appropriate for expected data types?
   - **Validation Ready**: Are client-side validations in place for server requirements?
   - **CRUD Operations**: Does the form support Create, Read, Update, Delete operations as needed?
   - **Error Handling**: Is the form structured to handle and display server-side validation errors?

5. **GDS Compliance & Design System Adherence**

   - Does the implementation use proper GOV.UK Design System components?
   - Is the styling consistent with GOV.UK guidelines?
   - Are the proper typography, spacing and color patterns applied?
   - Are form patterns following GDS best practices for complex forms?
   - Is the grid system used appropriately for responsive design?

6. **Enhanced Accessibility Compliance (WCAG 2.1 AA+)**

   - Are all elements properly labeled for screen readers?
   - Is the tab order logical and functional across the entire form?
   - **Form Navigation**: Can users efficiently navigate between related fields?
   - **Group Semantics**: Are related fields properly grouped with fieldsets and legends?
   - **Error Association**: Are error messages properly associated with their fields?
   - Are there appropriate aria attributes where needed?
   - **Form Length Considerations**: For long forms, are there landmarks and shortcuts for screen readers?

7. **Code Quality & Architecture**

   - Is the HTML semantically correct and well-structured?
   - Is the code well-organized with proper component usage?
   - Are there any redundancies or inefficiencies to address?
   - Is the template structure maintainable and extensible?
   - Are proper imports included for all required GDS components?

8. **Data Quality & Business Logic**

- **Business Rules**: Are domain-specific validation rules considered (e.g., CPH number format)?
- **Data Relationships**: Are interdependent fields properly structured (e.g., dates in sequence)?
- **Reference Data**: Are dropdown options realistic and business-appropriate?
- **Data Completeness**: Would this form provide complete information for TB case decision-making?

**Success Criteria:**

- All visible fields from Slide26.png are implemented with appropriate GDS components
- Form is fully accessible and meets WCAG 2.1 AA standards
- Implementation supports realistic backend integration scenarios
- Code quality is production-ready
- Form provides complete data capture for TB case management workflows

### Prompt to implement GDS-compliant navigation and page structure

Convert existing tabbed navigation to GOV.UK Service Navigation component and standardize page structure across all form pages. Implement the following changes:

1. **Replace Tab Navigation with Service Navigation**: Remove all `govuk-tabs` components and replace with `govuk-service-navigation` component following the pattern at https://design-system.service.gov.uk/components/service-navigation/

2. **Create Shared Navigation Include**: Create `app/views/includes/tb-service-navigation.html` with reusable service navigation that accepts `activePage` variable for proper active state highlighting.

3. **Standardize Page Structure**: For each page, implement:

   - `beforeContent` block with breadcrumbs navigation
   - Page header with `govuk-caption-l` and `govuk-heading-l`
   - Service navigation include with `activePage` variable
   - Case context summary card showing CPH Number and Current Incident
   - Remove any hardcoded close buttons or inline styles

4. **Update Form Structure**: Group related form elements using `fieldset` and `legend` components, use summary cards for contextual information, and implement proper button grouping following GDS patterns.

5. **Ensure Consistency**: All pages should follow the same structure pattern with proper breadcrumbs, service navigation, and context cards. Remove duplicate navigation elements and ensure only one navigation component per page.

This approach provides better accessibility, follows GOV.UK design patterns, and creates a more maintainable codebase with reusable components.

# TB Case Form Webpage Regeneration Instructions

## For copilot-instructions.md (High-Level Principles)

### GDS Design System Compliance

- All pages must use Government Digital Service (GDS) design patterns and components
- Implement proper govuk macros: `govukInput`, `govukSelect`, `govukTextarea`, `govukDateInput`, `govukButton`, `govukCheckboxes`, `govukFieldset`, `govukTable`
- Follow GDS typography, spacing, and layout guidelines
- Use semantic HTML structure with proper headings hierarchy (h1, h2, h3)

### Accessibility Standards

- Meet WCAG 2.1 AA compliance requirements
- Include proper ARIA labels, hints, and descriptions for all form elements
- Ensure keyboard navigation and screen reader compatibility
- Use semantic HTML elements appropriately
- Provide clear error handling and validation feedback structure

### Code Quality & Testing

- Write behavior-focused Vitest tests for all new/updated pages
- Follow JavaScript conventions: named functions, JSDoc documentation, ES modules
- Use kebab-case for file names and consistent code patterns
- Include proper error handling and validation in controllers
- Update README.md to reflect new/updated functionality

### Template Structure Standards

- Extend 'layouts/page.njk' base template
- Include proper breadcrumb navigation
- Implement consistent page structure: close button, heading, case context, service navigation, content sections
- Use Nunjucks template inheritance and include patterns correctly

---

## Input Prompt for TB Case Form Page Implementation

**TASK**: Review and regenerate TB Case Form webpages to match provided screenshots and GDS standards.

**REQUIREMENTS**:

1. **Page Analysis**: Compare existing TB Case Form pages (Allocations, Removals, Cons, DRFs, Eartags, GIS, Post-Kill, Tracings, Radial Testing, Views) with provided screenshots

2. **Implementation Standards**:

   - Follow all copilot-instructions.md guidelines strictly
   - Use GDS design system components exclusively
   - Implement proper form validation and accessibility
   - Include semantic HTML with proper ARIA labels
   - Ensure all form fields have appropriate hints and labels

3. **Required Page Elements** (per screenshots):

   - **Header**: Close form button (top-right), page heading, case context section
   - **Navigation**: TB service navigation tabs with active state
   - **Content**: Fieldsets with legends, proper form grouping, GDS components
   - **Tools Section**: Right-side tools panel with relevant options
   - **Actions**: Appropriate buttons (Save, Generate, Export, etc.)

4. **Specific Requirements**:

   - **Date Inputs**: Use `govukDateInput` components (NOT calendar widgets) for accessibility
   - **Service Navigation**: Include all TB case tabs with proper active state
   - **Case Context**: Display CPH number and incident list consistently
   - **Comments**: Include dashboard-only and general comment fields where shown
   - **Status Fields**: Implement checkboxes and select dropdowns as per screenshots

5. **Testing**:

   - Create/update controller tests for each modified page
   - Test for presence of key elements: headings, form fields, tools section, close button
   - Update vitest.config.js to include new test files if needed
   - Ensure all tests pass before completion

6. **Route Structure**:

   - Verify routes follow `/tbcase/{page-name}` pattern
   - Update controllers to use consistent data structure
   - Ensure proper template path references

7. **Documentation**:
   - Update README.md with new/modified pages
   - Document TB Case Management System features
   - Include feature table with page descriptions

**DELIVERABLES**:

- Regenerated .njk template files matching screenshots exactly
- Updated/created controller.js files with proper data
- New/updated controller.test.js files with passing tests
- Updated README.md documentation
- All tests passing in the test suite
