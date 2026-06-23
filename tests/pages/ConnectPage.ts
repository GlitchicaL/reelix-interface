import { Locator, Page } from '@playwright/test';

export class ConnectPage {
  readonly page: Page;

  readonly serverIpInput: Locator
  readonly rememberServerCheckbox: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page;

    this.serverIpInput = page.getByLabel("Server IP");
    this.rememberServerCheckbox = page.getByLabel("Remember Server");
    this.submitButton = page.getByRole("button", {
      name: "Connect",
    });
  }

  async goto() {
    await this.page.goto('/connect');
  }

  async fillServerIp(ip: string = "localhost:8082") {
    await this.serverIpInput.fill(ip);
  }

  async checkRememberServer() {
    await this.rememberServerCheckbox.click();
  }

  async submitForm(ip: string = "localhost:8082", remember: boolean = false) {
    await this.fillServerIp(ip);

    if (remember) await this.checkRememberServer();

    await this.submitButton.click();
  }
}