export interface StudyGuide {
    slug: string;
    title: string;
    description: string;
    introduction: string;
    image: string;
    imageAlt: string;
    caption: string;
    steps: { title: string; paragraphs: string[] }[];
    exercise: string;
}

export const studyGuides: StudyGuide[] = [
    {
        slug: "read-offline",
        title: "Prepare a Bible translation for offline reading",
        description: "Download a translation in Believers Sword for desktop, confirm it opens without a connection, and understand what still needs Internet access.",
        introduction: "Prepare your reading before you leave a reliable connection. Installing the desktop app and downloading a Bible translation are separate steps: an installed reader still needs the text you want to read.",
        image: "/screenshots/desktop/desktop-01.png",
        imageAlt: "Desktop reader with a Bible List, Download and Import controls, and installed translations.",
        caption: "The earlier desktop layout places Download beside the Bible List. Current desktop builds also provide translation management under Settings, Bible.",
        steps: [
            {
                title: "1. Install the desktop reader while online",
                paragraphs: [
                    "Choose the Windows, macOS, or Linux build on the download page. Finish installing it and open the reader before you leave your connection. This guide covers the installed desktop app. The browser app and Android have different controls and storage behavior.",
                    "Choose a translation you understand and have permission to use. Different catalogs can offer different editions of a translation; read its name, language, source, and description rather than relying only on an abbreviation.",
                ],
            },
            {
                title: "2. Download the Bible text",
                paragraphs: [
                    "Open Settings, choose Bible, and select Download. In an older desktop layout, use Download beside the Bible List. Search for the translation name or narrow the list by language and source. Start with one translation so you can check it before adding more.",
                    "Select its download action and follow any source-specific instructions shown by the app. A page opening on another website is not proof that a translation has finished installing. Wait for the download to complete, then confirm the translation appears under Added or in your Bible List.",
                ],
            },
            {
                title: "3. Open a passage before disconnecting",
                paragraphs: [
                    "Return to the reader and select your downloaded translation. Open a book and chapter. For a Bible that includes both Testaments, check one passage from each. An edition containing only the New Testament will not supply Old Testament chapters.",
                    "If the version is missing, return to the installed list and check that the download completed. If the version is present but a passage is blank, try another chapter before downloading the same file again.",
                ],
            },
            {
                title: "4. Test the offline setup you will actually use",
                paragraphs: [
                    "Temporarily disconnect from Wi-Fi or your network, reopen the installed reader, and navigate to another chapter in the downloaded translation. This checks local reading on your device instead of assuming it works because a page was already open.",
                    "Reconnect if you need another download. Store listings, new translations, external links, and cross-device services can require Internet access. Downloaded Bible text does not guarantee that every audio or online feature is available offline.",
                ],
            },
        ],
        exercise: "Before your next trip, open Psalm 121 in your chosen translation with the network disconnected. Move to Psalm 122, close the app, and open it again. If the text remains available, you have checked the reading setup you plan to depend on.",
    },
    {
        slug: "compare-translations",
        title: "Compare translations without losing the passage",
        description: "Use reading panes in Believers Sword for desktop to compare Bible translations, notice meaningful differences, and keep each verse in context.",
        introduction: "Two translations can help you slow down over a sentence you usually read quickly. Keep both on the same passage, notice a specific difference, and return to the surrounding verses before deciding what it means.",
        image: "/screenshots/desktop/desktop-03.png",
        imageAlt: "Three desktop reading panes show John 3 in English and Tagalog alongside study notes.",
        caption: "This earlier desktop screenshot shows the same chapter across three translation panes. Begin with two to keep your comparison easy to follow.",
        steps: [
            {
                title: "1. Start with two available translations",
                paragraphs: [
                    "Install the versions you want to compare. Pick editions that include the same book and chapter. You can compare two versions in one language, or use a familiar translation alongside another language you read.",
                    "Open a short passage in the reader. John 3:14-18 is one useful starting point because the surrounding sentences help explain the familiar words in verse 16. Read the whole paragraph in your usual translation first.",
                ],
            },
            {
                title: "2. Add a reading pane and choose its version",
                paragraphs: [
                    "Use the add reading pane control in the desktop reader's toolbar. In current desktop builds, select the version name at the top of the new pane to open the version picker. Search the installed versions and choose your second translation.",
                    "Keep the same book and chapter open across the panes. If space is tight, use two panes and close extras with the close control in a pane header. More versions on screen do not necessarily make a comparison clearer.",
                ],
            },
            {
                title: "3. Write down one difference and a question",
                paragraphs: [
                    "Compare complete sentences rather than collecting isolated words. Does one version make a connection clearer? Does another preserve a phrase that makes you pause? Write the reference, the version names, and the question the difference raises.",
                    "Different English words can express the same meaning. A difference is a reason to investigate, not proof that one translation is wrong. Neither a vote among versions nor a preferred phrase settles a difficult interpretation by itself.",
                ],
            },
            {
                title: "4. Check context and missing text",
                paragraphs: [
                    "Read the verses before and after the sentence again in both versions. Look for who is speaking, who is listening, and words such as because, therefore, and but. Those connections often matter more than a striking word considered alone.",
                    "A blank pane can mean the edition does not include that passage or its text is unavailable. Confirm the book, chapter, installed version, and download before treating blank text as a meaningful translation difference. Save questions you cannot answer for further study.",
                ],
            },
        ],
        exercise: "Compare John 3:14-18 in two installed translations. Record one wording difference and one observation both versions support. Finish with a question you still need to check, rather than forcing an answer from the comparison alone.",
    },
    {
        slug: "keep-study-notes",
        title: "Keep study notes you can understand next week",
        description: "Create chapter notes and verse clip notes in Believers Sword for desktop, separate observations from questions, and check that edits have saved.",
        introduction: "A useful note records more than a sentence that sounded good. Keep the passage reference, your observation, your question, and your response separate so that your future self can follow the thought.",
        image: "/screenshots/desktop/desktop-01.png",
        imageAlt: "The desktop reader displays a chapter note editor below the passage and blue clip notes attached to verses.",
        caption: "The note editor gives room for a longer study. Clip notes attach a shorter comment to a verse; the blue boxes show that separate feature.",
        steps: [
            {
                title: "1. Choose a chapter note or a verse clip note",
                paragraphs: [
                    "Use a chapter note for an outline, a list of questions, or a longer reflection. Use a clip note for a comment tied to one verse. The two features have different purposes, so choose the one that will help you find the thought later.",
                    "Open the passage first. For a longer note, show the notes panel, select Notes if the panel has tabs, and choose New Note. Give it a title that includes the passage and your question, such as John 3:14-18: what does believing mean here?",
                ],
            },
            {
                title: "2. Use four simple prompts",
                paragraphs: [
                    "Observation: what does the passage actually say? Record the speaker, listener, action, or repeated phrase. Question: what do you need to understand? Keep that question open when you do not yet have enough evidence.",
                    "Connection: which surrounding verse or other passage helps explain it? Write the reference so you can check it again. Response: what specific action follows from what you have understood? Keep your application distinct from a direct quotation of Scripture.",
                ],
            },
            {
                title: "3. Attach a short thought to a verse",
                paragraphs: [
                    "For a verse-specific comment, open the verse's context menu and choose Create Clip Note. Add your comment and use Save in the clip note dialog. Include the translation name when the comment depends on its particular wording.",
                    "A useful clip note might ask how John 3:16 connects to verses 14 and 15. It does not need to contain your entire study. Put the fuller explanation in a chapter note, where you can keep the paragraph together.",
                ],
            },
            {
                title: "4. Check saving and return to the note",
                paragraphs: [
                    "The chapter editor saves edits automatically. If a save warning appears, keep the app open and use Retry saving when available. Before leaving an important study, reopen the note and confirm that your latest text is present.",
                    "Local saving and cross-device sync are different. A note reopening on this desktop does not prove it reached another device. Keep a separate copy of important work before clearing application data, reinstalling, or moving to a new computer.",
                ],
            },
        ],
        exercise: "Create a note on John 3:14-18 with the four prompts above. Leave one honest question unanswered. Reopen it tomorrow, read the passage first, and add a dated follow-up rather than erasing the question that started your study.",
    },
];
