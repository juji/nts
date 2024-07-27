import { useCategoryNoteStore } from '~/store/category-note'
import styles from './style.module.css'
import { createEffect, createSignal } from 'solid-js'
import { Show } from 'solid-js'
import cx from 'classix'

export function Pencil(props:{ fadeOut?: boolean }){

  const fadeOut = () => props.fadeOut

  return <div class={cx(styles.pencil, fadeOut() && styles.fadeOut)}>
    <iframe 
      width="100%"
      height="100%"
      src="https://my.spline.design/pencilnobackground-6365a60021924d4962df3f0166622d6c/" 
    ></iframe>
    <a class={styles.splineDesignLink} 
      href="https://spline.design/?utm_source=public-url&utm_campaign=spline-logo"
      target="_blank" rel="noopener noreferrer"></a>
  </div>
}

export function PencilWaitingNote(){

  const activeNote = useCategoryNoteStore(state => state.activeNote)
  const [ shown, setShown ] = createSignal(false)
  const fadeOut = () => !!activeNote()

  createEffect(() => {
    if(fadeOut()){
      setTimeout(() => {
        setShown(false)
      },500)
    }
  })

  createEffect(() => {
    !activeNote() && setShown(true)
  })

  return <Show when={shown()}>
    <Pencil fadeOut={fadeOut()} />
  </Show>

}
