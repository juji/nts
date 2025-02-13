
import type { Set } from '.'
import { createConnection, TABLES, DEFAULT_DELETED } from '~/lib/jsstore'
import { NoteCategory } from '../types'
import { getLastActiveCategory, setLastActiveCategory } from './last-active'


export function removeCategory( set: Set ){

  return async (category: NoteCategory) => {
  
    const conn = createConnection()
    const count = await conn.count({
      from: TABLES.CATEGORY_NOTES,
      where: {
        deleted: DEFAULT_DELETED,
        categoryId: category.id
      },
    })
    
    if(count){
      conn.terminate();
      throw new Error('Category has note')
    }
    
    await conn.update({
      in: TABLES.CATEGORY,
      set: {
        deleted: new Date()
      },
      where: {
        id: category.id
      }
    })

    if(getLastActiveCategory() === category.id){
      setLastActiveCategory(null)
    }

    
    
    set(state => {

      state.categories = state.categories.filter(v => v.id !== category.id)

      // when removing active category
      // set active category to null, 
      // to prevent the selector from collapsing
      if(state.activeCategory && state.activeCategory.id === category.id){
        state.activeCategory = null
      }
    })

  }


}