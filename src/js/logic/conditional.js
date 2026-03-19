/**
 * Sets up conditional show/hide logic for clan and advancedPath fields.
 * @param {HTMLFormElement} form
 * @param {HTMLElement} conditionalContainer
 */
export function setupConditional(form, conditionalContainer) {
  const radios = form.querySelectorAll('input[name="role"]');

  radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const isCoder = e.target.value === 'coder';

      if (isCoder) {
        conditionalContainer.classList.add('conditional-fields--visible');
      } else {
        conditionalContainer.classList.remove('conditional-fields--visible');
        // Reset conditional fields
        const clan = conditionalContainer.querySelector('#clan');
        const advancedPath = conditionalContainer.querySelector('#advancedPath');
        if (clan) clan.selectedIndex = 0;
        if (advancedPath) advancedPath.selectedIndex = 0;

        // Clear errors
        const errors = conditionalContainer.querySelectorAll('.form-group__error');
        errors.forEach((el) => (el.textContent = ''));

        const inputs = conditionalContainer.querySelectorAll('.form-group__input, .form-group__select');
        inputs.forEach((el) => {
          el.classList.remove('form-group__input--error', 'form-group__select--error');
        });
      }
    });
  });
}
