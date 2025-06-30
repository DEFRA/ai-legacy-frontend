/**
 * TBCMS TB Case Removals controller - GET.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseRemovalsController = {
  handler(request, h) {
    // Default form data structure
    const defaultFormData = {
      cphNumber: '01/234/5678',
      natInc: 'TB10',
      caseNo: '25/12345',
      incidentDate: '15/03/2025',
      telephone: '01555 123456',
      web: '07123 456789',
      incidentCph: '01/234/5678',
      address:
        'Sample Farm Ltd\nExample Farm Holdings\n123 Sample Street\nExample Village\nCountyshire\nSW1A 1AA',
      actions: 'John Smith',
      actionsType: '',
      caseVet: 'Dr Jane Doe',
      caseAdmin: '',
      incidentStartDate: {
        day: '15',
        month: '03',
        year: '2025'
      },
      tb2TB181Served: {
        day: '20',
        month: '03',
        year: '2025'
      },
      finUnit: '',
      result: 'vl-pos',
      confDate: {
        day: '25',
        month: '03',
        year: '2025'
      },
      btsSent: 'TB10 Pending',
      tb10: '',
      wss: '',
      comments: '',
      dashboardComments: '',
      herdOnlyExemption: '',
      exemptionComments: ''
    }

    return h.view('tbcase-removals/removals', {
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
      return h.view('tbcase-removals/removals', {
        pageTitle: 'TB Case Removals - TBCMS',
        heading: 'TB Case Removals',
        caption: 'Exeter Reactor Removal',
        formData,
        errors,
        success: null
      })
    }

    // Handle different actions
    if (formData.action === 'generate-letter') {
      return h.view('tbcase-removals/removals', {
        pageTitle: 'TB Case Removals - TBCMS',
        heading: 'TB Case Removals',
        caption: 'Exeter Reactor Removal',
        formData,
        errors: null,
        success: 'Letter generation initiated successfully'
      })
    }

    // Default save action
    return h.view('tbcase-removals/removals', {
      pageTitle: 'TB Case Removals - TBCMS',
      heading: 'TB Case Removals',
      caption: 'Exeter Reactor Removal',
      formData,
      errors: null,
      success: 'Removal record saved successfully'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
