export class IndexedDbServiceStore<T> {
  private readonly db: Promise<IDBDatabase>
  private readonly config: {
    DB_NAME: string
    STORE_NAME: string
    KEY_PATH: string
  }

  constructor(config: { DB_NAME: string; STORE_NAME: string; KEY_PATH: string }) {
    this.config = config
    this.db = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.DB_NAME, 1)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.config.STORE_NAME)) {
          db.createObjectStore(this.config.STORE_NAME, { keyPath: this.config.KEY_PATH })
        }
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  public get(key: string): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const tx = (await this.db).transaction(this.config.STORE_NAME, 'readonly')
      const store = tx.objectStore(this.config.STORE_NAME)
      const request = store.get(key)

      request.onsuccess = () => {
        request.result?.value != null ? resolve(request.result.value as T) : reject(new Error(`No value for key: ${key}`))
      }
      request.onerror = () => reject(request.error)
    })
  }

  public put(key: string, value: T): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const tx = (await this.db).transaction(this.config.STORE_NAME, 'readwrite')
      const store = tx.objectStore(this.config.STORE_NAME)

      const getRequest = store.get(key)
      getRequest.onsuccess = () => {
        const exists = !!getRequest.result

        const record = { id: key, value }
        const request = exists ? store.put(record) : store.add(record)

        request.onsuccess = () => resolve(value)
        request.onerror = () => reject(request.error)
      }
      getRequest.onerror = () => reject(getRequest.error)
    })
  }

  public delete(key: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const tx = (await this.db).transaction(this.config.STORE_NAME, 'readwrite')
      const store = tx.objectStore(this.config.STORE_NAME)

      console.log('store')
      console.log(store)

      const request = store.delete(key)

      console.log('request')
      console.log(request)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}
