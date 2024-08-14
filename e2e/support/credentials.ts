const setRandomNumbers = true

const randomNumber = setRandomNumbers
  ? Math.floor(Math.random() * (1000 - 100 + 1)) + 100
  : ''
const companyName = `test-company-${randomNumber}`
export const user1 = {
  companyName,
  email: `test-user-${randomNumber}@${companyName}.com`,
  name: `test-user-${randomNumber}`,
  password: 'Password@123'
}
