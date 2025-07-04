import { describe, it, expect } from 'vitest'
import { getHoldingTasks } from '../../../../src/server/holding-tasks/controller.js'

describe('holding-tasks controller', () => {
  describe('getHoldingTasks', () => {
    it('should return task list view with holding data', async () => {
      const mockRequest = {
        params: { cph: '01/234/5678' },
        query: {}
      }

      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = await getHoldingTasks(mockRequest, mockH)

      expect(result.template).toBe('holding-tasks/index')
      expect(result.data.pageTitle).toBe('TB Case Management - CPH 01/234/5678')
      expect(result.data.holdingData.cph).toBe('01/234/5678')
      expect(result.data.holdingData.farmName).toBe('Greenfield Farm Holdings')
      expect(result.data.tasks).toHaveLength(11)
    })

    it('should include incident data when incident parameter is provided', async () => {
      const mockRequest = {
        params: { cph: '01/234/5678' },
        query: { incident: '25/12345' }
      }

      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = await getHoldingTasks(mockRequest, mockH)

      expect(result.data.incidentData).toBeDefined()
      expect(result.data.incidentData.incidentId).toBe('25/12345')
      expect(result.data.incidentData.status).toBe('Active')
    })

    it('should include incident parameter in task URLs when provided', async () => {
      const mockRequest = {
        params: { cph: '01/234/5678' },
        query: { incident: '25/12345' }
      }

      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = await getHoldingTasks(mockRequest, mockH)

      const firstTask = result.data.tasks[0]
      expect(firstTask.href).toBe('/tbcase/case-details?cph=01/234/5678&incident=25/12345')
    })

    it('should not include incident parameter in task URLs when not provided', async () => {
      const mockRequest = {
        params: { cph: '01/234/5678' },
        query: {}
      }

      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = await getHoldingTasks(mockRequest, mockH)

      const firstTask = result.data.tasks[0]
      expect(firstTask.href).toBe('/tbcase/case-details?cph=01/234/5678')
    })

    it('should return all expected task list items', async () => {
      const mockRequest = {
        params: { cph: '01/234/5678' },
        query: {}
      }

      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = await getHoldingTasks(mockRequest, mockH)

      const expectedTasks = [
        'Case Details',
        'Removals',
        'Eartags',
        'Tracings',
        'Allocations',
        'GIS',
        'DRFS',
        'Cons',
        'Radial Testing',
        'Post-Kill',
        'Views'
      ]

      expect(result.data.tasks).toHaveLength(expectedTasks.length)

      expectedTasks.forEach((taskName, index) => {
        expect(result.data.tasks[index].title.text).toBe(taskName)
      })
    })

    it('should set appropriate task statuses', async () => {
      const mockRequest = {
        params: { cph: '01/234/5678' },
        query: {}
      }

      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = await getHoldingTasks(mockRequest, mockH)

      // Case Details should be completed
      expect(result.data.tasks[0].status.tag.text).toBe('Completed')
      expect(result.data.tasks[0].status.tag.classes).toBe('govuk-tag--green')

      // Removals should be in progress
      expect(result.data.tasks[1].status.tag.text).toBe('In progress')
      expect(result.data.tasks[1].status.tag.classes).toBe('govuk-tag--blue')

      // Other tasks should be not started or cannot start yet
      expect(result.data.tasks[2].status.tag.text).toBe('Not started')
      expect(result.data.tasks[2].status.tag.classes).toBe('govuk-tag--grey')
    })
  })
})
