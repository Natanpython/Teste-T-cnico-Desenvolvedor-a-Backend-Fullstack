import { expect, test } from '@playwright/test';

test.describe('Product Manager', () => {
  const suffix = Date.now();
  const productName = `Produto Playwright ${suffix}`;
  const editedProductName = `Produto Editado ${suffix}`;

  test('deve criar produto', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /novo produto/i }).click();

    await page
      .getByRole('textbox', { name: 'Nome', exact: true })
      .fill(productName);

    await page.getByLabel(/descrição/i).fill('Teste e2e');
    await page.getByLabel(/preço/i).fill('100');
    await page.getByLabel(/categoria/i).selectOption({ index: 1 });

    await page.getByRole('button', { name: /salvar produto/i }).click();

    await expect(
      page.getByRole('heading', { name: productName, exact: true }),
    ).toBeVisible();
  });

  test('deve filtrar produto', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/digite o nome ou id/i).fill(productName);

    await expect(
      page.getByRole('heading', { name: productName, exact: true }),
    ).toBeVisible();
  });

  test('deve editar produto', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder(/digite o nome ou id/i).fill(productName);

    await page.getByRole('button', { name: /editar/i }).first().click();

    await page
      .getByRole('textbox', { name: 'Nome', exact: true })
      .fill(editedProductName);

    await page.getByRole('button', { name: /salvar alterações/i }).click();

    await page
      .getByPlaceholder(/digite o nome ou id/i)
      .fill(editedProductName);

    await expect(
      page.getByRole('heading', { name: editedProductName, exact: true }),
    ).toBeVisible();
  });

  test('deve excluir produto', async ({ page }) => {
    await page.goto('/');

    await page
      .getByPlaceholder(/digite o nome ou id/i)
      .fill(editedProductName);

    await page.getByRole('button', { name: /excluir/i }).first().click();

    await expect(
      page.getByRole('heading', { name: 'Excluir produto?' }),
    ).toBeVisible();

    await page.getByRole('button', { name: /^excluir produto$/i }).click();

    await expect(
      page.getByRole('heading', { name: editedProductName, exact: true }),
    ).not.toBeVisible();
  });
});