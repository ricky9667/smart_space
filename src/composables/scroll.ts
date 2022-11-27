const scrollToY = (y: number, duration = 0, element: HTMLElement): void => {
  if (element.scrollTop === y)
    return

  const cosParameter = (element.scrollTop - y) / 2
  let scrollCount = 0
  let oldTimestamp = null as unknown as number

  const step = (newTimestamp: number): (number | void) => {
    if (oldTimestamp !== null) {
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration
      if (scrollCount >= Math.PI)
        return element.scrollTop = y

      element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount)
    }
    oldTimestamp = newTimestamp
    window.requestAnimationFrame(step)
  }
  window.requestAnimationFrame(step)
}

export const scrollToTop = (element: HTMLElement, duration = 0): void => {
  scrollToY(0, duration, element)
}

export const scrollToId = (wrapper: HTMLElement, id: string, duration = 0): void => {
  const element = document.getElementById(id) as HTMLElement
  if (element) {
    const offset = Math.round(element.getBoundingClientRect().top)
    scrollToY(wrapper.scrollTop + offset, duration, wrapper)
  }
}

export const scrollToElement = (wrapper: HTMLElement, element: HTMLElement, duration = 0): void => {
  const offset = Math.round(element.getBoundingClientRect().top)
  scrollToY(wrapper.scrollTop + offset, duration, wrapper)
}
