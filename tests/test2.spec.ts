// Feature: Saved jobs empty state on IKEA Jobs website

//   Scenario: Saved jobs counter and dropdown show empty state when nothing is saved
//     Given I open the IKEA website "https://www.ikea.com/"
//     And I accept the cookie consent banner if it is shown
//     When I click on the "Jobs" tab
//     And I click on "Explore available jobs"
//     Then the "Saved jobs" counter in the header should show "0"
//     When I click on the "Saved jobs" element
//     Then the dropdown should display the message "No jobs have been saved yet."

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AllJobsPage } from '../pages/AllJobsPage';
import { JobPage } from '../pages/JobPage';
import { noSavedJobsMessage } from '../testData';

test.describe('Saved jobs empty state', () => { //REVIEW: the test.describe name is not descriptive enough
    let homePage: HomePage;
    let allJobsPage: AllJobsPage;
    let jobPage: JobPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
        await expect(page).toHaveURL('/');
        await homePage.acceptCookies();
    });

    test('Should show 0 saved jobs and empty state message when nothing is saved', async ({ page }) => {
        await test.step('Step 1: click Jobs tab', async () => {
            await homePage.navigateToJobs();
            await expect(page).toHaveURL('/global/en/jobs/'); //REVIEW: Keep the URL value in an appropriate class
        });

        await test.step('Step 2: Click on Explore available jobs', async () => {
            allJobsPage = new AllJobsPage(page);
            await allJobsPage.exploreJobs();
            await expect(page).toHaveURL('https://jobs.ikea.com/en'); //REVIEW: Keep the URL value in an appropriate class
            await allJobsPage.acceptCookies();
        });

        await test.step('Step 3: Check that Saved jobs counter shows 0', async () => {
            jobPage = new JobPage(page);
            await jobPage.checkNumberOfSavedJobs('0');
        });

        await test.step('Step 4: Click Saved jobs and check the empty state message', async () => {
            await jobPage.clickSavedJobsDropdown();
            await jobPage.checkNoSavedJobsMessage(noSavedJobsMessage);
        });
    });
});
