import { useCategoryNoteStore } from "~/store/category-note";
import styles from './style.module.css'
import cx from "classix";
import { NoteLink } from "~/store/types";
import { createMemo, createSignal } from "solid-js";
import { Switch, Match, For } from "solid-js"

function NoteLinkContainer({ noteLink }:{ noteLink: NoteLink }){

  const activeNote = useCategoryNoteStore(state => state.activeNote)
  const setActiveNote = useCategoryNoteStore(state => state.setActiveNote)
  const removeNote = useCategoryNoteStore(state => state.removeNote)
  const [ remove, setRemove ] = createSignal(false)

  return <div class={cx(styles.note)}>
    <button 
      onClick={() => removeNote(noteLink)}
      class={cx(styles.removeButton, remove() && styles.shown)}>
      Confirm Removal
    </button>
    <button 
      class={cx(styles.title, activeNote()?.id === noteLink.id && styles.active)} 
      onClick={() => setActiveNote(noteLink)}>
      {noteLink.title||'Untitled'}
    </button>
    <div>
      <button class={styles.remove} onClick={() => setRemove(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" 
          fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" /></svg>
      </button>
      <button class={styles.moveCategory}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z" fill="currentColor" /><path d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z" fill="currentColor" /></svg>
      </button>
      <button class={styles.sort}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16H13.5L13.5 10H15.5L15.5 16H17L14.5 19L12 16Z" fill="currentColor" /><path d="M8 8H9.5L9.5 14H11.5L11.5 8H13L10.5 5L8 8Z" fill="currentColor" /></svg>
      </button>
    </div>
    <button 
      onClick={() => setRemove(false)}
      class={cx(styles.cancelRemoveButton, remove() && styles.shown)}>
      Cancel
    </button>
  </div>

}


function NotesContainer( props :{ notes: NoteLink[] }){

  const notes = () => props.notes

  return <For each={notes()}>
    {(v) => <div class={styles.noteContainer}>
      <NoteLinkContainer noteLink={v} />
      {v.notes ? <NotesContainer notes={v.notes} /> : null }
    </div>}
  </For>

}

export function Notes(){

  const activeCategory = useCategoryNoteStore(state => state.activeCategory)
  const notes = useCategoryNoteStore(state => state.notes)
  const addNote = useCategoryNoteStore(state => state.addNote)

  return <Switch fallback={(
      <div class={styles.empty}>
        <p>Notes are empty..</p>
        {/* @ts-expect-error */}
        <button onClick={() => addNote(activeCategory())}>Create One</button>
      </div>
    )}>
    <Match when={notes().length}>
      <div class={styles.container}>
        <div class={styles.header}>
          <h2>Notes</h2>
          {/* @ts-expect-error */}
          <button onClick={() => addNote(activeCategory())}>
            <svg 
              fill="currentColor" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" width="24" height="24">
                <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z"></path></svg>
          </button>
        </div>
        <NotesContainer notes={notes()} />
      </div>
    </Match>
  </Switch>

}