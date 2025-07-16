import { GenericStoreType } from '../../types' // adjust path as needed

export class IndexedDbService {
  private db!: IDBDatabase
  private readonly config: {
    DB_NAME: string
    STORE_NAME: string
    KEY_PATH: string
  }

  constructor(config: { DB_NAME: string; STORE_NAME: string; KEY_PATH: string }) {
    this.config = config
  }

  async initializeIndexedDb(): Promise<void> {
    this.db = await new Promise((resolve, reject) => {
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

  getIndexedDb(): IDBDatabase {
    if (!this.db) {
      throw new Error('IndexedDB not initialized. Call initializeIndexedDb() first.')
    }
    return this.db
  }

  getIndexedDbStore<T>(): GenericStoreType<T> {
    const db = this.getIndexedDb()
    const storeName = this.config.STORE_NAME

    return {
      get: (key: string): Promise<T> => {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, 'readonly')
          const store = tx.objectStore(storeName)
          const request = store.get(key)

          request.onsuccess = () => {
            request.result != null ? resolve(request.result as T) : reject(new Error(`No value for key: ${key}`))
          }
          request.onerror = () => reject(request.error)
        })
      },

      put: (key: string, value: T): Promise<T> => {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite')
          const store = tx.objectStore(storeName)

          const getRequest = store.get(key)
          getRequest.onsuccess = () => {
            const exists = !!getRequest.result
            console.log('exists')
            console.log(exists)

            const record = { id: key, value }
            const request = exists ? store.put(record) : store.add(record)

            request.onsuccess = () => resolve(value)
            request.onerror = () => reject(request.error)
          }
          getRequest.onerror = () => reject(getRequest.error)
        })
      },

      delete: (key: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite')
          const store = tx.objectStore(storeName)

          console.log('store')
          console.log(store)

          const request = store.delete(key)

          console.log('request')
          console.log(request)

          request.onsuccess = () => resolve()
          request.onerror = () => reject(request.error)
        })
      },
    }
  }
}
