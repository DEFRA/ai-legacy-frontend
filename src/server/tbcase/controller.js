/**
 * TBCMS TB Case Form controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseController = {
  handler(_request, h) {
    return h.view('tbcase/index', {
      pageTitle: 'TB Case Form',
      heading: 'TB Case Form',
      caption: 'Exeter Reactor Removals - Landing Page'
    })
  }
}

/**
 * TBCMS TB Case Removals controller - GET.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseRemovalsController = {
  handler(request, h) {
    // Default form data structure
    const defaultFormData = {
      cphNumber: '36/145/0300',
      natInc: 'TB10',
      caseNo: '18/03376',
      incidentDate: '17/04/2019',
      telephone: '01460221837',
      web: '07817763892',
      incidentCph: '36/145/0300',
      address:
        'A.B, C.D & E.F Glanville\nMarshy Farm\nBroadwindsor\nBeaminster\nChard\nSomerset\nTA20 2LG',
      actions: 'Firstname-Lastname',
      actionsType: '',
      caseVet: 'Firstname Lastname',
      caseAdmin: '',
      incidentStartDate: {
        day: '16',
        month: '09',
        year: '2022'
      },
      tb2TB181Served: {
        day: '16',
        month: '09',
        year: '2022'
      },
      finUnit: '',
      result: 'vl-pos',
      confDate: {
        day: '24',
        month: '01',
        year: '2024'
      },
      btsSent: 'TB10 Pending',
      tb10: '',
      wss: '',
      comments: '',
      dashboardComments: '',
      herdOnlyExemption: '',
      exemptionComments: ''
    }

    return h.view('tbcase/removals', {
      pageTitle: 'TB Case Removals - TBCMS',
      heading: 'TB Case Removals',
      caption: 'Exeter Reactor Removal',
      formData: defaultFormData,
      errors: null,
      success: null
    })
  }
}

/**
 * TBCMS TB Case Removals controller - POST.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseRemovalsPostController = {
  handler(request, h) {
    const formData = request.payload
    const errors = {}
    let hasErrors = false

    // Validation
    if (!formData.cphNumber || formData.cphNumber.trim() === '') {
      errors.cphNumber = { text: 'CPH Number is required' }
      hasErrors = true
    }

    if (!formData.actions || formData.actions === '') {
      errors.actions = { text: 'Please select an action' }
      hasErrors = true
    }

    if (!formData.result || formData.result === '') {
      errors.result = { text: 'Please select a test result' }
      hasErrors = true
    }

    // Date validation
    if (formData.incidentStartDate) {
      const { day, month, year } = formData.incidentStartDate
      if (!day || !month || !year) {
        errors.incidentStartDate = {
          text: 'Please enter a complete incident start date'
        }
        hasErrors = true
      }
    }

    if (hasErrors) {
      return h.view('tbcase/removals', {
        pageTitle: 'TB Case Removals - TBCMS',
        heading: 'TB Case Removals',
        caption: 'Exeter Reactor Removal',
        formData: formData,
        errors: errors,
        success: null
      })
    }

    // Handle different actions
    if (formData.action === 'generate-letter') {
      return h.view('tbcase/removals', {
        pageTitle: 'TB Case Removals - TBCMS',
        heading: 'TB Case Removals',
        caption: 'Exeter Reactor Removal',
        formData: formData,
        errors: null,
        success: 'Letter generation initiated successfully'
      })
    }

    // Default save action
    return h.view('tbcase/removals', {
      pageTitle: 'TB Case Removals - TBCMS',
      heading: 'TB Case Removals',
      caption: 'Exeter Reactor Removal',
      formData: formData,
      errors: null,
      success: 'Removal record saved successfully'
    })
  }
}

/**
 * TBCMS TB Case Eartags controller - GET.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseEartagsController = {
  handler(request, h) {
    // Default form data structure for eartags
    const defaultFormData = {
      cphNumber: '36/145/0300',
      natInc: 'TB10',
      telephone: '01460221837',
      incidentDate: '17/04/2019',
      web: '07817763892',
      address:
        'M.B.M & H.P Glanville\nMarshwood Farm Marshwood House\nWhitchurch Canonicorum\nForton\nChard\nSomerset\nTA20 4HL',
      actions: 'firstname-lastname',
      wsFilter: '',
      selectedAnimals: [],
      animals: [
        {
          id: 1,
          ws: 'WS-4445824',
          eartag: 'UK343233204639',
          breed: 'Fleckvieh X',
          sex: 'F',
          dob: '03/11/2023',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 2,
          ws: 'WS-4445824',
          eartag: 'UK343233404515',
          breed: 'Aberdeen Angus X',
          sex: 'M',
          dob: '06/06/2023',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 3,
          ws: 'WS-4445824',
          eartag: 'UK343233504432',
          breed: 'Danish Red X',
          sex: 'M',
          dob: '08/12/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 4,
          ws: 'WS-4445824',
          eartag: 'UK343233704637',
          breed: 'Fleckvieh X',
          sex: 'F',
          dob: '01/11/2023',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 5,
          ws: 'WS-4445785',
          eartag: 'UK343233204422',
          breed: 'Fleckvieh X',
          sex: 'F',
          dob: '14/11/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 6,
          ws: 'WS-4445785',
          eartag: 'UK343233404396',
          breed: 'Fleckvieh X',
          sex: 'F',
          dob: '27/10/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 7,
          ws: 'WS-4445785',
          eartag: 'UK343233404403',
          breed: 'British Blue X',
          sex: 'F',
          dob: '30/10/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 8,
          ws: 'WS-4445785',
          eartag: 'UK343233504271',
          breed: 'Holstein Friesian',
          sex: 'F',
          dob: '17/06/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        }
      ]
    }

    return h.view('tbcase/eartags', {
      pageTitle: 'TB Case Eartags - TBCMS',
      heading: "TB Case Form – Eartags' Tab (Reactor Removal)",
      caption: 'TBCMS: TB Case Form',
      activePage: 'eartags',
      formData: defaultFormData,
      errors: null,
      success: null
    })
  }
}

/**
 * Helper function to validate eartags form data
 */
function validateEartagsForm(formData) {
  const errors = {}

  if (!formData.cphNumber || formData.cphNumber.trim() === '') {
    errors.cphNumber = { text: 'CPH Number is required' }
  }

  if (!formData.natInc || formData.natInc.trim() === '') {
    errors.natInc = { text: 'National Incident Number is required' }
  }

  if (!formData.actions || formData.actions === '') {
    errors.actions = { text: 'Please select an action' }
  }

  return errors
}

/**
 * Helper function to get success message based on action
 */
function getActionSuccessMessage(action, selectedCount) {
  const messages = {
    generate: 'Report/letter generation initiated successfully',
    delete:
      selectedCount > 0
        ? `${selectedCount} animal(s) deleted successfully`
        : 'No animals selected for deletion',
    edit:
      selectedCount > 0
        ? `${selectedCount} animal(s) ready for editing`
        : 'No animals selected for editing',
    remove:
      selectedCount > 0
        ? `${selectedCount} animal(s) removed successfully`
        : 'No animals selected for removal',
    add: 'New animal entry form opened',
    save: 'Eartags information saved successfully'
  }

  return messages[action] || messages.save
}

/**
 * TBCMS TB Case Eartags controller - POST.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseEartagsPostController = {
  handler(request, h) {
    const formData = request.payload
    const errors = validateEartagsForm(formData)
    const hasErrors = Object.keys(errors).length > 0

    if (hasErrors) {
      return h.view('tbcase/eartags', {
        pageTitle: 'TB Case Eartags - TBCMS',
        heading: "TB Case Form – Eartags' Tab (Reactor Removal)",
        caption: 'TBCMS: TB Case Form',
        activePage: 'eartags',
        formData: formData,
        errors: errors,
        success: null
      })
    }

    const selectedCount = formData.selectedAnimals
      ? formData.selectedAnimals.length
      : 0
    const successMessage = getActionSuccessMessage(
      formData.action,
      selectedCount
    )

    return h.view('tbcase/eartags', {
      pageTitle: 'TB Case Eartags - TBCMS',
      heading: "TB Case Form – Eartags' Tab (Reactor Removal)",
      caption: 'TBCMS: TB Case Form',
      activePage: 'eartags',
      formData: formData,
      errors: null,
      success: successMessage
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
