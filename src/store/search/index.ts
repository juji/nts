import { createConnection, TABLES } from '~/lib/jsstore'
import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'
import type { Note, NoteLink } from '../types'

export type SearchState = {
  text: string
  result: Note[]
  index: { [key:string]: NoteLink }
  loading: boolean
  setText: ( str: string ) => void
}

export const useSearchStore = createWithSignal<SearchState>()(
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

      const index = res && res.length ? await conn.select<NoteLink>({
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
      },{} as { [key:string]: NoteLink }) : {}
      state.result = res
      state.loading = false
    })
  }))
)