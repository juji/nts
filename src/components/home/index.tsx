import { onPaste } from "~/lib/clean-clipboard-data"
import styles from './style.module.css'
import { Milkdown } from "../milkdown"


export default function Home(){

  return <div class={styles.container}>

    <div class={styles.headingContainer}>
      <h1 contentEditable onPaste={onPaste}></h1>
      <p>
        <span>{new Date().toLocaleString()}</span>
        <span>&nbsp;&nbsp;︱&nbsp;&nbsp;</span>
        <span>Updated: {new Date().toLocaleString()}</span>
      </p>
    </div>
    <div class={styles.editorContainer}>
      <Milkdown 
        className={styles.editor} 
        initialContent="Hello"
      />
    </div>
  </div>

}