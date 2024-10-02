/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../../src/app/api/comments/route";

it("catgegories test", async () => {
  await testApiHandler({
    appHandler,
    test: async ({ fetch }) => {
      await expect(fetch()).resolves.toBeDefined();
    },
  });
});
