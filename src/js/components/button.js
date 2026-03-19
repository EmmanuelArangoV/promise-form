/**
 * Creates the submit button DOM node.
 * @param {object} config
 * @param {string} config.text
 * @returns {HTMLButtonElement}
 */
export function createButton({ text }) {
  const button = document.createElement('button');
  button.classList.add('btn-submit');
  button.type = 'submit';
  button.textContent = text;
  return button;
}
