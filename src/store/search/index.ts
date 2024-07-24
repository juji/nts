import { createConnection, TABLES } from '~/lib/jsstore'
import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'
import type { Note, NoteItem } from '../types'

export type NotesCategoryState = {
  text: string
  result: Note[]
  index: { [key:string]: NoteItem }
  loading: boolean
  setText: ( str: string ) => void
}

export const useCategoryNoteStore = createWithSignal<NotesCategoryState>()(
  immer((set) => ({
    text: '',
    result: [],
    index: {},
    loading: false,
    setText: ( str: string ) => set(async state => {
      state.text = str

      state.result = []
      state.index = {}
      if(!str) return;  

      state.loading = true

      const conn = createConnection()
      const res = await conn.select<Note>({
        from: TABLES.NOTES,
        where: {
          title: { regex: new RegExp(state.text,'i') },
          or: {
            keywords: { regex: new RegExp(state.text,'i') }
          }
        }
      })

      const index = res && res.length ? await conn.select<NoteItem>({
        from: TABLES.NOTES,
        where: {
          id: {
            in: res.map(v => v.id)
          }
        }
      }) : null
      
      conn.terminate()

      state.index = index ? index.reduce((a,b) => {
        a[b.id] = b
        return a
      },{} as { [key:string]: NoteItem }) : {}
      state.result = res
      state.loading = false
    })
  }))
)