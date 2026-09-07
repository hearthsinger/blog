'use strict';

/**
 * @callback CopyHandler
 * @param {Event} e
 * @returns {void}
 */

/**
 * curried click event listener to copy the content of the provided {@link Node} to the clipboard
 *
 * @param {Node} targetEl - the element whose content to copy
 *
 * @returns {CopyHandler} The constructed {@link CopyHandler} event listener
 */
const copyContentFromTargetEl = (targetEl) => async (e) => {
  const content = targetEl.innerText;
  await navigator.clipboard.writeText(content);
  e.target.innerText = 'copied!';
  setTimeout(() => (e.target.innerText = 'copy'), 1000);
};

// Outer selector - buttons with the copyable class
document.querySelectorAll('button.copyable').forEach((element) => {
  const { dataset } = element;
  if (!('targetId' in dataset)) {
    console.error('[copy] - found copyable element with no target', element);
    // Early return - this is a configuration issue but whatever
    return;
  }

  // grab the target element for this button
  const targetEl = document.querySelector(`#${dataset.targetId}`);
  if (!targetEl) {
    console.error("[copy] - copyable element's targetId matches no DOM node", {
      targetId: dataset.targetId,
    });
    // Early return - also a config issue, but again, whatever
    return;
  }

  element.addEventListener('click', copyContentFromTargetEl(targetEl));
});
