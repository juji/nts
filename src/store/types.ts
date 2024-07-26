


export type Note = {
  id: string
  title: string
  content?: string
  keywords?: string[]
  created: Date
  updated?: Date
  deleted?: Date
}

export type NoteItem = {
  id: string
  categoryId: string
  title: string
  notes?: NoteItem[]
  created: Date
  updated?: Date
  deleted?: Date
}

export type NoteCategory = {
  id: string
  name: string
  created: Date
  updated?: Date
  deleted?: Date
}

