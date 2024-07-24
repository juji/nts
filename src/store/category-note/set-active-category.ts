import type { Set } from '.'
import type { NoteCategory, NoteItem, Note } from '../types'
import { createConnection, TABLES } from '~/lib/jsstore'
import { LSKEY } from './ls-key'

export function setActiveCategory( set: Set ){

  return async ( category: NoteCategory ) => {
    const conn = createConnection()
    
    const notes = await conn.select<NoteItem>({
      from: TABLES.CATEGORY_NOTES,
      where: {
        categoryId: category.id,
        deleted: 0
      },
      order: {
        by: 'created',
        type: 'desc'
      }
    })
    
    const note = await conn.select<Note>({
      from: TABLES.NOTES,
      where: {
        id: notes[0].id,
        deleted: 0
      }
    })
    
    if(!note || !note.length){
      console.error(`note not found:`)
      console.error(notes[0])
    }
    conn.terminate();
    
    set(state => {
      localStorage.setItem(LSKEY.LAST_ACTIVE_CATEGORY, category.id)
      state.activeCategory = category
      state.notes = notes
      if(note && note.length){
        localStorage.setItem(LSKEY.LAST_ACTIVE_NOTE, note[0].id)
        state.activeNote = note[0]
      }
    })
  }


}