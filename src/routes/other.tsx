import { createEffect } from "solid-js"
import { useCategoryNoteStore } from "~/store/category-note"

export default function Other(){

  const categories = useCategoryNoteStore(s => s.categories)

  // with a or A
  // zustand doesn't restart
  // OK
  createEffect(() => {
    console.log('categories', categories())
  })

  return <p>asdf</p>

}