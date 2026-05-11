import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon home page object.
 *
 * Encapsulates common interactions on https://www.amazon.com such as dismissing
 * optional overlays and performing a product search.
 */
export class AmazonHomePage extends BasePage {
    /** Amazon search input field. */
    private readonly searchAmazonField: Locator;

    /** Optional overlay button: "Continue shopping". */
    private readonly continueShoppingButton: Locator;

    /** Search submit button: "Go". */
    private readonly searchGoButton: Locator;

    constructor(page: Page) {
        super(page);

        // Locators from recorded primarySelector values (do not modify).
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue shopping' });
        this.searchAmazonField = this.page.getByRole('searchbox', { name: 'Search Amazon' });
        this.searchGoButton = this.page.getByRole('button', { name: 'Go', exact: true });
    }

    /**
     * Navigate to the Amazon homepage.
     *
     * @returns Promise that resolves when navigation completes.
     */
    async gotoHome(): Promise<void> {
        this.logStep('Navigate to Amazon homepage');
        // Recorded step: await page.goto('https://www.amazon.com');
        await this.page.goto('https://www.amazon.com');

        // Minimal readiness check for subsequent actions.
        await expect(this.searchAmazonField).toBeVisible();
    }

    /**
     * Dismiss the optional overlay by clicking "Continue shopping" if it appears.
     * Uses a short timeout to avoid flakiness when the overlay is not present.
     *
     * @returns Promise that resolves after attempting the dismissal.
     */
    async clickContinueShopping(): Promise<void> {
        this.logStep('Dismiss overlay: Continue shopping (if present)');

        // Use a short timeout so tests don't fail when the overlay is absent.
        const isVisible = await this.continueShoppingButton.isVisible({ timeout: 1500 }).catch(() => false);
        if (isVisible) {
            await ActionUtils.click(this.continueShoppingButton, { page: this.page });
        }
    }

    /**
     * Fill the Amazon search box with the provided term.
     *
     * @param term Search term to enter.
     * @returns Promise that resolves when the term is filled.
     */
    async searchFor(term: string): Promise<void> {
        this.logStep(`Fill Amazon search box with term: ${term}`);
        await expect(this.searchAmazonField).toBeVisible();

        // Recorded step: await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('Wireless Mouse');
        await ActionUtils.fill(this.searchAmazonField, term, { page: this.page });
    }

    /**
     * Submit the search by clicking the "Go" button.
     *
     * @returns Promise that resolves when the click is performed.
     */
    async submitSearch(): Promise<void> {
        this.logStep('Submit Amazon search via Go button');
        await expect(this.searchGoButton).toBeVisible();

        // Recorded step: await page.getByRole('button', { name: 'Go', exact: true }).click();
        await ActionUtils.click(this.searchGoButton, { page: this.page });
    }
}
