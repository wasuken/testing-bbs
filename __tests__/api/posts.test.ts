/**
 * @jest-environment node
 */
import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../../src/app/api/posts/route";

it("posts test", async () => {
  await testApiHandler({
    appHandler,
    params: { categoryId: "1" },
    test: async ({ fetch }) => {
      await expect(fetch()).resolves.toBeDefined();
    },
  });
});
