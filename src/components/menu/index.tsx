
import styles from './style.module.css'
import { Category } from './category';
import { Notes } from './notes';

export default function Menu(){

  return <div class={styles.container}>
    <Category />
    <Notes />
  </div>

}