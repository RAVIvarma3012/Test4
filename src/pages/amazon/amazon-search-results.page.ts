import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon search results page object.
 * Encapsulates interactions with the results list after submitting a search.
 */
export class AmazonSearchResultsPage extends BasePage {
    /**
     * Recorded locator for the first product link selected during capture.
     * Note: this is intentionally specific to the recorded product title.
     */
    private readonly firstProductLinkRecorded: Locator;

    constructor(page: Page) {
        super(page);
        this.firstProductLinkRecorded = this.page.getByRole('link', {
            name: 'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey',
            exact: true,
        });
    }

    /**
     * Verify the results page is loaded.
     *
     * Risk note: stable locators for Amazon results containers can vary by locale/experiment.
     * This helper is provided for future hardening once stable selectors are identified.
     */
    async verifyResultsLoaded(): Promise<void> {
        this.logStep('Verify Amazon search results are loaded');
        // TODO: Implement using stable locators once identified after mount fix.
        // Example candidates (do NOT enable without validation):
        // - this.page.locator("[data-component-type='s-search-results']")
        // - this.page.getByRole('main')
        // For now, keep this as a no-op to avoid introducing guessed selectors.
        await expect(this.page).toHaveURL(/s\?/);
    }

    /**
     * Click the recorded product link from the search results.
     * This wraps the recorded step 5 selector exactly to keep the test aligned with capture.
     */
    async openRecordedFirstProduct(): Promise<void> {
        this.logStep('Open recorded first product from search results');
        await ActionUtils.click(this.firstProductLinkRecorded, { page: this.page });
    }

    /**
     * Planned extension: select the first non-sponsored product.
     *
     * Risk mitigation: do NOT implement until stable locators can be identified.
     * Amazon frequently changes DOM structure and sponsored labeling.
     */
    async selectFirstNonSponsoredProduct(): Promise<void> {
        this.logStep('Select first non-sponsored product (planned extension)');
        throw new Error(
            'selectFirstNonSponsoredProduct() is not implemented. Implement only after stable locators are identified.'
        );
    }
}
