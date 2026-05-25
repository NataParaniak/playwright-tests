import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class SideBarPage extends BasePage {
    private pagebutton: Locator;

    private logOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.pagebutton = page.locator('#react-burger-menu-btn');
        this.logOutButton = page.locator("//*[@id='logout_sidebar_link']");
    }

    async logOut(): Promise<void> {
        await this.pagebutton.click();
        await this.logOutButton.click();
    }
}
