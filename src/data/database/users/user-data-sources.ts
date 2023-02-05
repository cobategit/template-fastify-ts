import { EntityUsers } from '../../../domain'
import {
  IUserDataSources,
  DataManipulationLanguage,
  DataQueryLanguage,
} from '../..'
import { AppError } from '../../../external'
import dotenv from 'dotenv'
dotenv.config()

export class UsersDataSources implements IUserDataSources {
  private dml: DataManipulationLanguage
  private dql: DataQueryLanguage

  constructor(dml: DataManipulationLanguage, dql: DataQueryLanguage) {
    this.dml = dml
    this.dql = dql
  }
  async bulkInsert<T>(data?: any): Promise<T> {
    throw new Error('Method not implemented.')
  }

  async insert<T>(data?: EntityUsers | undefined): Promise<T> {
    try {
      const res = await this.dml.dataManipulation(
        `insert user`,
        `insert into ${process.env.TABLE_USER} 
                      (kode, fullname, email, password, phone, alamat, jk, url_photo, id_role, created_by, created_at) 
                      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data?.kode,
          data?.fullName,
          data?.email,
          data?.password,
          data?.phone,
          data?.address,
          data?.jk,
          data?.urlPhoto,
          data?.idRole,
          data?.createdBy,
          data?.createdAt,
        ]
      )
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }

  async selectAll<T>(): Promise<T> {
    try {
      const res = await this.dql.dataQueryLanguage(
        `select * from ${process.env.TABLE_USER}`,
        []
      )
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }

  async selectByKode<T>(kode: string): Promise<T> {
    try {
      const res = await this.dql.dataQueryLanguage(
        `select * from ${process.env.TABLE_USER} where kode = ? limit 1`,
        [kode]
      )
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }

  async selectByEmail<T>(email: string): Promise<T> {
    try {
      const res = await this.dql.dataQueryLanguage(
        `select * from ${process.env.TABLE_USER} where email = ? limit 1`,
        [email]
      )
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }

  async update<T>(kode: string, data?: EntityUsers | undefined): Promise<T> {
    try {
      const res = await this.dml.dataManipulation(
        'update user',
        `update ${process.env.TABLE_USER} set fullname = ?, phone = ?, alamat = ?, jk = ?, url_photo = ? where kode = ?`,
        [
          data?.fullName,
          data?.phone,
          data?.address,
          data?.jk,
          data?.urlPhoto,
          kode,
        ]
      )
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }

  async delete<T>(kode: string): Promise<T> {
    try {
      const res = await this.dml.dataManipulation('delete user', `query`, [
        kode,
      ])
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }

  async genKodeUser<T>(): Promise<T> {
    try {
      const res = await this.dql.dataQueryLanguage(
        `SELECT MAX(COALESCE(RIGHT(kode, 1), 0)) AS kode_user
        FROM     ${process.env.TABLE_USER}
        WHERE
        (MONTH(created_at) = MONTH('2023-02-02'))
        AND (YEAR(created_at) = YEAR('2023-02-02'))
        AND (DAY(created_at) = DAY('2023-02-02')) limit 1`,
        []
      )
      return res
    } catch (error) {
      throw new AppError(400, false, `${error}`, '001')
    }
  }
}
