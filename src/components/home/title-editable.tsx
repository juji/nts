import { createSignal } from "solid-js"
import styles from './style.module.css'

export function TitleEditable({
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