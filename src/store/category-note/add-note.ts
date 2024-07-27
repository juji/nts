import { nanoid } from 'nanoid'
import type { Set } from '.'
import type { NoteLink, Note, NoteCategory } from '../types'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'

export function addNote( set: Set ){

  return async ( category: NoteCategory ) => {

    const conn = createConnection()

    // get max note index
    const maxIndex = await conn.select<NoteLink>({
      from: TABLES.CATEGORY_NOTES,
      where: {
        deleted: DEFAULT_DELETED,
        categoryId: category.id
      },
      order: {
        by: 'index',
        type: 'desc'  
      },
      limit: 1
    })

    const note: NoteLink = {
      id: nanoid(),
      title: '',
      created: new Date(),
      deleted: DEFAULT_DELETED,
      categoryId: category.id,
      index: maxIndex.length ? (maxIndex[0].index ? maxIndex[0].index + 1 : 1) : 0
    }

    const noteContent: Note = {
      id: note.id,
      title: '',
      created: note.created,
      deleted: DEFAULT_DELETED,
      content: '',
      keywords: []
    }
    
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