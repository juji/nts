import type { NotesCategoryState } from '.'
import { createConnection, TABLES } from '~/lib/jsstore'


type Set = (
  nextStateOrUpdater: (state:NotesCategoryState) => void, 
  shouldReplace?: boolean | undefined
) => void

export function updateTitle( set: Set ){

  return async (id: string, noteTitle: string) => {
  
    const conn = createConnection()
    await Promise.all([
      conn.update({
        in: TABLES.NOTES,
        set: {
          title: noteTitle
        },
        where: {
          id
        }
      }),
      conn.update({
        in: TABLES.CATEGORY_NOTES,
        set: {
          title: noteTitle
        },
        where: {
          id
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