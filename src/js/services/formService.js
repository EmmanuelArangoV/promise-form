import { db } from '../../config/firebase.js';
import { doc, runTransaction } from 'firebase/firestore';

function toTitleCase(str) {
  if (!str) return null;
  return str
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' ');
}

function normalizeRole(role) {
  if (!role) return null;
  return role.toString().toLowerCase();
}

export async function submitForm(data) {
  // Ensure required fields
  if (!data.name || !data.phone || !data.role) {
    return { success: false, error: 'Todos los campos obligatorios deben estar llenos.' };
  }

  // Extract digits from phone and validate length (10 digits for Colombia)
  let digits = (data.phone || '').replace(/\D/g, '');
  // Optional: if users might include a leading "57" (country code) handle it:
  if (digits.length === 12 && digits.startsWith('57')) {
    digits = digits.slice(2);
  }
  if (digits.length !== 10) {
    return { success: false, error: 'El número debe tener 10 dígitos (sin código de país).' };
  }

  // Normalize phone to E.164 with +57 (no spaces)
  const phoneNormalized = `+57${digits}`;

  // Normalize other fields
  const user = {
    // Store only the first word of the provided name (e.g. "Emmanuel Arango Velasquez" -> "Emmanuel")
    name: toTitleCase((data.name || '').trim().split(/\s+/).filter(Boolean)[0] || ''),
    phone: phoneNormalized,
    role: normalizeRole(data.role),
    clan: data.clan ? toTitleCase(data.clan.trim()) : null,
    advancedPath: data.advancedPath ? toTitleCase(data.advancedPath.trim()) : null,
  };
  // Display name: always use the first token in Title Case
  const nameTokens = (data.name || '').trim().split(/\s+/).filter(Boolean);
  const displayName = toTitleCase(nameTokens[0] || '');

  // Guard: db must existir (por si la configuración de Firebase falló)
  if (!db) {
    console.error('Firebase DB no inicializado. Revisa src/config/firebase.js y tus VITE_FIREBASE_* env vars.');
    return { success: false, error: 'Error de configuración: Firebase no inicializado.' };
  }

  try {
    // Atomic creation: use a transaction and a document whose ID is the normalized phone.
    const userRef = doc(db, 'users', phoneNormalized);
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(userRef);
      if (snap.exists()) {
        // throw something recognizable
        throw new Error('DUPLICATE_PHONE');
      }
      tx.set(userRef, user);
    });

    return { success: true, docId: phoneNormalized, displayName, role: user.role, clan: user.clan };
  } catch (err) {
    if (err && err.message === 'DUPLICATE_PHONE') {
      return { success: false, field: 'phone', error: 'Ya existe un registro con ese número de teléfono.' };
    }
    console.error('Error saving to Firestore', err);
    // Si es un error de permisos (403), el mensaje real viene en la consola/Network
    return { success: false, error: 'Error al guardar en la base de datos.' };
  }
}
