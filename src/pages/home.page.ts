import { Browser, BrowserContext, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Home page object representing the site entry point.
 *
 * Provides interactions for top-level navigation such as opening the Careers area.
 */
export class HomePage extends BasePage {
  /**
   * Creates an instance of {@link HomePage}.
   *
   * @param page Playwright {@link Page} instance.
   * @param context Optional Playwright {@link BrowserContext}.
   * @param browser Optional Playwright {@link Browser}.
   */
  constructor(page: Page, context?: BrowserContext, browser?: Browser) {
    super(page, context, browser);
  }

  /**
   * Locator for the "Careers" link in the global navigation.
   */
  private get careersLink(): Locator {
    return this.page.getByRole('link', { name: 'Careers', exact: true });
  }

  /**
   * Click the "Careers" link to open the careers/jobs area.
   *
   * Note: Some flows may navigate directly to the external jobs portal instead of using this link.
   */
  async clickCareersLink(): Promise<void> {
    this.logStep("Click 'Careers' link");
    await ActionUtils.click(this.careersLink, { page: this.page });
  }
}
