import { createTiptapEditor } from 'solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Underline from '@tiptap/extension-underline';
import { cx } from "classix";

import './style.css'
import styles from './style.module.css'
import { createSignal } from 'solid-js';

export function Editor({ 
  className,
  onChange,
  initialContent = '',
}:{ 
  className: string
  initialContent?: string
  onChange?: (str: string) => void
}) {

  let ref!: HTMLDivElement;
  let menu!: HTMLDivElement;

  const [ changed, setChangeId ] = createSignal('')
  function changeId(){
    setChangeId(new Date().toISOString())
  }

  const editor = createTiptapEditor(() => ({
    element: ref!,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        }
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Write something awesome!'
      }),
      BubbleMenu.configure({
        element: menu!,
        tippyOptions: {
          onShow(){
            changeId()
          },
        }
      })
    ],
    content: initialContent,
    // content: ``,
  }));

  return <>
    <div id="editor" class={className} ref={ref} />
    {/* force re-render with data-changed */}
    <div class={styles.tiptapMenu} ref={menu} data-changed={changed()}> 
      <button
        onClick={() => {
          editor()?.chain().focus().toggleBold().run(); 
          changeId()
        }}
        class={cx(editor()?.isActive('bold') && styles.active)}
      >
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6 4.75c0-.69.56-1.25 1.25-1.25h5a4.752 4.752 0 0 1 3.888 7.479A5 5 0 0 1 14 20.5H7.25c-.69 0-1.25-.56-1.25-1.25ZM8.5 13v5H14a2.5 2.5 0 1 0 0-5Zm0-2.5h3.751A2.25 2.25 0 0 0 12.25 6H8.5Z"></path></svg>
      </button>
      <button
        onClick={() => {
          editor()?.chain().focus().toggleItalic().run(); 
          changeId()
        }}
        class={cx(editor()?.isActive('italic') && styles.active)}
      >
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M10 4.75a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-3.514l-5.828 13h3.342a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5h3.514l5.828-13H10.75a.75.75 0 0 1-.75-.75Z"></path></svg>
      </button>
      <button
        onClick={() => {
          editor()?.chain().focus().toggleUnderline().run(); 
          changeId()
        }}
        class={cx(editor()?.isActive('underline') && styles.active)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5" />
        </svg>
      </button>
      <button
        onClick={() => {
          editor()?.chain().focus().toggleHeading({ level: 2 }).run(); 
          changeId()
        }}
        class={cx(editor()?.isActive('heading', { level: 2 }) && styles.active)}
      >H2</button>
      <button
        onClick={() => {
          editor()?.chain().focus().toggleHeading({ level: 3 }).run(); 
          changeId()
        }}
        class={cx(editor()?.isActive('heading', { level: 3 }) && styles.active)}
      >H3</button>
      <button
        onClick={() => {
          editor()?.chain().focus().toggleHeading({ level: 4 }).run(); 
          changeId()
        }}
        class={cx(editor()?.isActive('heading', { level: 4 }) && styles.active)}
      >H4</button>
    </div>
  </>;
}