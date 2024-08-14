import {test as base} from '@playwright/test'
import AuthPages from '@/support/auth.page'

export const test = base.extend<{authPages: AuthPages}>({
  authPages: async ({page}, use) => {
    const authPages = new AuthPages(page)
    await use(authPages)
  }
})
