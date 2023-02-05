import { IDml, IMysqlWrapper } from '../../interfaces'
import { AppLogger, AppError } from '../../../external'
import { OkPacket, RowDataPacket } from 'mysql2'

export class DataManipulationLanguage implements IDml {
    private db: IMysqlWrapper

    constructor(db: IMysqlWrapper) {
        this.db = db
    }
    async dataManipulation(type: string, query: string, queryConfig: any[]): Promise<any> {
        await this.db.beginTransaction()
        try {
            const dbRes = await this.db.query(`${query}`, queryConfig)
            await this.db.commit()
            return dbRes
        } catch (error) {
            await this.db.rollback()
            AppLogger.warn('dml-query', { error })
            throw new AppError(400, false, `${error}`, '001')
        }
    }

}