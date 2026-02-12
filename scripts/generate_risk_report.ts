import * as fs from 'fs';
import * as path from 'path';

// Type definitions for Playwright report structure
interface TestResult {
  status: string;
}

interface Test {
  results: TestResult[];
}

interface Spec {
  title: string;
  id: string;
  tags?: string[];
  file: string;
  tests: Test[];
}

interface Suite {
  specs?: Spec[];
  suites?: Suite[];
}

interface PlaywrightReport {
  suites?: Suite[];
}

interface FailedTest {
  title: string;
  testId: string;
  tags: string[];
  file: string;
}

interface RiskReport {
  overallRisk: string;
  recommendation: string;
  failedTests: FailedTest[];
  summary: {
    totalFailed: number;
    highLevelFailed: number;
  };
  generatedAt: string;
}

const resultsDir: string = path.resolve(__dirname, '../test-results');
const reportFile: string = path.join(resultsDir, 'report.json');
const riskReportFile: string = path.join(resultsDir, 'risk-report.json');

function generateRiskReport(): void {
  if (!fs.existsSync(reportFile)) {
    console.error('❌ report.json not found');
    process.exit(1);
  }

  const report: PlaywrightReport = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
  const failedTests: FailedTest[] = [];

  for (const rootSuite of report.suites || []) {
    traverseSuites(rootSuite, failedTests);
  }

  const hasHighLevelFailure: boolean = failedTests.some(test =>
    test.tags.includes('high-level')
  );

  const riskReport: RiskReport = {
    overallRisk: hasHighLevelFailure ? '🚨 HIGH' : '🟢 LOW',
    recommendation: hasHighLevelFailure
      ? '🔁 Immediate rerun required (high-level scenario failed)'
      : '✅ Rerun optional (no high-level failures)',
    failedTests,
    summary: {
      totalFailed: failedTests.length,
      highLevelFailed: failedTests.filter(t =>
        t.tags.includes('high-level')
      ).length,
    },
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(riskReportFile, JSON.stringify(riskReport, null, 2));
  console.log('📊 Risk report generated:', riskReportFile);
}

function traverseSuites(suite: Suite, failedTests: FailedTest[]): void {
  for (const spec of suite.specs || []) {
    const hasFailedResult: boolean = spec.tests.some(test =>
      test.results.some(r => r.status === 'failed')
    );

    if (hasFailedResult) {
      failedTests.push({
        title: spec.title,
        testId: spec.id,
        tags: spec.tags || [],
        file: spec.file,
      });
    }
  }

  for (const child of suite.suites || []) {
    traverseSuites(child, failedTests);
  }
}

generateRiskReport();

export { generateRiskReport };