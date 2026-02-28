import { test, expect } from '@fixtures/base';

/**
 * [Home Page Movie UI Verification]
 *
 * PURPOSE:
 * Verify that a guest user can see the footer inc. message.
 *
 * COVERAGE:
 * - Footer visibility and content validation
 *
 * PRECONDITION:
 * Guest user opens the IMDb Home page.
 *
 * CASES: 
 * Automation_Script_3.1: Verify that footer has corporate copyright text.
 * *Expected*: The footer displays the correct corporate copyright information.
 *
 * Author: Mykhailiuk Vitaliy (Senior Automation QA)
 */

test.describe('Home Page - Movie UI Verification', {
    tag: ['@smoke', '@high-level', '@home', '@P1'],
}, () => {
    test.beforeEach(async ({ home }) => {
        await test.step('Navigate to IMDb Home page', async () => {
            await home.goto();
        });
    });

    test('should display correct footer copyright text', async ({ home }) => {
        await test.step('Verify the footer displays the correct corporate copyright information', async () => {
            await expect(home.footer.footerContainer).toBeVisible();
            await expect(home.footer.copyright).toContainText('by IMDb.com, Inc.');
        });
    });
});