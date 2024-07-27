
import styles from './style.module.css'
import { Category } from './category';
import { Notes } from './notes';
import { useCategoryNoteStore } from '~/store/category-note';

export default function Menu(){

  const activeCategory = useCategoryNoteStore(state => state.activeCategory)

  return <div class={styles.container}>
    <Category />
    {activeCategory() ? <Notes /> : null}
  </div>

}