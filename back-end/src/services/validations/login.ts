import z from 'zod'
import bcrypt from 'bcrypt'
import ValidationErrors from '../../errors/ValidationErros'

export async function checkPassword(plaintextPassword: string, hashPassword: string) {
  const isValid = await bcrypt.compare(plaintextPassword, hashPassword);

  if (!isValid) {
    ValidationErrors.Unauthorized('username or password invalid')
  }
}
