import type { Set } from '.'
import { createConnection, TABLES } from '~/lib/jsstore'

export function updateTitle( set: Set ){

  return async (id: string, noteTitle: string) => {
  
    const conn = createConnection()
    await Promise.all([
      conn.update({
        in: TABLES.NOTES,
        set: {
          title: noteTitle,
          updated: new Date()
        },
        where: {
          id,
          deleted: 'null'
        }
      }),
      conn.update({
        in: TABLES.CATEGORY_NOTES,
        set: {
          title: noteTitle,
          updated: new Date()
        },
        where: {
          id,
          deleted: 'null'
        }
      })
    ])
    
    conn.terminate();
  
    set(state => {
      if(state.activeNote && state.activeNote.id === id)
        state.activeNote.title = noteTitle

      const i = state.notes.findIndex(v => v.id === id)
      if(i<0) return;
      state.notes[i].title = noteTitle
    })

  }


}