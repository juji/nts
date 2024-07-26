import { useCategoryNoteStore } from "~/store/category-note";
import styles from './style.module.css'
import { createEffect, createSignal } from "solid-js";
import cx from "classix";
import { showError } from "~/lib/toast";
import { NoteCategory } from "~/store/types";

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
    if(c) target.setCustomValidity('Category exists')
  }

  return <form onSubmit={onSubmit}>
    <input onInput={onChange} type="text" 
      minLength={2} required name="category" placeholder="new category name" />
    <button type="submit">
      <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>
    </button>
  </form>


}

function Selection(){

  const categories = useCategoryNoteStore(state => state.categories)
  const hydrated = useCategoryNoteStore(state => state.hydrated)
  const setActiveCategory = useCategoryNoteStore(state => state.setActiveCategory)
  const activeCategory = useCategoryNoteStore(state => state.activeCategory)
  const removeCategory = useCategoryNoteStore(state => state.removeCategory)
  const updateCategory = useCategoryNoteStore(state => state.updateCategory)

  const [ open, setOpen ] = createSignal(true)
  const [ edit, setEdit ] = createSignal<NoteCategory|null>(null)

  function removeCat(c: NoteCategory){
    removeCategory(c)
    .catch(e => {
      showError(e.toString())
    })
  }

  function onSubmitEdit(e: SubmitEvent){
    e.preventDefault()
    const fd = new FormData(e.target as HTMLFormElement)
    const name = fd.get('category_name') as string
    const cat = edit()
    if(!cat) return;
    updateCategory({
      ...cat,
      name
    })
    .then(() => {
      setEdit(null)
    })
    .catch((e) => {
      showError(e.toString())
    })
  }

  function onChange(e: InputEvent){
    const target = e.target as HTMLInputElement
    const lc = target.value.toLowerCase()
    const c = categories().find(v => v.name.toLowerCase() === lc)
    if(c) target.setCustomValidity('Category exists')
  }

  createEffect(() => {
    if(edit()) document.getElementById('categorynameinput')?.focus()
  })

  createEffect(() => {
    if(activeCategory()) setOpen(false)
  })

  createEffect(() => {
    if(!open()) setEdit(null)
  })

  return <div class={styles.selection}>
    { categories().length ? <>
      <div class={styles.selectionBox}>
        <button onClick={() => categories().length > 1 ? setOpen(!open()) : null}>
          <span>{activeCategory() ? activeCategory()?.name : <span>select category</span>}</span>
          <svg class={cx(open() && styles.open)} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.22 8.22a.749.749 0 0 0 0 1.06l6.25 6.25a.749.749 0 0 0 1.06 0l6.25-6.25a.749.749 0 1 0-1.06-1.06L12 13.939 6.28 8.22a.749.749 0 0 0-1.06 0Z"></path></svg>
        </button>
      </div>
      <div class={cx(styles.selectionList, open() && styles.open)}>
        <div>
          {hydrated() ? categories().map(v => (
            edit()?.id === v.id ? (
              <form 
                class={cx(styles.itemEdit, activeCategory()?.id === v.id && styles.active)}
                onSubmit={onSubmitEdit}>
                <input type="text" id="categorynameinput" onInput={onChange} required name="category_name" />
                <button type="submit">
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>
                </button>
                <button type="button" onClick={() => setEdit(null)}>
                  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path></svg>
                </button>
              </form>
            ) : (
              <div class={cx(styles.selectionItem, activeCategory()?.id === v.id && styles.active)}>
                <button 
                  onClick={() => setActiveCategory(v)}>{v.name}</button>
                <button 
                  onClick={() => setEdit(v)}>
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806-2.94-2.939-10.279 9.813ZM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"></path></svg>
                  </button>
                <button 
                  onClick={() => removeCat(v)}>
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"></path></svg>
                </button>
              </div>
            )
          )) : null}
        </div>
      </div>
    </> : <p class={styles.emptyCategory}>Create category to start</p> }
    
  </div>

}

export function Category(){


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
    <Selection />
  </div>
}