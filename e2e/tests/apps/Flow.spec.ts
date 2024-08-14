// import fixture that has both extension and auth
import {expect} from '@playwright/test'
import {test} from '@/fixture/userflowExtension'
import {user1} from '@/support/credentials'
import TinyTime from '@/support/tinytime.page'
import {TINYTIME_LOCAL} from '@/support/constants'

const {email, name, companyName, password} = user1

test.beforeEach(async ({page}) => {
  const tinytime = new TinyTime(page)
  await tinytime.setupUser()
})

test('Check tooltip', async ({page, authPages, context}) => {
  // await authPages.gotoCreateAccount()
  // await authPages.createAccount(email, name, companyName, password)
  await authPages.gotoSignin()
  await authPages.signin('vignesh.shanmugavelu@getbeamer.com', 'Password@123')
  await page.getByTestId('header-menu-item-flows').click()
  await page.getByRole('button', {name: 'Create flow'}).click()
  await page.getByPlaceholder('Enter a name for your flow').fill('test-flow')
  await page.locator('form').getByRole('button', {name: 'Create flow'}).click()
  await page.getByRole('button', {name: 'Auto-start flow if...'}).click()
  await page.getByRole('button', {name: 'Add condition'}).click()
  await page.getByText('Current page (URL)').click()
  await page
    .locator('div:nth-child(2) > .d-flex > div:nth-child(2) > .btn')
    .click()
  await page.getByPlaceholder('/example/path').nth(1).fill('/random')
  await page.getByTestId('flow-builder-header').click()
  await page
    .locator('.flow-builder__rich-editor-slate')
    .fill("Write what you've done here")
  await page.getByTestId('step-settings-block').click()
  await page
    .locator('.toggle-group__text-big-icon-layout')
    .filter({hasText: 'Tooltip'})
    .click()
  await page.getByText('Show tooltip on this element').click()
  await page.getByRole('button', {name: 'Specify tooltip position'}).click()
  await page.getByRole('textbox').nth(4).click()
  await page.getByText('To the right of target').click()

  await page.getByTestId('flow-builder-selector-select-element').click()
  await page.getByPlaceholder('https://my.app.com').fill(TINYTIME_LOCAL)

  const pagePromise = context.waitForEvent('page')
  await page.getByTestId('flow-builder-start-submit-button').click()

  const Selectortinytime = await pagePromise
  await Selectortinytime.waitForLoadState()

  const targetElement = Selectortinytime.getByPlaceholder('What have you done?')
  await Selectortinytime.waitForSelector('[class="card__header"]')
  await targetElement.click()
  await targetElement.click()

  await page.getByRole('button', {name: 'Publish'}).click()
  await page.getByRole('button', {name: 'Publish'}).last().click()
  await page.getByRole('button', {name: 'Preview'}).click()

  const tooltip = Selectortinytime.locator('.userflowjs-bubble')
  // Wait for the tooltip to stabilize after animation
  await page.waitForTimeout(2000)
  const targetBox = await targetElement.boundingBox()
  const tooltipBox = await tooltip.boundingBox()
  await expect(tooltip).toBeVisible()
  expect(tooltipBox.x).toBeCloseTo(
    Math.floor(targetBox.x + targetBox.width + 11),
    0
  )
})
