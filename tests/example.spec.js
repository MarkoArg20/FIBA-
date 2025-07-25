// @ts-check //16.07 18:46
import { test, expect } from '@playwright/test';
const { NavigationMenu } = require('../pages/homePage')
let navigationMenu
require('dotenv').config();




test.beforeEach(async ({ page }) => {
  navigationMenu = new NavigationMenu(page)
  await page.goto('https://www.fiba.basketball/en') //zasto ne moze ovde process.env.BASEYRL
  await navigationMenu.preparePageOnLoad()
})

test('Check if navigation menu is available and all the buttons in it', async ({ page }) => {

  await navigationMenu.assertNavigationMenu()

});
test('Check button functionality', async ({ page }) => {

  await navigationMenu.checkBtnFunctionality()

});

test('Succesful login', async ({ page }) => {
  await navigationMenu.logIn(process.env.FIBA_USERNAME, process.env.PASSWORD)
  await navigationMenu.assertSuccessfulLogin()
})

test('Unsuccesfull login - invalid password', async ({ page }) => {

  await navigationMenu.logIn(process.env.FIBA_USERNAME, '123'/* wrong password */)
  await expect(page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')).toBeVisible() // i ova vo funkcija

})

test('Unsuccesfull login - invalid username', async ({ page }) => {

  await navigationMenu.logIn('test@yahoo.com' /* wrong username */, process.env.PASSWORD)
  await expect(page.getByText('Invalid or expired credentials. Please double-check or use the "Forgot password?" link to reset your password.')).toBeVisible() // i ova vo funkcija

})