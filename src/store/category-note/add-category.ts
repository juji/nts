import { nanoid } from 'nanoid'
import type { Set } from '.'
import { createConnection, TABLES } from '~/lib/jsstore'

export function addCategory( set: Set ){

  return async (categoryTitle: string) => {

    const data = {
      id: nanoid(),
      name: categoryTitle,
      created: new Date(),
    }
  
    const conn = createConnection()
    await conn.insert({
      into: TABLES.CATEGORY,
      values: [data]
    })
    
    conn.terminate();
  
    set(state => {
      state.categories.push(data)
      state.notes = []
    })

  }


}