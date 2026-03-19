/**
 * Creates a labeled text or tel input DOM node.
 * @param {object} config
 * @param {string} config.id
 * @param {string} config.label
 * @param {string} [config.type='text']
 * @param {string} [config.placeholder='']
 * @param {boolean} [config.required=false]
 * @returns {HTMLElement}
 */
export function createInput({ id, label, type = 'text', placeholder = '', required = false }) {
  const group = document.createElement('div');
  group.classList.add('form-group');

  const labelEl = document.createElement('label');
  labelEl.classList.add('form-group__label');
  labelEl.setAttribute('for', id);
  labelEl.textContent = label;

  const input = document.createElement('input');
  input.classList.add('form-group__input');
  input.id = id;
  input.name = id;
  input.type = type;
  input.placeholder = placeholder;
  input.required = required;

  const errorEl = document.createElement('div');
  errorEl.classList.add('form-group__error');
  errorEl.id = `${id}-error`;

  group.appendChild(labelEl);
  group.appendChild(input);
  group.appendChild(errorEl);

  return group;
}
