export interface Queue<T> {
  enqueue(data: T): void

  dequeue(): T | null

  front(): T | null

  rear(): T | null

  isEmpty(): boolean

  size(): number

  toArray(): T[]

  clone(): Queue<T>

  clear(): void
}

export const useQueue = <T>(): Queue<T> => new QueueImpl<T>()
export const useQueueWithSize = <T>(size: number): Queue<T> => new SizeFixedQueue<T>(size)

class QueueImpl<T extends NonNullable<any>> implements Queue<T> {
  #__elements: Array<T>
  #__offset: number

  constructor(elements: readonly T[] = []) {
    this.#__elements = Array.isArray(elements) ? elements : []
    this.#__offset = 0

    Object.seal(this)
  }

  enqueue(element: T): void {
    this.#__elements.push(element)
  }

  dequeue(): T | null {
    if (this.size() === 0)
      return null

    const first = this.front()
    this.#__offset += 1

    if (this.#__offset * 2 < this.#__elements.length)
      return first

    // only remove dequeued elements when reaching half size
    // to decrease latency of shifting elements.
    this.#__elements = this.#__elements.slice(this.#__offset)
    this.#__offset = 0
    return first
  }

  front(): T | null {
    return this.size() > 0 ? this.#__elements[this.#__offset] : null
  }

  rear(): T | null {
    return this.size() > 0 ? this.#__elements[this.#__elements.length - 1] : null
  }

  size(): number {
    return this.#__elements.length - this.#__offset
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  toArray(): T[] {
    return this.#__elements.slice(this.#__offset)
  }

  clear(): void {
    this.#__elements = []
    this.#__offset = 0
  }

  clone(): Queue<T> {
    return new QueueImpl(this.#__elements.slice(this.#__offset))
  }
}

class SizeFixedQueue<T> extends QueueImpl<T> {
  readonly #__maxSize: number

  constructor(size: number) {
    if (size < 0)
      throw new Error('size must not be a negative number')

    super()
    this.#__maxSize = size
  }

  enqueue(element: T): void {
    if (this.#__maxSize === 0)
      return

    super.enqueue(element)
    if (this.size() > this.#__maxSize)
      this.dequeue()
  }
}
