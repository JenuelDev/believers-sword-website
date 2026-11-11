# AdSense cleanup and release checks

This work addresses specific policy gaps and quality concerns. It does not establish AdSense approval or justify confirming all issues fixed before the remaining checks are complete.

## Content decisions

- Revise five short pieces as focused reflections. Keep them concise, accurate, and free of ads. Their source files identify the World English Bible and link to its publisher. The 1,200 to 1,800 word sermon target is not used to pad these existing short reflections.
- Preserve original publication dates during updates. Record the five known editorial revision dates separately because the old database trigger also changed `updated_at` for page views.
- Retain `the-snake-they-had-to-look-at` as the fuller Numbers 21 article. Redirect `look-at-the-thing-that-bit-you` to it.
- Retain `the-journey-is-too-great-for-you` as the fuller Elijah article. Redirect `the-angel-let-him-sleep` and `the-whisper-was-not-the-point` to it.
- Archive the three retired database records only after the redirects are deployed and verified. Their source copies are retained under `content/sermons/archive/`. The pre-change database snapshot is ignored by Git at `.data/adsense-review/sermons-before.json`.
- Other older articles still need quotation attribution and substantive editorial review. The public editorial policy says this plainly and makes no claim of independent human review.

The short reflections correct unsupported claims about Psalm 121's hills, the end of the Songs of Ascents, the watchman's feelings in Psalm 130, and assumptions about an unnamed psalmist's exact journey. Each now distinguishes the passage, interpretation, and practical response.

## Publishing pause

`content/publishing-policy.json` pauses new live publishing. `scripts/post-sermon.mjs` refuses published or scheduled writes while paused, before opening a database connection. Draft writes remain available. The recurring prompt in `.claude/daily-sermon-cron-prompt.txt` instructs scheduled runs to stop.

`--update --maintenance` permits intentional revisions to existing records only. It cannot create a new slug. This is a publishing workflow gate, not a security boundary against another privileged database client. No external scheduler was identified or disabled; the configured prompt and repository publisher are what enforce the pause here.

Resume only at the owner's explicit instruction. Resuming the schedule should prepare drafts for editorial review rather than automatically publish new material.

## Website changes

- Google advertising privacy disclosures and opt-out links.
- An editorial policy describing responsibility, AI assistance, attribution, and corrections.
- Three desktop guides: offline reading, comparison panes, and study notes.
- Real screenshots with explanatory captions and useful links from Home, Downloads, the header, and sermon pages.
- Shared redirect rules, retired-slug filtering in the listing and sitemap, and sitemap entries for the three guide URLs.
- Ads disabled by default through `runtimeConfig.public.adsenseEnabled`. A missing, empty, or false setting must not request ads. Explicit activation uses `NUXT_PUBLIC_ADSENSE_ENABLED=true`.
- Even after activation, the five short reflections and retired URLs remain ineligible for ads. Empty writing, markup-only content, and a summary without a body are also ineligible.
- The publisher verification meta tag and ads.txt remain available while ad serving is paused. Google documents these verification methods at https://support.google.com/adsense/answer/7584263.

## Guide evidence

The guides were checked against the adjacent Believers-Sword desktop app source, including BibleSetting.vue, DownloadBibles.vue, BibleVersionPickerModal.vue, ViewVerses.vue, BottomPanel.vue, and useNoteStore.ts. This is source review, not a claim of hands-on testing of every released build. Captions identify the existing screenshots as earlier layouts. Browser and Android controls are not presented as identical to the desktop controls.

## Checks

1. `pnpm test` exercises ad eligibility, empty content, retired URLs, short reflections, and the publishing pause.
2. `pnpm build` must pass before deployment.
3. `pnpm sermon:post --dry-run` validates the five revised sources and three archives.
4. Apply the timestamp migrations through `pnpm db:sql`. The second migration excludes PostgreSQL's generated search vector, which is not populated in a BEFORE trigger's NEW row.
5. `node scripts/check-sermon-timestamps.mjs` verifies the live trigger with all test changes rolled back.
6. Verify the five revisions through the public API and live HTML, and compare their original publication dates with the backup.
7. Verify guide and editorial URLs, canonical tags, server-rendered content, no ad loader while paused, missing-page 404s, sitemap membership, and the three permanent redirects.
8. After redirect deployment, archive the three retired sources using `pnpm sermon:post --update --maintenance content/sermons/archive/<slug>.md` and check that public reads exclude them.

## Owner account checks before another review

The browser integration could not open the signed-in browser because app access approval timed out. No AdSense or Search Console account settings were changed.

- In AdSense Privacy & messaging, configure or confirm the applicable certified CMP and messages for EEA, UK, and Switzerland traffic. Verify actual consent and withdrawal behavior before activating advertising. Do not substitute an ordinary cookie banner for a certified CMP.
- Review the participating ad technology providers and ensure the privacy information matches the account's actual settings.
- Check genuine user acquisition, returning readers, and indexing in Analytics and Search Console. There is no invented traffic target or waiting period here.
- Complete the remaining editorial checks, including Bible quotation attribution and permissions for older articles.
- If enabling ads later, update the public statements that advertising is paused, deploy with the explicit enable setting, and verify ad placement and regional consent behavior.
- Request another AdSense review only after the production improvements and account checks are complete. Do not submit the review automatically as part of this cleanup.
