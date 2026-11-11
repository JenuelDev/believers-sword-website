# AdSense readiness audit

Audit date: November 11, 2026. Site: https://www.believersword.com.

Assessment: address the confirmed advertising privacy disclosure gap and the content quality risks below before requesting another review. This audit cannot establish Google's internal reason for rejecting the site, certify compliance, or guarantee approval. The reported rejection is low value content. The privacy issue is a separate finding.

## Scope and verified results

Read the current official Google policies, inspected the repository, and fetched the production HTML for the primary public pages and every sermon linked from `/sermons`. Inspected article text and compared repeated topics and outlines. Browser rendering was unavailable, so mobile layout, filled ad appearance, and regional consent behavior were not verified.

- All 55 linked sermon pages returned HTTP 200 and contained written content in the server response.
- All 55 appeared in the live sitemap, which contained 65 URLs total.
- Missing sermon and general page probes returned HTTP 404.
- Home, About, Downloads, Mobile, Screenshots, Privacy, Terms, Refunds, and Delete Account loaded successfully.
- The production ads.txt publisher ID matched the ad component: `pub-2268807726840190`.
- AdSense loading was confined to sermon detail pages in the inspected code and HTML. The unit has an Advertisement label. Other inspected pages did not include the loader.
- The About page identifies the developer, and the Privacy page provides a contact email.

These are useful operational foundations. They do not establish content quality, traffic quality, or approval eligibility.

## Findings, in priority order

### 1. Confirmed gap: Google advertising privacy disclosures

The [live Privacy page](https://www.believersword.com/privacy-policy) explains generic cookies, but does not explain Google's advertising cookies, personalized advertising, or advertising opt-out options. Its displayed update date is June 25, 2025. The corresponding source is `app/pages/privacy-policy.vue`.

Add accurate disclosures about Google and other applicable advertising vendors, the data and technologies used for ad serving, personalization where applicable, and opt-out links. Match the wording to the actual AdSense settings. Google explicitly describes the [required privacy policy content](https://support.google.com/adsense/answer/1348695?hl=en), and its [Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en) also require clear disclosure of advertising-related data collection, sharing, and use.

This is a concrete policy gap, but is not evidence that privacy caused the low value rejection.

### 2. Strong quality risk: overlapping sermons

The following pairs repeat substantially the same teaching progression, rather than merely sharing a Bible passage:

| Articles | Observed overlap | Recommended action |
|---|---|---|
| [The Snake They Had to Look At](https://www.believersword.com/sermons/the-snake-they-had-to-look-at) and [Look at the Thing That Bit You](https://www.believersword.com/sermons/look-at-the-thing-that-bit-you) | Both move from the desert complaint to snakes remaining, the snake-shaped cure, looking in faith, and the object later becoming an idol. | Choose a principal article and consider merging useful material. Retain both only if their reader purpose becomes clearly distinct. |
| [The Journey Is Too Great for You](https://www.believersword.com/sermons/the-journey-is-too-great-for-you) and [The Angel Let Him Sleep](https://www.believersword.com/sermons/the-angel-let-him-sleep) | Both cover victory followed by collapse, food and sleep, the quiet encounter, the repeated answer, and correction through a task and the remaining faithful people. | Review together with the shorter [The Whisper Was Not the Point](https://www.believersword.com/sermons/the-whisper-was-not-the-point). Consolidate repetition or develop genuinely different purposes. |

The Ruth articles about the unnamed redeemer also deserve an editorial comparison. Repeated topics are allowed. The concern here is limited additional value between pages, not a finding that all similar content violates policy. Google's [readiness guidance](https://support.google.com/adsense/answer/7299563?hl=en) emphasizes original, relevant content that gives visitors a reason to engage.

### 3. Review six short articles individually

Article paragraph counts, excluding titles, metadata, summaries, and navigation:

| Article | Approximate words |
|---|---:|
| [Arriving Together](https://www.believersword.com/sermons/arriving-together) | 429 |
| [Out of the Depths](https://www.believersword.com/sermons/out-of-the-depths) | 446 |
| [The Whisper Was Not the Point](https://www.believersword.com/sermons/the-whisper-was-not-the-point) | 456 |
| [Not From the Hills](https://www.believersword.com/sermons/not-from-the-hills) | 429 |
| [He Was Asleep](https://www.believersword.com/sermons/he-was-asleep) | 406 |
| [Where the Climb Starts](https://www.believersword.com/sermons/where-the-climb-starts) | 425 |

All six load AdSense. The other 49 bodies measured approximately 1,486 to 1,784 words, including quotations and headings.

Shortness alone is not a violation. Assess whether each article sufficiently explains its passage and provides a useful, distinct reflection. Improve missing substance, merge overlap, or remove ads from material that is not ready. Do not pad articles to reach a number. Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) explicitly rejects the idea of a preferred word count.

### 4. Editorial accountability needs clearer public explanation

The inspected samples use the organizational byline Believers Sword. The About page explains who builds the app, but does not explain who writes or checks the sermons, how historical and language claims are verified, which Bible translations are quoted, or how readers can request corrections.

The repository contains an automated sermon creation and publishing workflow in `.claude/daily-sermon-cron-prompt.txt`. Its instructions request originality and readability, but the workflow does not establish that a human reviewed a published article. Do not claim a review that did not happen.

Publish an accurate explanation of the actual editorial process and any substantial use of automation where readers would reasonably expect it. Establish a real review process, verify quotations and their permitted use, and support historical or original-language claims with identifiable sources. The sampled long articles contained Bible references but no external source links in their article bodies.

Automation itself is not proof of a violation. Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content) address large-scale content produced to manipulate rankings without sufficient value.

### 5. The main website offers limited depth beyond promotion

The main content of Home measured approximately 195 words, Downloads 100, Mobile 71, and Screenshots 10. These pages serve legitimate product and navigation purposes and do not load ads in the inspected responses. They are not automatically prohibited pages.

However, readers have little practical product guidance on the site itself. Consider useful guides based on verified app behavior, such as installing a translation for offline use, comparing translations, or managing notes. Add explanatory screenshot captions and contextual routes into relevant reading. These are quality improvements, not mandatory page types or guaranteed approval fixes.

### 6. Consent configuration remains unverified

No explicit CMP integration or consent gate was found in the repository. Google can deliver consent functionality through account configuration, so that absence does not prove the live account has no CMP.

Verify AdSense Privacy & messaging settings and behavior for EEA, UK, and Swiss visitors against Google's [consent management requirements](https://support.google.com/adsense/answer/13554116?hl=en-GB). A generic cookie banner does not establish that a certified CMP is configured correctly.

### 7. Future risk: ads on empty sermon records

`app/pages/sermons/[slug].vue` renders `SermonAd` unconditionally, including the branch where the page can say the written text is unavailable. No empty sermon was observed in the 55 live pages.

Add an editorial readiness condition before loading ads on incomplete records. Evaluate useful written content and any real recording; do not treat a title or short summary alone as sufficient. This is a preventive finding grounded in the Publisher Policies' restriction on ads against absent or low-value publisher content.

## Before resubmission

1. Correct the advertising privacy disclosures and verify regional consent configuration.
2. Review the overlapping articles and six short pieces. Prefer meaningful revision and consolidation over publishing more similar pages.
3. Make the actual editorial responsibility and process clear. Verify claims, quotations, and permissions.
4. Improve practical guidance and discovery where it serves actual readers.
5. Check Search Console indexing and traffic data for discovery, returning readers, and legitimate acquisition sources. Public HTML cannot establish sustained genuine interest or invalid traffic. No arbitrary traffic target is established by this audit.
6. Deploy and verify the actual improvements before confirming that issues are fixed in AdSense.

No application code, database content, AdSense settings, or review request was changed during this audit.
