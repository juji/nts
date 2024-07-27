import { createEffect } from "solid-js";
import { useCategoryNoteStore } from "~/store/category-note";


export function Notes(){

  const activeCategory = useCategoryNoteStore(state => state.activeCategory)
  const activeNote = useCategoryNoteStore(state => state.activeNote)
  const notes = useCategoryNoteStore(state => state.notes)

  createEffect(() => {
    console.log(
      activeCategory(),
      activeNote(),
      notes(),
    )
  })

  return activeCategory() ? <>
    
  </> : null

}