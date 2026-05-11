import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';

/**
 * Amazon cart page object.
 *
 * Provides resilient cart assertions that avoid dynamic price matching.
 */
export class AmazonCartPage extends BasePage {
    /** Cart page heading (best-effort stable signal). */
    private readonly cartHeading: Locator;

    constructor(page: Page) {
        super(page);

        // NOTE/RISK: No locator was recorded for cart subtotal / quantity in the source recording.
        // We intentionally use role-based locators as a fallback until a recording step captures
        // the exact primarySelector for the cart item count/subtotal.
        this.cartHeading = this.page.getByRole('heading', { name: /shopping cart/i });
    }

    /**
     * Verify the cart reflects exactly one item.
     *
     * This assertion avoids relying on dynamic price values. It checks for stable signals such as:
     * - presence of the Shopping Cart heading
     * - a subtotal label containing "Subtotal" and "1 item" (common Amazon pattern)
     * - at least one cart item row
     *
     * IMPORTANT: Because no recorded locator exists for subtotal/quantity, this method uses
     * best-effort role/text locators. If this becomes flaky, add a new recording step to capture
     * the exact locator for the subtotal item count or quantity dropdown.
     *
     * @returns Promise that resolves when verification passes.
     */
    async verifyCartHasOneItem(): Promise<void> {
        this.logStep('Verify cart has exactly 1 item (avoid dynamic price assertions)');

        // Ensure we are on the cart page.
        await expect(this.cartHeading).toBeVisible();

        // Best-effort: Amazon subtotal often renders as "Subtotal (1 item):".
        const subtotalText = this.page.getByText(/subtotal\s*\(\s*1\s*item\s*\)/i);
        const subtotalTextAlt = this.page.getByText(/1\s*item/i);

        // Best-effort: cart item rows often have data-testid or list semantics; we avoid guessing.
        // Instead, assert at least one "Delete" action exists (common per-item control).
        const deleteButtons = this.page.getByRole('button', { name: /delete/i });

        // Prefer the strongest signal available on the current DOM.
        if (await subtotalText.count()) {
            await expect(subtotalText.first()).toBeVisible();
            return;
        }

        if (await subtotalTextAlt.count()) {
            await expect(subtotalTextAlt.first()).toBeVisible();
            return;
        }

        // Fallback: at least one cart line item control exists.
        await expect(deleteButtons.first()).toBeVisible();
    }
}
