import bcrypt from 'bcrypt'
import { HashCompare, Hasher } from '@/data/protocols'

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
