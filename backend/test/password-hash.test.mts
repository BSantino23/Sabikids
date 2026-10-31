import assert from 'node:assert/strict';
import test from 'node:test';
import { hashWerkzeugPassword, verifyWerkzeugPassword } from '../src/auth/password-hash.ts';

test('new passwords are saved and verified in a Werkzeug-compatible scrypt format', async () => {
  const encoded = await hashWerkzeugPassword('sabikids-test-password');
  assert.match(encoded, /^scrypt:32768:8:1\$/);
  assert.equal(await verifyWerkzeugPassword('sabikids-test-password', encoded), true);
  assert.equal(await verifyWerkzeugPassword('wrong-password', encoded), false);
});
