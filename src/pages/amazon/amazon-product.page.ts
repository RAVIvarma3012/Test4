import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon product details page (PDP) object.
 * Encapsulates interactions on an Amazon product page such as adding the item to the cart.
 */
export class AmazonProductPage extends BasePage {
    /** Recorded locator for the "Add to cart" button on PDP. */
    private readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart', exact: true });
    }

    /**
     * Verify the product details page is loaded.
     * Asserts that the "Add to cart" button is visible.
     */
    async verifyProductPageLoaded(): Promise<void> {
        this.logStep('Verify Amazon product page is loaded');
        await expect(this.addToCartButton).toBeVisible();
    }

    /**
     * Click "Add to cart" on the product details page.
     * Wraps recorded step 6.
     */
    async clickAddToCart(): Promise<void> {
        this.logStep('Click Add to cart on product page');
        await ActionUtils.click(this.addToCartButton, { page: this.page });
    }

    /**
     * Get the product title text from the PDP for later cart verification.
     *
     * Note: A stable locator must be confirmed after the repo mount fix.
     * This method intentionally fails fast until a recorded/stable selector is provided.
     *
     * @returns Product title as displayed on the PDP.
     */
    async getProductTitle(): Promise<string> {
        this.logStep('Capture product title from product page');
        throw new Error(
            'getProductTitle() is not implemented. Provide a recorded/stable locator for the PDP title after mount fix.'
        );
    }
}
