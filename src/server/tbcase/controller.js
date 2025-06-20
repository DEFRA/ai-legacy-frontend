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
 * @import { ServerRoute } from '@hapi/hapi'
 */
