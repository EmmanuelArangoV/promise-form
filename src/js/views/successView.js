/**
 * Builds the success state view that replaces the form.
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.role
 * @param {string} [data.clan]
 * @param {Function} onBack - callback to reset and show the form again
 * @returns {HTMLElement}
 */
export function buildSuccessView(data, onBack) {
  const container = document.createElement('div');
  container.classList.add('success-view', 'success-view--title-up', 'success-view--details-down');

  // Only show title and subtitle (and back button) in the confirmation view per request
  const title = document.createElement('h2');
  title.classList.add('success-view__title');
  // Prefer a precomputed displayName (from the service) but fall back to first token
  const displayName = data.displayName || (data.name ? data.name.split(' ')[0] : '');
  title.textContent = `¡Listo, ${displayName}!`;

  const subtitle = document.createElement('p');
  subtitle.classList.add('success-view__subtitle');
  subtitle.textContent = 'Te esperamos.';

  const backBtn = document.createElement('button');
  backBtn.classList.add('success-view__back');
  backBtn.textContent = '←  Volver';
  backBtn.addEventListener('click', onBack);

  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(backBtn);

  return container;
}
