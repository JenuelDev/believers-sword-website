<script setup lang="ts">
const siteUrl = "https://www.believersword.com";

// Site-level identity, emitted once on every page. Organization is what lets
// Google associate the brand, logo and social profiles with the domain; WebSite
// gives the site a name to display in results rather than a bare hostname.
useJsonLd({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: "Believers Sword",
            url: `${siteUrl}/`,
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo/300x300.png`,
                width: 300,
                height: 300,
            },
            sameAs: [
                "https://github.com/JenuelDev/Believers-Sword",
                "https://play.google.com/store/apps/details?id=com.believers.sword.believers_sword_mobile",
                "https://apps.microsoft.com/detail/9PFN10LVMBV4",
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: "Believers Sword",
            url: `${siteUrl}/`,
            publisher: { "@id": `${siteUrl}/#organization` },
            inLanguage: "en-US",
        },
    ],
});
</script>

<template>
  <SiteHeader />
  <NuxtPage />
  <SiteFooter />
</template>
