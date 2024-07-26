import type { Set } from '.'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'

export function updateKeywords( set: Set ){

  return async (id: string, noteKeywords: string[]) => {
  
    const conn = createConnection()
    await conn.update({
      in: TABLES.NOTES,
      set: {
        keywords: noteKeywords,
        updated: new Date()
      },
      where: {
        id,
        deleted: DEFAULT_DELETED
      }
    })
    
    conn.terminate();
  
    set(state => {
      if(state.activeNote && state.activeNote.id === id)
        state.activeNote.keywords = noteKeywords
    })

  }


}