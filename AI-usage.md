# AI Usage Log

Per the assessment guidelines, every AI tool interaction is logged here.  
AI was used freely as a productivity tool. All architecture decisions, locator choices,  
and debugging were owned by the engineer.

---

## Tool: Claude (Anthropic)

### Interaction 1
**Task:** Framework architecture design — folder structure, layer separation, stack selection  
**Prompt:** Asked Claude to help design a Playwright + TypeScript framework for a test management platform with UI, API, and integration tests  
**Output:** Folder structure scaffold, layer diagram (pages / api / utils / tests), stack comparison matrix  
**What I changed:** Adapted folder names to match assignment requirements, chose `practicesoftwaretesting.com` as the test site, removed suggested Python options since TypeScript was chosen

### Interaction 2
**Task:** Generate `BasePage.ts`, `LoginPage.ts`, `DashboardPage.ts`, `ProductPage.ts`  
**Prompt:** Asked Claude to write Page Object classes using Playwright locators and TypeScript  
**Output:** Initial class skeletons with `getByTestId` locators  
**What I changed:** Discovered the site uses `data-test` not `data-testid`. Fixed `playwright.config.ts` to set `testIdAttribute: 'data-test'`. Updated `expectLoginSuccess` to use URL assertion instead of nav element, after inspecting actual post-login DOM behaviour

### Interaction 3
**Task:** Generate API test files for auth, products, and error handling  
**Prompt:** Asked Claude to write API tests using Playwright's `request` fixture against the practice site API  
**Output:** Test files with status code assertions and response time checks  
**What I changed:** Fixed status code expectations after running actual tests — the API returns 401 (not 422) for empty credentials. Updated assertions to use `toContain` with an array of acceptable codes

### Interaction 4
**Task:** Generate `fixtures.ts` with custom Playwright fixture extensions  
**Prompt:** Asked Claude to create a typed fixture file extending Playwright's base test  
**Output:** `fixtures.ts` with `loginPage`, `dashboardPage`, `productPage`, and `loggedInPage` fixtures  
**What I changed:** Simplified the type definitions, removed unused type alias that caused a TypeScript error

### Interaction 5
**Task:** Generate GitHub Actions CI pipeline  
**Prompt:** Asked Claude to write a GitHub Actions workflow that installs, runs tests, and uploads the Allure report  
**Output:** `playwright.yml` with install, test, and upload steps  
**What I changed:** Added Allure report generation step, adjusted Node version to 20, added `continue-on-error` on test step so report uploads even on failure

### Interaction 6
**Task:** Write `README.md`, `test-strategy.md`, and `ai-usage-log.md`  
**Prompt:** Asked Claude to draft documentation matching the assessment submission requirements  
**Output:** Full markdown documents for all three files  
**What I changed:** Updated risk descriptions to reflect actual issues encountered during the assignment (selector drift, data-test attribute mismatch), personalised the "what I'd build next" section based on gaps observed while writing tests

---

## Summary

| Tool | Tasks | Owned by engineer |
|---|---|---|
| Claude | Architecture, code generation, documentation | Debugging, locator fixes, assertion corrections, design decisions |

All generated code was run, tested, and debugged. Lines that failed were investigated and fixed independently. Claude was used to accelerate scaffolding, not to substitute engineering judgment.