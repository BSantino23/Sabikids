import { pbkdf2, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

function deriveScrypt(
  password: string,
  salt: string,
  length: number,
  options: { N: number; r: number; p: number; maxmem: number },
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, length, options, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

function derivePbkdf2(
  password: string,
  salt: string,
  iterations: number,
  length: number,
  digest: string,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, iterations, length, digest, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

function safeHexEqual(expectedHex: string, actual: Buffer): boolean {
  if (!/^[\da-f]+$/i.test(expectedHex) || expectedHex.length % 2 !== 0) {
    return false;
  }
  const expected = Buffer.from(expectedHex, 'hex');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function hashWerkzeugPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const key = await deriveScrypt(password, salt, 64, {
    N: 32768,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  return `scrypt:32768:8:1$${salt}$${key.toString('hex')}`;
}

export async function verifyWerkzeugPassword(
  password: string,
  encoded: string,
): Promise<boolean> {
  const [method, salt, expected, extra] = encoded.split('$');
  if (!method || !salt || !expected || extra !== undefined) return false;

  try {
    if (method.startsWith('scrypt:')) {
      const [, nText, rText, pText] = method.split(':');
      const N = Number(nText);
      const r = Number(rText);
      const p = Number(pText);
      if (
        !Number.isInteger(N) || N < 2 || N > 1_048_576 ||
        !Number.isInteger(r) || r < 1 || r > 32 ||
        !Number.isInteger(p) || p < 1 || p > 16
      ) return false;

      const maxmem = Math.max(64 * 1024 * 1024, 128 * N * r + 1024);
      const actual = await deriveScrypt(password, salt, expected.length / 2, {
        N, r, p, maxmem,
      });
      return safeHexEqual(expected, actual);
    }

    if (method.startsWith('pbkdf2:')) {
      const [, digest, roundsText] = method.split(':');
      const rounds = Number(roundsText);
      if (
        !['sha1', 'sha256', 'sha512'].includes(digest) ||
        !Number.isInteger(rounds) || rounds < 1 || rounds > 10_000_000
      ) return false;
      const actual = await derivePbkdf2(
        password, salt, rounds, expected.length / 2, digest,
      );
      return safeHexEqual(expected, actual);
    }
  } catch {
    return false;
  }

  return false;
}
