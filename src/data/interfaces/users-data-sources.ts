import { EntityUsers } from '../../domain'

export interface IUserDataSources {
  insert<T>(data?: EntityUsers): Promise<T>
  bulkInsert<T>(data?: any): Promise<T>
  selectAll<T>(): Promise<T>
  selectByKode<T>(kode: string): Promise<T>
  selectByEmail<T>(email: string): Promise<T>
  update<T>(kode: string, data?: EntityUsers): Promise<T>
  delete<T>(kode: string): Promise<T>
  genKodeUser<T>(): Promise<T>
}
