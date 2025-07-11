declare class ListenerList {
  listeners: Map< number, (payload?: any) => void >
  listenerId: number
  constructor()
  addListener(fn: (payload?: any) => void): number
  removeListener(id: number): void
  callListeners(payload?: any): void
}

declare class EventListenerList {
  eventListeners: Map< string, ListenerList >
  constructor()
  addEventListener(eventId: string, fn: (args: any) => any): [string, number]
  removeEventListener([eventId, id]: [string, number]): void
  emitEvent(eventId: string, object: any): void
}

declare class Backend {
  listeners: EventListenerList

  constructor()
  addEventListener(eventId: string, fn: (args: any) => any): [string, number]
  removeEventListener([eventId, id]: [string, number]): void
  emitEvent(eventId: string, object: any): void
  emitByBackend(eventId: string, object: any): void
}

declare global {
  var __JUCE__: {
    backend: Backend
    initialisationData: {
      __juce__platform: ('windows' | 'android' | 'macos' | 'ios' | 'linux' | '')[]
      __juce__functions: string[]
      __juce__registeredGlobalEventIds: string[]
      __juce__sliders: string[]
      __juce__toggles: string[]
      __juce__comboBoxes: string[]
      [key: string]: any
    }
    postMessage: (message: string) => void
    getAndroidUserScripts?: () => string
  }

  var inAndroidUserScriptEval: boolean | undefined
}

export { ListenerList }
