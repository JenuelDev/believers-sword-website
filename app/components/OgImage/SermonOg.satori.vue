<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    title: { type: String, default: "Bible Sermons and Messages" },
    description: { type: String, default: "" },
    scripture: { type: String, default: "" },
    speaker: { type: String, default: "Believers Sword" },
    collection: { type: Boolean, default: false },
});

const fitText = (value: string, maximum: number) => {
    const characters = Array.from(value.replace(/\s+/g, " ").trim());
    if (characters.length <= maximum) {
        return characters.join("");
    }
    const shortened = characters.slice(0, maximum - 1).join("");
    const lastSpace = shortened.lastIndexOf(" ");
    return `${shortened.slice(0, lastSpace > maximum * 0.7 ? lastSpace : undefined).trimEnd()}…`;
};

// Distinct binding names let the module discover all declared component props.
const cardTitle = computed(() => fitText(props.title, 150));
const scriptureText = computed(() => fitText(props.scripture, 66));
const speakerText = computed(() => fitText(props.speaker || "Believers Sword", 54));
const titleSize = computed(() => cardTitle.value.length > 95 ? 48 : cardTitle.value.length > 60 ? 58 : 72);
</script>

<template>
    <div style="display: flex; position: relative; width: 1200px; height: 630px; overflow: hidden; background-color: #faf8f2; color: #211c35; font-family: 'Sora OG';">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 8px; background-color: #4a3aff;" />

        <div style="display: flex; position: absolute; top: 48px; left: 64px; align-items: center; gap: 14px;">
            <img src="/logo/71x71.png" width="44" height="44" style="width: 44px; height: 44px; border-radius: 11px;" alt="" />
            <div style="display: flex; font-size: 23px; font-weight: 600; letter-spacing: -0.5px;">Believers Sword</div>
        </div>
        <div style="display: flex; position: absolute; top: 62px; right: 64px; font-size: 14px; font-weight: 600; letter-spacing: 2px; color: #756e86;">
            SERMONS &amp; SCRIPTURE
        </div>

        <div style="display: flex; position: absolute; top: 151px; left: 64px; font-size: 15px; font-weight: 600; letter-spacing: 3px; color: #6550a3;">
            {{ collection ? "READ. REFLECT. GROW." : "FROM THE WORD" }}
        </div>
        <div style="display: flex; position: absolute; top: 192px; left: 60px; width: 752px; height: 254px; align-items: center;">
            <h1
                style="display: block; margin: 0; width: 752px; font-weight: 600; line-height: 1.12; letter-spacing: -2.5px; line-clamp: 4; text-overflow: ellipsis; word-break: break-word; overflow: hidden;"
                :style="{ fontSize: `${titleSize}px` }"
            >{{ cardTitle }}</h1>
        </div>
        <img src="/og/sermon-book.svg" width="320" height="358" style="width: 320px; height: 358px; position: absolute; top: 144px; right: 38px;" alt="" />

        <div
            style="display: flex; position: absolute; top: 470px; left: 64px; width: 748px; color: #6550a3; font-weight: 400; line-height: 1.3;"
            :style="{ fontSize: scriptureText.length > 42 ? '20px' : '24px' }"
        >{{ collection ? "Bible sermons for everyday faith." : scriptureText || "A message to read and reflect on." }}</div>

        <div style="position: absolute; top: 545px; left: 64px; right: 64px; height: 1px; background-color: #ddd7e6;" />
        <div style="display: flex; position: absolute; top: 571px; left: 64px; font-size: 17px; color: #756e86;">
            {{ collection ? "Rooted in Scripture. Shared freely." : speakerText }}
        </div>
        <div style="display: flex; position: absolute; top: 571px; right: 64px; font-size: 17px; color: #756e86;">believersword.com/sermons</div>
    </div>
</template>
