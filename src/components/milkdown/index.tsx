import { onCleanup, onMount } from 'solid-js';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { gfm } from '@milkdown/preset-gfm';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

import { prism, prismConfig } from '@milkdown/plugin-prism';
import markdown from 'refractor/lang/markdown'
import css from 'refractor/lang/css'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import tsx from 'refractor/lang/tsx'
import arduino from 'refractor/lang/arduino'
import bash from 'refractor/lang/bash'
import c from 'refractor/lang/c'
import cpp from 'refractor/lang/cpp'
import zig from 'refractor/lang/zig'
import yaml from 'refractor/lang/yaml'
import scss from 'refractor/lang/scss'
import sass from 'refractor/lang/sass'
import rust from 'refractor/lang/rust'
import ruby from 'refractor/lang/ruby'
import sql from 'refractor/lang/sql'
import { trailing } from '@milkdown/plugin-trailing';

import '@milkdown/theme-nord/style.css';
import './style.css'
import 'automad-prism-themes/dist/prism-night-owl.css'

// math doesn't work
// import { math } from '@milkdown/plugin-math';
// import 'katex/dist/katex.min.css';

export const Milkdown = ({ 
  className,
  defaultValue = ''
}:{ 
  className: string
  defaultValue?: string
}) => {
  
  let ref!: HTMLDivElement;
  let editor:Editor;

  onMount(async () => {
    editor = await Editor.make()
      .config((ctx) => {
        
        ctx.set(rootCtx, ref);

        const listener = ctx.get(listenerCtx);
        listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            console.log('markdown', markdown);
          }
        })

        if(defaultValue)
          ctx.set(defaultValueCtx, defaultValue);

        ctx.set(prismConfig.key, {
          configureRefractor: (refractor) => {
            refractor.register(markdown)
            refractor.register(css)
            refractor.register(javascript)
            refractor.register(typescript)
            refractor.register(jsx)
            refractor.register(tsx)
            refractor.register(arduino)
            refractor.register(bash)
            refractor.register(c)
            refractor.register(cpp)
            refractor.register(zig)
            refractor.register(yaml)
            refractor.register(scss)
            refractor.register(sass)
            refractor.register(rust)
            refractor.register(ruby)
            refractor.register(sql)
          },
        })

      })
      .config(nord)
      // .use(math)
      .use(prism)
      .use(listener)
      .use(commonmark)
      .use(history)
      .use(gfm)
      .use(trailing)
      .create();
    console.log(editor)
  });

  onCleanup(() => {
    editor.destroy();
  });

  return <div class={className} ref={ref} />;
};