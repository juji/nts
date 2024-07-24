import type { Set } from '.'
import type { NoteItem, Note } from '../types'
import { createConnection, TABLES } from '~/lib/jsstore'

export function setActiveNote( set: Set ){

  return async ( note: NoteItem ) => {

    const conn = createConnection()
    const notes = await conn.select<Note>({
      from: TABLES.NOTES,
      where: {
        id: note.id,
        deleted: 0
      }
    })
    conn.terminate();

    if(!notes || !notes.length){
      console.error('note not found:')
      console.error(note)
      return;
    }

    set(state => {
      state.activeNote = notes[0]
    })

  }


}