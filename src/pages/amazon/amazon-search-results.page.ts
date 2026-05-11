import { Page, Browser, BrowserContext, Locator } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon search results page object.
 *
 * Encapsulates interactions on the Amazon results listing page.
 */
export class AmazonSearchResultsPage extends BasePage {
    /**
     * Recorded product link from the search results.
     *
     * TODO/RISK: The test requirement states "first non-sponsored product".
     * The provided recording captured a specific product link by its full accessible name.
     * A robust selector/filter for "first non-sponsored" is not available from the provided steps.
     * Capture a new recording or add a dedicated locator strategy to reliably target the first
     * non-sponsored result.
     */
    private readonly firstProductLink: Locator;

    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
        this.firstProductLink = this.page.getByRole('link', {
            name: 'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey',
            exact: true,
        });
    }

    /**
     * Opens the recorded product from the search results.
     *
     * Note: This method follows the recorded step (specific product link), not a dynamic
     * "first non-sponsored" selection.
     */
    async openRecordedFirstProduct(): Promise<void> {
        this.logStep('Open recorded first product from Amazon search results');
        await ActionUtils.click(this.firstProductLink, { page: this.page });
    }
}
