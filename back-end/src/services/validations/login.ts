import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';
import { tokenData } from '../../interfaces/IUser';
import ValidationErrors from '../../errors/ValidationErros';

const key = 'jwt.key';

export async function checkPassword(plaintextPassword: string, hashPassword: string) {
  const isValid = await bcrypt.compare(plaintextPassword, hashPassword);

  if (!isValid) {
    ValidationErrors.Unauthorized('Invalid username or password');
  }
}

export async function hashPassword(password: string) {
  const SALT = 8;
  const hashPassword = await bcrypt.hash(password, SALT);

  return hashPassword;
}

export async function makeToken(payload: tokenData): Promise<string> {
  const secret = await fs.readFile(key, 'utf-8');
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });
  
  return token;
}

export async function verifyToken(token: string | undefined): Promise<tokenData | undefined> {
  const secret = await fs.readFile(key, 'utf-8');
  
  try {
    const data = jwt.verify(token as string, secret);
    
    return data as tokenData;
  } catch (err) {
    ValidationErrors.Unauthorized('Expired or invalid token');
  }
}
