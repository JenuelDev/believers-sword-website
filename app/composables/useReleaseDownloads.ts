import { computed, onMounted } from "vue";
import { useFetch, useState } from "#imports";

export interface GithubAsset {
    name: string;
    browser_download_url: string;
}

export interface GithubRelease {
    tag_name: string;
    assets: GithubAsset[];
}

export type DownloadKey = "windows" | "macos" | "linux" | "windows-portable";
export type DetectedPlatform = "windows" | "macos" | "linux" | "other" | "unknown";

export interface DownloadOption {
    key: DownloadKey;
    label: string;
    icon: string;
    description: string;
    asset: GithubAsset;
    href: string;
}

const latestReleaseUrl =
    "https://api.github.com/repos/JenuelDev/Believers-Sword/releases/latest";

const downloadOptions: Array<Omit<DownloadOption, "asset" | "href">> = [
    {
        key: "windows",
        label: "Windows",
        icon: "simple-icons:windows11",
        description: "Install the latest Windows desktop build from GitHub Releases.",
    },
    {
        key: "macos",
        label: "macOS",
        icon: "simple-icons:apple",
        description: "Download the latest macOS build from GitHub Releases.",
    },
    {
        key: "linux",
        label: "Linux",
        icon: "simple-icons:linux",
        description: "Grab the latest Linux package from GitHub Releases.",
    },
    {
        key: "windows-portable",
        label: "Windows Portable",
        icon: "simple-icons:windows11",
        description: "Run a portable Windows build without a full installer.",
    },
];

const detectDownloadKey = (assetName: string): DownloadKey | null => {
    const name = assetName.toLowerCase();

    const hasAny = (tokens: string[]) => tokens.some((token) => name.includes(token));

    const isPortable = hasAny(["portable", "noinstall", "standalone"]);
    const isWindows =
        hasAny(["windows", "win32", "win64", "setup", "installer"]) ||
        name.endsWith(".exe") ||
        name.endsWith(".msi");
    const isMac =
        hasAny(["mac", "macos", "darwin", "osx"]) ||
        name.endsWith(".dmg") ||
        name.endsWith(".pkg");
    const isLinux =
        hasAny(["linux", "appimage", "deb", "rpm", "snap"]) ||
        name.endsWith(".appimage") ||
        name.endsWith(".deb") ||
        name.endsWith(".rpm") ||
        name.endsWith(".tar.gz") ||
        name.endsWith(".tar.xz");

    if (isPortable && (isWindows || (!isMac && !isLinux))) {
        return "windows-portable";
    }

    if (isWindows) {
        return "windows";
    }

    if (isMac) {
        return "macos";
    }

    if (isLinux) {
        return "linux";
    }

    return null;
};

const detectClientPlatform = (userAgent: string, platform: string): DetectedPlatform => {
    const value = `${userAgent} ${platform}`.toLowerCase();

    if (/(android|iphone|ipad|ipod)/.test(value)) {
        return "other";
    }

    if (/(win32|win64|windows)/.test(value)) {
        return "windows";
    }

    if (/(macintosh|mac os|macos|darwin)/.test(value)) {
        return "macos";
    }

    if (/(linux|x11|ubuntu|debian|fedora)/.test(value)) {
        return "linux";
    }

    return "other";
};

const platformLabels: Record<DetectedPlatform, string> = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    other: "your device",
    unknown: "your device",
};

export const releasesPageUrl = "https://github.com/JenuelDev/Believers-Sword/releases";
export const microsoftStoreUrl = "https://apps.microsoft.com/detail/9PFN10LVMBV4";
export const microsoftStoreProtocolUrl = "ms-windows-store://pdp/?productid=9PFN10LVMBV4";

export const useReleaseDownloads = async () => {
    const { data: release } = await useFetch<GithubRelease>(latestReleaseUrl, {
        key: "believers-sword-latest-release",
        default: () => ({
            tag_name: "latest",
            assets: [],
        }),
    });

    const assets = computed(() => release.value?.assets ?? []);
    const tagName = computed(() => release.value?.tag_name || "latest");

    const platformDownloads = computed<DownloadOption[]>(() => {
        const matched = new Map<DownloadKey, GithubAsset>();

        for (const asset of assets.value) {
            const key = detectDownloadKey(asset.name);

            if (!key || matched.has(key)) {
                continue;
            }

            matched.set(key, asset);
        }

        return downloadOptions.flatMap((option) => {
            const asset = matched.get(option.key);

            if (!asset) {
                return [];
            }

            return [
                {
                    ...option,
                    asset,
                    href: asset.browser_download_url,
                },
            ];
        });
    });

    const detectedPlatform = useState<DetectedPlatform>(
        "believers-sword-detected-platform",
        () => "unknown"
    );

    onMounted(() => {
        detectedPlatform.value = detectClientPlatform(
            window.navigator.userAgent,
            window.navigator.platform
        );
    });

    const detectedPlatformLabel = computed(
        () => platformLabels[detectedPlatform.value] || platformLabels.other
    );

    return {
        assets,
        tagName,
        platformDownloads,
        detectedPlatform,
        detectedPlatformLabel,
        releasesPageUrl,
        microsoftStoreUrl,
        microsoftStoreProtocolUrl,
    };
};
