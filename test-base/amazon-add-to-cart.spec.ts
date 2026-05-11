/**
 * @fileoverview Amazon add-to-cart end-to-end test.
 * Validates that a user can search for a product, open its PDP, add it to the cart,
 * navigate to the cart, and verify the expected item/quantity.
 */

import { test, expect } from '@test-setup/fixtures';
import { AmazonHomePage } from '@/pages/amazon/amazon-home.page';
import { AmazonSearchResultsPage } from '@/pages/amazon/amazon-search-results.page';
import { AmazonProductPage } from '@/pages/amazon/amazon-product.page';
import { AmazonCartPage } from '@/pages/amazon/amazon-cart.page';

/**
 * Amazon: Search "Wireless Mouse" and add first recorded product to cart.
 */
test('Amazon - add Wireless Mouse to cart and verify in cart', async ({ page, logger, allureReporter }) => {
    const homePage = new AmazonHomePage(page);
    const resultsPage = new AmazonSearchResultsPage(page);
    const productPage = new AmazonProductPage(page);
    const cartPage = new AmazonCartPage(page);

    await test.step('Navigate to Amazon home', async () => {
        logger.info('STEP: Navigate to Amazon home');
        allureReporter.addStep('Navigate to Amazon home');
        await homePage.gotoAmazonHome();
    });

    await test.step('Verify home loaded', async () => {
        logger.info('STEP: Verify Amazon home loaded');
        allureReporter.addStep('Verify Amazon home loaded');
        await homePage.verifyHomeLoaded();
    });

    await test.step('Dismiss interstitial if present', async () => {
        logger.info('STEP: Dismiss interstitial (Continue shopping) if present');
        allureReporter.addStep('Dismiss interstitial (Continue shopping) if present');
        await homePage.clickContinueShoppingIfVisible();
    });

    await test.step('Search for Wireless Mouse', async () => {
        logger.info('STEP: Fill search query: Wireless Mouse');
        allureReporter.addStep('Fill search query: Wireless Mouse');
        await homePage.fillSearchQuery('Wireless Mouse');

        logger.info('STEP: Submit search');
        allureReporter.addStep('Submit search');
        await homePage.submitSearch();
    });

    await test.step('Verify results loaded', async () => {
        logger.info('STEP: Verify search results loaded');
        allureReporter.addStep('Verify search results loaded');
        await resultsPage.verifyResultsLoaded();
    });

    await test.step('Open recorded first product', async () => {
        logger.info('STEP: Open recorded first product');
        allureReporter.addStep('Open recorded first product');
        await resultsPage.openRecordedFirstProduct();
    });

    await test.step('Verify product page loaded', async () => {
        logger.info('STEP: Verify product page loaded');
        allureReporter.addStep('Verify product page loaded');
        await productPage.verifyProductPageLoaded();
    });

    let productTitle = '';
    await test.step('Capture product title', async () => {
        logger.info('STEP: Capture product title');
        allureReporter.addStep('Capture product title');
        productTitle = await productPage.getProductTitle();
        expect(productTitle, 'Product title should be captured for cart verification').toBeTruthy();
    });

    await test.step('Add to cart', async () => {
        logger.info('STEP: Click Add to cart');
        allureReporter.addStep('Click Add to cart');
        await productPage.clickAddToCart();
    });

    await test.step('Go to cart', async () => {
        logger.info('STEP: Go to cart');
        allureReporter.addStep('Go to cart');
        await cartPage.goToCart();
    });

    await test.step('Verify item in cart', async () => {
        logger.info(`STEP: Verify item in cart (title: ${productTitle}, qty: 1)`);
        allureReporter.addStep(`Verify item in cart (qty: 1)`);
        await cartPage.verifyItemInCart(productTitle, 1);
    });
});
