import { createConnection, TABLES } from '~/lib/jsstore'
import type { NoteCategory, NoteItem, Note } from '../types'
import { LSKEY } from './ls-key'
import { StateCreator } from 'zustand'

export type IDbStorageType = <T>(f: StateCreator<T, [], any[]>) => StateCreator<T, [], any[]>

export const IDbStorage: IDbStorageType = (f) => (set, get, store) => {
  type T = ReturnType<typeof f>

  // initialize
  // get all category
  // get last active category
  // get last active note
  // set it on the store
  const conn = createConnection()
  conn.select<NoteCategory>({
    from: TABLES.CATEGORY,
    order: {
      by: 'created',
      type: 'asc'
    }
  }).then(async categories => {

    if(categories.length){

      const lastActiveCat = localStorage.getItem(LSKEY.LAST_ACTIVE_CATEGORY)
      const lastActiveNote = localStorage.getItem(LSKEY.LAST_ACTIVE_NOTE)

      let activeCatIndex = lastActiveCat ? categories.findIndex(v => v.id === lastActiveCat) : 0
      activeCatIndex = activeCatIndex < 0 ? 0 : activeCatIndex

      const notes = await conn.select<NoteItem>({
        from: TABLES.CATEGORY_NOTES,
        where: {
          categoryId: categories[activeCatIndex].id,
          deleted: 0
        },
        order: {
          by: 'created',
          type: 'desc'
        }
      })
      
      function findActiveNote( noteList: NoteItem[] ): NoteItem|null{
        if(!noteList) return null
        if(!noteList.length) return null
        if(!lastActiveNote) return null
        
        const noteItems = noteList
        for(let i in noteItems){
          if(noteItems[i].deleted) continue;
          if(noteItems[i].id === lastActiveNote) return noteItems[i]
          if(noteItems[i].notes) {
            const child = findActiveNote( noteItems[i].notes )
            if(child) return child
          }
        }
        return null
      }
      
      const activeNote = findActiveNote( notes )
      let note: Note|null = null
      if(activeNote){
        const n = await conn.select<Note>({
          from: TABLES.NOTES,
          where: {
            id: activeNote.id,
            deleted: 0
          }
        })
        if(!n || !n.length){
          console.error(`note not found: ${activeNote.id}`)
          console.error(activeNote)
        }else{
          note = n[0]
        }
      }
      
      conn.terminate();

      set({
        hydrated: true,
        categories,
        notes,
        activeNote: note
      } as unknown as Partial<T>)

    }else{

      conn.terminate();
      set({
        hydrated: true,
        categories,
        notes: []
      } as unknown as Partial<T>)

    }
    
  }).catch(e => {
    console.error('error on setting up')
    console.error(e)
  })

  return f(set, get, store)
}