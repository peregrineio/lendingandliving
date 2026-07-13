
---
### [2026-07-13] Ad-hoc: 13 Daisy-requested blog posts converted to publishable MDX (NOT yet pushed)
**Trigger:** Sam approved my review of daisysrequestedblogs/*.docx ("run the changes then we can add")
**What changed from the source docs (compliance + accuracy pass):**
- Stripped specific rate/payment quotes (Reg Z trigger-term exposure) → genericized
- Corrected loan limits to the SITE'S 2026 figures (FHA Harris Co $541,287, conforming $832,750 — docs had stale 2025 numbers that contradicted the v5/v6 site corrections)
- MCC program described conditionally ("ask about current availability")
- Buy-now-or-wait post rebuilt as honest framework: "date the rate" softened to may-refinance-if-you-qualify, no appreciation projections, values-can-fall disclaimer
- Every post: Daisy byline + NMLS #2592627 + Equal Housing + not-a-commitment-to-lend footer, ES title/description frontmatter (EN body), Houston-aware CTAs (/contact, 832-894-7676), 2–4 internal links to service pages/calculators/related posts, cross-link (not competition) to existing Houston DPA guide
**Files:** 13 new src/content/blog/*.mdx + blogImages map entries in blog-types.ts (images REUSED from existing library — unique art is a later nice-to-have)
**Verified:** tsc 0, build 0 errors, all 13 routes 200 + index 200; sweeps clean: no stale limits/2025 refs, no N.N% rate quotes, no guarantee language, NMLS on 13/13
**Suggested publish drip:** A) afford, credit-score, prequal-vs-preapproval, FHA-vs-conventional, VA → B) TX programs, offer-to-closing, how-long-close, buy-now-or-wait → C) the 4 self-employed/co-borrower/job-loss posts
**QA (pre-push):** spot-read 3 posts for voice; verify internal links resolve; confirm Daisy approves content (esp. buy-now-or-wait) before publishing
