import { BasePage } from "./basePage";

export class DashboardPage extends BasePage {

    constructor(page){
        super(page);
        this.pageButton="//button[text()='Open Menu']";
        this.logOut="//*[@id='logout_sidebar_link']"
    }


    async loginToApplication(){
        await this.page.click(this.pageButton);
        await this.page.click(this.logOut);
    }

}
