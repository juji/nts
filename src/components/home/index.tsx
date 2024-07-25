import { onPaste } from "~/lib/clean-clipboard-data"
import styles from './style.module.css'
import { Milkdown } from "../milkdown"

export default function Home(){

  return <div class={styles.container}>

    <Milkdown className={styles.editor} />
    {/* <div class={styles.heading}>
      <h1 contentEditable onPaste={onPaste}>This is main</h1>
      <div class={styles.dates}>
        <p>Created: date</p>
        <p>Updated: date</p>
      </div>
    </div>
    <div class={styles.content}>

    </div>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum alias iste vel, sapiente, autem eligendi, facilis ad earum dolor quia dolore blanditiis eveniet esse tenetur nihil? Necessitatibus dicta rerum cum.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum alias iste vel, sapiente, autem eligendi, facilis ad earum dolor quia dolore blanditiis eveniet esse tenetur nihil? Necessitatibus dicta rerum cum.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum alias iste vel, sapiente, autem eligendi, facilis ad earum dolor quia dolore blanditiis eveniet esse tenetur nihil? Necessitatibus dicta rerum cum.</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum alias iste vel, sapiente, autem eligendi, facilis ad earum dolor quia dolore blanditiis eveniet esse tenetur nihil? Necessitatibus dicta rerum cum.</p> */}
  </div>

}