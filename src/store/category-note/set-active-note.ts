import type { Set } from '.'
import type { NoteItem, Note } from '../types'
import { createConnection, TABLES } from '~/lib/jsstore'
import { setLastActiveNote } from './last-active'

export function setActiveNote( set: Set ){

  return async ( note: NoteItem ) => {

    const conn = createConnection()
    const notes = await conn.select<Note>({
      from: TABLES.NOTES,
      where: {
        id: note.id,
        deleted: 'null'
      }
    })
    conn.terminate();

    if(!notes || !notes.length){
      throw new Error('note not found')
    }

    setLastActiveNote(note.id)

    set(state => {
      state.activeNote = notes[0]
    })

  }


}