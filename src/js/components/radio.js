/**
 * Creates a role radio group with pill-style buttons.
 * @param {object} config
 * @param {string} config.id
 * @param {string} config.label
 * @param {Array<{value: string, text: string}>} config.options
 * @param {boolean} [config.required=false]
 * @returns {HTMLElement}
 */
export function createRadioGroup({ id, label, options, required = false }) {
  const group = document.createElement('div');
  group.classList.add('form-group');

  const labelEl = document.createElement('label');
  labelEl.classList.add('form-group__label');
  labelEl.textContent = label;

  const radioGroup = document.createElement('div');
  radioGroup.classList.add('radio-group');

  options.forEach(({ value, text }) => {
    const pill = document.createElement('div');
    pill.classList.add('radio-group__pill');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = id;
    input.id = `${id}-${value}`;
    input.value = value;
    input.required = required;

    const pillLabel = document.createElement('label');
    pillLabel.classList.add('radio-group__pill-label');
    pillLabel.setAttribute('for', `${id}-${value}`);
    pillLabel.textContent = text;

    pill.appendChild(input);
    pill.appendChild(pillLabel);
    radioGroup.appendChild(pill);
  });

  const errorEl = document.createElement('div');
  errorEl.classList.add('form-group__error');
  errorEl.id = `${id}-error`;

  group.appendChild(labelEl);
  group.appendChild(radioGroup);
  group.appendChild(errorEl);

  return group;
}
