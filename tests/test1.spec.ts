// Scenario 1: Search for a job
// 1. Open the IKEA website https://www.ikea.com/
// 2. Click on 'Jobs' tab
// 3. Click on 'Explore available jobs'
// 4. Input 'Manager' in Search field (leave postcode empty)
// 5. Click on 'Search jobs' button
// 6. Implement the following logic: If search returns 0 jobs, go back and search for 'Designer' (or any other job title)
// 7. Click on the first job in the list
// 8. Check that partial job title is 'Manager'
// 9. Click on 'Save' button
// 10. Check that 'Saved jobs' element has '1' in it
// 11. Click on 'Saved jobs' element
// 12. Check that the job title in 'Saved jobs' is 'Manager'

// Scenario 2: Subscribe for a job 
// 1. Open the IKEA website
// 2. Click on 'Jobs' tab
// 3. Click on 'Explore available jobs'
// 4. Input Email in Subscription block (it should be generated every time)
// 5. Select a 'Category' and Add it
// 6. Input Location and choose it in dropdown
// 7. Click on 'Sign up' and check confirmation message

// Scenario 3: 
// 1.       Create any test case for the IKEA website https://www.ikea.com/
// 2.       Ask AI to generate the test
// 3.       After implementing the test, perform a code review considering the following points:

// ·       Correct usage of Page Object Model (POM) structure
// ·       Separation of test logic and page object logic
// ·       Readability and clarity of the code
// ·       Naming conventions (tests, methods, variables)
// ·       Quality and stability of locators
// ·       Proper usage of assertions
// ·       Avoiding duplication (DRY principle)
// ·       Avoiding hardcoded values (URLs, selectors, test data)
// ·       Test stability and flakiness risks (waits, selectors, timing issues)
// ·       Overall maintainability and scalability of the test

// 4.       Add your comments to generated test, compare AI feedback with your own review.

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AllJobsPage } from '../pages/AllJobsPage';
import { SearchJobPage } from '../pages/SearchJobPage';
import { JobResultsPage } from '../pages/JobResultsPage';
import { JobPage } from '../pages/JobPage';
import { jobTitle, fallbackJobTitle, uniqueEmail, jobCategory, location, confirmMessage, jobsPageURL, ikeaJobsPageURL } from '../testData';

test.describe('Search a job and Subscribe for a job', () => {
    let homePage: HomePage;
    let allJobsPage: AllJobsPage;
    let searchJobPage: SearchJobPage;
    let jobResultsPage: JobResultsPage;
    let jobPage: JobPage;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
        await expect(page).toHaveURL('/');
        await homePage.acceptCookies();

    });

    // Scenario 1: Search for a job
    test('Should open the site, navigate to the Job tab, search a job, save it, and check the saved job', async ({ page }) => {
        await test.step('Step 1: click Jobs tab', async () => {
            await homePage.navigateToJobs();
            await expect(page).toHaveURL(jobsPageURL);
        });

        await test.step('Step 2: Click on Explore available jobs', async () => {
            allJobsPage = new AllJobsPage(page);
            await allJobsPage.exploreJobs();
            
            await expect(page).toHaveURL(ikeaJobsPageURL);
            await allJobsPage.acceptCookies();
        });

        await test.step('Step 3: Input Manager in Search field', async () => {
            searchJobPage = new SearchJobPage(page);
            await searchJobPage.inputJob(jobTitle);
        });

        await test.step('Step 4: Click on Search jobs button', async () => {
            await searchJobPage.clickSearch();
        });

        await test.step('Step 5: Click on the first job in the list', async () => {
            jobResultsPage = new JobResultsPage(page);
            await jobResultsPage.checkResultsHeading(jobTitle);

            const count = await jobResultsPage.getJobCount();
            if (count === 0) {
                await page.goBack();
                await searchJobPage.inputJob(fallbackJobTitle);
                await searchJobPage.clickSearch();
            };

            await jobResultsPage.clickFirstJob();
        });

        await test.step('Step 6: Check that partial job title is Manager', async () => {
            jobPage = new JobPage(page);
            await jobPage.checkJobHeading(jobTitle);
        });

        await test.step('Step 7: Click on Save button', async () => {
            await jobPage.saveJob();
            await jobPage.checkNumberOfSavedJobs('1');

        }); 

        await test.step('Step 8: Click on Saved jobs element', async() => {
            await jobPage.clickSavedJobsDropdown();
        });

        await test.step('Step 9: Check that the job title in Saved jobs is Manager', async() => {
            await jobPage.checkSavedJobTitle(jobTitle);
        });

    });

    // Scenario 2: Subscribe for a job
    test('Should subscribe for a job', { tag: '@subscribe' }, async({ page }) => {
        searchJobPage = new SearchJobPage(page);
        await test.step('Step 1: click on Jobs tab', async () => {
            await homePage.navigateToJobs();
            await expect(page).toHaveURL(jobsPageURL);
        });

        await test.step('Step 2: Click on Explore available jobs', async () => {
            allJobsPage = new AllJobsPage(page);
            await allJobsPage.exploreJobs();
            
            await expect(page).toHaveURL(ikeaJobsPageURL);
            await allJobsPage.acceptCookies();
        });

        await test.step('Step 3: Input Email in Subscription block', async() => {
            await searchJobPage.typeEmail(uniqueEmail);
            await expect(searchJobPage.emailInput).toHaveValue(uniqueEmail);

        });

        await test.step('Step 4: Select a Category and Add it', async() => {
            await searchJobPage.selectJobCategory(jobCategory);
            await expect(searchJobPage.categoryDropdown.locator('option:checked')).toHaveText(jobCategory);

            await searchJobPage.typeLocation(location);
            await expect(searchJobPage.locationInput).toHaveValue(location);

            await searchJobPage.selectLocationFromDropdown(location);
        });

        await test.step('Step 5: Add selected category', async() => {
            await searchJobPage.addJobCategory();
            await expect(searchJobPage.addedJob).toBeVisible();
            await searchJobPage.checkAddedJobInfo(jobCategory, location);
            
        });

        await test.step('Step 6: Sign Up', async() => {
            await searchJobPage.clickSignUpButton();
        });

        await test.step('Step 7: Check confirmation message', async() => {
            await searchJobPage.checkConfirmationMessage(confirmMessage);
        });
    });
});



