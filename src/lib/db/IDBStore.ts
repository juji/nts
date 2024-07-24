

export class IDBStore<StoreItem extends object, StoreName extends string> {

  name: string = ''
  version: number = 0
  onUpgradeNeeded: ((db:IDBDatabase) => void) | null = null
  onWrite: ((dat: any) => void) | null = null
  onRemove: ((dat: any) => void) | null = null
  onUpdate: ((dat: any) => void) | null = null

  constructor({
    name,
    version,
    onUpgradeNeeded,
    onWrite = undefined,
    onRemove = undefined,
    onUpdate = undefined,
  }:{
    name: string
    version: number
    onUpgradeNeeded:(db:IDBDatabase) => void
    onWrite?: (dat: any) => void
    onRemove?: (dat: any) => void
    onUpdate?: (dat: any) => void
  }){

    this.name = name
    this.version = version
    if(onWrite) this.onWrite = onWrite
    if(onRemove) this.onRemove = onRemove
    if(onUpdate) this.onUpdate = onUpdate

    if(!onUpgradeNeeded)
      throw new Error('onUpgradeNeeded is needed')

    this.onUpgradeNeeded = onUpgradeNeeded

    
  }

  async getByIndex(storeName: StoreName, indexName: string): Promise<StoreItem[]>{
    const db = await this.open( storeName )

    try{
      const transaction = db.transaction(storeName, 'readonly')
      const objectStore = transaction.objectStore(storeName);
      const myIndex = objectStore.index(indexName);
      const request = myIndex.openCursor( null, 'prev');

      const data: StoreItem[] = []
      return new Promise((r,j) => {
        request.onsuccess = (event) => {
      
          const cursor = request.result;
          if(!cursor) {
            db.close()
            return r(data)
          }else{
            data.push(cursor.value)
            cursor.continue()
          }
          
        }

        request.onerror = (e) => {
          j(e)
        }
      })
    }catch(e){
      db.close()
      console.error('error while trying to get by index', indexName)
      console.error('error:', e)
      throw e
    }
  }

  async getAll(storeName: StoreName): Promise<StoreItem[]>{
    const db = await this.open( storeName )

    try{
      const transaction = db.transaction(storeName, 'readonly')
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.openCursor( null, 'prev');

      let data:StoreItem[] = [];

      return new Promise((r,j) => {

        request.onsuccess = (event) => {
      
          const cursor = request.result;
          if(!cursor) {
            db.close()
            return r(data)
          }else{
            data.push(cursor.value)
            cursor.continue()
          }
          
        }

        request.onerror = (e) => {
          j(e)
        }

      })

    }catch(e){
      db.close()
      console.error('error while trying to get all')
      console.error('error:', e)
      throw e
    }
  }

  async update( storeName: StoreName, data: StoreItem): Promise<StoreItem>{

    const db = await this.open( storeName )
    // @ts-expect-error
    const key = data[this.keyPath]

    try{

      const transaction = db.transaction(storeName, 'readwrite')
      const objectStore = transaction.objectStore(storeName);
      
      return new Promise((r,j) => {
        
        const request = objectStore.openCursor(key);
        let found = false
        request.onsuccess = (event) => {
  
          const cursor = request.result;
          if(!cursor) {
            db.close()
            if(!found) return j(new Error('data not found'))
          }
          
          else if(cursor.key === key){
            cursor.update( data )
            db.close()
            found = true
            this.onUpdate && this.onUpdate(data)
            return r(data)
          }else{
            cursor.continue(key)
          }
          
        }
    
        request.onerror = (e) => {
          j(e)
        }

      })


    }catch(e){
      db.close()
      console.error('error while trying to update', data)
      console.error('error:', e)
      throw e
    }


  }

  async get( storeName: StoreName,  id: string ): Promise<StoreItem>{
    const db = await this.open( storeName )

    try{

      const transaction = db.transaction(storeName, 'readonly')
      const objectStore = transaction.objectStore(storeName);

      return new Promise((r,j) => {
        
        const request = objectStore.openCursor(id);
        let found = false
        request.onsuccess = (event) => {
  
          const cursor = request.result;
          if(!cursor) {
            db.close()
            if(!found) return j(new Error('data not found'))
          }
          
          else if(cursor.key === id){
            const d = cursor.value
            db.close()
            found = true
            return r(d)
          }else{
            cursor.continue(id)
          }
          
        }
    
        request.onerror = (e) => {
          j(e)
        }


      })


    }catch(e){
      db.close()
      console.error('error while trying to get', id)
      console.error('error:', e)
      throw e
    }
  }

  async remove( storeName: StoreName, id: string): Promise<StoreItem>{
    
    const db = await this.open( storeName )
    const key = id

    try{

      
      const transaction = db.transaction(storeName, 'readwrite')
      const objectStore = transaction.objectStore(storeName);
      
      return new Promise((r,j) => {
        
        const request = objectStore.openCursor();
        let found = false
        request.onsuccess = (event) => {
  
          const cursor = request.result;
          if(!cursor) {
            db.close()
            if(!found) return j(new Error('data not found'))
          }
          
          else if(cursor.key === key){
            const d = { ...cursor.value }
            cursor.delete()
            db.close()
            found = true
            this.onRemove && this.onRemove(d)
            return r(d)
          }else{
            cursor.continue(key)
          }
          
        }
    
        request.onerror = (e) => {
          j(e)
        }

      })


    }catch(e){
      db.close()
      console.error('error while trying to remove', id)
      console.error('error:', e)
      throw e
    }

  }

  async write( storeName: StoreName, data: StoreItem): Promise<StoreItem>{
    
    const db = await this.open( storeName )

    try{

      const transaction = db.transaction(storeName, 'readwrite')
      const objectStore = transaction.objectStore(storeName);

      return new Promise((r,j) => {

        const add = objectStore.add(data)
        
        add.onsuccess = (e) => {
          db.close()
          this.onWrite && this.onWrite(data)
          r(data)
        };
      
        add.onerror = (e) => {
          console.error('error adding', data)
          console.error('error:', e)
          db.close()
          j(data)
        }

      })


    }catch(e){
      db.close()
      console.error('error while trying to add', data)
      console.error('error:', e)
      throw e
    }
  
  }
  
  async open( storeName: StoreName ): Promise<IDBDatabase>{

    return await new Promise((r,j) => {

      const request = indexedDB.open(this.name, this.version);
  
      request.onblocked = function() {
        console.error("Upgrade blocked - Please close other instances of this app.")
      };
      
      request.onupgradeneeded = (event) => {
        const db = request.result;
        this.onUpgradeNeeded && this.onUpgradeNeeded( db )
      };
      
      request.onsuccess = function(event) {
        r(request.result)
      };
      
      request.onerror = function(event) {
        console.error('indexedDB error', event)
        j(new Error('open indexedDB failed'))
      };
  
    })
  }

}