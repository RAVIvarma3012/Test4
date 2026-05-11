/**
 * Test Case: Add Wireless Mouse to Amazon cart.
 *
 * Flow: Navigate to Amazon, dismiss optional overlay, search for "Wireless Mouse",
 * open the recorded product, add it to cart, and verify the cart reflects 1 item.
 */

import { test, expect } from '@test-setup/fixtures';
import { AmazonHomePage } from '@/pages/amazon/amazon-home.page';
import { AmazonSearchResultsPage } from '@/pages/amazon/amazon-search-results.page';
import { AmazonProductPage } from '@/pages/amazon/amazon-product.page';
import { AmazonCartPage } from '@/pages/amazon/amazon-cart.page';

/**
 * Spec covering: Search Wireless Mouse, open product, add to cart, verify cart quantity.
 */
test.describe('Amazon - Add wireless mouse to cart', () => {
    test('Search Wireless Mouse, open product, add to cart, verify cart quantity', async ({ page }) => {
        const homePage = new AmazonHomePage(page);
        const resultsPage = new AmazonSearchResultsPage(page);
        const productPage = new AmazonProductPage(page);
        const cartPage = new AmazonCartPage(page);

        await test.step('Step 1: Navigate to Amazon homepage', async () => {
            await homePage.gotoHome();

            // Requirement #1: explicit homepage readiness verification after navigation.
            await expect(page.getByRole('searchbox', { name: 'Search Amazon' })).toBeVisible();
        });

        await test.step('Step 2: Dismiss overlay (Continue shopping) if present', async () => {
            await homePage.clickContinueShopping();
        });

        await test.step('Step 3: Fill search box with Wireless Mouse', async () => {
            await homePage.searchFor('Wireless Mouse');
        });

        await test.step('Step 4: Submit search', async () => {
            await homePage.submitSearch();
        });

        await test.step('Step 5: Open recorded product from results', async () => {
            await resultsPage.openRecordedFirstProduct();
        });

        await test.step('Step 6: Add product to cart', async () => {
            await productPage.addToCart();
        });

        await test.step('Step 7: Go to cart', async () => {
            await productPage.goToCart();
        });

        await test.step('Step 8: Verify cart has 1 item', async () => {
            await cartPage.verifyCartHasOneItem();
        });
    });
});
