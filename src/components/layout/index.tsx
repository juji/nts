import { ParentProps } from "solid-js";
import styles from './style.module.css'



export default function Layout( props: ParentProps ){

  return <div class={styles.container}>
      <aside>
        <header>

        </header>
        <div class={styles.menu}>

        </div>
      </aside>
      <main>
        {props.children}
      </main>
    </div>

}