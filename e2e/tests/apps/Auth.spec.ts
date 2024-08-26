import { expect } from "@playwright/test";
import { test } from "@/fixture/auth";
import { user1 } from "@/support/credentials";
import { MAILINATOR_DOMAIN, USERFLOW_BASE_URL } from "@/support/constants";
import { clearInbox } from "@/utils/mailinator";

const { name, companyName, password } = user1;
const IS_DEV = process.env.IS_DEV;

test.afterAll(async () => {
  await clearInbox(name);
});

test("Create User", async ({ page, authPages }) => {
  await authPages.gotoCreateAccount();
  await authPages.createAccount(
    `${name}@${MAILINATOR_DOMAIN}`,
    name,
    companyName,
    password
  );
  await page.getByRole("link", { name: "Settings" }).click();
  await expect(page.getByRole("textbox")).toHaveValue(companyName);

  if (!IS_DEV) {
    await page
      .frameLocator('iframe[class="userflowjs-bubble__frame"]')
      .getByText("Improve in-app customer onboarding")
      .click();

    const tooltipFrame = await page.frameLocator(
      'iframe[class="userflowjs-bubble__frame"]'
    );
    const closeButton = tooltipFrame.getByTestId("close-button");

    await closeButton.waitFor({ state: "visible" });
    await closeButton.click();
  }

  await page.getByRole("button", { name: name }).click({ force: true });
  await page.getByRole("link", { name: "Sign out" }).click({ force: true });
  await expect(page.url()).toBe(`${USERFLOW_BASE_URL}/app/sign-in`);
});
