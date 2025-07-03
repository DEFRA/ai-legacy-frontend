/**
 * TBCMS TB Case Eartags controller - GET.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseEartagsController = {
  handler (request, h) {
    // Default form data structure for eartags
    const defaultFormData = {
      cphNumber: '01/234/5678',
      natInc: 'TB10',
      telephone: '01555 123456',
      incidentDate: '15/03/2025',
      web: '07123 456789',
      address:
        'Sample Farm Ltd\nExample Farm Holdings\n123 Sample Street\nExample Village\nCountyshire\nSW1A 1AA',
      actions: 'John Smith',
      wsFilter: '',
      selectedAnimals: [],
      animals: [
        {
          id: 1,
          ws: 'WS-1000001',
          eartag: 'UK012345000001',
          breed: 'Holstein Friesian',
          sex: 'F',
          dob: '15/03/2023',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 2,
          ws: 'WS-1000001',
          eartag: 'UK012345000002',
          breed: 'Aberdeen Angus X',
          sex: 'M',
          dob: '20/04/2023',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 3,
          ws: 'WS-1000001',
          eartag: 'UK012345000003',
          breed: 'Simmental X',
          sex: 'M',
          dob: '12/05/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 4,
          ws: 'WS-1000001',
          eartag: 'UK012345000004',
          breed: 'Holstein Friesian',
          sex: 'F',
          dob: '08/06/2023',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 5,
          ws: 'WS-1000002',
          eartag: 'UK012345000005',
          breed: 'Charolais X',
          sex: 'F',
          dob: '22/07/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 6,
          ws: 'WS-1000002',
          eartag: 'UK012345000006',
          breed: 'Limousin X',
          sex: 'F',
          dob: '14/08/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 7,
          ws: 'WS-1000002',
          eartag: 'UK012345000007',
          breed: 'British Blue X',
          sex: 'F',
          dob: '30/09/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        },
        {
          id: 8,
          ws: 'WS-1000002',
          eartag: 'UK012345000008',
          breed: 'Holstein Friesian',
          sex: 'F',
          dob: '17/10/2022',
          pedigree: false,
          slaughterOnFarm: false,
          reactorTag: ''
        }
      ]
    }

    return h.view('tbcase-eartags/eartags', {
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
function validateEartagsForm (formData) {
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
function getActionSuccessMessage (action, selectedCount) {
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
  handler (request, h) {
    const formData = request.payload
    const errors = validateEartagsForm(formData)
    const hasErrors = Object.keys(errors).length > 0

    if (hasErrors) {
      return h.view('tbcase-eartags/eartags', {
        pageTitle: 'TB Case Eartags - TBCMS',
        heading: "TB Case Form – Eartags' Tab (Reactor Removal)",
        caption: 'TBCMS: TB Case Form',
        activePage: 'eartags',
        formData,
        errors,
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

    return h.view('tbcase-eartags/eartags', {
      pageTitle: 'TB Case Eartags - TBCMS',
      heading: "TB Case Form – Eartags' Tab (Reactor Removal)",
      caption: 'TBCMS: TB Case Form',
      activePage: 'eartags',
      formData,
      errors: null,
      success: successMessage
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
