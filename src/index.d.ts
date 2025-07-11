import { ListenerList } from './global'

/**
 * Returns a function object that calls a function registered on the JUCE backend and forwards all
 * parameters to it.
 *
 * The provided name should be the same as the name argument passed to
 * WebBrowserComponent::Options.withNativeFunction() on the backend.
 */
export function getNativeFunction(name: string): (...args: any[]) => Promise< any >

/**
 * Returns a SliderState object that is connected to the backend WebSliderRelay object that was
 * created with the same name argument.
 *
 * To register a WebSliderRelay object create one with the right name and add it to the
 * WebBrowserComponent::Options struct using withOptionsFrom.
 */
export function getSliderState(name: string): SliderState

/**
 * Returns a ToggleState object that is connected to the backend WebToggleButtonRelay object that was
 * created with the same name argument.
 *
 * To register a WebToggleButtonRelay object create one with the right name and add it to the
 * WebBrowserComponent::Options struct using withOptionsFrom.
 */
export function getToggleState(name: string): ToggleState

/**
 * Returns a ComboBoxState object that is connected to the backend WebComboBoxRelay object that was
 * created with the same name argument.
 *
 * To register a WebComboBoxRelay object create one with the right name and add it to the
 * WebBrowserComponent::Options struct using withOptionsFrom.
 */
export function getComboBoxState(name: string): ComboBoxState

/**
 * Appends a platform-specific prefix to the path to ensure that a request sent to this address will
 * be received by the backend's ResourceProvider.
 */
export function getBackendResourceAddress(path: string): string

/**
 * This helper class is intended to aid the implementation of
 * AudioProcessorEditor::getControlParameterIndex() for editors using a WebView interface.
 *
 * Create an instance of this class and call its handleMouseMove() method in each mousemove event.
 *
 * This class can be used to continuously report the controlParameterIndexAnnotation attribute's
 * value related to the DOM element that is currently under the mouse pointer.
 *
 * This value is defined at all times as follows
 * * the annotation attribute's value for the DOM element directly under the mouse, if it has it,
 * * the annotation attribute's value for the first parent element, that has it,
 * * -1 otherwise.
 *
 * Whenever there is a change in this value, an event is emitted to the frontend with the new value.
 * You can use a ControlParameterIndexReceiver object on the backend to listen to these events.
 */
export class ControlParameterIndexUpdater {
  constructor(controlParameterIndexAnnotation: string)
  controlParameterIndexAnnotation: string
  lastElement: Element | null
  lastControlParameterIndex: string | -1 | null
  handleMouseMove(event: MouseEvent): void
}

/**
 * SliderState encapsulates data and callbacks that are synchronised with a WebSliderRelay object
 * on the backend.
 *
 * Use getSliderState() to create a SliderState object. This object will be synchronised with the
 * WebSliderRelay backend object that was created using the same unique name.
 */
declare class SliderState {
  constructor(name: string)
  name: string
  identifier: `__juce__slider${string}`
  scaledValue: number
  properties: {
    start: number
    end: number
    skew: number
    name: string
    label: string
    numSteps: number
    interval: number
    parameterIndex: number | -1
  }
  valueChangedEvent: ListenerList
  propertiesChangedEvent: ListenerList

  /**
   * Sets the normalised value of the corresponding backend parameter. This value is always in the
   * [0, 1] range (inclusive).
   *
   * The meaning of this range is the same as in the case of
   * AudioProcessorParameter::getValue() (C++).
   */
  setNormalisedValue(newValue: number): void

  /**
   * This function should be called first thing when the user starts interacting with the slider.
   */
  sliderDragStarted(): void

  /**
   * This function should be called when the user finished the interaction with the slider.
   */
  sliderDragEnded(): void

  /**
   * Returns the scaled value of the parameter. This corresponds to the return value of
   * NormalisableRange::convertFrom0to1() (C++). This value will differ from a linear
   * [0, 1] range if a non-default NormalisableRange was set for the parameter.
   */
  getScaledValue(): number

  /**
   * Returns the normalised value of the corresponding backend parameter. This value is always in the
   * [0, 1] range (inclusive).
   *
   * The meaning of this range is the same as in the case of
   * AudioProcessorParameter::getValue() (C++).
   */
  getNormalisedValue(): number
}

/**
 * ToggleState encapsulates data and callbacks that are synchronised with a WebToggleRelay object
 * on the backend.
 *
 * Use getToggleState() to create a ToggleState object. This object will be synchronised with the
 * WebToggleRelay backend object that was created using the same unique name.
 */
declare class ToggleState {
  constructor(name: string)
  name: string
  identifier: `__juce__toggle${string}`
  value: boolean
  properties: {
    name: string
    parameterIndex: number | -1
  }
  valueChangedEvent: ListenerList
  propertiesChangedEvent: ListenerList

  /**
   * Returns the value corresponding to the associated WebToggleRelay's (C++) state.
   */
  getValue(): boolean

  /**
   * Informs the backend to change the associated WebToggleRelay's (C++) state.
   */
  setValue(newValue: boolean): void
}

/**
 * ComboBoxState encapsulates data and callbacks that are synchronised with a WebComboBoxRelay object
 * on the backend.
 *
 * Use getComboBoxState() to create a ComboBoxState object. This object will be synchronised with the
 * WebComboBoxRelay backend object that was created using the same unique name.
 */
declare class ComboBoxState {
  constructor(name: string)
  name: string
  identifier: `__juce__comboBox${string}`
  value: number
  properties: {
    name: string
    parameterIndex: number | -1
    choices: string[]
  }
  valueChangedEvent: ListenerList
  propertiesChangedEvent: ListenerList

  /**
   * Returns the value corresponding to the associated WebComboBoxRelay's (C++) state.
   *
   * This is an index identifying which element of the properties.choices array is currently
   * selected.
   */
  getChoiceIndex(): number

  /**
   * Informs the backend to change the associated WebComboBoxRelay's (C++) state.
   *
   * This should be called with the index identifying the selected element from the
   * properties.choices array.
   */
  setChoiceIndex(index: number): void
}

export { SliderState, ToggleState, ComboBoxState }
