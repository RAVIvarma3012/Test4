import { expect, Locator, Page } from '@playwright/test';

import { ActionUtils } from '@/utils/action-utils';
import { BasePage } from '@/pages/base.page';

/**
 * Stores page object encapsulating actions for finding nearby stores and opening directions.
 */
export class StoresPage extends BasePage {
    /**
     * "Stores" navigation link.
     */
    private readonly storesLink: Locator;

    /**
     * City / Pincode textbox.
     */
    private readonly cityOrPincodeTextbox: Locator;

    /**
     * "Find Stores" button.
     */
    private readonly findStoresButton: Locator;

    /**
     * "Get Direction" link (results list).
     */
    private readonly getDirectionLink: Locator;

    /**
     * Creates an instance of StoresPage.
     * @param page Playwright Page instance.
     */
    constructor(page: Page) {
        super(page);
        this.storesLink = this.page.getByRole('link', { name: 'Stores', exact: true });
        this.cityOrPincodeTextbox = this.page.getByRole('textbox');
        this.findStoresButton = this.page.getByRole('button', { name: 'Find Stores' });
        this.getDirectionLink = this.page.getByRole('link', { name: 'Get Direction' });
    }

    /**
     * Click the "Stores" link/icon to open the stores page/section.
     * Uses the recorded locator from the test run.
     */
    async openStores(): Promise<void> {
        this.logStep("Open 'Stores' section");
        await ActionUtils.click(this.storesLink, { page: this.page });
    }

    /**
     * Fill the City / Pincode textbox.
     * @param pincode Pincode/city value to search for.
     */
    async enterCityOrPincode(pincode: string): Promise<void> {
        this.logStep('Enter City / Pincode');
        await ActionUtils.fill(this.cityOrPincodeTextbox, pincode, { page: this.page });
    }

    /**
     * Click the "Find Stores" button and wait for results to be available.
     */
    async clickFindStores(): Promise<void> {
        this.logStep("Click 'Find Stores'");
        await ActionUtils.click(this.findStoresButton, { page: this.page });

        // Wait for at least one "Get Direction" link to appear as a proxy for results loaded.
        await expect(this.getDirectionLink.first()).toBeVisible();
    }

    /**
     * Click the first "Get Direction" link/button from the results.
     */
    async clickFirstGetDirection(): Promise<void> {
        this.logStep("Click first 'Get Direction'");
        await ActionUtils.click(this.getDirectionLink.first(), { page: this.page });
    }

    /**
     * Verify the user can see the "Directions" button/text after clicking Get Direction.
     * Note: no selector was recorded for this verification step; assertion is performed by visible text.
     */
    async assertDirectionsVisible(): Promise<void> {
        this.logStep("Assert 'Directions' is visible");

        await expect(this.page.getByText('Directions')).toBeVisible();
    }
}
