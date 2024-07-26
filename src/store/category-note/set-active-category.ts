import type { Set } from '.'
import type { NoteCategory, NoteItem, Note } from '../types'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'
import { setLastActiveCategory, setLastActiveNote } from './last-active'

export function setActiveCategory( set: Set ){

  return async ( category: NoteCategory ) => {
    const conn = createConnection()
    
    const notes = await conn.select<NoteItem>({
      from: TABLES.CATEGORY_NOTES,
      where: {
        categoryId: category.id,
        deleted: DEFAULT_DELETED
      },
      order: {
        by: 'created',
        type: 'desc'
      }
    })
    
    const note = notes.length ? await conn.select<Note>({
      from: TABLES.NOTES,
      where: {
        id: notes[0].id,
        deleted: DEFAULT_DELETED
      }
    }) : null
     
    conn.terminate();

    set(state => {
      setLastActiveCategory(category.id)
      state.activeCategory = category
      state.notes = notes
      if(note && note.length){
        setLastActiveNote(note[0].id)
        state.activeNote = note[0]
      }
    })
  }


}