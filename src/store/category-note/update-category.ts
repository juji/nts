import type { Set } from '.'
import type { NoteCategory } from '../types'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'

export function updateCategory( set: Set ){

  return async ( category: NoteCategory ) => {

    category.updated = new Date()
    const conn = createConnection()
    await conn.update({
      in: TABLES.CATEGORY,
      set: category,
      where: { 
        id: category.id,
        deleted: DEFAULT_DELETED 
      }
    })
    conn.terminate();

    set(state => {
      const i = state.categories.findIndex((v: NoteCategory) => v.id === category.id)
      if(i<0) return; 
      state.categories[i] = category
    })

  }


}