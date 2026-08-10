-- Run this before publishing real content.
--
-- supabase/seed.sql was written as local verification data and was not meant for
-- production. Two of its rows are currently live and publicly readable:
--
--   the-weight-of-grace   attributes a sermon to 'Pastor Jenuel Ganawed' with a
--                         'Teaching Pastor' title, an invented preached_at date,
--                         an invented series ('Ephesians: Seated in Christ'), and
--                         a video_url pointing at an unrelated YouTube video.
--   a-lamp-to-my-feet     same invented attribution and preached_at date.
--
-- None of that is true, and it is published under a real person's name.
--
-- The other two fixture rows were never publicly visible (the RLS policy hid
-- them, which was their purpose) but they should come out too.

delete from public.sermons
where slug in (
    'the-weight-of-grace',
    'a-lamp-to-my-feet',
    'scheduled-not-yet-visible',
    'draft-not-yet-visible'
);

-- Alternative, if you would rather keep those two bodies of text and correct
-- them instead of deleting. Run this INSTEAD of the delete above, not after it.
--
-- update public.sermons
-- set speaker_name = 'Believers Sword',
--     speaker_title = null,
--     preached_at = null,          -- no service took place
--     video_url = null,            -- the URL was a placeholder, not a recording
--     series_name = null,
--     series_part = null
-- where slug in ('the-weight-of-grace', 'a-lamp-to-my-feet');
--
-- delete from public.sermons
-- where slug in ('scheduled-not-yet-visible', 'draft-not-yet-visible');
