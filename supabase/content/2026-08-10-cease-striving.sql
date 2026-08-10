-- Editorial content, deliberately NOT in supabase/migrations/: schema
-- migrations should run in every environment, a published article should not.
-- Run from the Supabase SQL editor. Idempotent via ON CONFLICT (slug).
--
-- Two fields worth a decision before or after this goes live:
--   speaker_name  set to 'Believers Sword' as an editorial byline. Change it to
--                 the real preacher if this was actually delivered by someone.
--   preached_at   left NULL on purpose. This was written for the site, not
--                 transcribed from a service, and a date here would assert a
--                 service that did not happen.
--
-- content_format is 'plain' rather than 'markdown' because no markdown renderer
-- is installed yet; the body is written as clean prose so it renders correctly
-- through the paragraph splitter. Switch to 'markdown' once `marked` is added.
--
-- To unpublish:  update public.sermons set status = 'draft' where slug = 'cease-striving';
-- To remove:     delete from public.sermons where slug = 'cease-striving';

insert into public.sermons (
    slug, title, subtitle, summary, content, content_format,
    speaker_name,
    scripture_refs, primary_scripture,
    topics,
    status, published_at, featured,
    meta_description
) values (
    'cease-striving',
    'Cease Striving',
    'What Psalm 46 actually asks of you',
    'Be still, and know that I am God is usually read as an invitation to relax. In context it is a command issued over a battlefield, and that changes what it asks of us.',
    E'You have probably met this verse in soft lettering. Be still, and know that I am God. It arrives on wall art and phone backgrounds, and it is almost always presented as an invitation to slow down. Quiet morning. Cup of coffee. Shoulders dropping.\n\nThen you read the eleven verses around it.\n\nThe earth gives way. Mountains fall into the heart of the sea. The waters roar and foam. Nations are in an uproar and kingdoms fall. God breaks the bow, shatters the spear, and burns the chariots with fire. This is not a quiet room at sunrise. It is a war, and a landscape coming apart, and somewhere in the middle of it a voice says: stop.\n\nThe Hebrew behind be still is harpu, from a root that means to let drop, to release, to slacken. It describes what your hand does when it stops gripping. Some translators render it cease striving. Others, more bluntly, stop fighting. It is not the stillness of someone well rested. It is the stillness of someone who has put the weapon down.\n\nThat distinction matters, because it changes who the verse is talking to. Read as a call to relax, it speaks to the tired. Read as a command to disarm, it speaks to the ones still swinging. And if we are honest, most of us are in the second group more often than the first.\n\nWe know what our striving looks like, even if we would not use that word for it. Rehearsing the argument one more time. Refreshing the page. Drafting the message we are not going to send. Lying awake arranging outcomes we do not control, as though the arranging were a form of control. The exhausting part is rarely the trouble itself. It is the private conviction that we are personally holding the world together, and that if we loosen our grip for one evening it will come apart.\n\nPsalm 46 does not argue with the trouble. Verse one: God is our refuge and strength, a very present help in trouble. Not a help instead of trouble. A help in it. The psalm simply assumes the mountains will move, and does not treat that as a crisis of faith.\n\nWhat it does deny is that the outcome depends on your grip. I will be exalted among the nations, I will be exalted in the earth. That is not phrased as a hope or a possibility. It is stated the way you state something already settled. The stillness is available precisely because the sentence has already been written.\n\nAnd notice what God does with the weapons he takes. He does not hold them for you until things calm down. He breaks the bow. He shatters the spear. He burns the chariots. There is no version of this where you collect your armour on the way out.\n\nSo the invitation turns out to be smaller and harder than relax. It is: name the thing you are gripping. Then open your hand. Not because it does not matter, and not because worrying about it was unreasonable, but because it was never yours to carry, and the one it belongs to has already said how it ends.\n\nSomewhere to start this week. Pick one situation you have been quietly managing in your head. Not the largest one. Just one. Say plainly, out loud if you can: this is not mine to hold. Then leave it there, and pay attention to how quickly your hand goes back for it. That reaching is the exact thing this psalm is speaking to. It is also the thing that, given time and repetition, learns to stop.\n\nBe still. Not because the waters are calm. Because the one who speaks over them is God.',
    'plain',
    'Believers Sword',
    '[{"book": "Psalms", "chapter": 46, "verse_start": 1, "verse_end": 11}]'::jsonb,
    'Psalm 46:1-11',
    array['psalms', 'trust', 'anxiety'],
    'published',
    now(),
    true,
    'Be still, and know that I am God is usually read as an invitation to relax. Psalm 46 issues it over a battlefield. A closer look at what the verse actually asks.'
)
on conflict (slug) do nothing;
