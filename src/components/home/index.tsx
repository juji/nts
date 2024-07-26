import styles from './style.module.css'
// import { Milkdown } from "../milkdown"
import { createSignal } from "solid-js"
import { Editor } from '../editor/tiptap'

function TitleEditable({
  initialContent,
  onChange
}:{
  initialContent: string
  onChange?: (str: string) => void
}){

  const [ content, setContent ] = createSignal(initialContent)

  // manage spaces by adding character on empty
  const splitContent = () => content() ? content().split('\n') : ['s']

  function onChangeLocal(e: InputEvent){
    const target = e.target as HTMLTextAreaElement
    setContent(target.value)
    onChange && onChange(target.value) 
  }

  // https://codepen.io/shshaw/pen/bGNJJBE
  // https://css-tricks.com/auto-growing-inputs-textareas/
  return <div class={styles.title}>
    {splitContent().map((v,i,a) => {
      return <>
        {v}{i === a.length-1 ? '' : <br />}
      </>
    })}
    <textarea 
      placeholder="Title"
      value={content()}
      onInput={onChangeLocal}></textarea>
  </div>

}



export default function Home(){

  return <div class={styles.container}>

    <div class={styles.headingContainer}>
      <TitleEditable initialContent={""} />
      <p>
        <span>{new Date().toLocaleString()}</span>
        <span>&nbsp;&nbsp;︱&nbsp;&nbsp;</span>
        <span>Updated: {new Date().toLocaleString()}</span>
      </p>
    </div>
    <div class={styles.editorContainer}>
      <Editor
        className={styles.editor} 
        initialContent=""
      />
      {/* <Milkdown 
        className={styles.editor} 
        initialContent=""
      /> */}
    </div>
  </div>

}