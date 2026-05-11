/**
 * Page object representing the Freshteam jobs listing page for JoinDitto.
 * Encapsulates navigation and filter/search interactions used by the jobs search flow.
 */

import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class JobsPage extends BasePage {
    /** Freshteam jobs listing URL. */
    private readonly jobsUrl = 'https://joinditto.freshteam.com/jobs';

    /**
     * "Choose Department" dropdown/searchbox.
     */
    private get chooseDepartmentDropdown(): Locator {
        return this.page.getByRole('searchbox', { name: 'Choose Department' });
    }

    /**
     * "Marketing" department option.
     */
    private get departmentMarketingOption(): Locator {
        return this.page.getByRole('option', { name: 'Marketing' });
    }

    /**
     * "Choose Work Type" dropdown/searchbox.
     */
    private get chooseWorkTypeDropdown(): Locator {
        return this.page.getByRole('searchbox', { name: 'Choose Work Type' });
    }

    /**
     * "Full Time" work type option.
     */
    private get workTypeFullTimeOption(): Locator {
        return this.page.getByRole('option', { name: 'Full Time' });
    }

    /**
     * Location combobox (recorded with an empty-text filter).
     */
    private get chooseLocationCombobox(): Locator {
        return this.page.getByRole('combobox').filter({ hasText: /^$/ });
    }

    /**
     * "Bengaluru, India" location option.
     */
    private get locationBengaluruIndiaOption(): Locator {
        return this.page.getByRole('option', { name: 'Bengaluru, India' });
    }

    /**
     * "Search Job Title" textbox.
     */
    private get searchJobTitleTextbox(): Locator {
        return this.page.getByRole('textbox', { name: 'Search Job Title' });
    }

    /**
     * First matching job result link (recorded name includes HTML entity).
     */
    private get firstJobResultLink(): Locator {
        return this.page.getByRole('link', { name: 'Marketing &amp; Growth Executive-' });
    }

    /**
     * Create a JobsPage.
     *
     * @param page Playwright Page instance.
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Navigate directly to the Freshteam jobs listing URL.
     */
    async gotoJobs(): Promise<void> {
        this.logStep('Navigate to Freshteam jobs listing');
        // Recorded step: await page.goto('https://joinditto.freshteam.com/jobs');
        await this.page.goto('https://joinditto.freshteam.com/jobs');
        await expect(this.chooseDepartmentDropdown).toBeVisible();
    }

    /**
     * Open the "Choose Department" dropdown/searchbox.
     */
    async openDepartmentFilter(): Promise<void> {
        this.logStep('Open department filter');
        await expect(this.chooseDepartmentDropdown).toBeVisible();
        // Recorded step: await page.getByRole('searchbox', { name: 'Choose Department' }).click();
        await ActionUtils.click(this.chooseDepartmentDropdown, { page: this.page });
    }

    /**
     * Select the "Marketing" department option.
     */
    async selectDepartmentMarketing(): Promise<void> {
        this.logStep('Select department: Marketing');
        await expect(this.departmentMarketingOption).toBeVisible();
        // Recorded step: await page.getByRole('option', { name: 'Marketing' }).click();
        await ActionUtils.click(this.departmentMarketingOption, { page: this.page });
    }

    /**
     * Open the "Choose Work Type" dropdown/searchbox.
     */
    async openWorkTypeFilter(): Promise<void> {
        this.logStep('Open work type filter');
        await expect(this.chooseWorkTypeDropdown).toBeVisible();
        // Recorded step: await page.getByRole('searchbox', { name: 'Choose Work Type' }).click();
        await ActionUtils.click(this.chooseWorkTypeDropdown, { page: this.page });
    }

    /**
     * Select the "Full Time" work type option.
     */
    async selectWorkTypeFullTime(): Promise<void> {
        this.logStep('Select work type: Full Time');
        await expect(this.workTypeFullTimeOption).toBeVisible();
        // Recorded step: await page.getByRole('option', { name: 'Full Time' }).click();
        await ActionUtils.click(this.workTypeFullTimeOption, { page: this.page });
    }

    /**
     * Open the location combobox to choose a location.
     */
    async openLocationFilter(): Promise<void> {
        this.logStep('Open location filter');
        await expect(this.chooseLocationCombobox).toBeVisible();
        // Recorded step: await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
        await ActionUtils.click(this.chooseLocationCombobox, { page: this.page });
    }

    /**
     * Select the "Bengaluru, India" location option.
     */
    async selectLocationBengaluruIndia(): Promise<void> {
        this.logStep('Select location: Bengaluru, India');
        await expect(this.locationBengaluruIndiaOption).toBeVisible();
        // Recorded step: await page.getByRole('option', { name: 'Bengaluru, India' }).click();
        await ActionUtils.click(this.locationBengaluruIndiaOption, { page: this.page });
    }

    /**
     * Fill the "Search Job Title" textbox.
     *
     * @param title Job title search term.
     */
    async searchJobTitle(title: string = 'Content'): Promise<void> {
        this.logStep(`Search job title: ${title}`);
        await expect(this.searchJobTitleTextbox).toBeVisible();
        // Recorded step: await page.getByRole('textbox', { name: 'Search Job Title' }).fill('Content');
        await ActionUtils.fill(this.searchJobTitleTextbox, title, { page: this.page });
    }

    /**
     * Open the first available matching job link.
     */
    async openFirstJobResult(): Promise<void> {
        this.logStep('Open first job result');
        await expect(this.firstJobResultLink).toBeVisible();
        // Recorded step: await page.getByRole('link', { name: 'Marketing &amp; Growth Executive-' }).click();
        await ActionUtils.click(this.firstJobResultLink, { page: this.page });
        await this.page.waitForLoadState('domcontentloaded');
    }
}
