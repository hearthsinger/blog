'use strict';

const KNOWN_THEMES = ['dark', 'gba', 'strawb', 'wob'];

/**
 * Pull the current theme from localstorage, or default to `'dark'`
 *
 * @returns {string} the name of the current theme
 */
function getCurrentTheme() {
  const theme = window.localStorage.getItem('theme');
  if (KNOWN_THEMES.includes(theme)) {
    return theme;
  }
  return 'dark';
}

/**
 * Given the current theme, snag the next one in the list, or wrap to the start.
 * Stores the result in localStorage to persist across page loads.
 */
function toggleTheme() {
  const theme = getCurrentTheme();
  const nextThemeIdx = KNOWN_THEMES.indexOf(theme) + 1;
  const newTheme = KNOWN_THEMES[nextThemeIdx % KNOWN_THEMES.length];

  window.localStorage.setItem('theme', newTheme);
  const root = document.documentElement;
  root.dataset.scheme = newTheme;
}

/**
 * IIFE entrypoint - not really needed, nothing here is actually async, but
 * idk this pattern is nice
 */
(async function boostrap() {
  const root = document.documentElement;
  root.dataset.scheme = getCurrentTheme();

  document.addEventListener('click', (event) => {
    // This script is not defered, so the actual target is not in the DOM at the
    // time we first evaluate it. We want this behavior to avoid theme flashing,
    // but it requires we rely on the event propagation to handle theme toggling
    if (!event.target || !event.target.matches('.header-ico img')) {
      return;
    }
    toggleTheme();
  });
})();
