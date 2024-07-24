import type { NotesCategoryState } from '.'
import { createConnection, TABLES } from '~/lib/jsstore'


type Set = (
  nextStateOrUpdater: (state:NotesCategoryState) => void, 
  shouldReplace?: boolean | undefined
) => void

export function updateKeywords( set: Set ){

  return async (id: string, noteKeywords: string[]) => {
  
    const conn = createConnection()
    await conn.update({
      in: TABLES.NOTES,
      set: {
        keywords: noteKeywords
      },
      where: {
        id
      }
    })
    
    conn.terminate();
  
    set(state => {
      if(state.activeNote && state.activeNote.id === id)
        state.activeNote.keywords = noteKeywords
    })

  }


}