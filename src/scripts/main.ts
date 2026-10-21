/**
 * The site's only script, loaded once from BaseLayout (Astro bundles it as a
 * deferred module). Every feature here is progressive: the page reads and
 * works without it.
 */

/* ---------- Mobile menu ---------- */
const panel = document.getElementById('mobile-panel');
const openBtn = document.querySelector<HTMLButtonElement>('[data-nav-open]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-nav-close]');

function openMenu() {
  if (!panel || !openBtn) return;
  panel.hidden = false;
  void panel.offsetHeight; // flush layout so the fade-in transition runs
  panel.classList.add('is-open');
  openBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  closeBtn?.focus();
}

function closeMenu() {
  if (!panel || !openBtn || panel.hidden) return;
  panel.classList.remove('is-open');
  openBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  setTimeout(() => (panel.hidden = true), 200);
  openBtn.focus();
}

openBtn?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
panel?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
  if (e.matches) closeMenu();
});

/* ---------- Fade-up on scroll ---------- */
const revealables = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

/* ---------- Symptom checker (tabs) ---------- */
document.querySelectorAll<HTMLElement>('[data-checker]').forEach((checker) => {
  const tabs = [...checker.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...checker.querySelectorAll<HTMLElement>('[role="tabpanel"]')];

  const select = (index: number, focus = false) => {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) {
        e.preventDefault();
        select((i + keys[e.key] + tabs.length) % tabs.length, true);
      }
    });
  });
  select(0);
});

/* ---------- Table of contents: collapsed under the H1 on mobile ---------- */
const tocBox = document.querySelector<HTMLDetailsElement>('[data-toc]');
if (tocBox && !window.matchMedia('(min-width: 1024px)').matches) tocBox.open = false;

/* ---------- Table of contents: highlight the section in view ---------- */
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          tocLinks.forEach((a) => a.classList.remove('is-active'));
          byId.get(entry.target.id)?.classList.add('is-active');
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );
  byId.forEach((_, id) => {
    const heading = document.getElementById(id);
    if (heading) spy.observe(heading);
  });
}

/* ---------- Call click tracking (GA4) ---------- */
document.querySelectorAll<HTMLAnchorElement>('[data-call]').forEach((link) => {
  link.addEventListener('click', () => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('event', 'phone_call_click', { link_url: link.href, page_path: location.pathname });
  });
});
