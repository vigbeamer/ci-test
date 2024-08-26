import {Page} from '@playwright/test'
import {TINYTIME_STAGING} from './constants'

export default class TinyTime {
  private page: Page

  constructor(page) {
    this.page = page
  }

  async setupUser() {
    await this.page.goto(`${TINYTIME_STAGING}/example-setup`)
    await this.page.reload()
    await this.page.reload()
    await this.page.waitForSelector('[class="card__header"]')
  }
}
