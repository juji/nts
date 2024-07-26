import { nanoid } from 'nanoid'
import type { Set } from '.'
import { createConnection, DEFAULT_DELETED, TABLES } from '~/lib/jsstore'
import { Note, NoteLink } from '../types'

export function addCategory( set: Set ){

  return async (categoryTitle: string) => {

    // creating a new category 
    // will also create note

    const data = {
      id: nanoid(),
      name: categoryTitle,
      created: new Date(),
    }

    const note: NoteLink = {
      id: nanoid(),
      title: '',
      created: new Date(),
      deleted: DEFAULT_DELETED,
      categoryId: data.id
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
        into: TABLES.CATEGORY,
        values: [data]
      }),
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
      state.categories.push(data)
      state.activeCategory = data
      state.activeNote = noteContent
      state.notes = [ note ]
    })

  }


}