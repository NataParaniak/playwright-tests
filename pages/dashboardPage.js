import { BasePage } from "./basePage";

export class DashboardPage extends BasePage {

    constructor(page){
        super(page);
        this.pagebutton="//button[text()='Open Menu']";
        this.logOut="//*[@id='logout_sidebar_link']"
    }
      

    async loginToAplication(){
        await this.page.click(this.pagebutton);
        await this.page.click(this.logOut);

    }

}
