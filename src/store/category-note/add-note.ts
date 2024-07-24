import { nanoid } from 'nanoid'
import type { Set } from '.'
import type { NoteItem, Note, NoteCategory } from '../types'
import { createConnection, TABLES } from '~/lib/jsstore'

export function addNote( set: Set ){

  return async ( category: NoteCategory ) => {

    const note: NoteItem = {
      id: nanoid(),
      title: '',
      created: new Date(),
      deleted: 0,
      categoryId: category.id
    }

    const noteContent: Note = {
      id: note.id,
      title: '',
      created: note.created,
      deleted: 0,
      content: '',
      keywords: []
    }

    const conn = createConnection()
    
    await Promise.all([
      conn.insert({
        into: TABLES.CATEGORY_NOTES,
        values: [note]
      }), 
      conn.insert({
        into: TABLES.NOTES,
        values: [noteContent]
      })
    ])

    conn.terminate();

    set(state => {
      state.notes.unshift(note)
      state.activeNote = noteContent
    })

  }


}