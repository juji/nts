import { createEffect, createSignal, ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import styles from './style.module.css'
import { cx } from "classix";
import Menu from '~/components/menu'
import { useCategoryNoteStore } from "~/store/category-note";

export default function Layout( props: ParentProps ){

  const [open, setOpen] = createSignal(false)
  const categories = useCategoryNoteStore(state => state.categories)

  // createEffect(() => {
    
  //   if(
  //     categories().length && 
  //     localStorage.getItem('createcategoryinit')
  //   ){
  //     setOpen(false)
  //     localStorage.removeItem('createcategoryinit')
  //   }
    
  //   else{
  //     setTimeout(() => {
  //       if(categories().length) return;
  //       localStorage.setItem('createcategoryinit', '1')
  //       setOpen(true)
  //     },500)
  //   }

  // })

  return <div class={styles.container}>
      <div class={cx(
        styles.overlay, 
        open() && styles.open
      )}
        onClick={() => setOpen(false)}
      ></div>
      <aside class={cx(open() && styles.open)}>
        <header>
          <A href="/">Nts.</A>
        </header>
        <Menu />
      </aside>
      <main>
        <header>
          <div>
            <button id="mobilemenubutton" onClick={() => setOpen(!open())}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
          </div>
          <div>
            <A href="/">Nts.</A>
          </div>
          <div></div>
        </header>
        {props.children}
      </main>
    </div>

}