import { Locator, Page, expect } from '@playwright/test';

export class SearchJobPage {
    readonly page: Page;
    readonly keywordSearchInput: Locator;
    readonly searchJobButton: Locator;
    readonly emailInput: Locator;
    readonly categoryDropdown: Locator;
    readonly locationInput: Locator;
    readonly addButton: Locator;
    readonly addedJob: Locator;
    readonly signUpButton: Locator;
    readonly confirmationMessage: Locator;

    constructor (page: Page) {
        this.page = page;
        this.keywordSearchInput = this.page.getByRole('searchbox', { name: 'Keyword Search' });
        this.searchJobButton = this.page.locator('[data-last-action="search-submit"]:visible');
        this.emailInput = this.page.locator('[type="email"]');
        this.categoryDropdown = this.page.locator('[name="Category"]');
        this.locationInput = this.page.locator('[name="Location"]');
        this.addButton = this.page.getByRole('button', {name: 'Add'});
        this.addedJob = this.page.locator('[data-list-name="JobAlertCategoryLocation"]');
        this.signUpButton = this.page.getByRole('button', {name: 'Submit Job Alerts'});
        this.confirmationMessage = this.page.locator('.form-message');
    };

    async inputJob(title: string): Promise<void> {
        await this.keywordSearchInput.fill(title);
        await expect(this.keywordSearchInput).toHaveValue(title);

    };

    async clickSearch(): Promise<void> {
        await this.searchJobButton.click();
    };

    async typeEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    };

    async selectJobCategory(value: string): Promise<void> {
        await this.categoryDropdown.selectOption(value);
    };

    async typeLocation(value: string): Promise<void> {
        await this.locationInput.pressSequentially(value);
    };

    async selectLocationFromDropdown(location: string): Promise<void> {
        await this.page.getByRole('option', { name: location, exact: true }).click();
    };

    async addJobCategory(): Promise<void> {
        await this.addButton.click();
    };

    async checkAddedJobInfo(category: string, location: string): Promise<void> {
        await expect(this.addedJob).toContainText(`${category}, ${location}`);
    };

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    };

    async checkConfirmationMessage(value: string): Promise<void> {
        await expect(this.confirmationMessage).toBeVisible();
        await expect(this.confirmationMessage).toContainText(value);
    };



};