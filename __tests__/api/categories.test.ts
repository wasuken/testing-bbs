/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler'
import * as appHandler from '../../src/app/api/categories/route'

it('categories test', async () => {
  await testApiHandler({
    appHandler,
    async test({ fetch }) {
      await expect(fetch()).resolves.toBeDefined()
    },
  })
})
