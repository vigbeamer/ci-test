import {BrowserContext, chromium} from '@playwright/test'
import path from 'path'
import {test as authFixture} from './auth'

export const test = authFixture.extend<{
  context: BrowserContext
}>({
  context: async ({}, use) => {
    const pathToExtension = path.join(__dirname, '../../crx/src')
    console.log('pathToExtension', pathToExtension)
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ]
    })
    await use(context)
    await context.close()
  }
})
