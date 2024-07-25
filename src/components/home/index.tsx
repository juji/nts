import { onPaste } from "~/lib/clean-clipboard-data"
import styles from './style.module.css'
import { Milkdown } from "../milkdown"
import UAParser from 'ua-parser-js'
import { createSignal } from "solid-js"

function TitleEditable({
  initialContent,
  onChange
}:{
  initialContent: string
  onChange?: (str: string) => void
}){

  const [ content, setContent ] = createSignal(initialContent)
  const splitContent = () => content().split('\n')

  function onChangeLocal(e: InputEvent){
    const target = e.target as HTMLTextAreaElement
    setContent(target.value)
    onChange && onChange(target.value) 
  }

  // https://codepen.io/shshaw/pen/bGNJJBE
  // https://css-tricks.com/auto-growing-inputs-textareas/
  return <div class={styles.textarea}>
    {splitContent().map((v,i,a) => {
      return <>
        {v}{i === a.length-1 ? '' : <br />}
      </>
    })}
    <textarea 
      placeholder="Title"
      value={content()}
      onPaste={onPaste}
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
      <Milkdown 
        className={styles.editor} 
        initialContent="Hello"
      />
    </div>
  </div>

}