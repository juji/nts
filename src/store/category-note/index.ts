
import { createWithSignal } from 'solid-zustand'
import { immer } from 'zustand/middleware/immer'
import { IDbStorage } from './idb-storage'

import type { NoteCategory, NoteLink, Note } from '../types'

import { addCategory } from './add-category'
import { updateCategory } from './update-category'
import { removeCategory } from './remove-category'

import { setActiveCategory } from './set-active-category'
import { setActiveNote } from './set-active-note'
import { updateTitle } from './update-title'
import { updateContent } from './update-content'
import { addNote } from './add-note'
import { removeNote } from './remove-note'

export type NoteCategoryState = {
  hydrated: boolean
  activeNote: Note | null
  activeCategory: NoteCategory | null
  categories: NoteCategory[]
  notes: NoteLink[]
  addCategory: ( categoryTitle: string ) => Promise<void>
  updateCategory: ( category: NoteCategory ) => Promise<void>
  removeCategory: (category: NoteCategory) => Promise<void>
  setActiveCategory: ( category: NoteCategory ) => Promise<void>
  setActiveNote: ( note: NoteLink ) => Promise<void>
  updateTitle: ( id: string, title: string ) => Promise<void>
  updateContent: ( id: string, content: string ) => Promise<void>
  addNote: ( category: NoteCategory ) => Promise<void>
  removeNote: ( note: NoteLink ) => Promise<void>
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
      removeCategory: removeCategory(set),
      setActiveNote: setActiveNote(set),
      updateTitle: updateTitle(set),
      updateContent: updateContent(set),
      addNote: addNote(set),
      removeNote: removeNote(set)
    }))
  )
)