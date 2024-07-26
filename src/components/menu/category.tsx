import { useCategoryNoteStore } from "~/store/category-note";
import styles from './style.module.css'
import { createEffect, createSignal } from "solid-js";
import cx from "classix";
import { showError } from "~/lib/toast";

function NewForm({ onDone }:{ onDone: () => void }){
  const categories = useCategoryNoteStore(state => state.categories)
  const addCategory = useCategoryNoteStore(state => state.addCategory) 

  function onSubmit(e: SubmitEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const cat = fd.get('category') as string
    addCategory(cat)
    .then(() => {
      onDone()
    })
    .catch((e) => {
      showError(e.toString())
    })
  }

  function onChange(e: InputEvent){
    const target = e.target as HTMLInputElement
    const lc = target.value.toLowerCase()
    const c = categories().find(v => v.name.toLowerCase() === lc)
    if(c) target.setCustomValidity('Category exist')
  }

  return <form onSubmit={onSubmit}>
    <input onInput={onChange} type="text" 
      minLength={2} required name="category" placeholder="new catregory name" />
    <button type="submit">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>
    </button>
  </form>


}

export function Category(){

  const categories = useCategoryNoteStore(state => state.categories)
  const hydrated = useCategoryNoteStore(state => state.hydrated)

  const [ newForm, setNewForm ] = createSignal(false)
  const [ formVisible, setFormVisible ] = createSignal(false)

  createEffect(() => {
    const formVisible = newForm()
    if(formVisible) setFormVisible(true)
    else setTimeout(() => {
      setFormVisible(false)
    }, 300)
  })

  return <div class={styles.category}>
    <div class={styles.header}>
      <p>Category</p>
      <button onClick={() => setNewForm(!newForm())}>
        <svg class={newForm()?styles.rotated: ''} 
          fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path></svg>
      </button>
    </div>
    <div class={cx(styles.form, newForm() && styles.open)}>
      <div>
        {formVisible() ? <NewForm onDone={() => setNewForm(false)} /> : null}
      </div>
    </div>
    {hydrated() ? categories().map(v => <p>{v.name}</p>) : null}
  </div>
}