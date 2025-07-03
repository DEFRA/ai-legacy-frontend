# 🛠️ Prompt Template for Generating Detailed User Stories

**Prompt:**

You are a service designer working to modernize a legacy government case management system. You have been given a screenshot or detailed description of a form or interface used by the Animal and Plant Health Agency (APHA) as part of their TB Case Management System (TBCMS).

Your task is to write a **comprehensive user story** for this form, following **GDS (gov.uk) service design standards**.

The user story must include the following sections:

---

### 🗂️ **[Form Name] User Story**
*(Replace [Form Name] with the actual name of the form, e.g. “Allocations”, “Case Details”, etc.)*

#### **Title:** [Form Name] Tab – TB Case Form (Legacy TBCMS)

#### **User Story:**
**As** a [user role],  
**I want** to [user goal],  
**So that** I can [user benefit or outcome].

#### **User Needs & Context:**
Describe the user’s role, what they are trying to achieve, and why this form is important in their workflow.

#### **Components & Interactions:**
For each interactive element on the form, describe:
- **Name of the component**
- **Purpose** (what it’s for)
- **Interaction** (how the user uses it)

Include all fields, dropdowns, buttons, checkboxes, date pickers, comment boxes, navigation tabs, and contextual tools (e.g. MS Word integration, calendar widgets).

#### ✅ **Acceptance Criteria (Expanded):**
List **every interactive element** on the form and what the user must be able to do with it.  
Include validation rules, conditional logic, and accessibility expectations.  
Each criterion should be testable and unambiguous.

#### **Accessibility & GDS Compliance Notes:**
Include requirements such as:
- Keyboard navigation
- Screen reader compatibility
- Clear labels and instructions
- Descriptive error messages
- High contrast and responsive layout

---


---

# 🛠️ Detailed User Stories

## 🗂️ **Allocations User Story**

### **Title:** Allocations Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to assign, document, and manage actions related to TB case allocations,  
**So that** I can ensure all required follow-up tasks are clearly recorded, traceable, and communicated to relevant stakeholders.

---

### **User Needs & Context:**

The user is responsible for coordinating actions related to a TB case. These may include sending letters, scheduling visits, or assigning tasks to field staff. The Allocations tab provides a structured interface to log these actions, generate correspondence, and leave contextual notes.

---

### **Components & Interactions:**

#### 1. **CPH Number Field**
- **Purpose:** Identifies the holding (farm or premises) associated with the TB case.
- **Interaction:** Auto-filled or manually entered. The user confirms the correct CPH number is displayed before proceeding.

#### 2. **Incident List (Auto-Populated)**
- **Purpose:** Displays all incidents linked to the selected CPH.
- **Interaction:** Read-only. Helps the user understand the context of the case before assigning actions.

#### 3. **Actions Dropdown**
- **Purpose:** Allows the user to select a predefined action (e.g. “Send Letter”, “Schedule Visit”).
- **Interaction:** User clicks the dropdown and selects one action from a list of standardised options.

#### 4. **Action (Later) Type Dropdown**
- **Purpose:** Further categorises the selected action (e.g. “Letter Type A”, “Letter Type B”).
- **Interaction:** Becomes active after an action is selected. User selects a subtype from the dropdown.

#### 5. **Generate Letter Button**
- **Purpose:** Creates a letter template based on the selected action and type.
- **Interaction:** Once both dropdowns are filled, the user clicks this button to generate a letter (likely in MS Word format). The letter opens in a new window or downloads for review and editing.

#### 6. **Calendar Date Picker**
- **Purpose:** Allows the user to assign a date to the action (e.g. due date, scheduled date).
- **Interaction:** User clicks the calendar icon or field and selects a date. The selected date is stored with the action record.

#### 7. **Allocation Comments Box**
- **Purpose:** Provides space for free-text notes related to the allocation.
- **Interaction:** User types up to 250 characters. This might include context, special instructions, or follow-up notes.

#### 8. **Close Form Button (X)**
- **Purpose:** Closes the current form view.
- **Interaction:** User clicks the “X” icon to exit the Allocations tab and return to the previous screen or dashboard.

#### 9. **Function Tabs (Right Sidebar Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals
  - Allocations (current tab)
  - GIFs
  - DRFs
  - Cons
  - Radial Testing
  - Views

#### 10. **MS Word Tool (Contextual Tool)**
- **Purpose:** Opens or integrates with Microsoft Word for letter generation.
- **Interaction:** Triggered when the user clicks “Generate Letter.” The system either opens Word or downloads a .docx file.

#### 11. **Calendar Tool (Contextual Tool)**
- **Purpose:** Provides a visual calendar for date selection.
- **Interaction:** Activated when the user clicks the date field. The user selects a date from the calendar interface.

---

### ✅ **Acceptance Criteria (Expanded)**

1. The user can view the **CPH number** field and confirm it is correct.
2. The **incident list** is automatically populated and visible.
3. The user can select an **action** from a dropdown menu.
4. The user can select an **action type** from a second dropdown menu.
5. The **Generate Letter** button becomes active only after both dropdowns are filled.
6. Clicking **Generate Letter** opens or downloads a letter template in MS Word format.
7. The user can select a **date** using a calendar picker.
8. The user can enter up to **250 characters** in the **Allocation Comments** box.
9. The user can click the **Close Form (X)** button to exit the tab.
10. The user can navigate to other tabs using the **right-hand function tab list**.
11. The **MS Word tool** is available and launches correctly when generating a letter.
12. The **Calendar tool** is accessible and allows date selection.
13. All fields are accessible via keyboard and screen reader.
14. Error messages are shown if required fields (e.g. Action, Action Type) are left blank when attempting to generate a letter.
15. The interface prevents invalid date entries (e.g. future dates for past actions, if applicable).

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear labels and instructions.
- Dropdowns must be accessible via keyboard and screen reader.
- The calendar picker must be operable without a mouse.
- Error messages must be descriptive and placed near the relevant field.
- The interface must support high contrast and screen magnification.

---



---

## 🗂️ **Case Details User Story**

### **Title:** Case Details Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a TB case handler or administrator at the Animal and Plant Health Agency (APHA),  
**I want** to view, enter, and update the core details of a TB case,  
**So that** I can ensure the case record is accurate, complete, and ready for further action or review.

---

### **User Needs & Context:**

The Case Details tab is the central landing page for each TB case. It provides a summary of the case and access to all related data. Users rely on this tab to verify the CPH number, view incident history, and initiate or update actions. It is often the first point of interaction when opening a case and serves as the anchor for navigating to other parts of the form.

---

### **Components & Interactions:**

#### 1. **CPH Number Field**
- **Purpose:** Identifies the holding (farm or premises) associated with the TB case.
- **Interaction:** Auto-filled or manually entered. The user confirms or updates the CPH number.

#### 2. **Incident List (Auto-Populated)**
- **Purpose:** Displays all incidents linked to the selected CPH.
- **Interaction:** Read-only. Helps the user understand the case history.

#### 3. **Actions Dropdown**
- **Purpose:** Allows the user to select a predefined action (e.g. “Send Notification”, “Schedule Visit”).
- **Interaction:** User selects an action from a dropdown list.

#### 4. **Action (Letter) Type Dropdown**
- **Purpose:** Specifies the type of letter or communication associated with the action.
- **Interaction:** Becomes active after an action is selected. User selects a subtype from the dropdown.

#### 5. **Generate Letter Button**
- **Purpose:** Creates a letter template based on the selected action and type.
- **Interaction:** User clicks the button to generate a letter in MS Word format.

#### 6. **Comment Boxes**
- **Purpose:** Allow users to enter free-text notes related to the case or action.
- **Interaction:** User types up to 250 characters per box. Used for internal notes or context.

#### 7. **Function Tabs (Right Sidebar Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details (current tab)
  - Removals
  - EarTags
  - Tracings
  - Allocations
  - GIS
  - DRFs
  - Cons
  - Radial Testing
  - Post-Kill
  - Views

#### 8. **Tools (Contextual Buttons)**
- **Purpose:** Provide editing and data management functionality.
- **Interaction:**
  - **Delete Button:** Removes selected data entries.
  - **Edit Button:** Opens fields for editing.
  - **Add / Amend Button:** Adds new data or updates existing entries.
  - **Duplicate Line Button:** Copies an existing entry for reuse.

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can view and confirm the **CPH number**.
2. The **incident list** is automatically populated and visible.
3. The user can select an **action** from a dropdown menu.
4. The user can select an **action (letter) type** from a second dropdown menu.
5. The **Generate Letter** button becomes active only after both dropdowns are filled.
6. Clicking **Generate Letter** opens or downloads a letter template in MS Word format.
7. The user can enter up to **250 characters** in each **comment box**.
8. The user can click the **Delete** button to remove a selected entry.
9. The user can click the **Edit** button to modify an existing entry.
10. The user can click the **Add / Amend** button to create or update an entry.
11. The user can click the **Duplicate Line** button to copy an existing entry.
12. The user can navigate to other tabs using the **right-hand function tab list**.
13. All dropdowns, buttons, and text fields are accessible via keyboard and screen reader.
14. Error messages are shown if required fields (e.g. Action, Action Type) are left blank when attempting to generate a letter.
15. The interface prevents invalid or duplicate entries where applicable.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels.
- Dropdowns and buttons must be fully keyboard-navigable.
- Comment boxes must support screen reader input and output.
- Error messages must be clear, specific, and placed near the relevant field.
- The interface must support high contrast, responsive layout, and screen magnification.

---



---

## 🗂️ **Cons User Story**

### **Title:** Cons Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a contiguous testing coordinator or case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to record, monitor, and manage contiguous testing targets and outcomes for TB cases,  
**So that** I can ensure all required contiguous testing is completed on time, exceptions are documented, and case progression is accurately tracked.

---

### **User Needs & Context:**

Contiguous testing is a critical part of TB control, involving the testing of herds located near a confirmed TB case. The Cons tab allows users to track whether these tests are completed, whether targets are met, and if not, why. It also captures administrative details and exemptions, ensuring full traceability and compliance with policy.

---

### **Components & Interactions:**

#### 1. **Actions Dropdown**
- **Purpose:** Allows the user to select a predefined contiguous testing-related action.
- **Interaction:** User selects an action from a dropdown list to log or update a testing step.

#### 2. **Cons Target (Date Field)**
- **Purpose:** Sets the target date by which contiguous testing should be completed.
- **Interaction:** User selects a date using a calendar picker or types it in manually.

#### 3. **Date of Notification (Date Field)**
- **Purpose:** Records when the contiguous testing requirement was communicated.
- **Interaction:** User selects or enters the date.

#### 4. **Admin (Dropdown)**
- **Purpose:** Identifies the administrator responsible for managing the contiguous testing.
- **Interaction:** User selects a name or role from a dropdown list.

#### 5. **Con Target Hit or Miss (Dropdown)**
- **Purpose:** Indicates whether the contiguous testing target was met.
- **Interaction:** User selects either “Hit” or “Miss” from the dropdown.

#### 6. **Number of Contiguous Tests (Numeric Field)**
- **Purpose:** Records how many contiguous tests were carried out.
- **Interaction:** User enters a numeric value.

#### 7. **Date of Instigation (Date Field)**
- **Purpose:** Captures the date when contiguous testing was initiated.
- **Interaction:** User selects or enters the date.

#### 8. **No. of Days Target Missed By (Numeric Field)**
- **Purpose:** If the target was missed, records how many days late it was.
- **Interaction:** User enters a numeric value.

#### 9. **Final PM Date (Date Field)**
- **Purpose:** Records the final post-mortem date relevant to the contiguous testing.
- **Interaction:** User selects or enters the date.

#### 10. **All Contiguous Actions Complete (Checkbox)**
- **Purpose:** Indicates that all required contiguous testing actions have been completed.
- **Interaction:** User checks the box when all actions are done.

#### 11. **Target Miss Reason (Text Field or Dropdown)**
- **Purpose:** Explains why the target was missed, if applicable.
- **Interaction:** User selects a reason from a dropdown or types a free-text explanation.

#### 12. **Contiguous Comments (Text Area)**
- **Purpose:** Allows the user to enter free-text notes related to contiguous testing.
- **Interaction:** User types comments, observations, or justifications.

#### 13. **Are There Co-Located Other Species? (Checkbox)**
- **Purpose:** Indicates whether other species are present on the holding.
- **Interaction:** User checks the box if applicable.

#### 14. **Are There Any Contiguous Species? (Checkbox)**
- **Purpose:** Indicates whether there are contiguous species that require testing.
- **Interaction:** User checks the box if applicable.

#### 15. **Contiguous Testing Not Required (Checkbox)**
- **Purpose:** Used to exempt the case from contiguous testing.
- **Interaction:** User checks the box if testing is not required and may be prompted to provide a reason.

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can select an **action** from the Actions dropdown.
2. The user can enter or select a **Cons Target date**.
3. The user can enter or select a **Date of Notification**.
4. The user can select an **Admin** from a dropdown list.
5. The user can select whether the **Contiguous Target was Hit or Miss**.
6. The user can enter the **Number of Contiguous Tests**.
7. The user can enter or select the **Date of Instigation**.
8. The user can enter the **Number of Days Target Missed By**.
9. The user can enter or select the **Final PM Date**.
10. The user can check the **All Contiguous Actions Complete** checkbox.
11. The user can enter or select a **Target Miss Reason**.
12. The user can enter free-text in the **Contiguous Comments** box.
13. The user can check the **Are There Co-Located Other Species?** checkbox.
14. The user can check the **Are There Any Contiguous Species?** checkbox.
15. The user can check the **Contiguous Testing Not Required** checkbox.
16. The system validates that required fields (e.g. Cons Target, Admin, Hit/Miss) are completed before saving.
17. The system prevents invalid date entries (e.g. instigation date after final PM date).
18. All fields are accessible via keyboard and screen reader.
19. Error messages are shown near the relevant field and clearly explain what needs to be corrected.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Date fields must support both manual entry and calendar picker.
- Checkboxes must be clearly associated with their labels.
- Dropdowns must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.

---


---

## 🗂️ **DRFs User Story**

### **Title:** DRFs Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a data quality officer or case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to review, update, and comment on Data Request Forms (DRFs) associated with TB cases,  
**So that** I can ensure that all required data has been requested, processed, and recorded accurately for each case.

---

### **User Needs & Context:**

DRFs (Data Request Forms) are used to request and track essential data related to TB cases, such as test results, tracing information, and administrative actions. The DRFs tab allows users to confirm whether a DRF has been selected, track key dates, and leave comments for audit and coordination. This tab is especially important for ensuring that no data gaps exist before progressing a case.

---

### **Components & Interactions:**

#### 1. **CPH Number Field**
- **Purpose:** Identifies the holding (farm or premises) associated with the TB case.
- **Interaction:** Auto-filled or manually entered. The user confirms the correct CPH number is displayed.

#### 2. **Actions Dropdown**
- **Purpose:** Allows the user to select a DRF-related action (e.g. “Request Sent”, “Follow-up Required”).
- **Interaction:** User selects an action from a dropdown list.

#### 3. **DRF Completed Date (Date Field)**
- **Purpose:** Records the date the DRF was completed.
- **Interaction:** User selects or types in the date using a calendar picker or manual entry.

#### 4. **Test Selection Date (Date Field)**
- **Purpose:** Captures the date when the test was selected for the DRF.
- **Interaction:** User selects or enters the date.

#### 5. **Date Entered (Date Field)**
- **Purpose:** Records when the DRF data was entered into the system.
- **Interaction:** User selects or enters the date.

#### 6. **DRF Not Selected (Checkbox)**
- **Purpose:** Indicates that a DRF was not selected for this case.
- **Interaction:** User checks the box if no DRF was required or issued.

#### 7. **DRF Comment Box (Text Area)**
- **Purpose:** Allows the user to enter free-text comments related to the DRF.
- **Interaction:** User types up to 250 characters. Used for internal notes, justifications, or clarifications.

#### 8. **Close Form Button (X)**
- **Purpose:** Closes the current form view.
- **Interaction:** User clicks the “X” icon to exit the DRFs tab and return to the previous screen or dashboard.

#### 9. **Function Tabs (Right Sidebar Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals
  - Tracings
  - Retargets
  - Allocations
  - GIS
  - DRFs (current tab)
  - Cons
  - Radial Testing
  - Post-Kill
  - Views

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can view and confirm the **CPH number**.
2. The user can select an **action** from the Actions dropdown.
3. The user can enter or select a **DRF Completed Date**.
4. The user can enter or select a **Test Selection Date**.
5. The user can enter or select a **Date Entered**.
6. The user can check the **DRF Not Selected** checkbox.
7. The user can enter up to **250 characters** in the **DRF Comment Box**.
8. The user can click the **Close Form (X)** button to exit the tab.
9. The user can navigate to other tabs using the **right-hand function tab list**.
10. The system validates that required fields (e.g. Completed Date, Action) are completed before saving.
11. The system prevents invalid date entries (e.g. future dates for completed actions).
12. All fields are accessible via keyboard and screen reader.
13. Error messages are shown near the relevant field and clearly explain what needs to be corrected.
14. If “DRF Not Selected” is checked, the system disables or hides date fields and actions to prevent conflicting entries.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Date fields must support both manual entry and calendar picker.
- Checkboxes must be clearly associated with their labels.
- Dropdowns must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.

---



---

## 🗂️ **Eartags User Story**

### **Title:** Eartags Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a reactor removal officer or case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to view, record, and manage individual animal details associated with a TB case,  
**So that** I can ensure accurate tracking of each animal’s identity, status, and removal information.

---

### **User Needs & Context:**

The Eartags tab is used to manage animal-level data for TB cases. Each animal is identified by its eartag number and associated with key attributes such as breed, sex, date of birth, and removal status. This tab is essential for ensuring that all reactors are correctly documented and that their removal and testing statuses are traceable.

---

### **Components & Interactions:**

#### 1. **Work Status (WS) Field**
- **Purpose:** Displays the unique work status ID for each animal.
- **Interaction:** Auto-generated or manually entered. Read-only in most cases, used for reference.

#### 2. **Eartag Number Field**
- **Purpose:** Records the official eartag number of the animal.
- **Interaction:** User enters or verifies the eartag number (e.g. UK342283401013).

#### 3. **Breed Field**
- **Purpose:** Records the breed of the animal.
- **Interaction:** User types in the breed (e.g. Fleckvieh X, Aberdeen Angus X).

#### 4. **Sex Field (Dropdown or Radio Button)**
- **Purpose:** Indicates the sex of the animal.
- **Interaction:** User selects either “M” (Male) or “F” (Female).

#### 5. **Date of Birth (DOB) Field**
- **Purpose:** Records the animal’s date of birth.
- **Interaction:** User enters or selects the date using a calendar picker.

#### 6. **Pedigree Status (Checkbox)**
- **Purpose:** Indicates whether the animal is pedigree.
- **Interaction:** User checks the box if the animal is pedigree.

#### 7. **Slaughter on Farm? (Checkbox)**
- **Purpose:** Indicates whether the animal was slaughtered on the farm.
- **Interaction:** User checks the box if applicable.

#### 8. **Reactor Tag Field**
- **Purpose:** Identifies whether the animal is a reactor and may include a tag number or status.
- **Interaction:** User enters or selects the reactor tag or status.

#### 9. **Function Tabs (Top Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals
  - Eartags (current tab)
  - Tracings
  - Allocations
  - GIS
  - DRFs
  - Cons
  - Radial Testing
  - Post-Kill
  - Views

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can view the **Work Status (WS)** for each animal.
2. The user can enter or verify the **Eartag Number**.
3. The user can enter the **Breed** of the animal.
4. The user can select the **Sex** of the animal from a dropdown or radio button.
5. The user can enter or select the **Date of Birth** using a calendar picker.
6. The user can check the **Pedigree Status** checkbox if applicable.
7. The user can check the **Slaughter on Farm?** checkbox if applicable.
8. The user can enter or select a **Reactor Tag** or status.
9. The system validates that required fields (e.g. Eartag Number, Sex, DOB) are completed before saving.
10. The system prevents duplicate eartag entries within the same case.
11. The user can navigate to other tabs using the **top navigation bar**.
12. All fields are accessible via keyboard and screen reader.
13. Error messages are shown near the relevant field and clearly explain what needs to be corrected.
14. The interface supports adding multiple animals in a list or table format.
15. The user can scroll through or search the list of animals if the number exceeds the visible area.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Dropdowns and checkboxes must be fully keyboard-navigable and screen reader compatible.
- Date fields must support both manual entry and calendar picker.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.
- Table rows must be clearly structured and navigable for screen reader users.

---



---

## 🗂️ **GIS User Story**

### **Title:** GIS Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a mapping coordinator or case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to record, manage, and track the creation and communication of maps related to TB cases,  
**So that** I can ensure that all required geographic information is produced, shared, and documented accurately and on time.

---

### **User Needs & Context:**

The GIS tab is used to manage the mapping process for TB cases, including the generation of maps for contiguous testing, tracing, and other spatial analysis. It allows users to assign mapping tasks, track completion dates, and record communication with veterinary officers and animal health officers. This ensures that spatial data is integrated into the case workflow and that all stakeholders are informed.

---

### **Components & Interactions:**

#### 1. **Actions Dropdown**
- **Purpose:** Allows the user to select a GIS-related action (e.g. “Request Mapping”, “Update Map Status”).
- **Interaction:** User selects an action from a dropdown list.

#### 2. **DRF Target (Date Field)**
- **Purpose:** Indicates the target date for completing the Data Request Form related to mapping.
- **Interaction:** User selects or enters the date using a calendar picker.

#### 3. **TT2 (Date Field)**
- **Purpose:** Records the TT2 date, which may relate to a testing or tracing milestone.
- **Interaction:** User selects or enters the date.

#### 4. **SLH (Checkbox)**
- **Purpose:** Indicates whether the case involves a Special Location Holding (SLH).
- **Interaction:** User checks the box if applicable.

#### 5. **SLH Map Request Date (Date Field)**
- **Purpose:** Records the date a map was requested for an SLH.
- **Interaction:** User selects or enters the date.

#### 6. **DRF VO/AHO (Dropdown)**
- **Purpose:** Identifies the Veterinary Officer (VO) or Animal Health Officer (AHO) responsible for the DRF.
- **Interaction:** User selects a name or role from a dropdown list.

#### 7. **Maps Done By (Dropdown)**
- **Purpose:** Records who completed the maps.
- **Interaction:** User selects a name or team from a dropdown list.

#### 8. **Date Maps Done (Date Field)**
- **Purpose:** Records the date the maps were completed.
- **Interaction:** User selects or enters the date.

#### 9. **Number of Maps (Numeric Field)**
- **Purpose:** Records how many maps were created.
- **Interaction:** User enters a numeric value.

#### 10. **VO/AHO Informed By (Dropdown)**
- **Purpose:** Indicates how the VO or AHO was informed (e.g. email, phone).
- **Interaction:** User selects a method from a dropdown list.

#### 11. **Maps Ready Email Date (Date Field)**
- **Purpose:** Records the date the maps were emailed to the relevant officer.
- **Interaction:** User selects or enters the date.

#### 12. **GIS Comments (Text Area)**
- **Purpose:** Allows the user to enter free-text notes related to mapping.
- **Interaction:** User types comments, observations, or clarifications.

#### 13. **Maps Not Required (Checkbox)**
- **Purpose:** Indicates that maps are not required for this case.
- **Interaction:** User checks the box if mapping is not necessary.

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can select an **action** from the Actions dropdown.
2. The user can enter or select a **DRF Target** date.
3. The user can enter or select a **TT2** date.
4. The user can check the **SLH** checkbox if applicable.
5. The user can enter or select an **SLH Map Request Date**.
6. The user can select a **DRF VO/AHO** from a dropdown list.
7. The user can select a **Maps Done By** value from a dropdown list.
8. The user can enter or select a **Date Maps Done**.
9. The user can enter the **Number of Maps** created.
10. The user can select a **VO/AHO Informed By** method from a dropdown.
11. The user can enter or select a **Maps Ready Email Date**.
12. The user can enter free-text in the **GIS Comments** box.
13. The user can check the **Maps Not Required** checkbox.
14. If “Maps Not Required” is checked, the system disables or hides mapping-related fields to prevent conflicting entries.
15. The system validates that required fields (e.g. DRF Target, Maps Done By) are completed before saving.
16. The system prevents invalid date entries (e.g. Maps Done Date before Map Request Date).
17. All fields are accessible via keyboard and screen reader.
18. Error messages are shown near the relevant field and clearly explain what needs to be corrected.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Date fields must support both manual entry and calendar picker.
- Dropdowns and checkboxes must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.
- Conditional logic (e.g. disabling fields when “Maps Not Required” is checked) must be accessible and clearly communicated.

---


---

## 🗂️ **Post-Kill User Story**

### **Title:** Post-Kill Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a post-kill administrator or case handler at the Animal and Plant Health Agency (APHA),  
**I want** to record and manage all administrative and procedural steps taken after the slaughter of animals in a TB case,  
**So that** I can ensure that all post-kill documentation is complete, accurate, and communicated to the appropriate authorities.

---

### **User Needs & Context:**

The Post-Kill tab is used to document the final stages of a TB case involving animal slaughter. It captures key administrative data such as confirmation dates, test results, and communication with central records. This ensures that the case is properly closed and that all required reporting and follow-up actions are traceable and compliant with policy.

---

### **Components & Interactions:**

#### 1. **Actions Dropdown**
- **Purpose:** Allows the user to select a post-kill action (e.g. “Final Test Logged”, “PM Results Received”).
- **Interaction:** User selects an action from a dropdown list.

#### 2. **Add Button (Linked to Actions)**
- **Purpose:** Adds the selected action to the case record.
- **Interaction:** User clicks the button after selecting an action to log it.

#### 3. **Result Dropdown**
- **Purpose:** Records the outcome of the post-kill process (e.g. “Positive”, “Negative”, “Pending”).
- **Interaction:** User selects a result from the dropdown.

#### 4. **Confirmation Date (Date Field)**
- **Purpose:** Records the date the post-kill action was confirmed.
- **Interaction:** User selects or enters the date using a calendar picker.

#### 5. **Post-Kill Admin (Dropdown)**
- **Purpose:** Identifies the administrator responsible for post-kill processing.
- **Interaction:** User selects a name or role from a dropdown list.

#### 6. **TB10 (Text Field)**
- **Purpose:** Records the TB10 reference number or code.
- **Interaction:** User types the TB10 identifier.

#### 7. **Fin Unit Completion Date (Date Field)**
- **Purpose:** Records the date the final unit (e.g. herd or group) was completed.
- **Interaction:** User selects or enters the date.

#### 8. **Post-Kill Comments (Text Area)**
- **Purpose:** Allows the user to enter free-text notes related to post-kill actions.
- **Interaction:** User types comments, observations, or clarifications.

#### 9. **Date IMT21 Emailed to Central Records (Date Field)**
- **Purpose:** Records the date the IMT21 form was sent to central records.
- **Interaction:** User selects or enters the date.

#### 10. **Function Tabs (Top Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals
  - Eartags
  - Tracings
  - Allocations
  - GIS
  - DRFs
  - Cons
  - Radial Testing
  - Post-Kill (current tab)
  - Views

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can select an **action** from the Actions dropdown.
2. The user can click the **Add** button to log the selected action.
3. The user can select a **Result** from the dropdown.
4. The user can enter or select a **Confirmation Date**.
5. The user can select a **Post-Kill Admin** from a dropdown list.
6. The user can enter a **TB10** reference in the text field.
7. The user can enter or select a **Fin Unit Completion Date**.
8. The user can enter free-text in the **Post-Kill Comments** box.
9. The user can enter or select the **Date IMT21 Emailed to Central Records**.
10. The system validates that required fields (e.g. Action, Result, Confirmation Date) are completed before saving.
11. The system prevents invalid date entries (e.g. future dates for past events).
12. The user can navigate to other tabs using the **top navigation bar**.
13. All fields are accessible via keyboard and screen reader.
14. Error messages are shown near the relevant field and clearly explain what needs to be corrected.
15. The interface supports logging multiple post-kill actions in sequence.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Date fields must support both manual entry and calendar picker.
- Dropdowns and buttons must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.
- The “Add” button must be clearly associated with the action dropdown and operable via keyboard.

---


---

## 🗂️ **Radial Testing User Story**

### **Title:** Radial Testing Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a radial or hotspot testing coordinator at the Animal and Plant Health Agency (APHA),  
**I want** to record and manage all details related to radial testing activities around a TB case,  
**So that** I can ensure that all required testing is tracked, exemptions are documented, and results are communicated accurately and efficiently.

---

### **User Needs & Context:**

Radial testing is used to assess the potential spread of TB from a confirmed case to nearby holdings. This tab allows users to log key case metadata, testing dates, results, and any exemptions. It also supports internal communication through comments and dashboard-only notes. The information captured here is essential for coordinating field testing and ensuring policy compliance.

---

### **Components & Interactions:**

#### 1. **National Incident Numbers (Text Fields)**
- **Purpose:** Display the national incident numbers associated with the case.
- **Interaction:** Auto-filled or manually entered. Used for reference and traceability.

#### 2. **CPH Number Field**
- **Purpose:** Identifies the holding associated with the TB case.
- **Interaction:** Auto-filled or manually entered. Used to confirm the correct holding is being tested.

#### 3. **Case Vet (Text Field)**
- **Purpose:** Records the name of the veterinary officer assigned to the case.
- **Interaction:** Auto-filled or selected from a list.

#### 4. **Case Admin (Text Field)**
- **Purpose:** Records the name of the case administrator.
- **Interaction:** Auto-filled or selected from a list.

#### 5. **TB Status (Dropdown or Text Field)**
- **Purpose:** Indicates the current TB status of the holding (e.g. OTFS – Officially TB Free Suspended).
- **Interaction:** Auto-filled or selected from a dropdown.

#### 6. **Incident Start Date (Date Field)**
- **Purpose:** Records the date the TB incident began.
- **Interaction:** User selects or enters the date.

#### 7. **Test Dates (Start and End Date Fields)**
- **Purpose:** Records the range of dates during which radial testing was conducted.
- **Interaction:** User selects or enters both start and end dates.

#### 8. **Result Status (Dropdown or Text Field)**
- **Purpose:** Indicates the current status of the test results (e.g. “BTS Sent”, “TB10 Pending”).
- **Interaction:** User selects or enters the result status.

#### 9. **General Comments (Text Area)**
- **Purpose:** Allows the user to enter free-text notes related to the radial testing process.
- **Interaction:** User types comments, observations, or clarifications.

#### 10. **Dashboard Only Comments (Text Area)**
- **Purpose:** Allows the user to enter internal notes that are only visible on the dashboard.
- **Interaction:** User types up to 250 characters. Used for internal tracking or alerts.

#### 11. **Sectional Only Gamma Exemption (Checkbox)**
- **Purpose:** Indicates whether the case is exempt from gamma testing due to sectional-only criteria.
- **Interaction:** User checks the box if applicable.

#### 12. **Exemption Comments (Text Area)**
- **Purpose:** Provides justification or explanation for the exemption.
- **Interaction:** User types a free-text explanation.

#### 13. **Function Tabs (Top Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals
  - Eartags
  - Tracings
  - Allocations
  - GIS
  - DRFs
  - Cons
  - Radial Testing (current tab)
  - Post-Kill
  - Views

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can view and confirm the **National Incident Numbers**.
2. The user can view or enter the **CPH Number**.
3. The user can view or select the **Case Vet**.
4. The user can view or select the **Case Admin**.
5. The user can view or select the **TB Status**.
6. The user can enter or select the **Incident Start Date**.
7. The user can enter or select the **Test Start Date** and **Test End Date**.
8. The user can enter or select the **Result Status**.
9. The user can enter free-text in the **General Comments** box.
10. The user can enter free-text in the **Dashboard Only Comments** box (up to 250 characters).
11. The user can check the **Sectional Only Gamma Exemption** checkbox.
12. The user can enter a justification in the **Exemption Comments** box.
13. The system validates that required fields (e.g. Test Dates, Result Status) are completed before saving.
14. The system prevents invalid date entries (e.g. test end date before start date).
15. The user can navigate to other tabs using the **top navigation bar**.
16. All fields are accessible via keyboard and screen reader.
17. Error messages are shown near the relevant field and clearly explain what needs to be corrected.
18. If the exemption checkbox is selected, the **Exemption Comments** field becomes required.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Date fields must support both manual entry and calendar picker.
- Checkboxes must be clearly associated with their labels.
- Dropdowns and text areas must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.
- Conditional logic (e.g. requiring exemption comments when the exemption checkbox is ticked) must be accessible and clearly communicated.

---


Here is the **detailed user story for the Removals tab** of the legacy TBCMS form, written to GDS standards and consistent with the previous user stories:

---

## 🗂️ **Removals User Story**

### **Title:** Removals Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a reactor removal officer or case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to record, manage, and track the removal of animals associated with a TB case,  
**So that** I can ensure that all removal actions are properly documented, letters are generated, and the case progresses in accordance with policy.

---

### **User Needs & Context:**

The Removals tab is used to manage the logistics and documentation of removing TB reactor animals from a holding. It allows users to select actions, generate letters, and track incidents associated with the case. This tab is essential for ensuring that all removal steps are traceable, compliant, and communicated to stakeholders.

---

### **Components & Interactions:**

#### 1. **CPH Number Field**
- **Purpose:** Identifies the holding (farm or premises) associated with the TB case.
- **Interaction:** Auto-filled or manually entered. Used to confirm the correct holding is being processed.

#### 2. **Incident List (Auto-Populated)**
- **Purpose:** Displays all incidents linked to the selected CPH.
- **Interaction:** Read-only. Helps the user understand the case context before assigning removal actions.

#### 3. **Actions Dropdown**
- **Purpose:** Allows the user to select a predefined removal-related action (e.g. “Send Removal Letter”, “Schedule Collection”).
- **Interaction:** User selects an action from a dropdown list.

#### 4. **Action (Later) Type Dropdown**
- **Purpose:** Further categorises the selected action (e.g. “Letter Type A”, “Letter Type B”).
- **Interaction:** Becomes active after an action is selected. User selects a subtype from the dropdown.

#### 5. **Generate Letter Button**
- **Purpose:** Creates a letter template based on the selected action and type.
- **Interaction:** Once both dropdowns are filled, the user clicks this button to generate a letter (likely in MS Word format).

#### 6. **Function Tabs (Top Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals (current tab)
  - Earnings
  - Trackings
  - Allocations
  - GIS
  - DRFs
  - Cons
  - Radial Testing
  - Post-Kill
  - Views

#### 7. **Delete Button**
- **Purpose:** Removes a selected entry from the removals list.
- **Interaction:** User selects a row and clicks the delete button to remove it.

#### 8. **Edit Button**
- **Purpose:** Opens an existing entry for editing.
- **Interaction:** User selects a row and clicks the edit button to modify its contents.

#### 9. **Add / Amend Button**
- **Purpose:** Adds a new entry or updates an existing one.
- **Interaction:** User clicks the button to open a form for data entry or amendment.

#### 10. **Duplicate Line Button**
- **Purpose:** Copies an existing entry to create a new one with similar data.
- **Interaction:** User selects a row and clicks the button to duplicate it.

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can view and confirm the **CPH number**.
2. The **incident list** is automatically populated and visible.
3. The user can select an **action** from the Actions dropdown.
4. The user can select an **action type** from the Action (Later) Type dropdown.
5. The **Generate Letter** button becomes active only after both dropdowns are filled.
6. Clicking **Generate Letter** opens or downloads a letter template in MS Word format.
7. The user can click the **Delete** button to remove a selected entry.
8. The user can click the **Edit** button to modify an existing entry.
9. The user can click the **Add / Amend** button to create or update an entry.
10. The user can click the **Duplicate Line** button to copy an existing entry.
11. The system validates that required fields (e.g. Action, Action Type) are completed before saving.
12. The system prevents duplicate or conflicting entries.
13. The user can navigate to other tabs using the **top navigation bar**.
14. All fields and buttons are accessible via keyboard and screen reader.
15. Error messages are shown near the relevant field and clearly explain what needs to be corrected.
16. The interface supports managing multiple removal actions in a list or table format.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Dropdowns and buttons must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.
- Table rows must be clearly structured and navigable for screen reader users.
- The “Generate Letter” button must be clearly associated with the action fields and operable via keyboard.

---



---

## 🗂️ **Tracings User Story**

### **Title:** Tracings Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a tracing officer or case administrator at the Animal and Plant Health Agency (APHA),  
**I want** to record and manage tracing activities related to TB cases,  
**So that** I can identify and document potential sources of infection or spread, and ensure that all tracing actions are completed and auditable.

---

### **User Needs & Context:**

Tracing is a critical part of TB case management, used to identify where infection may have come from (source) or where it may have spread to (spread). The Tracings tab allows users to log trace types, key dates, work status numbers, and comments. It also supports coordination with other teams and ensures that tracing actions are tracked and completed in a timely manner.

---

### **Components & Interactions:**

#### 1. **Trace Type Dropdown**
- **Purpose:** Specifies the type of tracing being recorded.
- **Interaction:** User selects one of the following options:
  - None
  - Spread
  - Source

#### 2. **TB2/TB181 Served Date (Date Field)**
- **Purpose:** Records the date the TB2 or TB181 form was served.
- **Interaction:** User selects or enters the date using a calendar picker.

#### 3. **Confirmation Date (Date Field)**
- **Purpose:** Records the date the tracing was confirmed.
- **Interaction:** User selects or enters the date.

#### 4. **Tracings Notified Date (Date Field)**
- **Purpose:** Records the date the tracing was officially notified.
- **Interaction:** User selects or enters the date.

#### 5. **Initial DRF Completion Date (Date Field)**
- **Purpose:** Records the date the initial Data Request Form was completed.
- **Interaction:** User selects or enters the date.

#### 6. **WSS Number (Text Field)**
- **Purpose:** Records the Work Status System number associated with the tracing.
- **Interaction:** User enters the WSS number.

#### 7. **Spread WS (Text Field)**
- **Purpose:** Records the Work Status number for spread tracing.
- **Interaction:** User enters the relevant WS number.

#### 8. **Source WS (Text Field)**
- **Purpose:** Records the Work Status number for source tracing.
- **Interaction:** User enters the relevant WS number.

#### 9. **DRF Checked (Checkbox)**
- **Purpose:** Indicates whether the DRF has been reviewed.
- **Interaction:** User checks the box when the DRF has been verified.

#### 10. **WS to Cardiff (Checkbox)**
- **Purpose:** Indicates whether the Work Status has been sent to Cardiff for processing.
- **Interaction:** User checks the box if applicable.

#### 11. **Comments (Text Area)**
- **Purpose:** Allows the user to enter free-text notes related to the tracing.
- **Interaction:** User types comments, observations, or clarifications.

#### 12. **Function Tabs (Top Navigation)**
- **Purpose:** Allows the user to navigate to other sections of the TB Case Form.
- **Interaction:** User clicks on any of the following tabs to switch views:
  - Case Details
  - Removals
  - Eartags
  - Tracings (current tab)
  - Allocations
  - GIS
  - DRFs
  - Cons
  - Radial Testing
  - Post-Kill
  - Views

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can select a **Trace Type** from the dropdown.
2. The user can enter or select the **TB2/TB181 Served Date**.
3. The user can enter or select the **Confirmation Date**.
4. The user can enter or select the **Tracings Notified Date**.
5. The user can enter or select the **Initial DRF Completion Date**.
6. The user can enter a **WSS Number**.
7. The user can enter a **Spread WS** number.
8. The user can enter a **Source WS** number.
9. The user can check the **DRF Checked** checkbox.
10. The user can check the **WS to Cardiff** checkbox.
11. The user can enter free-text in the **Comments** box.
12. The system validates that required fields (e.g. Trace Type, TB2/TB181 Date) are completed before saving.
13. The system prevents invalid date entries (e.g. notification date before served date).
14. The user can navigate to other tabs using the **top navigation bar**.
15. All fields are accessible via keyboard and screen reader.
16. Error messages are shown near the relevant field and clearly explain what needs to be corrected.
17. If “None” is selected as the trace type, the system disables or hides fields related to source/spread WS numbers.

---

### **Accessibility & GDS Compliance Notes:**

- All form fields must have clear, descriptive labels and instructions.
- Date fields must support both manual entry and calendar picker.
- Checkboxes must be clearly associated with their labels.
- Dropdowns and text areas must be fully keyboard-navigable and screen reader compatible.
- Error messages must be specific, accessible, and placed near the field in error.
- The layout must be responsive and support high contrast and screen magnification.
- Conditional logic (e.g. hiding fields when “None” is selected) must be accessible and clearly communicated.

---

Here is the **detailed user story for the Views tab** of the legacy TBCMS form, written to GDS standards and consistent with the previous user stories:

---

## 🗂️ **Views User Story**

### **Title:** Views Tab – TB Case Form (Legacy TBCMS)

---

### **User Story:**

**As** a system user or administrator at the Animal and Plant Health Agency (APHA),  
**I want** to customise which sections of the TB Case Form are visible and how dropdowns are filtered,  
**So that** I can tailor the interface to my role, region, and responsibilities, and reduce visual clutter by hiding irrelevant sections.

---

### **User Needs & Context:**

The Views tab provides a configuration interface that allows users to control the visibility of form sections and how dropdowns behave based on regional filtering. This is especially useful for tailoring the system to different operational contexts (e.g. England, Wales, Scotland) and user roles (e.g. field staff, admin staff). It ensures that users only see the information and tools relevant to their work.

---

### **Components & Interactions:**

#### 1. **Region Dropdown**
- **Purpose:** Allows the user to select a region (e.g. England, Wales, Scotland).
- **Interaction:** User selects a region from the dropdown to apply region-specific visibility and filtering rules.

#### 2. **Visible Pages (Checkbox List)**
- **Purpose:** Allows the user to control which tabs or sections of the TB Case Form are visible.
- **Interaction:** User checks or unchecks boxes to show or hide the following pages:
  - Case Details
  - Eartags
  - Allocations
  - Contigs
  - Valuations (**Wales and Scotland only**)
  - Vol IR Slaughter (*Wales only*)
  - GIS
  - Radial Testing
  - Removals
  - Tracings
  - DRFs
  - PostKill

#### 3. **Field Staff Dropdowns (Radio Button Group)**
- **Purpose:** Controls how dropdown menus are filtered for field staff.
- **Interaction:** User selects one of the following options:
  - Filtered by CPH Region (default)
  - Filtered by Admin Region
  - Not Filtered

#### 4. **Informational Notes (Static Text)**
- **Purpose:** Provides guidance on regional applicability of certain fields.
- **Interaction:** Read-only. For example:
  - “*Vol IR Slaughter is Wales Only*”
  - “**Valuations are Wales and Scotland Only**”
  - “Field staff dropdown filtering excludes Wales and Scotland valuations”

---

### ✅ **Acceptance Criteria (Expanded):**

1. The user can select a **Region** from the dropdown.
2. The system applies region-specific rules based on the selected region (e.g. enabling Valuations for Wales and Scotland).
3. The user can check or uncheck **Visible Pages** to control which tabs are shown in the interface.
4. The system hides or shows tabs in the main navigation based on the selected checkboxes.
5. The user can select one of the **Field Staff Dropdowns** filtering options:
   - Filtered by CPH Region
   - Filtered by Admin Region
   - Not Filtered
6. The system applies the selected filtering logic to dropdown menus throughout the form.
7. The system displays **informational notes** about regional limitations clearly and accessibly.
8. The system prevents users from enabling region-specific pages (e.g. Valuations) when the selected region does not support them.
9. All checkboxes, dropdowns, and radio buttons are accessible via keyboard and screen reader.
10. The system saves and applies the user’s visibility and filtering preferences.
11. Error messages are shown if an invalid configuration is attempted (e.g. enabling Wales-only fields while England is selected).
12. The layout dynamically updates to reflect changes in visibility settings without requiring a page reload.

---

### **Accessibility & GDS Compliance Notes:**

- All form controls must have clear, descriptive labels and instructions.
- Checkboxes and radio buttons must be grouped with accessible legends and fieldsets.
- Dropdowns must be fully keyboard-navigable and screen reader compatible.
- Informational notes must be clearly distinguishable from interactive elements.
- The layout must be responsive and support high contrast and screen magnification.
- Changes in visibility or filtering must be announced to screen readers where applicable.

---
