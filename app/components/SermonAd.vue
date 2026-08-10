<script setup lang="ts">
import { onMounted } from "vue";

const adClient = "ca-pub-2268807726840190";
const adSlot = "7004590680";

// The loader is requested from this component rather than from app.vue or
// nuxt.config, and that is what confines AdSense to the sermon page: Unhead only
// keeps the tag in <head> while a component that asked for it is mounted. Put it
// in the app-wide head and it would load on the homepage, the policy pages and
// everywhere else.
//
// `key` matters if a second unit is ever added to the same page — without it the
// loader would be injected once per unit.
useHead({
    script: [
        {
            key: "google-adsense",
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`,
            async: true,
            crossorigin: "anonymous",
        },
    ],
});

onMounted(() => {
    try {
        // The <ins> below is server-rendered, so it is already in the DOM by the
        // time this runs. Pushing per mount (not once globally) is deliberate:
        // client-side navigation between sermons mounts a fresh, unfilled <ins>
        // that needs its own request.
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
        // A failed ad must never take the sermon down with it. The common throw
        // here is AdSense complaining that the slot is already filled, which is
        // harmless.
    }
});
</script>

<template>
    <aside class="sermon-ad">
        <p class="sermon-ad-label">Advertisement</p>
        <!-- Attributes mirror the unit as generated in the AdSense dashboard. -->
        <ins
            class="adsbygoogle"
            style="display: block"
            :data-ad-client="adClient"
            :data-ad-slot="adSlot"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    </aside>
</template>

<style scoped>
/* The frame and the label are applied only once AdSense reports a filled slot.
   Everything is keyed off [data-ad-status], which the loader sets on the <ins>
   after it decides whether it has an ad to serve.

   Note what this deliberately does NOT do: set `display: none` on the container
   while unfilled. A hidden container has no measurable width, so AdSense would
   report availableWidth=0 and never fill it — the slot would stay empty forever.
   Instead the container keeps its width and simply carries no border, no label
   and no margin, so an unfilled unit occupies no visible space. That matters
   right now, because until the site passes AdSense review every slot is
   unfilled, and an empty dashed box on every sermon would look broken. */
.sermon-ad {
    margin: 0;
}

.sermon-ad-label {
    display: none;
}

/* AdSense writes an inline `height` onto the <ins> (280px, in practice) even when
   it has no ad to serve, so an unfilled slot leaves a blank hole in the article
   unless it is explicitly collapsed.
   Collapsing it *here* is safe, and the timing is the whole point: data-ad-status
   is only set after AdSense has measured the slot and made its request. Hiding
   the container up front instead would report availableWidth=0 and the slot would
   never fill at all. */
.sermon-ad:has(ins[data-ad-status="unfilled"]) {
    display: none;
}

.sermon-ad:has(ins[data-ad-status="filled"]) {
    position: relative;
    margin: 2rem 0 2.25rem;
    padding: 1.15rem 1rem 1rem;
    border: 1px dashed rgba(74, 58, 255, 0.4);
    border-radius: var(--radius);
}

/* Sits on the top border with a solid background, so the dashes read as though
   they part around it. */
.sermon-ad:has(ins[data-ad-status="filled"]) .sermon-ad-label {
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    /* The unit sits inside .prose, whose `p` rule would otherwise apply a
       0.75rem vertical margin and push the label off the border line. */
    margin: 0;
    padding: 0.12rem 0.55rem;
    border-radius: 999px;
    background: var(--brand);
    color: #ffffff;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
    white-space: nowrap;
}
</style>
