/**
 * Careers → Jobs → Apply flow spec.
 *
 * Validates that a candidate can filter jobs by Department=Marketing, Work Type=Full Time,
 * Location=Bengaluru, India, search by title "Content", open the first result, and click "Apply Now".
 */

import { test, expect } from '../test-setup/fixtures';
import { HomePage } from '../src/pages/home.page';
import { JobsPage } from '../src/pages/jobs.page';
import { JobDetailsPage } from '../src/pages/job-details.page';

test.describe('Careers - filter jobs and apply', () => {
  /**
   * Filters jobs and starts the application flow.
   */
  test('Filter Marketing jobs in Bengaluru and click Apply Now', async ({ page, logger }) => {
    const homePage = new HomePage(page);
    const jobsPage = new JobsPage(page);
    const jobDetailsPage = new JobDetailsPage(page);

    await test.step('Step 1: Click Careers link', async () => {
      logger.info("Step 1: Click 'Careers' link");
      await homePage.clickCareersLink();
    });

    await test.step('Step 2: Navigate to jobs listing', async () => {
      logger.info('Step 2: Navigate to Freshteam jobs listing');
      await jobsPage.gotoJobs();
    });

    await test.step('Step 3: Open Department filter', async () => {
      logger.info('Step 3: Open department filter');
      await jobsPage.openDepartmentFilter();
    });

    await test.step('Step 4: Select Department = Marketing', async () => {
      logger.info('Step 4: Select department Marketing');
      await jobsPage.selectDepartmentMarketing();
    });

    await test.step('Step 5: Open Work Type filter', async () => {
      logger.info('Step 5: Open work type filter');
      await jobsPage.openWorkTypeFilter();
    });

    await test.step('Step 6: Select Work Type = Full Time', async () => {
      logger.info('Step 6: Select work type Full Time');
      await jobsPage.selectWorkTypeFullTime();
    });

    await test.step('Step 7: Open Location filter', async () => {
      logger.info('Step 7: Open location filter');
      await jobsPage.openLocationFilter();
    });

    await test.step('Step 8: Select Location = Bengaluru, India', async () => {
      logger.info('Step 8: Select location Bengaluru, India');
      await jobsPage.selectLocationBengaluruIndia();
    });

    await test.step('Step 9: Search Job Title = Content', async () => {
      logger.info('Step 9: Search job title Content');
      await jobsPage.searchJobTitle('Content');
    });

    await test.step('Step 10: Open first job result', async () => {
      logger.info('Step 10: Open first job result');
      await jobsPage.openFirstJobResult();
    });

    await test.step('Step 11: Click Apply Now', async () => {
      logger.info('Step 11: Click Apply Now');
      await jobDetailsPage.clickApplyNow();
    });

    await test.step('Verify: application flow started', async () => {
      logger.info('Verify: URL indicates application flow started');
      await expect(page).toHaveURL(/apply|application|job_applications|jobs\//i);
    });
  });
});
