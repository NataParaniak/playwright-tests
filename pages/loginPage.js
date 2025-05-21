import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
// class LoginPage{
  constructor(page) {
    super(page);
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
  }

  async login(username, password) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
// module.exports=LoginPage;