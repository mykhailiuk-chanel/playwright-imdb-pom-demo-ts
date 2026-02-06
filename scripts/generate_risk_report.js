const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve(__dirname, '../test-results');
const reportFile = path.join(resultsDir, 'report.json');
const riskReportFile = path.join(resultsDir, 'risk-report.json');

function generateRiskReport() {
  if (!fs.existsSync(reportFile)) {
    console.error('❌ report.json not found');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
  const failedTests = [];

  for (const rootSuite of report.suites || []) {
    traverseSuites(rootSuite, failedTests);
  }

  const hasHighLevelFailure = failedTests.some(test =>
    test.tags.includes('high-level')
  );

  const riskReport = {
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

function traverseSuites(suite, failedTests) {
  for (const spec of suite.specs || []) {
    const hasFailedResult = spec.tests.some(test =>
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
