import { nanoid } from 'nanoid'
import type { NotesCategoryState } from '.'
import { createConnection, TABLES } from '~/lib/jsstore'


type Set = (
  nextStateOrUpdater: (state:NotesCategoryState) => void, 
  shouldReplace?: boolean | undefined
) => void

export function addCategory( set: Set ){

  return async (categoryTitle: string) => {

    const data = {
      id: nanoid(),
      name: categoryTitle,
      created: new Date()
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