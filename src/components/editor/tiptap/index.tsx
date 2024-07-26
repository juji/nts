import { createTiptapEditor } from 'solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'
import BubbleMenu from '@tiptap/extension-bubble-menu'
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

  const [ changeId, setChangeId ] = createSignal(new Date())

  const editor = createTiptapEditor(() => ({
    element: ref!,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        }
      }),
      Placeholder.configure({
        placeholder: 'Write something awesome!'
      }),
      BubbleMenu.configure({
        element: menu!,
        tippyOptions: {
          onShow(){
            setChangeId(new Date())
          }
        }
      })
    ],
    content: ``,
  }));

  return <>
    <div id="editor" class={className} ref={ref} />
    {/* force re-render with data-id */}
    <div class={styles.tiptapMenu} ref={menu} data-id={changeId()}> 
      <button
        onClick={() => {
          editor()?.chain().focus().toggleBold().run(); 
          setChangeId(new Date())
        }}
        class={cx(editor()?.isActive('bold') && styles.active)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6 4.75c0-.69.56-1.25 1.25-1.25h5a4.752 4.752 0 0 1 3.888 7.479A5 5 0 0 1 14 20.5H7.25c-.69 0-1.25-.56-1.25-1.25ZM8.5 13v5H14a2.5 2.5 0 1 0 0-5Zm0-2.5h3.751A2.25 2.25 0 0 0 12.25 6H8.5Z"></path></svg>
      </button>
    </div>
  </>;
}