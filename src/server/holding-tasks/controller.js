export const getHoldingTasks = async (request, h) => {
  const { cph } = request.params
  const { incident } = request.query

  // Get synthetic holding data (matching the holding-details controller)
  const holdingData = {
    cph,
    farmName: 'Greenfield Farm Holdings',
    contactName: 'John Smith',
    address: '123 Farm Lane\nRural Village\nCountyshire\nSW1A 1AA',
    telephone: '01234 567890',
    tbStatus: 'Under Restriction'
  }

  // Get synthetic incident data
  const incidentData = incident
    ? {
        incidentId: incident,
        status: 'Active',
        startDate: '15 March 2025',
        testType: 'Routine TB Test',
        result: 'Reactors Found'
      }
    : null

  // Build query string for incident parameter
  const incidentParam = incident ? `&incident=${incident}` : ''

  // Define task list items based on the TB case navigation
  const tasks = [
    {
      title: {
        text: 'Case Details'
      },
      href: `/tbcase/case-details?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Completed',
          classes: 'govuk-tag--green'
        }
      }
    },
    {
      title: {
        text: 'Removals'
      },
      href: `/tbcase/removals?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'In progress',
          classes: 'govuk-tag--blue'
        }
      }
    },
    {
      title: {
        text: 'Eartags'
      },
      href: `/tbcase/eartags?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'Tracings'
      },
      href: `/tbcase/tracings?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'Allocations'
      },
      href: `/tbcase/allocations?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'GIS'
      },
      href: `/tbcase/gis?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'DRFS'
      },
      href: `/tbcase/drfs?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'Cons'
      },
      href: `/tbcase/cons?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'Radial Testing'
      },
      href: `/tbcase/radial-testing?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'Post-Kill'
      },
      href: `/tbcase/post-kill?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Cannot start yet',
          classes: 'govuk-tag--grey'
        }
      }
    },
    {
      title: {
        text: 'Views'
      },
      href: `/tbcase/views?cph=${cph}${incidentParam}`,
      status: {
        tag: {
          text: 'Not started',
          classes: 'govuk-tag--grey'
        }
      }
    }
  ]

  return h.view('holding-tasks/index', {
    pageTitle: `TB Case Management - CPH ${cph}`,
    holdingData,
    incidentData,
    tasks
  })
}
