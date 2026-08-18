import { Locator, Page } from '@playwright/test';

export class AllJobsPage {
    readonly page: Page;
    readonly exploreJobsButton: Locator;
    readonly acceptCookiesButton: Locator;


    constructor (page: Page) {
        this.page = page;
        this.exploreJobsButton = this.page.getByRole('link', { name: 'Explore available jobs' })
        this.acceptCookiesButton = this.page.getByRole('button', { name: 'Accept' });

    };

    async exploreJobs(): Promise<void> {
        await this.exploreJobsButton.click();
        // jobs.ikea.com throws a real JS error on every load (fixSearchForm /
        // labelSearchJobs is not defined, from a 3rd-party a11y script) and the
        // Save button click is handled purely client-side (no network request),
        // so there's no DOM state to wait on - just a race on when the real click
        // handlers finish attaching. Checked this directly in the browser and
        // couldn't find a locator-based fix. This wait + retries in the config
        // is the mitigation, not laziness.
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
    };

    async acceptCookies (): Promise<void> {
        await this.acceptCookiesButton.click();
    };

    
};