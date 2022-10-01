import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { URLS, CREDENTIALS } from "../data/constants";

test.describe("Wtd Challenge Demo", () => {
  //Declare here your PO
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    //Initialize here your PO
    loginPage = new LoginPage(page);

    //Go to your BASE_URL
    await page.goto(URLS.BASE_URL);
  });

  //Implement your tests here. Don't change the test names
  test("As a standard user I should be able to log in", async ({ page }) => {
    //Ingreso de datos correctos para el login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Verificación URL de ingreso
    await expect(page).toHaveURL(URLS.INVENTORY_URL);
  });

  test("As a fake user I should not be able to log in", async ({ page }) => {
    //Ingreso de usuario incorrecto para el login
    await page.locator('[data-test="username"]').fill("error_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Verificación del mensaje de error
    await expect(page.locator('[class="error-message-container error"]')).toBeVisible();
    await expect(page.locator('[class="error-message-container error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("As a standard user I should be able to order the products by ascending price", async ({
    page,
  }) => {
    //Ingreso de datos correctos para el login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);

    //Ordenar los productos por precio ascendente
    await page.locator('[data-test="product_sort_container"]').selectOption("lohi");

    //Verificación del orden de los productos
    // const primerDato = page.locator(
    //   'xpath=//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/div/text()[2]'
    // );
    // const segundoDato: any = page.locator(
    //   'xpath=//*[@id="inventory_container"]/div/div[2]/div[2]/div[2]/div/text()[2]'
    // );
    // await expect(Number(primerDato)).toBeLessThanOrEqual(Number(segundoDato));
  });

  test.only("As a standard user I should be able to add the two cheaper products to the cart without filter", async ({
    page,
  }) => {
    //Ingreso de datos correctos para el login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);

    //Ordenar los productos por precio ascendente
    await page.locator('[data-test="product_sort_container"]').selectOption("lohi");

    //Agregar los dos productos de menor precio
    await page
      .locator('xpath=//*[@id="inventory_container"]/div/div[1]/div[2]/div[2]/button')
      .click();
    await page
      .locator('xpath=//*[@id="inventory_container"]/div/div[2]/div[2]/div[2]/button')
      .click();

    //Verificar los 2 productos
    await expect(page.locator('[class="shopping_cart_link"]')).toContainText("2");
  });

  test("As a standard user I should be able to finish a purchase", async ({ page }) => {
    //Ingreso de datos correctos para el login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(URLS.INVENTORY_URL);

    //Agregar los dos productos y dirigir a cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[class="shopping_cart_link"]').click();
    await expect(page.locator('[class="shopping_cart_link"]')).toContainText("2");
    await expect(page).toHaveURL(URLS.CART_URL);

    //Verificación de cart y click a checkout inicial
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(URLS.CHECKOUT_ONE_URL);

    //Verificación del checkout inicial con el formulario y click al siguiente checkout
    await page.locator('[data-test="firstName"]').fill("Estephany");
    await page.locator('[data-test="lastName"]').fill("Paniagua");
    await page.locator('[data-test="postalCode"]').fill("15806");
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(URLS.CHECKOUT_TWO_URL);

    //Última verificación de compra y click a finalizar
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE_URL);

    //Verificación de la compra
    await expect(page.locator('[id="checkout_complete_container"]')).toBeVisible();
    await expect(page.locator('[id="checkout_complete_container"]')).toContainText(
      "THANK YOU FOR YOUR ORDER"
    );
  });
});
