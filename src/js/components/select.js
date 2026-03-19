/**
 * Creates a labeled select DOM node.
 * @param {object} config
 * @param {string} config.id
 * @param {string} config.label
 * @param {string} config.placeholder
 * @param {Array<{value: string, text: string}>} config.options
 * @param {boolean} [config.required=false]
 * @returns {HTMLElement}
 */
export function createSelect({ id, label, placeholder, options, required = false }) {
  const group = document.createElement('div');
  group.classList.add('form-group');

  const labelEl = document.createElement('label');
  labelEl.classList.add('form-group__label');
  labelEl.setAttribute('for', id);
  labelEl.textContent = label;

  const wrapper = document.createElement('div');
  wrapper.classList.add('form-group__select-wrapper');

  const select = document.createElement('select');
  select.classList.add('form-group__select');
  select.id = id;
  select.name = id;
  select.required = required;

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = placeholder;
  defaultOpt.disabled = true;
  defaultOpt.selected = true;
  select.appendChild(defaultOpt);

  options.forEach(({ value, text }) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = text;
    select.appendChild(opt);
  });

  wrapper.appendChild(select);

  const errorEl = document.createElement('div');
  errorEl.classList.add('form-group__error');
  errorEl.id = `${id}-error`;

  group.appendChild(labelEl);
  group.appendChild(wrapper);
  group.appendChild(errorEl);

  return group;
}
