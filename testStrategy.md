# Test Strategy — TestMu AI SDET-2

## What I chose to cover and why

### UI Tests
| Flow | Reason |
|---|---|
| Login — valid/invalid/unknown | Authentication is the entry point to everything; if this breaks, nothing else works |
| Login — field validation | Empty and malformed inputs are the most common user mistakes |
| Dashboard — product load | Core landing experience; a blank dashboard is a P0 bug |
| Dashboard — search | Primary discovery mechanism; broken search = users can't find products |
| Dashboard — sort | Data ordering bugs are subtle and often missed manually |
| Cross-browser smoke | Assignment requirement; catches rendering bugs specific to Firefox/WebKit |

### API Tests
| Endpoint | Coverage |
|---|---|
| POST /users/login | Happy path (200 + token), wrong password (401), missing fields (401/422) |
| GET /products | List response, schema validation, price filter, response time |
| GET /products/:id | 404 for invalid ID |
| Error handling | Unknown endpoints (404), malformed payloads (400/422) |

### Integration Test
One end-to-end flow: fetch a product name via API → search for it in the UI → assert it appears.  
This proves the API and UI are talking to the same data source and both layers work together.

---

## What I'd cover next

- **Cart flow** — add to cart, update quantity, remove item, checkout
- **User registration** — new account creation, duplicate email handling
- **Admin flows** — CRUD for products (requires admin credentials)
- **Negative API flows** — SQL injection attempts, oversized payloads, rate limiting
- **Accessibility** — axe-core integration for WCAG compliance
- **Performance** — k6 load test on `/products` endpoint under concurrent users

---

## Top 3 risks I'd flag to the team

### Risk 1 — Test data isolation
**Problem:** Tests share the same live staging environment. A test that creates or modifies data can leave state that breaks another test running in parallel.  
**Mitigation:** Use unique identifiers (timestamp + random suffix) for any data created during tests. Implement teardown to clean up after each test that writes data.

### Risk 2 — Selector drift
**Problem:** The site uses `data-test` attributes which are stable, but if the front-end team ships without them on new components, tests will break on those elements.  
**Mitigation:** Add a lint rule or PR checklist item requiring `data-test` attributes on all interactive elements. Document the convention in the team wiki.

### Risk 3 — Environment parity
**Problem:** Staging and production can diverge — a bug fixed in prod but not deployed to staging, or a feature in staging not yet in prod, causes false test failures or missed defects.  
**Mitigation:** Run the smoke suite against production after each deploy (read-only tests only). Track environment versions in the CI run metadata.

---

## Improvement plan (priority order)

1. Wire Slack webhook to CI — team gets notified within 2 minutes of a failure
2. Add `storageState` auth — eliminate repeated login overhead across UI tests
3. Quarantine flaky tests — move unstable tests to non-blocking suite, file bugs
4. Schema validation on all API responses — not just products
5. Add k6 performance baseline — establish response time SLAs before they become problems