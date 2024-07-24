
import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'
import { IDbStorage } from './idb-storage'

import type { NoteCategory, NoteItem, Note } from '../types'
import { addCategory } from './add-category'
import { updateCategory } from './update-category'
import { setActiveCategory } from './set-active-category'
import { setActiveNote } from './set-active-note'
import { updateTitle } from './update-title'
import { updateContent } from './update-content'
import { addNote } from './add-note'

export type NoteCategoryState = {
  hydrated: boolean
  activeNote: Note | null
  activeCategory: NoteCategory | null
  categories: NoteCategory[]
  notes: NoteItem[]
  addCategory: ( categoryTitle: string ) => Promise<void>
  updateCategory: ( category: NoteCategory ) => Promise<void>
  setActiveCategory: ( category: NoteCategory ) => Promise<void>
  setActiveNote: ( note: NoteItem ) => Promise<void>
  updateTitle: ( id: string, title: string ) => Promise<void>
  updateContent: ( id: string, content: string ) => Promise<void>
  addNote: ( category: NoteCategory ) => Promise<void>
}

export type Set = (
  nextStateOrUpdater: (state:NoteCategoryState) => void, 
  shouldReplace?: boolean | undefined
) => void

export const useCategoryNoteStore = createWithSignal<NoteCategoryState>()(
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
      updateContent: updateContent(set),
      addNote: addNote(set),
    }))
  )
)