/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../../src/app/api/comments/[id]/route";

it("comment test", async () => {
  await testApiHandler({
    appHandler,
    params: { id: '1' },
    test: async ({ fetch }) => {
      await expect(fetch()).resolves.toBeDefined();
    },
  });
});
