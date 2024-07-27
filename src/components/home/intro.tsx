import cx from "classix"
import styles from './style.module.css'
import { Pencil } from "./pencil"
import { createEffect, createSignal, Show } from "solid-js"
import { useCategoryNoteStore } from "~/store/category-note"

export function Intro(){

  const activeCategory = useCategoryNoteStore(state => state.activeCategory)
  const [ intro, setIntro ] = createSignal(!activeCategory())
  const fadeOut = () => !!activeCategory()

  createEffect(() => {
    if(fadeOut()){
      setTimeout(() => {
        setIntro(false)
      },1000)
    }
  })

  return <Show when={intro()}>
    <div class={cx(styles.editorEmpty, fadeOut() && styles.fadeOut)}>
      <div><pre>
        Nts. <small>[read: notes]</small> Is your:<br />
        - Grocery Lists<br />
        - School Notes<br />
        - Personal Rants<br />
        - Diary<br />
        - or, Whatever.<br />
        <br />
        It's a colection of notes.<br />
        Your personal notes.<br /><br />
        <div class={styles.startHere}>
          <button onClick={() => {
            (
              document.getElementById('mobilemenubutton') as HTMLButtonElement
            )?.click()
          }}>Start Here</button>
        </div>
      </pre></div>
      <Pencil />
    </div>
  </Show>

}