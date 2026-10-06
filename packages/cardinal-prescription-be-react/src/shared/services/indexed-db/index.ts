import { TokenStore } from '../../types/tokenStore'
import { TOKEN_IDB_CONFIG } from '../../../internal/services/constants'

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

  public async get(key: string): Promise<T> {
    const db = await this.db
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.STORE_NAME, 'readonly')
      const store = tx.objectStore(this.config.STORE_NAME)
      const request = store.get(key)

      request.onsuccess = () => {
        if (request.result?.value != null) {
          resolve(request.result.value as T)
        } else {
          reject(new Error(`No value for key: ${key}`))
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  public async put(key: string, value: T): Promise<T> {
    const db = await this.db
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.STORE_NAME, 'readwrite')
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

  public async delete(key: string): Promise<void> {
    const db = await this.db
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.config.STORE_NAME, 'readwrite')
      const store = tx.objectStore(this.config.STORE_NAME)
      const request = store.delete(key)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
}

/**
 * Create a ready-made {@link TokenStore} backed by IndexedDB, used to cache the
 * FHC keystore uuid / STS token between certificate validation and prescription
 * sending. Provided so consumers don't have to wire up their own store.
 */
export const createIndexedDbTokenStore = (): TokenStore => {
  // Opened on first use: creating the store opens no database.
  let store: IndexedDbServiceStore<string> | undefined
  const open = () => (store ??= new IndexedDbServiceStore<string>(TOKEN_IDB_CONFIG))
  return {
    put: (key, value) => open().put(key, value),
    // A miss (the store rejects) is `undefined`, as the TokenStore contract says.
    get: (key) =>
      open()
        .get(key)
        .catch(() => undefined),
  }
}
