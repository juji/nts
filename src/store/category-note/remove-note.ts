
import type { Set } from '.'
import { createConnection, TABLES } from '~/lib/jsstore'
import { NoteLink } from '../types'
import { getLastActiveNote, setLastActiveNote } from './last-active'


export function removeNote( set: Set ){

  return async (note: NoteLink) => {
  
    const conn = createConnection()

    await conn.update({
      in: TABLES.CATEGORY_NOTES,
      set: {
        deleted: new Date()
      },
      where: {
        id: note.id
      }
    })
    
    await conn.update({
      in: TABLES.NOTES,
      set: {
        deleted: new Date()
      },
      where: {
        id: note.id
      }
    })

    if(getLastActiveNote() === note.id){
      setLastActiveNote(null)
    }
  
    set(state => {
      if(state.activeNote && state.activeNote.id === note.id){
        state.activeNote = null
      }
      state.notes = state.notes.filter(v => v.id !== note.id)
    })

  }


}