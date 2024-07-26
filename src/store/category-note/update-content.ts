import type { Set } from '.'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'

export function updateContent( set: Set ){

  return async (id: string, noteContent: string) => {
    
    const conn = createConnection()
    await conn.update({
      in: TABLES.NOTES,
      set: {
        content: noteContent,
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
        state.activeNote.content = noteContent
    })

  }


}