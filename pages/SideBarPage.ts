import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class SideBarPage extends BasePage {
    private pagebutton: string;

    private logOutButton: string;

    constructor(page: Page) {
        super(page);
        this.pagebutton = '#react-burger-menu-btn';
        this.logOutButton = "//*[@id='logout_sidebar_link']";
    }

    async logOut(): Promise<void> {
        await this.page.click(this.pagebutton);
        await this.page.click(this.logOutButton);
    }
}
