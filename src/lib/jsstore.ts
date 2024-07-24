import workerInjector from "jsstore/dist/worker_injector";
import { Connection, DATA_TYPE, type IDataBase, type ITable } from 'jsstore'

export const TABLES = {
  CATEGORY: 'category',
  CATEGORY_NOTES: 'category_notes',
  NOTES: 'notes'
}

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
    }
  }
  
  const categoryNotesTable: ITable = {
    name: TABLES.CATEGORY_NOTES,
    columns: {
      id: { primaryKey: true, notNull: true, dataType: DATA_TYPE.String },
      categoryId: { notNull: true, dataType: DATA_TYPE.String, enableSearch: true },
      index: { notNull: true, dataType: DATA_TYPE.Number },
      title: { notNull: true, dataType: DATA_TYPE.String },
      notes: { dataType: DATA_TYPE.Array },
      created: { notNull: true, dataType: DATA_TYPE.DateTime },
      updated: { dataType: DATA_TYPE.DateTime },
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
    }
  }
  
  const database: IDataBase = {
    name: 'nts',
    tables: [
      categoryTable,
      categoryNotesTable,
      notesTable
    ]
  }

  return database

}


