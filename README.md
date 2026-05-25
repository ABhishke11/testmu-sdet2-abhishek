# TestMu AI — SDET-2 Quality Engineering Assignment

## Architecture Overview


**Stack:** Playwright · TypeScript · pytest-style fixtures · Allure reporter  
**Test site:** [practicesoftwaretesting.com](https://practicesoftwaretesting.com)  
**API:** [api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com)

---

## Design Decisions

### Why Playwright + TypeScript
- Native cross-browser support (Chromium, Firefox, WebKit) with zero extra setup
- Built-in screenshot, video, and trace on failure — no manual wiring
- `request` fixture allows API calls in the same test file as UI actions, making integration tests clean
- Auto-waiting removes the majority of flakiness at the source

### Why Page Object Model
- No raw selectors leak into test files — all locators live in page classes
- A single locator change in a page class fixes all tests that use it
- `BasePage` provides shared utilities (navigate, waitForLoad, screenshot) inherited by all pages

### Why external test data (JSON)
- Test data is not code — keeping it separate means non-engineers can update scenarios
- `test.each` / `for...of` loops over JSON arrays give data-driven coverage without duplication

### Why Option A (CI Pipeline) over Option B (Analytics Dashboard)
- Tests that nobody runs aren't tests — CI enforces that every PR runs the suite
- GitHub Actions integrates directly with the repo with zero extra infrastructure
- Allure report is published as a CI artifact, visible to the whole team after every run

---

## Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash