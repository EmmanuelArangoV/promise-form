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
  container.classList.add('success-view');

  const tag = document.createElement('p');
  tag.classList.add('success-view__tag');
  tag.textContent = 'SÉ PARTE DE NUESTRA DEMO';

  const title = document.createElement('h2');
  title.classList.add('success-view__title');
  title.textContent = `¡Listo, ${data.name.split(' ')[0]}!`;

  const subtitle = document.createElement('p');
  subtitle.classList.add('success-view__subtitle');
  subtitle.textContent = 'Te esperamos.';

  const details = document.createElement('p');
  details.classList.add('success-view__details');
  const roleName = data.role === 'coder' ? 'Coder' : 'Staff';
  const clanText = data.clan ? ` · ${data.clan.charAt(0).toUpperCase() + data.clan.slice(1)}` : '';
  details.innerHTML = `${data.name}<br>${roleName}${clanText}`;

  const backBtn = document.createElement('button');
  backBtn.classList.add('success-view__back');
  backBtn.textContent = '←  Volver';
  backBtn.addEventListener('click', onBack);

  container.appendChild(tag);
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(details);
  container.appendChild(backBtn);

  return container;
}
