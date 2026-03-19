/**
 * Validates form data. Pure function — no DOM access.
 * @param {object} data - Plain object with field values.
 * @param {boolean} isCoderRole - Whether conditional fields should be validated.
 * @returns {object} errors - Object with field name keys and Spanish error message values.
 */
export function validateForm(data, isCoderRole) {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'El nombre es obligatorio.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  } else if (data.name.trim().length > 100) {
    errors.name = 'El nombre no puede exceder los 100 caracteres.';
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.phone = 'El número de teléfono es obligatorio.';
  } else {
    // Normalize to digits and require exactly 10 digits (Colombia local number without country code)
    const digits = (data.phone || '').replace(/\D/g, '');
    if (digits.length !== 10) {
      errors.phone = 'El número debe tener exactamente 10 dígitos (sin código de país).';
    }
  }

  if (!data.role) {
    errors.role = 'Selecciona un rol.';
  }

  if (isCoderRole) {
    if (!data.clan) {
      errors.clan = 'Selecciona un clan.';
    }
    if (!data.advancedPath) {
      errors.advancedPath = 'Selecciona una ruta avanzada.';
    }
  }

  return errors;
}
