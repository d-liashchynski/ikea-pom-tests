import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly url = '/';
    readonly jobsTab: Locator;
    readonly acceptHomeCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jobsTab = this.page.locator('[data-text="Jobs"]:visible');
        this.acceptHomeCookiesButton = this.page.getByRole('button', { name: 'Accept' });
    };

    async open(): Promise<void> {
        await this.page.goto(this.url)
    };

    async navigateToJobs(): Promise<void> {
        await this.jobsTab.click();
    };

    async acceptCookies (): Promise<void> {
        await this.acceptHomeCookiesButton.click();
    };

};

