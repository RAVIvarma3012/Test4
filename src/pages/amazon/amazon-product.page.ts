import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon product details page object.
 *
 * Encapsulates interactions on an Amazon product page such as adding the item to
 * the cart and navigating to the cart from the add-to-cart confirmation area.
 */
export class AmazonProductPage extends BasePage {
    /** "Add to cart" button on the product details page. */
    private readonly addToCartButton: Locator;

    /** Container locator for the add-to-cart confirmation area (recorded primarySelector). */
    private readonly goToCartContainer: Locator;

    constructor(page: Page) {
        super(page);

        // Locators from recorded primarySelector values (do not modify).
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart', exact: true });
        this.goToCartContainer = this.page.locator('#sw-gtc');
    }

    /**
     * Click "Add to cart" on the product details page.
     *
     * @returns Promise that resolves when the click is performed.
     */
    async addToCart(): Promise<void> {
        this.logStep('Click Add to cart on product page');
        await expect(this.addToCartButton).toBeVisible();

        // Recorded step: await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
        await ActionUtils.click(this.addToCartButton, { page: this.page });
    }

    /**
     * Click "Go to Cart" from the add-to-cart confirmation area.
     *
     * Note: The recorded selector chains a container locator with getByRole('link', ...).
     * This method preserves that chain to avoid guessing a standalone selector.
     *
     * @returns Promise that resolves when the click is performed.
     */
    async goToCart(): Promise<void> {
        this.logStep('Go to Cart from add-to-cart confirmation area');

        const goToCartLink = this.goToCartContainer.getByRole('link', { name: 'Go to Cart' });
        await expect(goToCartLink).toBeVisible();

        // Recorded step: await page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click();
        await ActionUtils.click(goToCartLink, { page: this.page });
    }
}
