import { createInput } from '../components/input.js';
import { createSelect } from '../components/select.js';
import { createRoleSelector } from '../components/roleSelector.js';
import { createButton } from '../components/button.js';

/**
 * Assembles all form components and returns the form element.
 * @returns {{ form: HTMLFormElement, conditionalContainer: HTMLElement }}
 */
export function buildForm() {
  const form = document.createElement('form');
  form.id = 'registration-form';
  form.noValidate = true;

  // General error container (for server-side or submission errors)
  const generalError = document.createElement('div');
  generalError.id = 'form-general-error';
  generalError.classList.add('form-group__error', 'form-general-error');
  form.appendChild(generalError);

  // 1. Name
  form.appendChild(
    createInput({
      id: 'name',
      label: 'Nombre',
      placeholder: 'Ingresa tu nombre',
      required: true,
    })
  );

  // 2. Phone
  form.appendChild(
    createInput({
      id: 'phone',
      label: 'Número de teléfono',
      type: 'tel',
      placeholder: 'Ej: 300 123 4567',
      required: true,
    })
  );

  // 3. Role
  form.appendChild(
    createRoleSelector({
      id: 'role',
      label: 'Rol',
      options: [
        { value: 'coder', text: 'Coder' },
        { value: 'staff', text: 'Staff' },
      ],
      required: true,
    })
  );

  // 4-5. Conditional fields container
  const conditionalContainer = document.createElement('div');
  conditionalContainer.classList.add('conditional-fields');
  conditionalContainer.id = 'conditional-fields';

  // 4. Clan
  conditionalContainer.appendChild(
    createSelect({
      id: 'clan',
      label: 'Clan',
      placeholder: 'Selecciona tu clan',
      options: [
        { value: 'hamilton', text: 'Hamilton' },
        { value: 'thompson', text: 'Thompson' },
        { value: 'tesla', text: 'Tesla' },
        { value: 'mccarthy', text: 'McCarthy' },
        { value: 'turing', text: 'Turing' },
      ],
      required: true,
    })
  );

  // 5. Advanced path
  conditionalContainer.appendChild(
    createSelect({
      id: 'advancedPath',
      label: 'Ruta avanzada',
      placeholder: 'Selecciona tu ruta',
      options: [
        { value: 'java-spring', text: 'Java con Spring Boot' },
        { value: 'ts-next', text: 'TS con Next.js' },
        { value: 'ia-auto', text: 'IA Automatizador' },
        { value: 'data-analytics', text: 'Analítica de Datos' },
        { value: 'node-nest', text: 'Node con Nest.js' },
        { value: 'csharp-dotnet', text: 'C# con .NET' },
      ],
      required: true,
    })
  );

  form.appendChild(conditionalContainer);

  // 6. Submit
  form.appendChild(createButton({ text: 'REGISTRARSE →' }));

  return { form, conditionalContainer };
}
