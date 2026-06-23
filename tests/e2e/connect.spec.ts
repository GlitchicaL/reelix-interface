import { test, expect } from '@playwright/test';
import { ConnectPage } from '../pages/ConnectPage';

test.describe("Connect Page", () => {
  let connectPage: ConnectPage;

  test.beforeEach(async ({ page }) => {
    connectPage = new ConnectPage(page);
    await connectPage.goto();
  });

  test('should be at /connect', async ({ page }) => {
    await expect(page).toHaveURL(/connect/);
  });

  test('should fill server ip', async () => {
    await connectPage.fillServerIp();
    await expect(connectPage.serverIpInput).toHaveValue("localhost:8082");
  });

  test('should check remember server', async () => {
    await connectPage.checkRememberServer();
    await expect(connectPage.rememberServerCheckbox).toBeChecked();
  });

  test('should set cookie and redirect to /login once connected', async ({ page, context }) => {
    await connectPage.submitForm();

    await expect(page).toHaveURL(/login/);

    const cookies = await context.cookies();
    const serverCookie = cookies.find(
      cookie => cookie.name === "reelix_base_server_url",
    );

    expect(serverCookie).toBeDefined();
  });
});
