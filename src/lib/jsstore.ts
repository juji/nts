import workerInjector from "jsstore/dist/worker_injector";
import { Connection, DATA_TYPE, type IDataBase, type ITable } from '@juji/jsstore'

export const TABLES = {
  CATEGORY: 'category',
  CATEGORY_NOTES: 'category_notes',
  NOTES: 'notes'
}

export const DEFAULT_DELETED = new Date('1970-01-01T00:00:00.000Z')

export function createConnection(){
  const connection = new Connection();
  connection.addPlugin(workerInjector);
  const dataBase = getDatabase();
  connection.initDb(dataBase);
  return connection
}

function getDatabase(){

  const categoryTable: ITable = {
    name: TABLES.CATEGORY,
    columns: {
      id: { primaryKey: true, notNull: true, dataType: DATA_TYPE.String },
      name: { notNull: true, dataType: DATA_TYPE.String },
      created: { notNull: true, dataType: DATA_TYPE.DateTime },
      updated: { dataType: DATA_TYPE.DateTime },
      deleted: { dataType: DATA_TYPE.DateTime, default: DEFAULT_DELETED },
    }
  }
  
  const categoryNotesTable: ITable = {
    name: TABLES.CATEGORY_NOTES,
    columns: {
      id: { primaryKey: true, notNull: true, dataType: DATA_TYPE.String },
      categoryId: { notNull: true, dataType: DATA_TYPE.String },
      index: { notNull: true, dataType: DATA_TYPE.Number, default: 0 },
      title: { notNull: true, dataType: DATA_TYPE.String },
      notes: { dataType: DATA_TYPE.Array },
      created: { notNull: true, dataType: DATA_TYPE.DateTime },
      updated: { dataType: DATA_TYPE.DateTime },
      deleted: { dataType: DATA_TYPE.DateTime, default: DEFAULT_DELETED },
    }
  }
  
  const notesTable: ITable = {
    name: TABLES.NOTES,
    columns: {
      id: { primaryKey: true, notNull: true, dataType: DATA_TYPE.String },
      title: { notNull: true, dataType: DATA_TYPE.String, enableSearch: true },
      content: { dataType: DATA_TYPE.String },
      keywords: { dataType: DATA_TYPE.Array, multiEntry: true, enableSearch: true },
      created: { notNull: true, dataType: DATA_TYPE.DateTime },
      updated: { dataType: DATA_TYPE.DateTime },
      deleted: { dataType: DATA_TYPE.DateTime, default: DEFAULT_DELETED },
    }
  }
  
  const database: IDataBase = {
    name: 'nts',
    version: 1,
    tables: [
      categoryTable,
      categoryNotesTable,
      notesTable
    ]
  }

  return database

}


