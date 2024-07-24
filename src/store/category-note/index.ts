
import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'
import { IDbStorage } from './idb-storage'

import type { NotesCategory, NoteItem, Note } from '../types'
import { addCategory } from './add-category'
import { updateCategory } from './update-category'
import { setActiveCategory } from './set-active-category'
import { setActiveNote } from './set-active-note'
import { updateTitle } from './update-title'
import { updateContent } from './update-content'

export type NotesCategoryState = {
  hydrated: boolean
  activeNote: Note | null
  activeCategory: NotesCategory | null
  categories: NotesCategory[]
  notes: NoteItem[]
  addCategory: ( categoryTitle: string ) => Promise<void>
  updateCategory: ( category: NotesCategory ) => Promise<void>
  setActiveCategory: ( category: NotesCategory ) => Promise<void>
  setActiveNote: ( note: NoteItem ) => Promise<void>
  updateTitle: ( id: string, title: string ) => Promise<void>
  updateContent: ( id: string, content: string ) => Promise<void>
}

export const useCategoryNoteStore = createWithSignal<NotesCategoryState>()(
  IDbStorage(
    immer((set) => ({
      hydrated: false,
      categories: [],
      notes: [],
      activeCategory: null,
      activeNote: null,
      addCategory: addCategory(set),
      updateCategory: updateCategory(set),
      setActiveCategory: setActiveCategory(set),
      setActiveNote: setActiveNote(set),
      updateTitle: updateTitle(set),
      updateContent: updateContent(set)
    }))
  )
)