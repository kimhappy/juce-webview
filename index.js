export * from './JUCE/modules/juce_gui_extra/native/javascript/index.js'

/**
 * Check if JUCE WebView is initialized
 * @returns {boolean} Whether JUCE WebView is available
 */
export const isJuceAvailable = () => {
  return typeof window                             !== 'undefined' &&
         typeof window.__JUCE__                    !== 'undefined' &&
         typeof window.__JUCE__.backend            !== 'undefined' &&
         typeof window.__JUCE__.initialisationData !== 'undefined'
}
