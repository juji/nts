import type { NotesCategoryState } from '.'
import type { NotesCategory } from '../types'
import { createConnection, TABLES } from '~/lib/jsstore'


type Set = (
  nextStateOrUpdater: (state:NotesCategoryState) => void, 
  shouldReplace?: boolean | undefined
) => void

export function updateCategory( set: Set ){

  return async ( category: NotesCategory ) => {

    const conn = createConnection()
    await conn.update({
      in: TABLES.CATEGORY,
      set: category,
      where: { id: category.id }
    })
    conn.terminate();

    set(state => {
      const i = state.categories.findIndex((v: NotesCategory) => v.id === category.id)
      if(i<0) return; 
      state.categories[i] = category
    })

  }


}