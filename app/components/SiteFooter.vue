<template>
    <footer class="site-footer">
        <div class="site-footer-inner">
            <section class="site-footer-brand">
                <a href="/#home" class="site-footer-logo">
                    <NuxtImg
                        src="/apple-touch-icon.png"
                        alt=""
                        width="34"
                        height="34"
                        format="webp"
                        quality="88"
                    />
                    <span>Believers Sword</span>
                </a>
                <p>
                    A Bible study app built to help believers read with focus, study with
                    clarity, and grow in Christ one passage at a time.
                </p>
            </section>

            <section class="site-footer-group">
                <p>Navigation</p>
                <nav>
                    <a href="/#home">Home</a>
                    <a href="/#features">Features</a>
                    <a href="/pricing">Pricing</a>
                    <a href="/#preview">App Preview</a>
                    <a href="/screenshots">Screenshots</a>
                    <a href="/mobile">Mobile App</a>
                    <a href="/#download">Download</a>
                </nav>
            </section>

            <section class="site-footer-group">
                <p>Support</p>
                <nav>
                    <a href="/pricing">Pricing &amp; Plans</a>
                    <a href="/terms-and-condition">Terms &amp; Conditions</a>
                    <a href="/refund-policy">Refund Policy</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/delete-account">Delete Account</a>
                    <a
                        href="https://github.com/Bible-Projects/believers-sword-next"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Repository
                    </a>
                    <a
                        href="https://jenuel.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Creator: Jenuel.Dev
                    </a>
                </nav>
            </section>
        </div>

        <div class="site-footer-bottom">
            <p>Copyright {{ new Date().getFullYear() }} Believers Sword. All rights reserved.</p>
            <p>Built with faith and code.</p>
        </div>
    </footer>
</template>
