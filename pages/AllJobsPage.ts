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
    };

    async acceptCookies (): Promise<void> {
        await this.acceptCookiesButton.click();
    };

    
};