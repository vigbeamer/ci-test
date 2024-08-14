import {expect} from '@playwright/test'
import {test} from '@/fixture/auth'
import {user1} from '@/support/credentials'
import {MAILINATOR_DOMAIN, USERFLOW_STAGING} from '@/support/constants'

const {name, companyName, password} = user1

test.describe.configure({mode: 'serial'})

test('Create User', async ({page, authPages}) => {
  await authPages.gotoCreateAccount()
  await authPages.createAccount(
    `${name}@${MAILINATOR_DOMAIN}`,
    name,
    companyName,
    password
  )
  await page.getByRole('link', {name: 'Settings'}).click()
  await expect(page.getByRole('textbox')).toHaveValue(companyName)
  await page.getByRole('button', {name: name}).click({force: true})
  await page.getByRole('link', {name: 'Sign out'}).click({force: true})
  await expect(page.url()).toBe(`${USERFLOW_STAGING}/`)
})
