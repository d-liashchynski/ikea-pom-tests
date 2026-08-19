import { Locator, Page, expect } from '@playwright/test';

export class JobResultsPage {
    readonly page: Page;
    readonly resultsHeading: Locator;
    readonly jobItems: Locator;



    constructor (page: Page) {
        this.page = page;
        this.resultsHeading = this.page.getByRole('heading', { level: 1 });
        this.jobItems = this.page.locator('.job-list__item');
        
    };

    async checkResultsHeading (keyword: string): Promise<void> {
        await expect(this.resultsHeading).toContainText(keyword);
    };

    async getJobCount(): Promise<number> {
        return this.jobItems.count();
    };

    async clickFirstJob(): Promise<void> {
        await this.jobItems.first().click();
    };

    

};