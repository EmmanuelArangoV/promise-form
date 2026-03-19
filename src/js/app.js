import { buildForm } from './views/formView.js';
import { buildSuccessView } from './views/successView.js';
import { setupConditional } from './logic/conditional.js';
import { validateForm } from './logic/validation.js';
import { submitForm } from './services/formService.js';
import { setupThemeToggle } from './logic/themeToggle.js';

function init() {
  setupThemeToggle();

  const container = document.getElementById('form-container');
  if (!container) return;

  mountForm(container);
}

function mountForm(container) {
  // Keep tag and heading, remove form/success if present
  const existing = container.querySelector('#registration-form');
  if (existing) existing.remove();
  const existingSuccess = container.querySelector('.success-view');
  if (existingSuccess) existingSuccess.remove();

  const { form, conditionalContainer } = buildForm();
  container.appendChild(form);

  // Setup conditional show/hide
  setupConditional(form, conditionalContainer);

  // Handle submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors(form);

    const roleRadio = form.querySelector('input[name="role"]:checked');
    const isCoderRole = roleRadio?.value === 'coder';

    const data = {
      name: form.querySelector('#name').value,
      phone: form.querySelector('#phone').value,
      role: roleRadio?.value || '',
      ...(isCoderRole && {
        clan: form.querySelector('#clan').value,
        advancedPath: form.querySelector('#advancedPath').value,
      }),
    };

    const errors = validateForm(data, isCoderRole);

    if (Object.keys(errors).length > 0) {
      displayErrors(form, errors);
      return;
    }

    const button = form.querySelector('.btn-submit');
    button.disabled = true;
    button.textContent = 'REGISTRANDO...';

    const result = await submitForm(data);

    if (result.success) {
      // Remove form, show success view
      form.remove();
      // Build a view payload that combines the original data and any computed fields
      const successData = Object.assign({}, data, {
        displayName: result.displayName || undefined,
        role: result.role || data.role,
        clan: result.clan || data.clan || undefined,
        name: data.name,
      });

      // hide the static tag and heading while success view is visible
      const tagEl = container.querySelector('.form-panel__tag');
      const headingEl = container.querySelector('.form-panel__heading');
      if (tagEl) tagEl.style.display = 'none';
      if (headingEl) headingEl.style.display = 'none';

      const successView = buildSuccessView(successData, () => {
        // remove success view and restore header/tag before remounting form
        successView.remove();
        if (tagEl) tagEl.style.display = '';
        if (headingEl) headingEl.style.display = '';
        mountForm(container);
      });
      container.appendChild(successView);
    } else {
      // If the service returned a field-specific error, display it
      if (result.field) {
        displayErrors(form, { [result.field]: result.error });
      } else {
        // Fallback: show a general error message at top or alert
        const generalErr = form.querySelector('#form-general-error');
        if (generalErr) generalErr.textContent = result.error || 'Error inesperado.';
        else alert(result.error || 'Error inesperado al enviar el formulario.');
      }

      button.disabled = false;
      button.textContent = 'REGISTRARSE →';
    }
  });
}

function displayErrors(form, errors) {
  for (const [field, message] of Object.entries(errors)) {
    const errorEl = form.querySelector(`#${field}-error`);
    if (errorEl) errorEl.textContent = message;

    const input = form.querySelector(`#${field}`);
    if (input) {
      const errorClass = input.tagName === 'SELECT'
        ? 'form-group__select--error'
        : 'form-group__input--error';
      input.classList.add(errorClass);
    }
  }
}

function clearErrors(form) {
  form.querySelectorAll('.form-group__error').forEach((el) => (el.textContent = ''));
  form.querySelectorAll('.form-group__input--error').forEach((el) =>
    el.classList.remove('form-group__input--error')
  );
  form.querySelectorAll('.form-group__select--error').forEach((el) =>
    el.classList.remove('form-group__select--error')
  );
}

console.log(import.meta.env.VITE_FIREBASE_API_KEY);



document.addEventListener('DOMContentLoaded', init);
