import { nanoid } from 'nanoid'
import type { Set } from '.'
import type { NoteLink, Note, NoteCategory } from '../types'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'

export function addNote( set: Set ){

  return async ( category: NoteCategory ) => {

    const note: NoteLink = {
      id: nanoid(),
      title: '',
      created: new Date(),
      deleted: DEFAULT_DELETED,
      categoryId: category.id
    }

    const noteContent: Note = {
      id: note.id,
      title: '',
      created: note.created,
      deleted: DEFAULT_DELETED,
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