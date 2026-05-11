import { test, expect } from '@test-setup/fixtures';

import { StoresPage } from '@/pages/stores.page';

/**
 * Test spec covering store search and directions flow:
 * Launch URL → Stores → enter pincode → Find Stores → Get Direction → verify Directions visible.
 */
test.describe('Stores - Directions', () => {
    /**
     * Validates that a user can search stores by pincode and open directions.
     */
    test('should show Directions after clicking Get Direction for a store', async ({ page }) => {
        const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? process.env.BASE_URL ?? test.info().project.use.baseURL;
        expect(baseURL, 'baseURL must be configured via Playwright config or env (PLAYWRIGHT_BASE_URL/BASE_URL)').toBeTruthy();

        await test.step('Launch application URL', async () => {
            await page.goto(String(baseURL));
        });

        const storesPage = new StoresPage(page);

        await test.step("Open 'Stores' section", async () => {
            await storesPage.openStores();
        });

        await test.step("Enter pincode '500085'", async () => {
            await storesPage.enterCityOrPincode('500085');
        });

        await test.step("Click 'Find Stores'", async () => {
            await storesPage.clickFindStores();
        });

        await test.step("Click first 'Get Direction'", async () => {
            await storesPage.clickFirstGetDirection();
        });

        await test.step("Verify 'Directions' is visible", async () => {
            await storesPage.assertDirectionsVisible();
        });
    });
});
