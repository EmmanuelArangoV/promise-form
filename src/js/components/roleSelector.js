/**
 * Creates the role selector with two bordered boxes.
 * @param {object} config
 * @param {string} config.id
 * @param {string} config.label
 * @param {Array<{value: string, text: string}>} config.options
 * @param {boolean} [config.required=false]
 * @returns {HTMLElement}
 */
export function createRoleSelector({ id, label, options, required = false }) {
  const group = document.createElement('div');
  group.classList.add('form-group');

  const labelEl = document.createElement('label');
  labelEl.classList.add('form-group__label');
  labelEl.textContent = label;

  const container = document.createElement('div');
  container.classList.add('role-selector');

  options.forEach(({ value, text }) => {
    const option = document.createElement('div');
    option.classList.add('role-selector__option');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = id;
    radio.id = `${id}-${value}`;
    radio.value = value;
    radio.required = required;

    const box = document.createElement('label');
    box.classList.add('role-selector__box');
    box.setAttribute('for', `${id}-${value}`);
    box.textContent = text;

    option.appendChild(radio);
    option.appendChild(box);
    container.appendChild(option);
  });

  const errorEl = document.createElement('div');
  errorEl.classList.add('form-group__error');
  errorEl.id = `${id}-error`;

  group.appendChild(labelEl);
  group.appendChild(container);
  group.appendChild(errorEl);

  return group;
}
