import styles from './style.module.css'
import { Editor } from './tiptap'
import { PencilWaitingNote } from './pencil';
import { TitleEditable } from './title-editable';
import { Intro } from './intro';
import { createMemo } from "solid-js"
import { useCategoryNoteStore } from "~/store/category-note"

function EditorComponent(){

  const activeNote = useCategoryNoteStore(state => state.activeNote)
  const updateTitle = useCategoryNoteStore(state => state.updateTitle)
  const updateContent = useCategoryNoteStore(state => state.updateContent)

  return <div class={styles.editorComponent}>
    <div class={styles.headingContainer}>
      <TitleEditable 
        initialContent={activeNote()?.title || ''} 
        onChange={(str: string) => updateTitle(activeNote()?.id || '', str)}
      />
      <p>
        <span>{activeNote()?.created.toLocaleString()}</span>
        { activeNote()?.updated ? <>
          <span>&nbsp;&nbsp;︱&nbsp;&nbsp;</span>
          <span>Updated: {activeNote()?.updated?.toLocaleString()}</span>
        </> : null}
      </p>
    </div>
    <div class={styles.editorContainer}>
      <Editor
        className={styles.editor} 
        initialContent={activeNote()?.content}
        onChange={(html: string) => updateContent(activeNote()?.id || '', html)}
      />
    </div>
  </div>

}



export default function Home(){

  const activeNote = useCategoryNoteStore(state => state.activeNote)
  const id = createMemo(() => activeNote()?.id)
  const editorComponent = createMemo(() => {
    return id() ? <EditorComponent /> : null
  })

  return <div class={styles.container}>
    <Intro />
    {editorComponent()}
    <PencilWaitingNote />
  </div>

}