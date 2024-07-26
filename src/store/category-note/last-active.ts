
export enum LSKEY {
  LAST_ACTIVE_CATEGORY = 'lastActiveCat',
  LAST_ACTIVE_NOTE = 'lastActiveNote'
}

export function getLastActiveCategory(){
  return localStorage.getItem(LSKEY.LAST_ACTIVE_CATEGORY) || null
}

export function setLastActiveCategory( id: string | null ){
  if(!id) localStorage.removeItem(LSKEY.LAST_ACTIVE_CATEGORY)
  else localStorage.setItem(LSKEY.LAST_ACTIVE_CATEGORY, id)
}

export function getLastActiveNote(): string | null {
  return localStorage.getItem(LSKEY.LAST_ACTIVE_NOTE) || null
}

export function setLastActiveNote( id: string | null ){
  if(!id) localStorage.removeItem(LSKEY.LAST_ACTIVE_NOTE)
  else localStorage.setItem(LSKEY.LAST_ACTIVE_NOTE, id)
}