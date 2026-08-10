-- Initial sermon catalog: a 4-part series ('Songs of Ascent') plus 3 standalones.
-- Run from the Supabase SQL editor. Idempotent via ON CONFLICT (slug).
--
-- RUN supabase/content/remove-seed-fixtures.sql FIRST if you have not already.
-- The seed fixtures are still publicly live otherwise.
--
-- Field decisions, so none of this is silent:
--   speaker_name   'Believers Sword' throughout. These were written for the
--                  site, so no individual is credited with preaching them.
--   preached_at    NULL throughout. No service took place.
--   duration_seconds NULL throughout. There is no recording, so a duration
--                  would be fiction. The card simply omits it.
--   video/audio/thumbnail  NULL. Placeholder media URLs would just 404.
--   published_at   Staggered across the past five weeks so the listing looks
--                  established rather than dumped in one batch. This is a
--                  display choice, not a real publication history. To make the
--                  dates literal instead, replace every
--                  `now() - interval '...'` below with plain `now()`.
--   content_format 'plain'. No markdown renderer is installed yet, so the
--                  bodies are written as prose with no markup to leak.

insert into public.sermons (
    slug, title, subtitle, summary, content, content_format,
    speaker_name,
    series_name, series_part,
    scripture_refs, primary_scripture,
    topics,
    status, published_at, featured,
    meta_description
) values

-- ── Songs of Ascent, Part 1 ────────────────────────────────────────────────
(
    'where-the-climb-starts',
    'Where the Climb Starts',
    'Psalm 120 and the honest starting point',
    'The pilgrim songs do not open at the gates of Jerusalem. They open in distress, among people who are not telling the truth, a long way from home.',
    E'The Songs of Ascent are Psalms 120 through 134, and they were sung on the road. Pilgrims walking up toward Jerusalem for the festivals sang them in order, and the order matters.\n\nYou would expect a collection like that to open with anticipation. Something about the city, or the temple, or the gladness of going. Instead Psalm 120 opens like this: I call on the LORD in my distress, and he answers me. Save me, LORD, from lying lips and from deceitful tongues.\n\nThat is where the climb starts. Not at the gates. In trouble, surrounded by people who are not telling the truth.\n\nThen the psalmist says something strange about geography. Woe to me that I dwell in Meshech, that I live among the tents of Kedar. Meshech was far to the north, somewhere up near the Black Sea. Kedar was a desert people to the south and east. Nobody lives in both. He is not giving his address. He is saying: I am nowhere near where I am supposed to be, in every direction at once.\n\nMost of us would prefer to begin from somewhere more settled. We would like to arrive at faith already composed, having sorted the distressing parts out in advance, so that the climb can be a pleasant walk rather than an escape. The collection does not allow it. The first song is sung by someone who is far away and knows it.\n\nThere is one more line worth sitting with. I am for peace; but when I speak, they are for war. Anyone who has been the only person in a room trying to lower the temperature knows that particular tiredness. It is not dramatic suffering. It is the slow attrition of being misread every time you try to make something better.\n\nThe psalm does not fix this. It does not end with the lying lips repenting or the war party standing down. It ends with the situation entirely intact and the pilgrim walking anyway.\n\nThat is worth noticing, because we often treat unresolved circumstances as a reason to postpone. I will get serious about this once things settle down. Psalm 120 puts the first step before the settling.\n\nSo if you are waiting to feel less far away before you begin, this song is the answer to that. Say where you actually are, not where you would prefer to report being. Meshech and Kedar, both at once, is an acceptable place to start, because it is where the whole collection starts.\n\nThe road goes up from there.',
    'plain',
    'Believers Sword',
    'Songs of Ascent', 1,
    '[{"book": "Psalms", "chapter": 120, "verse_start": 1, "verse_end": 7}]'::jsonb,
    'Psalm 120',
    array['psalms', 'songs of ascent', 'honesty'],
    'published', now() - interval '35 days', false,
    'Psalm 120 opens the Songs of Ascent not at the temple but in distress, far from home. Why the pilgrim collection begins with the honest starting point.'
),

-- ── Standalone ─────────────────────────────────────────────────────────────
(
    'he-was-asleep',
    'He Was Asleep',
    'The detail Mark refuses to smooth over',
    'In the storm on the lake, the disciples do not ask Jesus for help. They accuse him of not caring. Mark keeps every awkward detail of that scene.',
    E'Mark tells the story of the storm on the lake in seven verses, and he keeps every detail a tidier writer would have removed.\n\nThe boat is filling. The disciples, several of whom fished this lake for a living and would know the difference between a bad night and a dangerous one, are certain they are going to drown. And Jesus is in the stern, asleep on a cushion.\n\nMark could have left out the cushion. He does not. It is the kind of specific, faintly embarrassing detail that a person includes because it is what happened.\n\nThen comes the line that is easy to read too quickly. Teacher, do you not care that we are perishing?\n\nThat is not a request for help. It is an accusation. They do not say wake up, or do something, or save us. They question whether he cares at all. Fear has moved past asking and into indictment, which is a thing fear reliably does.\n\nHe gets up, speaks to the wind and the sea, and it stops. Then he turns to them: Why are you so afraid? Have you still no faith?\n\nIt is possible to hear that as a scolding, and many readings do. But notice the order. He stills the storm first. The question comes to people who are already safe, standing in sudden quiet. It is not a condition of rescue. It is asked afterward, which makes it a different kind of question.\n\nAnd then Mark records something genuinely odd. They were filled with great fear. More afraid after the storm stopped than during it. The wind had been frightening in an ordinary way. The person who speaks to wind and is obeyed is frightening in a way they had no category for.\n\nWe usually want this story to be about calm arriving. It is really about a question getting answered in a way nobody found comfortable.\n\nDo you not care that we are perishing. He does not answer it with an explanation. He answers it with an action, and the action turns out to be more unsettling than the silence was.\n\nOne thing to take from this. The disciples prayed badly. They accused him, in the middle of it, with no composure at all. And that prayer is the one recorded, and it is the one that worked. If you have been waiting until you can ask well, Mark has already made that unnecessary.',
    'plain',
    'Believers Sword',
    null, null,
    '[{"book": "Mark", "chapter": 4, "verse_start": 35, "verse_end": 41}]'::jsonb,
    'Mark 4:35-41',
    array['mark', 'fear', 'prayer'],
    'published', now() - interval '31 days', false,
    'In Mark 4 the disciples do not ask Jesus for help, they accuse him of not caring. A close reading of the storm on the lake and the question it answers.'
),

-- ── Songs of Ascent, Part 2 ────────────────────────────────────────────────
(
    'not-from-the-hills',
    'Not From the Hills',
    'Psalm 121 is a question before it is a comfort',
    'I lift up my eyes to the hills is almost always read as though the hills are the help. In the pilgrim road they were the danger, and the line is a question with an edge.',
    E'I will lift up mine eyes unto the hills, from whence cometh my help. Generations of readers have taken that as one confident sentence, with the hills as the source of the help.\n\nRead the next line and it comes apart. My help comes from the LORD, who made heaven and earth. Verse two is not a restatement. It is a correction.\n\nSo verse one is a question, and not a warm one. The pilgrim looks up at the high ground and asks what exactly is up there for him.\n\nIt is worth knowing what was on those hills. The high places were there, the shrines to other gods, the local arrangements people made when they wanted results. The hills were also where the road became dangerous, because high ground is where you wait if you intend to rob someone walking below.\n\nSo the question has an edge to it. I look up at those hills. Is that where help comes from? And the answer is no. Help comes from the one who made them, which is a different claim entirely, and a larger one.\n\nWhat follows is one of the most insistent passages in the Psalms. He will not let your foot slip. He who watches over you will not slumber. The LORD watches over you. The LORD is your keeper. The word for keep or watch over appears six times in eight verses.\n\nRepetition like that is not decoration. You do not say a thing six times to someone who is already convinced. This is a psalm sung by people on a road that could genuinely hurt them, and the repetition is doing work.\n\nWhich means it is not a psalm about feeling safe. It never claims the road is safe. It claims something narrower and much harder to argue with: the one keeping you does not sleep.\n\nThat distinction matters, because the promise people often take from Psalm 121 is nothing bad will happen to me, and life keeps disproving it. That is not what the psalm says. The pilgrims singing it were not exempt from bandits. Some of them presumably met bandits.\n\nWhat they had was not exemption. It was a keeper who was awake for the entire climb.\n\nSomething to try. Name the hill you keep looking to. The arrangement, the person, the plan, the number in the account, the thing you check when you want reassurance. Psalm 121 does not say the hill is evil. It says it is the wrong direction for the question you are asking, and then it points higher.',
    'plain',
    'Believers Sword',
    'Songs of Ascent', 2,
    '[{"book": "Psalms", "chapter": 121, "verse_start": 1, "verse_end": 8}]'::jsonb,
    'Psalm 121',
    array['psalms', 'songs of ascent', 'protection'],
    'published', now() - interval '28 days', false,
    'Psalm 121 is usually read as though the hills are the help. In context they are the danger. What the psalm actually promises, and what it does not.'
),

-- ── Standalone ─────────────────────────────────────────────────────────────
(
    'the-whisper-was-not-the-point',
    'The Whisper Was Not the Point',
    'What the still small voice actually says',
    'The gentle whisper at Horeb is quoted as a lesson about how God speaks. Almost nobody quotes what the voice says, or notices that it asks the same question twice.',
    E'Elijah has just won. Fire fell on Carmel in front of everyone. And the chapter that follows opens with him running for his life, sitting down under a broom tree in the wilderness, and asking God to let him die.\n\nIt is worth pausing on what God does first, because it is not what we would write. There is no rebuke. There is no vision. An angel wakes him, and there is bread and a jar of water, and he eats and lies down again. Then it happens a second time: get up and eat, the journey is too much for you.\n\nFood, then sleep, then food again. Before any theology at all.\n\nOnly later does he reach Horeb and the cave, and the question: What are you doing here, Elijah? He answers with a speech about his own faithfulness and his isolation. I alone am left, and they are trying to kill me.\n\nThen the famous part. A great wind, strong enough to tear the mountain, but the LORD was not in the wind. An earthquake, and not in the earthquake. A fire, and not in the fire. And after the fire a sound of thin silence, which is about as close as English gets to the Hebrew. The old translations gave us a still small voice, and it has been quoted ever since as a lesson about the quietness of God.\n\nAnd this is where nearly every retelling stops.\n\nBut the passage does not stop. The voice asks exactly the same question it asked before the wind and the fire: What are you doing here, Elijah? And Elijah gives the identical answer. Word for word, the same speech about being the only one left. The theophany has not changed his mind about anything.\n\nSo God answers differently. Go back the way you came. Anoint Hazael. Anoint Jehu. Anoint Elisha, who will take your place. And, almost in passing, a correction: there are seven thousand in Israel who have not bowed to Baal.\n\nYou are not the only one left. That was never true. It only felt true, and feeling was doing a great deal of work.\n\nThe whisper, then, was not a lesson about volume. It was the setting for an assignment and a correction, given to a man who was exhausted and wrong about how alone he was.\n\nTwo things to carry. The first is that God fed him and let him sleep before addressing anything else, and it is not obvious we would have that much sense with ourselves. The second is that the answer to I am the only one was a number. Seven thousand. There were always other people. He simply could not see them from under the broom tree.',
    'plain',
    'Believers Sword',
    null, null,
    '[{"book": "1 Kings", "chapter": 19, "verse_start": 1, "verse_end": 18}]'::jsonb,
    '1 Kings 19:1-18',
    array['elijah', 'exhaustion', 'calling'],
    'published', now() - interval '24 days', false,
    'The still small voice at Horeb is quoted as a lesson about how God speaks. Read on: the voice asks the same question twice and then sends Elijah back to work.'
),

-- ── Songs of Ascent, Part 3 ────────────────────────────────────────────────
(
    'out-of-the-depths',
    'Out of the Depths',
    'Psalm 130 and the kind of waiting that is hope',
    'Psalm 130 never reports that the depths ended. It ends in waiting, and calls that waiting hope. The difference between that and anxiety is the whole psalm.',
    E'Out of the depths I cry to you, LORD. The word is used for deep water, the kind you do not stand up in. This is drowning language, and the psalm opens in it without any preamble.\n\nThen a question that does not seem designed to help. If you, LORD, kept a record of sins, who could stand?\n\nIt is rhetorical, and the answer is nobody. Not the psalmist, not his enemies, not the reader. The bottom of the psalm is not the circumstance. It is that.\n\nAnd then, immediately: But with you there is forgiveness. No argument for it, no mechanism, no conditions attached. It is simply set down next to the previous line as the other true thing.\n\nThe middle of the psalm is where it settles, and it settles on a word we tend to treat as a failure state. I wait for the LORD, my whole being waits, and in his word I put my hope. I wait for the LORD more than watchmen wait for the morning, more than watchmen wait for the morning.\n\nHe says it twice, which is how you know it is the line that matters.\n\nConsider what a watchman is actually doing. He is on a wall in the dark, and morning is the thing he wants. He cannot hasten it. Nothing he does affects when the light arrives. And it does not once occur to him that it might not.\n\nThat is a very particular kind of waiting, and it is worth measuring our own against it. Most of our waiting falls into one of two other categories. There is the numb kind, where we have quietly stopped expecting the thing and are only enduring the interval. And there is the frantic kind, where we check and refresh and rehearse, as though attention were a form of influence.\n\nThe watchman is neither. He is not passive, because he is awake and on the wall and that is the job. He is not anxious, because the morning is not in question.\n\nNotice too what the psalm does not do. It never announces that the depths drained. There is no verse where the water goes down. The situation at the end of Psalm 130 is, as far as we can tell, the situation at the beginning. What changed is that the waiting acquired a direction, and the psalm is willing to call that hope.\n\nSomething to do with this. Name one thing you are waiting on. Then ask which of the three kinds of waiting it currently is: numb, frantic, or on the wall. The answer is usually immediate, and usually not the one we would have claimed.',
    'plain',
    'Believers Sword',
    'Songs of Ascent', 3,
    '[{"book": "Psalms", "chapter": 130, "verse_start": 1, "verse_end": 8}]'::jsonb,
    'Psalm 130',
    array['psalms', 'songs of ascent', 'waiting'],
    'published', now() - interval '21 days', false,
    'Psalm 130 never reports that the depths ended. It ends in waiting and calls it hope. On the watchman, the morning, and three kinds of waiting.'
),

-- ── Songs of Ascent, Part 4 ────────────────────────────────────────────────
(
    'arriving-together',
    'Arriving Together',
    'Psalm 133 and the awkward fact of other people',
    'After the distance, the danger and the waiting, the pilgrim collection lands on unity. Not agreement. Dwelling. And it uses two deliberately impossible images to say so.',
    E'The climb has been long. Psalm 120 began far from home among lying lips. Psalm 121 walked a road with dangerous hills. Psalm 130 waited in deep water for a morning it could not hasten.\n\nAnd then the collection arrives, and what it finds at the top is not a private summit experience. It is other people.\n\nHow good and how pleasant it is when God''s people dwell together in unity.\n\nWe would probably have written something else. Something about the temple, or the presence of God, or the relief of having got there. Instead the arrival is described in terms of the group, which is a less flattering ending, because the group is where the friction lives.\n\nThe psalm then offers two images, and both are slightly strange.\n\nThe first is oil. It is like precious oil poured on the head, running down on the beard, running down on the collar of his robes. This is anointing oil, and the point is that it does not stop. It runs past the head, into the beard, down onto the clothing. It is a picture of something excessive, going further than was strictly required.\n\nThe second image is dew. It is like the dew of Hermon falling on Mount Zion. Hermon is in the far north, snow-capped, well watered. Zion is south, dry, in the hill country of Judah. Dew from Hermon does not fall on Zion. It cannot. The distance makes it impossible, and the psalm knows that.\n\nWhich is the point. This unity is not the natural product of people being similar or getting along. It is described as something arriving from somewhere it could not have come from. It is given, not achieved.\n\nAnd notice the actual word. Dwell together. Not agree. Not resolve their differences. The Hebrew is about living in the same place, which is both less than we might hope for and considerably harder.\n\nWe tend to treat unity as the entry requirement for worship. Get the relationships sorted, then come up the mountain. Psalm 133 has it the other way round. Unity is what is waiting at the top, and it is described as a gift, poured out past the point of necessity, arriving from an impossible distance.\n\nWhich means the person you find most difficult in your congregation is not an obstacle between you and the summit. According to this psalm, they are part of what is at the summit. That is a harder truth than the one on the wall art, and it is the one the pilgrim songs end on.',
    'plain',
    'Believers Sword',
    'Songs of Ascent', 4,
    '[{"book": "Psalms", "chapter": 133, "verse_start": 1, "verse_end": 3}]'::jsonb,
    'Psalm 133',
    array['psalms', 'songs of ascent', 'church'],
    'published', now() - interval '14 days', false,
    'Psalm 133 ends the Songs of Ascent on unity, using two deliberately impossible images. Why the summit of the pilgrim climb turns out to be other people.'
),

-- ── Standalone ─────────────────────────────────────────────────────────────
(
    'all-things',
    'All Things',
    'The verse on the gym wall, and the sentence before it',
    'I can do all things through Christ who strengthens me is quoted as a promise of capability. Paul wrote it in prison, in a paragraph about being hungry.',
    E'I can do all things through Christ who strengthens me. It is printed on water bottles and painted in weight rooms, and in that setting it means something like: there is no limit to what I can achieve.\n\nRead the sentence before it and that meaning becomes difficult to sustain.\n\nPaul is writing from prison, thanking the church at Philippi for a gift they sent. Around the famous line he says this: I have learned to be content whatever the circumstances. I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want.\n\nThen: I can do all things through him who gives me strength.\n\nThe all things of that sentence is the list he has just given. Hunger and plenty. Need and abundance. He is not making a claim about unlimited achievement. He is making a claim about sufficiency in either direction, including the direction nobody puts on a poster.\n\nThere is a word in that passage worth slowing down for. Learned. He uses it twice. I have learned to be content. I have learned the secret.\n\nContentment, on Paul''s account, is not a temperament some people are issued at birth. It is a skill, and he acquired it over time, presumably badly at first. That is unexpectedly good news, because it means that if you do not have it yet, you are not failing at something you should already possess. You are at an earlier point in a curriculum.\n\nAnd there is one more thing in the list that is easy to skim. He says he had to learn how to abound. Not only how to go without. How to have plenty.\n\nMost of us would assume the hard lesson is scarcity, and that abundance takes care of itself. Paul lists them as equally requiring instruction. Anyone who has watched comfort quietly erode their attention, or noticed how much easier it is to pray when something is wrong, knows why he put them side by side.\n\nSo the gym-wall reading is not merely a bit thin. It is pointed the wrong way. The verse is not about winning. It was written by a man in custody, explaining that he has learned how to lose things and still be fed.\n\nA question to end on, and it is not the one people expect. Which of the two is actually harder for you, being brought low or having plenty? Almost everyone answers low without thinking. Sit with it a while longer than that.',
    'plain',
    'Believers Sword',
    null, null,
    '[{"book": "Philippians", "chapter": 4, "verse_start": 10, "verse_end": 13}]'::jsonb,
    'Philippians 4:10-13',
    array['philippians', 'contentment', 'paul'],
    'published', now() - interval '5 days', true,
    'I can do all things through Christ is quoted as a promise of capability. Paul wrote it in prison, in a paragraph about hunger. What the all things refers to.'
)

on conflict (slug) do nothing;
