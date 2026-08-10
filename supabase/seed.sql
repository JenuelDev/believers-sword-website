-- Optional sample data for local/staging verification of /sermons.
-- Safe to re-run: every insert is ON CONFLICT (slug) DO NOTHING.
-- Run from the Supabase SQL editor, which executes as a superuser and so is
-- not subject to the read-only RLS policy on public.sermons.
--
-- Rows 1-2 should appear on /sermons. Rows 3-4 must NOT appear: that is the
-- point of them. Row 3 proves the `published_at <= now()` half of the policy,
-- row 4 proves the `status = 'published'` half.
--
-- To remove the samples afterwards:
--   delete from public.sermons where slug in (
--     'the-weight-of-grace', 'a-lamp-to-my-feet',
--     'scheduled-not-yet-visible', 'draft-not-yet-visible'
--   );

insert into public.sermons (
    slug, title, subtitle, summary, content, content_format,
    speaker_name, speaker_title,
    series_name, series_part,
    scripture_refs, primary_scripture,
    topics, video_url, thumbnail_url, duration_seconds, transcript,
    status, published_at, preached_at, featured
) values (
    'the-weight-of-grace',
    'The Weight of Grace',
    'What it costs, and why it is still free',
    'Grace is free to receive but it was never cheap to give. A look at what Ephesians means when it calls salvation a gift.',
    E'We use the word grace so often that it has worn smooth. It has become a word we say before meals and print on wall art, and somewhere in the repetition it stopped weighing anything.\n\nPaul does not use it that way. When he writes to the Ephesians he sets grace next to two other words: dead, and alive. That is the range he is working with. Not improvement. Not progress. Death, and then life.\n\nThe gift is free to receive. It was not free to give. Those two facts are not in tension; they are the whole point.\n\nSo the question this passage puts to us is not whether we believe in grace. It is whether we have let it weigh anything.',
    'markdown',
    'Pastor Jenuel Ganawed',
    'Teaching Pastor',
    'Ephesians: Seated in Christ',
    2,
    '[{"book": "Ephesians", "chapter": 2, "verse_start": 1, "verse_end": 10}]'::jsonb,
    'Ephesians 2:1-10',
    array['grace', 'salvation', 'ephesians'],
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    null,
    2520,
    E'Good morning. Please open with me to Ephesians chapter two.\n\nI want to begin where Paul begins, which is not with us at our best.',
    'published',
    now() - interval '6 days',
    (now() - interval '6 days')::date,
    true
), (
    'a-lamp-to-my-feet',
    'A Lamp to My Feet',
    null,
    'Psalm 119 on reading Scripture when the road ahead is only lit one step at a time.',
    E'A lamp in the ancient world lit the next step. Not the horizon, not the whole road, the next step.\n\nThat is worth sitting with, because most of us would prefer a floodlight. We would like to see the whole route before we agree to walk it.\n\nThe psalmist does not promise that. He promises light enough to move.',
    'markdown',
    'Pastor Jenuel Ganawed',
    null,
    null,
    null,
    '[{"book": "Psalms", "chapter": 119, "verse_start": 105}]'::jsonb,
    null,
    array['scripture', 'guidance', 'psalms'],
    null,
    null,
    1980,
    null,
    'published',
    now() - interval '20 days',
    (now() - interval '20 days')::date,
    false
), (
    'scheduled-not-yet-visible',
    'Scheduled: Should Not Be Visible',
    null,
    'If you can see this on /sermons, the published_at clause of the RLS policy is not working.',
    'This row exists only to prove that a future-dated sermon stays hidden.',
    'plain',
    'Test Fixture',
    null, null, null,
    '[]'::jsonb,
    null,
    array['test'],
    null, null, null, null,
    'scheduled',
    now() + interval '60 days',
    null,
    false
), (
    'draft-not-yet-visible',
    'Draft: Should Not Be Visible',
    null,
    'If you can see this on /sermons, the status clause of the RLS policy is not working.',
    'This row exists only to prove that a draft stays hidden.',
    'plain',
    'Test Fixture',
    null, null, null,
    '[]'::jsonb,
    null,
    array['test'],
    null, null, null, null,
    'draft',
    null,
    null,
    false
)
on conflict (slug) do nothing;
