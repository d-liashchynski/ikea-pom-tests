import { Locator, Page, expect } from '@playwright/test';

export class JobPage {
    readonly page: Page;
    readonly jobHeading: Locator;
    readonly saveJobButton: Locator;
    readonly heartIconNumber: Locator;
    readonly savedJobsDropdown: Locator;
    readonly savedJobsTitle: Locator;
    readonly noSavedJobsMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.jobHeading = this.page.getByRole('heading', { level: 1 });
        this.saveJobButton = this.page.locator('.js-save-job-btn').first();
        this.heartIconNumber = this.page.locator('.saved-jobs-dropdown__number');
        this.savedJobsDropdown = this.page.getByRole('button', {name: 'Saved jobs'});
        this.savedJobsTitle = this.page.locator('.saved-jobs-dropdown__list-item');
        this.noSavedJobsMessage = this.page.locator('.saved-jobs-dropdown__empty-results-heading');

    };

    async checkJobHeading (title: string): Promise<void> {
        await expect(this.jobHeading).toContainText(title);
    };

    async saveJob (): Promise<void> {
        await this.saveJobButton.click();
    };

    async checkNumberOfSavedJobs(amount: string): Promise<void> {
        await expect(this.heartIconNumber).toContainText(`(${amount})`);
    };

    async clickSavedJobsDropdown(): Promise<void> {
        await this.savedJobsDropdown.click();
    };

    async checkSavedJobTitle(title: string): Promise<void> {
        await expect(this.savedJobsTitle).toContainText(title);
    };

    async checkNoSavedJobsMessage(message: string): Promise<void> {
        await expect(this.noSavedJobsMessage).toContainText(message);
    };

};