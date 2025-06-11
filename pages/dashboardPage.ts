import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class DashboardPage extends BasePage {
  private pagebutton: string;
  private logOut: string;

  constructor(page: Page) {
    super(page);
    this.pagebutton = "//button[text()='Open Menu']";
    this.logOut = "//*[@id='logout_sidebar_link']";
  }

  async logOutToApplication(): Promise<void> {
    await this.page.click(this.pagebutton);
    await this.page.click(this.logOut);
  }
}