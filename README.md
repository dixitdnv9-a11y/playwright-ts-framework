# Playwright Enterprise Framework 2026 - with CI/CD

Production-grade E2E framework for automationexercise.com - 26 Test Cases, Parallel Execution, CI/CD Ready.

## 🚀 Architecture (2026 Market Standard)

```
src/
├── core/BasePage.ts          # Base abstraction - safeClick, logger, ad handling
├── pages/*                    # All extend BasePage
├── components/*               # Reusable (Header, CartModal)
├── data/user.factory.ts       # Centralized faker factory (no duplication)
├── fixtures/                  # Split fixtures composition
├── constants/                 # URLs, Messages
├── utils/                    # ad-blocker, env, logger
└── api/                      # API layer for fast setup

tests/
├── setup/auth.setup.ts       # StorageState reuse
└── e2e/
    ├── auth.spec.ts          # TC01-06
    ├── products.spec.ts      # TC07-13, TC17-22
    ├── order.spec.ts         # TC14-16, TC23-24
    └── ui.spec.ts            # TC25-26
```

## ✅ Why Enterprise?

| Before (Your Old) | After (2026) |
|-------------------|--------------|
| `workers=1`, 15min | `workers=4`, ~4min, sharding |
| `generateUserData()` in each file | `UserFactory.create()` central |
| `waitForTimeout(1000)` | Web-first assertions, `attached` state |
| No BasePage | BasePage with safeClick fallback |
| One giant fixture file | Split fixtures + spread merge |
| No CI/CD | GitHub Actions + Docker |

## 🔧 Setup

```bash
npm ci
npx playwright install --with-deps
cp .env.example .env
```

## 🧪 Run

```bash
npm run test:smoke        # @smoke tagged
npm run test:regression   # @regression
npm run test:parallel     # 4 workers
npm run test:ci            # CI mode with junit + html
```

## 🔄 CI/CD Pipelines

### GitHub Actions - 3 Workflows Included

1. **ci.yml** - Main CI
   - Trigger: push to main/develop, PR, manual
   - Lint + TypeCheck
   - Sharded tests (shard 1/2, 2/2) for 2x parallel
   - Upload HTML + JUnit artifacts
   - Merge reports
   - Smoke on main

2. **pr.yml** - PR Checks
   - Smoke only for fast feedback
   - Comments PR

3. **nightly.yml** - Nightly Regression
   - Cron 2AM UTC
   - Full regression with retries
   - Allure results

### Artifacts

- `playwright-report/` - HTML report (7 days)
- `test-results/junit.xml` - JUnit for dashboards
- `allure-results/` - Allure for history

### Docker

```bash
npm run docker:build
npm run docker:test
```

Dockerfile uses `mcr.microsoft.com/playwright:v1.52.0-jammy`

### Environment Matrix

- `.env.example` -> `.env`
- `BASE_URL` override per env
- `WORKERS`, `RETRIES` env-driven
- `CI=true` auto-enables retries=2, trace on-first-retry

### Quality Gates

- `npx tsc --noEmit` in CI
- No `waitForTimeout` allowed (future eslint rule)
- Parallel safe - no shared state

## 📊 Reports

```bash
npm run report          # HTML
npm run report:allure   # Allure
```

## 🔑 Key Fixes for Your Previous Failures

- TC18 Tshirts hidden: `waitFor({state:'attached'})` + `evaluate(click)`
- TC20 timeout: `test.setTimeout(120000)` + `cartModal.continueShopping()`
- TC22 View Cart: `cartModal.viewCart()` not raw locator

## 🚀 Deploy CI/CD

1. Push to GitHub
2. Actions auto-run
3. Check Artifacts tab for reports
4. Enable branch protection requiring CI pass

## 📦 Scripts

- `test:shard` - for CI sharding: `npm run test:shard -- 1/2`
- `clean` - removes test-results, .auth
- `prepare:ci` - installs playwright deps in CI
