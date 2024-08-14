import {Page} from '@playwright/test'
import {TINYTIME_LOCAL} from './constants'

export default class TinyTime {
  private page: Page

  constructor(page) {
    this.page = page
  }

  async setupUser() {
    await this.page.goto(`${TINYTIME_LOCAL}/example-setup`)
    await this.page.reload()
    await this.page.reload()
    await this.page.waitForSelector('[class="card__header"]')
  }
}
