import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import { onCleanup, onMount } from 'solid-js';

import './index.css'

export function Editor({ 
  className,
  onChange,
  initialContent = '',
}:{ 
  className: string
  initialContent?: string
  onChange?: (str: string) => void
}){

  let ref!: HTMLDivElement;
  let editor:EditorJS;

  onMount(async () => {

    editor = new EditorJS({
      holder: 'editorjs',
      tools: { 
        header: Header, 
        list: List 
      }, 
      placeholder: 'Let`s write something awesome!'
    })

  })

  onCleanup(() => {

  })


  return <div class={className} id="editorjs" ref={ref} />

}