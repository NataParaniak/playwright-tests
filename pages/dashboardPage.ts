import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class DashboardPage extends BasePage {
  private pagebutton: string;
  private logOut: string;
  private cartImage:string;
  private addToCartButton:string;
  private itemCards:Locator;
  private nameProduct:Locator;


  constructor(page: Page) {
    super(page);
    this.pagebutton = "//button[text()='Open Menu']";
    this.logOut = "//*[@id='logout_sidebar_link']";
    this.cartImage ="#shopping_cart_container";
    this.addToCartButton="//button[text()='ADD TO CART']";
    this.itemCards = page.locator('.inventory_item');
    this.nameProduct = page.locator('.inventory_item_name').first();
    

  }

  async logOutToApplication(): Promise<void> {
    await this.page.click(this.pagebutton);
    await this.page.click(this.logOut);
  }
   
  async clickAddButtonFirst(): Promise<void>{
     const button = this.page.locator('[data-test^="add-to-cart"]').first();
  await button.waitFor({ state: 'visible' });
  await button.click();
     
  }

    async isCartVisible(): Promise<boolean> {
    return await this.page.locator(this.cartImage).isVisible();
  }


async verifyNumberOfItems(expectCount:number): Promise<void> {
  await expect(this.itemCards).toHaveCount(expectCount); 
}


  async takeScreenshot(filename = 'inventory.png'): Promise<void> {
    await this.page.screenshot({ path: filename });
  }


  async nameProductClickable():Promise<void>{
    const nameProductVariable=this.page.locator('.inventory_item_name').first();
     await nameProductVariable.waitFor({ state: 'visible' });
    await nameProductVariable.click()
    
  }
}

