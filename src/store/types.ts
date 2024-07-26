


export type Note = {
  id: string
  title: string
  content?: string
  keywords?: string[]
  created: Date
  updated?: Date
  deleted?: Date
}

export type NoteLink = {
  id: string
  categoryId: string
  title: string
  notes?: NoteLink[]
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

