import type { Set } from '.'
import type { NoteCategory, NoteItem, Note } from '../types'
import { createConnection, TABLES } from '~/lib/jsstore'
import { setLastActiveCategory, setLastActiveNote } from './last-active'

export function setActiveCategory( set: Set ){

  return async ( category: NoteCategory ) => {
    const conn = createConnection()
    
    const notes = await conn.select<NoteItem>({
      from: TABLES.CATEGORY_NOTES,
      where: {
        categoryId: category.id,
        deleted: 'null'
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
        deleted: 'null'
      }
    })
     
    conn.terminate();
    
    if(!note || !note.length){
      throw new Error('Note not found')
    }

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