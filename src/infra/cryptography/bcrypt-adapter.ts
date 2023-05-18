import bcrypt from 'bcrypt'
import { HashCompare, Hasher } from '@/data/protocols'

export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
