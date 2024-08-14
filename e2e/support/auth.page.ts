import {expect, Page} from '@playwright/test'
import {SIGNIN_ROUTE, CREATE_ACCOUNT_ROUTE} from './constants'
import {getEmailVerificationLink} from '@/utils'
export default class AuthPages {
  private page: Page
  constructor(page) {
    this.page = page
  }

  async gotoSignin() {
    await this.page.goto(SIGNIN_ROUTE)
    await this.page.reload()
    await this.page.reload()
  }

  async gotoCreateAccount() {
    await this.page.goto(CREATE_ACCOUNT_ROUTE)
    await this.page.reload()
  }

  async signin(email: string, password: string) {
    await this.page.getByPlaceholder('Enter your email').fill(email)
    await this.page.getByPlaceholder('Enter your password').fill(password)
    await this.page
      .getByTestId('sign-in-form')
      .getByRole('button', {name: 'Sign in'})
      .click()
    await expect(this.page.getByTestId('header-menu-item-flows')).toBeVisible()
  }

  async createAccount(
    email: string,
    name: string,
    companyName: string,
    password: string
  ) {
    await this.page.getByPlaceholder('Enter your work email').fill(email)
    await this.page.getByRole('button', {name: 'Play with Userflow'}).click()
    await this.page.locator('p.text-center').filter({
      hasText: `Click the email verification link we just sent to ${email}`
    })

    await this.page.waitForTimeout(2000)

    // fetch the email registration link from Mailinator for production mode
    const actionUrl = await getEmailVerificationLink(name)
    await this.page.goto(actionUrl)
    //

    // run tests in dev mode

    /* await this.page.goto(MAILBOX_ROUTE)
    await this.page.getByRole('link', {name: 'Userflow'}).first().click()
    const actionUrlElement = await this.page.getByText(
      '%{action_url: "https://'
    )

    const actionUrlText = await actionUrlElement.textContent()
    const urlMatch = actionUrlText.match(/%{action_url:\s*"([^"]+)"/)
    if (!urlMatch) {
      throw new Error('Action URL not found in the text content')
    }
    const actionUrl = urlMatch[1]
    if (!actionUrl) {
      throw new Error("Couldn't find the action url")
    }
    await this.page.getByRole('button', {name: 'Empty mailbox'}).click()

    await this.page.goto(actionUrl) */
    //

    await this.page.waitForLoadState()
    await this.page.getByPlaceholder('Enter your full name').fill(name)
    await this.page
      .getByPlaceholder('Enter your company name')
      .fill(companyName)
    await this.page.getByPlaceholder('Pick a strong password').fill(password)
    await this.page.locator('.labeled-checkbox__input').click()
    await this.page.getByRole('button', {name: "Let's get started"}).click()
  }

  async signout() {
    await this.page.goto(SIGNIN_ROUTE)
  }
}
