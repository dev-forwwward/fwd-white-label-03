// ─── Styles ──────────────────────────────────────────────────────────────────
import '../scss/styles.scss';

// ─── Bundled third-party libraries ───────────────────────────────────────────
// GSAP and ScrollTrigger are loaded externally (Webflow CDN / custom code)
// and are available as window globals: gsap, ScrollTrigger
import Lenis from 'lenis';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

// ─── Local modules ───────────────────────────────────────────────────────────
import './menu.js';
import './form.js';
import './faqs.js';
import './footer-date.js';

// ─── Core init ───────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {

    // LENIS — smooth scroll (globally available so other modules can call lenis.stop/start)
    window.lenis = new Lenis();

    // Sync Lenis scrolling with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame method to GSAP's ticker
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Disable lag smoothing to prevent delays in scroll animations
    gsap.ticker.lagSmoothing(0);

    // FANCYBOX — pause/resume smooth scroll when lightbox opens/closes
    const fancyboxEl = document.querySelector("[data-fancybox]");
    if (fancyboxEl) {
        Fancybox.bind("[data-fancybox]", {
            on: {
                init: () => { lenis.stop(); },
                close: () => { lenis.start(); }
            }
        });
    }

    // Preloader fade-out
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            delay: 0.1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => { preloader.remove(); }
        });
    }

});
