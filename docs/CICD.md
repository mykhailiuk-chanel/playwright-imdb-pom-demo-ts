# CI/CD Pipeline Documentation

## Overview

This project demonstrates **enterprise-grade parallel test execution** using GitHub Actions. The pipeline showcases both:

1. **Local Parallelism** - Playwright workers (defined in `playwright.config.ts`)
2. **CI/CD Parallelism** - Multiple jobs running on separate machines

---

## Parallel Execution Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions Workflow                    │
│                                                              │
│  ┌──────────────────┐        ┌──────────────────┐          │
│  │   🏠 home-tests  │        │ ⭐ top-rating-tests│          │
│  │   (Machine 1)    │        │   (Machine 2)    │          │
│  │                  │        │                  │          │
│  │ • tests/home/    │        │ • topRating.spec │          │
│  │ • Browser title  │        │ • Top 250 Movies │          │
│  │ • Search flow    │        │ • Movie details  │          │
│  └────────┬─────────┘        └────────┬─────────┘          │
│           │                           │                    │
│           └───────────┬───────────────┘                    │
│                       │                                     │
│              ┌────────▼────────┐                          │
│            │ 📊 aggregate-results│                        │
│            │   (Final Report)    │                        │
│              └─────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Jobs Configuration

### Job 1: Home Page Tests (`home-tests`)

**Purpose:** Validate home page functionality including browser title and search

**Command:**
```bash
npx playwright test --grep @job1 --reporter=list,json
```

**Tests Included:**
- ✅ `should display correct browser title`

---

### Job 2: Top Rating Tests (`top-rating-tests`)

**Purpose:** Validate Top 250 Movies page functionality

**Command:**
```bash
npx playwright test --grep @job2 --reporter=list,json
```

**Tests Included:**
- ✅ `topRating page should have more than 1 film`

---

### Job 3: Results Aggregation (`aggregate-results`)

**Purpose:** Collect and summarize results from both parallel jobs

**Dependencies:**
- Runs only after `home-tests` AND `top-rating-tests` complete
- Uses `needs` keyword for job orchestration
- Generates final status and PR comments

---

## ⚡ Performance Benefits

### Sequential Execution (Traditional)
```
Home Tests (10 min) → Top Rating Tests (10 min) = 20 minutes total
```

### Parallel Execution (This Pipeline)
```
Home Tests (10 min) ──┐
                      ├──→ Aggregate (1 min) = 11 minutes total
Top Rating (10 min) ──┘
                      
Time Saved: ~45% (9 minutes)
```

---

## Required GitHub Secrets

Configure these in your repository settings (`Settings → Secrets → Actions`):

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `BASE_URL` | Target website URL (e.g., https://www.imdb.com) | ✅ Yes |

---

## Customization Options

### Adding More Parallel Jobs

To add a new test suite in parallel:

```yaml
new-feature-tests:
  name: New Feature Tests
  runs-on: ubuntu-latest
  steps:
    # ... setup steps ...
    - name: Run new feature tests
      run: npx playwright test tests/new-feature/ --reporter=list
```

Then add to `needs` in aggregate-results:
```yaml
aggregate-results:
  needs: [home-tests, top-rating-tests, new-feature-tests]
```

### Using Matrix Strategy

For cross-browser parallel execution:

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
    shard: [1/3, 2/3, 3/3]

steps:
  - name: Run tests
    run: npx playwright test --project=${{ matrix.browser }} --shard=${{ matrix.shard }}
```

---

## Debugging Failed Runs

### 1. Check Job Logs
- Navigate to Actions tab in GitHub
- Select the failed workflow run
- Click on the specific job that failed

### 2. Download Artifacts
- Failed jobs automatically upload:
  - Screenshots
  - Traces
  - Videos
  - HTML reports

### 3. Local Reproduction
```bash
# Run the same command locally
npx playwright test tests/home/ --reporter=list

# Or with debug mode
npx playwright test tests/home/ --debug
```

---

## Best Practices Demonstrated

1. **Separation of Concerns:** Each job has a single responsibility
2. **Fail Fast:** Jobs run in parallel, failures don't block others
3. **Artifact Management:** Test outputs preserved for 7 days
4. **Environment Isolation:** Each job has fresh environment
5. **Conditional Logic:** Artifacts only uploaded on failure
6. **Status Aggregation:** Final job determines overall pipeline status
7. **Documentation:** Inline comments explain each step
8. **Input Validation:** Manual triggers include input options

---

## Learning Outcomes

This CI/CD pipeline demonstrates:

- ✅ **Parallel Execution:** Jobs run simultaneously on different machines
- ✅ **Scalability:** Easy to add more parallel jobs
- ✅ **Reliability:** Isolated environments prevent cross-test pollution
- ✅ **Observability:** Comprehensive reporting and artifact collection
- ✅ **Maintainability:** Clear structure and documentation
- ✅ **Security:** Proper secrets management

---

## Support

For questions about the CI/CD pipeline:
1. Check the workflow file: `.github/workflows/playwright-parallel.yml`
2. Review GitHub Actions documentation
3. Examine the job logs for specific error messages

---

**Author:** Senior AQA Engineer  
**Last Updated:** 2026  
**Version:** 1.0.0
