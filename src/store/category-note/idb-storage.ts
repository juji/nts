import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'
import type { NoteCategory, NoteLink, Note } from '../types'
import { StateCreator } from 'zustand'
import { getLastActiveCategory, getLastActiveNote } from './last-active'

export type IDbStorageType = <T>(f: StateCreator<T, [], any[]>) => StateCreator<T, [], any[]>

export const IDbStorage: IDbStorageType = (f) => (set, get, store) => {
  type T = ReturnType<typeof f>

  // console.log('Initializing store')

  // initialize
  // get all category
  // get last active category
  // get last active note
  // set it on the store
  const conn = createConnection()
  conn.select<NoteCategory>({
    from: TABLES.CATEGORY,
    where: {
      deleted: DEFAULT_DELETED
    },
    order: {
      by: 'created',
      type: 'asc'
    }
  }).then(async categories => {

    if(categories.length){


      // get state on last active session
      const lastActiveCat = getLastActiveCategory()
      const lastActiveNote = getLastActiveNote()

      let activeCatIndex = lastActiveCat ? categories.findIndex(v => v.id === lastActiveCat) : -1

      // get notes based on last active category
      const notes = activeCatIndex < 0 ? [] : await conn.select<NoteLink>({
        from: TABLES.CATEGORY_NOTES,
        where: {
          categoryId: categories[activeCatIndex].id,
          deleted: DEFAULT_DELETED
        },
        order: {
          by: 'index',
          type: 'desc'  
        }
      })
      
      // get the active note
      function findActiveNote( noteList: NoteLink[] ): NoteLink|null{
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
            deleted: DEFAULT_DELETED
          }
        })

        if(!n || !n.length){
          // this is not a fatal error
          // just output to console
          console.error(`note not found: ${activeNote.id}`)
          console.error(activeNote)
        }else{
          note = n[0]
        }
      }else{
        const n = await conn.select<Note>({
          from: TABLES.NOTES,
          where: {
            id: notes[0].id,
            deleted: DEFAULT_DELETED
          }
        })
        note = n[0]
      }
      
      conn.terminate();

      set({
        hydrated: true,
        categories,
        notes,
        activeNote: note,
        activeCategory: activeCatIndex < 0 ? null : categories[activeCatIndex]
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