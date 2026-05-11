import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon home page object.
 * Encapsulates navigation and search interactions on https://www.amazon.com.
 */
export class AmazonHomePage extends BasePage {
    /** Stable locator for the Amazon search box. */
    private readonly searchBox: Locator;

    /** Optional interstitial button that may appear on first visit. */
    private readonly continueShoppingButton: Locator;

    /** Search submit button ("Go"). */
    private readonly searchGoButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBox = this.page.getByRole('searchbox', { name: 'Search Amazon' });
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue shopping' });
        this.searchGoButton = this.page.getByRole('button', { name: 'Go', exact: true });
    }

    /**
     * Navigate to Amazon homepage.
     */
    async gotoAmazonHome(): Promise<void> {
        this.logStep('Navigate to Amazon homepage');
        await this.navigateTo('https://www.amazon.com');
    }

    /**
     * Click "Continue shopping" interstitial button if it is present.
     * This method is intentionally tolerant to the button being absent.
     */
    async clickContinueShoppingIfVisible(): Promise<void> {
        this.logStep('Dismiss interstitial (Continue shopping) if visible');

        try {
            if (await this.continueShoppingButton.isVisible({ timeout: 2000 })) {
                await ActionUtils.click(this.continueShoppingButton, { page: this.page });
            }
        } catch (error) {
            // Interstitial is not consistently shown; ignore visibility/timeouts.
            this.logger.info(`Continue shopping button not actionable; continuing. Reason: ${String(error)}`);
        }
    }

    /**
     * Fill the Amazon search box with the provided query.
     * @param query Search term to enter.
     */
    async fillSearchQuery(query: string): Promise<void> {
        this.logStep('Fill Amazon search box');
        await ActionUtils.fill(this.searchBox, query, { page: this.page });
    }

    /**
     * Submit the search by clicking the "Go" button.
     */
    async submitSearch(): Promise<void> {
        this.logStep('Submit Amazon search');
        await ActionUtils.click(this.searchGoButton, { page: this.page });
    }

    /**
     * Verify the Amazon home page is loaded by asserting the search box is visible.
     */
    async verifyHomeLoaded(): Promise<void> {
        this.logStep('Verify Amazon home page is loaded');
        await expect(this.searchBox).toBeVisible();
    }

    /**
     * Backwards-compatible wrapper for the planner-mapped method name.
     * Prefer using clickContinueShoppingIfVisible() in new tests.
     */
    async clickContinueShopping(): Promise<void> {
        await this.clickContinueShoppingIfVisible();
    }
}
