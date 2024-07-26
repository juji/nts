
import styles from './style.module.css'
import { useCategoryNoteStore } from "~/store/category-note";

export default function Menu(){

  const categories = useCategoryNoteStore(state => state.categories)
  const hydrated = useCategoryNoteStore(state => state.hydrated)
  const addCategory = useCategoryNoteStore(state => state.addCategory)

  return <div class={styles.container}>
    menu
  </div>

}