import { useCategoryNoteStore } from "~/store/category-note"
import { For, Show } from "solid-js"


export default function Home(){

  const categories = useCategoryNoteStore(state => state.categories)
  const hydrated = useCategoryNoteStore(state => state.hydrated)
  const addCategory = useCategoryNoteStore(state => state.addCategory)

  function handleSubmit(e: SubmitEvent){
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement);
    addCategory(formData.get('name') as string);
    (e.target as HTMLFormElement).reset()
  }

  return <main>
    <h1>This is main</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>

    <Show when={hydrated()} fallback={<div>Loading...</div>}>
      <For each={categories()}>
        {(item, index) =>
          <p>{JSON.stringify(item)}</p>
        }
      </For>
    </Show>
  </main>

}