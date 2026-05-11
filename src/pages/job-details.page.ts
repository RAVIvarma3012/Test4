/**
 * Page object representing the Freshteam job details page.
 * Encapsulates interactions on a specific job posting (e.g., applying for the job).
 */

import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class JobDetailsPage extends BasePage {
    /**
     * "Apply Now" link/button on the job details page.
     * Locator recorded from the test flow.
     */
    private get applyNowLink(): Locator {
        return this.page.getByRole('link', { name: 'Apply Now' });
    }

    /**
     * Create a JobDetailsPage.
     *
     * @param page Playwright Page instance.
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Click the "Apply Now" link/button on the job details page.
     * Implements test step 11.
     */
    async clickApplyNow(): Promise<void> {
        this.logStep('Click Apply Now on job details page');
        await expect(this.applyNowLink).toBeVisible();
        // Recorded step: await page.getByRole('link', { name: 'Apply Now' }).click();
        await ActionUtils.click(this.applyNowLink, { page: this.page });
    }

    /**
     * Verify the "Apply Now" link/button is visible.
     * Useful as a precondition check before attempting to apply.
     */
    async verifyApplyNowVisible(): Promise<void> {
        this.logStep('Verify Apply Now is visible on job details page');
        await expect(this.applyNowLink).toBeVisible();
    }
}
