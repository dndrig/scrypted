export type ScryptedNativeId = string | undefined;

/**
 * DeviceState is returned by DeviceManager.getDeviceState, and allows getting/setting of a device provided by a DeviceProvider.
 */
export interface DeviceState {
  id?: string;
  interfaces?: string[];
  mixins?: string[];
  info?: DeviceInformation;
  name?: string;
  providedInterfaces?: string[];
  providedName?: ScryptedDeviceType;
  providedRoom?: string;
  providedType?: ScryptedDeviceType;
  providerId?: string;
  room?: string;
  type?: ScryptedDeviceType;
  on?: boolean;
  brightness?: number;
  colorTemperature?: number;
  rgb?: ColorRgb;
  hsv?: ColorHsv;
  running?: boolean;
  paused?: boolean;
  docked?: boolean;
  /**
   * Get the ambient temperature in Celsius.
   */
  temperature?: number;
  /**
   * Get the user facing unit of measurement for this thermometer. Note that while this may be Fahrenheit, getTemperatureAmbient will return the temperature in Celsius.
   */
  temperatureUnit?: TemperatureUnit;
  humidity?: number;
  thermostatAvailableModes?: ThermostatMode[];
  thermostatMode?: ThermostatMode;
  thermostatActiveMode?: ThermostatMode;
  thermostatSetpoint?: number;
  thermostatSetpointHigh?: number;
  thermostatSetpointLow?: number;
  lockState?: LockState;
  entryOpen?: boolean;
  batteryLevel?: number;
  online?: boolean;
  updateAvailable?: boolean;
  fromMimeType?: string;
  toMimeType?: string;
  binaryState?: boolean;
  intrusionDetected?: boolean;
  powerDetected?: boolean;
  motionDetected?: boolean;
  audioDetected?: boolean;
  occupied?: boolean;
  flooded?: boolean;
  ultraviolet?: number;
  luminance?: number;
  position?: Position;
}
/**
 * All devices in Scrypted implement ScryptedDevice, which contains the id, name, and type. Add listeners to subscribe to events from that device.
 */
export interface ScryptedDevice {
  /**
   * Subscribe to events from a specific interface on a device, such as 'OnOff' or 'Brightness'.
   */
  listen(event: ScryptedInterface | string | EventListenerOptions, callback: EventListener): EventListenerRegister;

  setName(name: string): Promise<void>;

  setRoom(room: string): Promise<void>;

  setType(type: ScryptedDeviceType): Promise<void>;

  id?: string;
  interfaces?: string[];
  mixins?: string[];
  name?: string;
  info?: DeviceInformation;
  providedInterfaces?: string[];
  providedName?: ScryptedDeviceType;
  providedRoom?: string;
  providedType?: ScryptedDeviceType;
  providerId?: string;
  room?: string;
  type?: ScryptedDeviceType;
}
export interface EventListenerOptions {
  /**
   * This EventListener will denoise events, and will not be called unless the state changes.
   */
  denoise?: boolean;
  /**
   * The EventListener will subscribe to this event interface.
   */
  event?: ScryptedInterface | string;
  /**
   * This EventListener will passively watch for events, and not initiate polling.
   */
  watch?: boolean;
}
export interface EventListener {
  /**
   * This device type can be hooked by Automation actions to handle events. The event source, event details (interface, time, property), and event data are all passed to the listener as arguments.
   */
  (eventSource: ScryptedDevice | undefined, eventDetails: EventDetails, eventData: any): void;

}
export interface EventDetails {
  changed?: boolean;
  eventInterface?: string;
  eventTime?: number;
  property?: string;
}
/**
 * Returned when an event listener is attached to an EventEmitter. Call removeListener to unregister from events.
 */
export interface EventListenerRegister {
  removeListener(): void;

}
export enum ScryptedDeviceType {
  Builtin = "Builtin",
  Camera = "Camera",
  Fan = "Fan",
  Light = "Light",
  Switch = "Switch",
  Outlet = "Outlet",
  Sensor = "Sensor",
  Scene = "Scene",
  Program = "Program",
  Automation = "Automation",
  Vacuum = "Vacuum",
  Notifier = "Notifier",
  Thermostat = "Thermostat",
  Lock = "Lock",
  PasswordControl = "PasswordControl",
  Display = "Display",
  Speaker = "Speaker",
  Event = "Event",
  Entry = "Entry",
  Garage = "Garage",
  DeviceProvider = "DeviceProvider",
  DataSource = "DataSource",
  API = "API",
  Doorbell = "Doorbell",
  Irrigation = "Irrigation",
  Valve = "Valve",
  Person = "Person",
  Unknown = "Unknown",
}
/**
 * OnOff is a basic binary switch.
 */
export interface OnOff {
  turnOff(): Promise<void>;

  turnOn(): Promise<void>;

  on?: boolean;
}
/**
 * Brightness is a lighting device that can be dimmed/lit between 0 to 100.
 */
export interface Brightness {
  setBrightness(brightness: number): Promise<void>;

  brightness?: number;
}
/**
 * ColorSettingTemperature sets the color temperature of a light in Kelvin.
 */
export interface ColorSettingTemperature {
  getTemperatureMaxK(): Promise<number>;

  getTemperatureMinK(): Promise<number>;

  setColorTemperature(kelvin: number): Promise<void>;

  colorTemperature?: number;
}
/**
 * ColorSettingRgb sets the color of a colored light using the RGB representation.
 */
export interface ColorSettingRgb {
  setRgb(r: number, g: number, b: number): Promise<void>;

  rgb?: ColorRgb;
}
/**
 * Represents an RGB color with component values between 0 and 255.
 */
export interface ColorRgb {
  b?: number;
  g?: number;
  r?: number;
}
/**
 * ColorSettingHsv sets the color of a colored light using the HSV representation.
 */
export interface ColorSettingHsv {
  setHsv(hue: number, saturation: number, value: number): Promise<void>;

  hsv?: ColorHsv;
}
/**
 * Represents an HSV color value component.
 */
export interface ColorHsv {
  /**
   * Hue. 0 to 360.
   */
  h?: number;
  /**
   * Saturation. 0 to 1.
   */
  s?: number;
  /**
   * Value. 0 to 1.
   */
  v?: number;
}
/**
 * Notifier can be any endpoint that can receive messages, such as speakers, phone numbers, messaging clients, etc. The messages may optionally contain media.
 */
export interface Notifier {
  /**
   * If a the media parameter is supplied, the mime type denotes how to send the media within notification. For example, specify 'image/*' to send a video MediaObject as an image.
Passing null uses the native type of the MediaObject. If that is not supported by the notifier, the media will be converted to a compatible type.
   */
  sendNotification(title: string, body: string, media: string | MediaObject, mimeType?: string): Promise<void>;

}
/**
 * MediaObject is an intermediate object within Scrypted to represent all media objects. Plugins should use the MediaConverter to convert the Scrypted MediaObject into a desired type, whether it is a externally accessible URL, a Buffer, etc.
 */
export interface MediaObject {
  mimeType?: string;
}
/**
 * StartStop represents a device that can be started, stopped, and possibly paused and resumed. Typically vacuum cleaners or washers.
 */
export interface StartStop {
  start(): Promise<void>;

  stop(): Promise<void>;

  running?: boolean;
}
export interface Pause {
  pause(): Promise<void>;

  resume(): Promise<void>;

  paused?: boolean;
}
/**
 * Dock instructs devices that have a base station or charger, to return to their home.
 */
export interface Dock {
  dock(): Promise<void>;

  docked?: boolean;
}
/**
 * TemperatureSetting represents a thermostat device.
 */
export interface TemperatureSetting {
  setThermostatMode(mode: ThermostatMode): Promise<void>;

  setThermostatSetpoint(degrees: number): Promise<void>;

  setThermostatSetpointHigh(high: number): Promise<void>;

  setThermostatSetpointLow(low: number): Promise<void>;

  thermostatAvailableModes?: ThermostatMode[];
  thermostatMode?: ThermostatMode;
  thermostatActiveMode?: ThermostatMode;
  thermostatSetpoint?: number;
  thermostatSetpointHigh?: number;
  thermostatSetpointLow?: number;
}
export enum HumidityMode {
  Off = "Off",
  Humidify = "Humidify",
  Dehumidify = "Dehumidify",
  Auto = "Auto",
}
export interface HumidityCommand {
  mode?: HumidityMode;
  setpoint?: number;
}
export interface HumiditySettingStatus extends HumidityCommand {
  activeMode?: HumidityMode;
  availableModes?: HumidityMode[];
}
export interface HumiditySetting {
  humiditySetting: HumiditySettingStatus;
  setHumidity(humidity: HumidityCommand): Promise<void>;
}
export interface FanStatus {
  /**
   * RPM. Negative numbers are valid to indicate fan direction,
   * if it rotates in both directions.
   * A fan speed of zero indicates it is active, but currently off.
   * A fan speed of null or undefined indicates the fan is off.
   */
  speed?: number;
  /**
   * Available fan speed range in RPM.
   */
  availableSpeeds: [number, number];
}
export interface Fan {
  fan?: FanStatus;
  setFanSpeed(speed: number): Promise<void>;
}
export interface Thermometer {
  /**
   * Get the ambient temperature in Celsius.
   */
  temperature?: number;
  /**
   * Get the user facing unit of measurement for this thermometer. Note that while this may be Fahrenheit, getTemperatureAmbient will return the temperature in Celsius.
   */
  temperatureUnit?: TemperatureUnit;
}
export enum TemperatureUnit {
  C = "C",
  F = "F",
}
export interface HumiditySensor {
  humidity?: number;
}
export enum ThermostatMode {
  Off = "Off",
  Cool = "Cool",
  Heat = "Heat",
  HeatCool = "HeatCool",
  Auto = "Auto",
  FanOnly = "FanOnly",
  Purifier = "Purifier",
  Eco = "Eco",
  Dry = "Dry",
  On = "On",
}
export interface PictureOptions {
  id?: string;
  name?: string;
  picture?: {
    width?: number;
    height?: number;
  }
}
/**
 * Camera devices can take still photos.
 */
export interface Camera {
  takePicture(options?: PictureOptions): Promise<MediaObject>;
  getPictureOptions(): Promise<PictureOptions[]>;

}

/**
 * Options passed to VideoCamera.getVideoStream to
 * request specific media formats.
 * The audio/video properties may be omitted
 * to indicate no audio/video is available when
 * calling getVideoStreamOptions or no audio/video
 * is requested when calling getVideoStream.
 */
export interface MediaStreamOptions {
  /**
   * Prebuffer time in milliseconds.
   */
  id?: string;
  name?: string;
  prebuffer?: number;
  container?: string;

  video?: {
    codec?: string;
    width?: number;
    height?: number;
    bitrate?: number;
    minBitrate?: number;
    maxBitrate?: number;
    fps?: number;
    idrIntervalMillis?: number;
  }

  audio?: {
    codec?: string;
    bitrate?: number;
  }
}

/**
 * VideoCamera devices can capture video streams.
 */
export interface VideoCamera {
  getVideoStream(options?: MediaStreamOptions): Promise<MediaObject>;
  /**
   * Get the available video streaming options.
   */
  getVideoStreamOptions(): Promise<MediaStreamOptions[]>;

}

/**
 * Intercom devices can play back 
 */
export interface Intercom {
  startIntercom(media: MediaObject): Promise<void>;
  stopIntercom(): Promise<void>;
}

/**
 * Lock controls devices that can lock or unlock entries. Often works in tandem with PasswordControl.
 */
export interface Lock {
  lock(): Promise<void>;

  unlock(): Promise<void>;

  lockState?: LockState;
}
export enum LockState {
  Locked = "Locked",
  Unlocked = "Unlocked",
  Jammed = "Jammed",
}
/**
 * PasswordControl represents devices that authorize users via a passcode or pin code.
 */
export interface PasswordStore extends Authenticator {
  addPassword(password: string): Promise<void>;

  getPasswords(): Promise<string[]>;

  removePassword(password: string): Promise<void>;

}
/**
 * Authenticator can be used to require a password before allowing interaction with a security device.
 */
export interface Authenticator {
  checkPassword(password: string): Promise<boolean>;

}
/**
 * Scenes control multiple different devices into a given state.
 */
export interface Scene {
  activate(): Promise<void>;

  deactivate(): Promise<void>;

  /**
   * If a scene can be reversed, isReversible should return true. Otherwise deactivate will not be called.
   */
  isReversible(): boolean;

}
/**
 * Entry represents devices that can open and close barriers, such as garage doors.
 */
export interface Entry extends EntrySensor {
  closeEntry(): Promise<void>;

  openEntry(): Promise<void>;

}
export interface EntrySensor {
  entryOpen?: boolean;
}
/**
 * DeviceProvider acts as a controller/hub and exposes multiple devices to Scrypted Device Manager.
 */
export interface DeviceProvider {
  /**
   * Perform device discovery for the specified duration in seconds.
   */
  discoverDevices(duration: number): Promise<void>;

  /**
   * Get an instance of a previously discovered device that was reported to the device manager.
   */
  getDevice(nativeId: ScryptedNativeId): any;

}
/**
 * Battery retrieves the battery level of battery powered devices.
 */
export interface Battery {
  batteryLevel?: number;
}
/**
 * Refresh indicates that this device has properties that are not automatically updated, and must be periodically refreshed via polling. Device implementations should never implement their own underlying polling algorithm, and instead implement Refresh to allow Scrypted to manage polling intelligently.
 */
export interface Refresh {
  /**
   * Get the recommended refresh/poll frequency in seconds for this device.
   */
  getRefreshFrequency(): Promise<number>;

  /**
   * This method is called by Scrypted when the properties of the device need to be refreshed. When the device has completed the refresh, the appropriate DeviceState properties should be set. The parameters provide the specific interface that needs to be refreshed and whether it was user initiated (via UI or voice).
   */
  refresh(refreshInterface: string, userInitiated: boolean): Promise<void>;

}
/**
 * MediaPlayer allows media playback on screen or speaker devices, such as Chromecasts or TVs.
 */
export interface MediaPlayer extends StartStop, Pause {
  getMediaStatus(): Promise<MediaStatus>;

  load(media: string | MediaObject, options?: MediaPlayerOptions): Promise<void>;

  seek(milliseconds: number): Promise<void>;

  skipNext(): Promise<void>;

  skipPrevious(): Promise<void>;

}
export interface MediaPlayerOptions {
  autoplay?: boolean;
  mimeType?: string;
  title?: string;
}
/**
 * Online denotes whether the device is online or unresponsive. It may be unresponsive due to being unplugged, network error, etc.
 */
export interface Online {
  online?: boolean;
}
export interface Program {
  /**
   * Asynchronously run a script given the provided arguments.
   */
  run(variables?: { [name: string]: any }): Promise<any>;

}
export interface ScriptSource {
  name?: string;
  script?: string;
  language?: string;
  monacoEvalDefaults?: string;
}
export interface Scriptable {
  saveScript(script: ScriptSource): Promise<void>;
  loadScripts(): Promise<{ [filename: string]: ScriptSource }>;
  eval(source: ScriptSource, variables?: { [name: string]: any }): Promise<any>;
}
/**
 * SoftwareUpdate provides a way to check for updates and install them. This may be a Scrypted Plugin or device firmware.
 */
export interface SoftwareUpdate {
  checkForUpdate(): Promise<void>;

  installUpdate(): Promise<void>;

  updateAvailable?: boolean;
}
/**
 * Add a converter to be used by Scrypted to convert buffers from one mime type to another mime type. May optionally accept string urls if accept-url is a fromMimeType parameter.
 */
export interface BufferConverter {
  convert(data: string | Buffer, fromMimeType: string): Promise<Buffer | string>;

  fromMimeType?: string;
  toMimeType?: string;
}
/**
 * Settings viewing and editing of device configurations that describe or modify behavior.
 */
export interface Settings {
  getSettings(): Promise<Setting[]>;

  putSetting(key: string, value: SettingValue): Promise<void>;

}
export interface BinarySensor {
  binaryState?: boolean;
}
export interface IntrusionSensor {
  intrusionDetected?: boolean;
}
export interface PowerSensor {
  powerDetected?: boolean;
}
export interface AudioSensor {
  audioDetected?: boolean;
}
export interface MotionSensor {
  motionDetected?: boolean;
}
export interface OccupancySensor {
  occupied?: boolean;
}
export interface FloodSensor {
  flooded?: boolean;
}
export interface UltravioletSensor {
  ultraviolet?: number;
}
export interface LuminanceSensor {
  luminance?: number;
}
export interface PositionSensor {
  position?: Position;
}
export interface Position {
  /**
   * The accuracy radius of this position in meters.
   */
  accuracyRadius?: number;
  latitude?: number;
  longitude?: number;
}
export interface ObjectDetectionResult {
  className: string;
  score: number;
  boundingBox?: [number, number, number, number],
}
export interface FaceRecognition {
  id: string;
  label: string;
  score?: number,
  boundingBox?: [number, number, number, number];
}
export interface ObjectDetection {
  detections?: ObjectDetectionResult[];
  faces?: ObjectDetectionResult[];
  people?: FaceRecognition[];
  detectionId?: any;
  inputDimensions?: [number, number],
  timestamp: number;
}
export interface ObjectDetectionTypes {
  detections?: string[];
  faces?: boolean;
  people?: FaceRecognition[];
}
export interface ObjectDetector {
  /**
   * Get the media (image or video) that contains this detection.
   * @param detectionId
   */
  getDetectionInput(detectionId: any): Promise<MediaObject>;
  getObjectTypes(): Promise<ObjectDetectionTypes>;
}
/**
 * Logger is exposed via log.* to allow writing to the Scrypted log.
 */
export interface Logger {
  /**
   * Alert. Alert level logs will be displayed as a notification in the management console.
   */
  a(msg: string): void;

  /**
   * Clear the log
   */
  clear(): void;

  /**
   * Clear a specific alert
   */
  clearAlert(msg: string): void;

  /**
   * Clear all alerts
   */
  clearAlerts(): void;

  /**
   * Debug
   */
  d(msg: string): void;

  /**
   * Error
   */
  e(msg: string): void;

  /**
   * Info
   */
  i(msg: string): void;

  /**
   * Verbose
   */
  v(msg: string): void;

  /**
   * Warn
   */
  w(msg: string): void;

}
export interface MediaSource {
  /**
   * Get a MediaObject that will be automatically converted for playback on other devices.
   */
  getMedia(): MediaObject;

}
export interface MessagingEndpoint {
}
/**
 * The OauthClient can be implemented to perform the browser based Oauth process from within a plugin.
 */
export interface OauthClient {
  /**
   * Get the Oauth URL to navigate to in the browser. The redirect_uri parameter is not needed and will be automatically set by Scrypted.
   */
  getOauthUrl(): Promise<string>;

  /**
   * When an oauth request by a plugin completes, the callback url, with the code/token, will be passed to this method.
   */
  onOauthCallback(callbackUrl: string): Promise<void>;

}
export interface MediaManager {
  /**
   * Additional plugin provided convertors to consider for use when converting MediaObjects.
   */
  builtinConverters: BufferConverter[];

  /**
   * Convert a media object to a Buffer of the given mime type.
   */
  convertMediaObjectToBuffer(mediaObject: MediaObject, toMimeType: string): Promise<Buffer>;

  /**
   * Convert a media object to a locally accessible URL that serves a media file of the given mime type. If the media object is an externally accessible URL, that will be returned.
   */
  convertMediaObjectToInsecureLocalUrl(mediaObject: string | MediaObject, toMimeType: string): Promise<string>;

  /**
   * Convert a media object to a locally accessible URL that serves a media file of the given mime type. If the media object is an externally accessible URL, that will be returned.
   */
  convertMediaObjectToLocalUrl(mediaObject: string | MediaObject, toMimeType: string): Promise<string>;

  /**
   * Convert a media object to a publically accessible URL that serves a media file of the given mime type.
   */
  convertMediaObjectToUrl(mediaObject: string | MediaObject, toMimeType: string): Promise<string>;

  /**
   * Create a MediaObject. The media will be created from the provided FFmpeg input arguments.
   */
  createFFmpegMediaObject(ffmpegInput: FFMpegInput): MediaObject;

  /**
   * Create a MediaObject. The mime type needs to be provided up front, but the data can be a URL string, Buffer, or a Promise for a URL string or Buffer.
   */
  createMediaObject(data: string | Buffer | Promise<string | Buffer>, mimeType: string): MediaObject;

  /**
   * Create a MediaObject from an URL. The mime type should be provided, but it may be inferred from the URL path.
   */
   createMediaObjectFromUrl(data: string, mimeType?: string): Promise<MediaObject>;


  /**
   * Get the path to ffmpeg on the host system.
   */
  getFFmpegPath(): Promise<string>;

}
export interface FFMpegInput {
  inputArguments?: string[];
  mediaStreamOptions?: MediaStreamOptions;
}
/**
 * DeviceManager is the interface used by DeviceProvider to report new devices, device states, and device events to Scrypted.
 */
export interface DeviceManager {
  /**
   * Get the logger for a device given a native id.
   */
  getDeviceLogger(nativeId?: ScryptedNativeId): Logger;

  /**
   * Get the console for the device given a native id.
   */
  getDeviceConsole?(nativeId?: ScryptedNativeId): Console;

  /**
   * Get the console for the device given a native id.
   */
  getMixinConsole?(mixinId: string, nativeId?: ScryptedNativeId): Console;

  /**
   * Get the device state maintained by Scrypted. Setting properties on this state will update the state in Scrypted.
   */
  getDeviceState(nativeId?: ScryptedNativeId): DeviceState;

  /**
   * Get the per script Storage object.
   */
  getDeviceStorage(): Storage;

  /**
   * Get the storage for a mixin.
   * @param id The id of the device being mixined.
   * @param nativeId The nativeId of the MixinProvider.
   */
  getMixinStorage(id: string, nativeId?: ScryptedNativeId): Storage;

  /**
   * Fire an event for a mixin provided by this plugin.
   */
  onMixinEvent(id: string, nativeId: ScryptedNativeId, eventInterface: string, eventData: any): Promise<void>;

  /**
  * Get the per device Storage object.
  */
  getDeviceStorage(nativeId?: ScryptedNativeId): Storage;

  getNativeIds(): string[];

  /**
   * onDeviceDiscovered is used to report new devices that are trickle discovered, one by one, such as via a network broadcast.
   */
  onDeviceDiscovered(device: Device): Promise<void>;

  /**
   * Fire an event for a device provided by this plugin.
   */
  onDeviceEvent(nativeId: ScryptedNativeId, eventInterface: string, eventData: any): Promise<void>;

  /**
   * onDeviceRemoved is used to report when discovered devices are removed.
   */
  onDeviceRemoved(nativeId: string): Promise<void>;

  /**
   * onDevicesChanged is used to sync Scrypted with devices that are attached to a hub, such as Hue or SmartThings. All the devices should be reported at once.
   */
  onDevicesChanged(devices: DeviceManifest): Promise<void>;

  /**
   * Restart the plugin. May not happen immediately.
   */
  requestRestart(): Promise<void>;
}
export interface DeviceInformation {
  model?: string;
  manufacturer?: string;
  version?: string;
  firmware?: string;
  serialNumber?: string;
  metadata?: any;
}
/**
 * Device objects are created by DeviceProviders when new devices are discover and synced to Scrypted via the DeviceManager.
 */
export interface Device {
  name: string;
  /**
   * The native id that is used by the DeviceProvider used to internally identify provided devices.
   */
  nativeId: string;
  type: ScryptedDeviceType;
  interfaces: string[];
  info?: DeviceInformation;
  /**
   * The native id of the hub or discovery DeviceProvider that manages this device.
   */
  providerNativeId?: ScryptedNativeId;
  room?: string;
}
/**
 * DeviceManifest is passed to DeviceManager.onDevicesChanged to sync a full list of devices from the controller/hub (Hue, SmartThings, etc)
 */
export interface DeviceManifest {
  /**
   * The native id of the hub or discovery DeviceProvider that manages these devices.
   */
  providerNativeId?: ScryptedNativeId;
  devices?: Device[];
}
/**
 * EndpointManager provides publicly accessible URLs that can be used to contact your Scrypted Plugin.
 */
export interface EndpointManager {
  /**
   * Get an URL pathname that can be accessed on your local network or cloud while authenticated. This is an absolute path that requires cookie authentication, and generally used only in browser contexts.
   */
  getAuthenticatedPath(): Promise<string>;

  /**
   * Get an URL pathname that can be accessed on your local network or cloud while authenticated. This is an absolute path that requires cookie authentication, and generally used only in browser contexts.
   */
  getAuthenticatedPath(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can only be accessed on your local network by anyone with the link. HTTP requests and responses are without any encryption. Plugin implementation is responsible for authentication.
   */
  getInsecurePublicLocalEndpoint(): Promise<string>;

  /**
   * Get an URL that can only be accessed on your local network by anyone with the link. HTTP requests and responses are without any encryption. Plugin implementation is responsible for authentication.
   */
  getInsecurePublicLocalEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can be externally accessed by anyone with the link. Plugin implementation is responsible for authentication.
   */
  getPublicCloudEndpoint(): Promise<string>;

  /**
   * Get an URL that can be externally accessed by anyone with the link. Plugin implementation is responsible for authentication.
   */
  getPublicCloudEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can only be accessed on your local network by anyone with the link. HTTP requests and responses are over SSL with a self signed certificate. Plugin implementation is responsible for authentication.
   */
  getPublicLocalEndpoint(): Promise<string>;

  /**
   * Get an URL that can only be accessed on your local network by anyone with the link. HTTP requests and responses are over SSL with a self signed certificate. Plugin implementation is responsible for authentication.
   */
  getPublicLocalEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Get an URL that can be used to send a push message to the client. This differs from a cloud endpoint, in that, the Plugin does not send a response back. Plugin implementation is responsible for authentication.
   */
  getPublicPushEndpoint(): Promise<string>;

  /**
   * Get an URL that can be used to send a push message to the client. This differs from a cloud endpoint, in that, the Plugin does not send a response back. Plugin implementation is responsible for authentication.
   */
  getPublicPushEndpoint(nativeId?: ScryptedNativeId): Promise<string>;

  /**
   * Deliver a push notification to the system.
   */
  deliverPush(endpoint: string, request: HttpRequest): Promise<void>;

}
/**
 * SystemManager is used by scripts to query device state and access devices.
 */
export interface SystemManager {
  /**
   * Retrieve a system service.
   */
  getComponent(id: string): Promise<any>;

  /**
   * Find a Scrypted device by id.
   */
  getDeviceById(id: string): ScryptedDevice;

  /**
   * Find a Scrypted device by id.
   */
  getDeviceById<T>(id: string): ScryptedDevice & T;

  /**
   * Find a Scrypted device by name.
   */
  getDeviceByName(name: string): ScryptedDevice;

  /**
   * Find a Scrypted device by name.
   */
  getDeviceByName<T>(name: string): ScryptedDevice & T;

  /**
   * Get the current state of a device.
   */
  getDeviceState(id: string): any;

  /**
   * Get the current state of every device.
   */
  getSystemState(): { [id: string]: { [property: string]: SystemDeviceState } };

  /**
   * Passively (without polling) listen to property changed events.
   */
  listen(EventListener: EventListener): EventListenerRegister;

  /**
   * Subscribe to events from a specific interface on a device id, such as 'OnOff' or 'Brightness'. This is a convenience method for ScryptedDevice.listen.
   */
  listenDevice(id: string, event: ScryptedInterface | string | EventListenerOptions, callback: EventListener): EventListenerRegister;

  /**
   * Remove a device from Scrypted. Plugins should use DeviceManager.onDevicesChanged or DeviceManager.onDeviceRemoved to remove their own devices
   */
  removeDevice(id: string): Promise<void>;

}
/**
 * MixinProviders can add and intercept interfaces to other devices to add or augment their behavior.
 */
export interface MixinProvider {
  /**
   * Called by the system to determine if this provider can create a mixin for the supplied device. Returns null if a mixin can not be created, otherwise returns a list of new interfaces (which may be an empty list) that are provided by the mixin.
   */
  canMixin(type: ScryptedDeviceType, interfaces: string[]): Promise<string[]>;

  /**
   * Create a mixin that can be applied to the supplied device.
   */
  getMixin(mixinDevice: any, mixinDeviceInterfaces: ScryptedInterface[], mixinDeviceState: { [key: string]: any }): Promise<any>;

  /**
   * Release a mixin device that was previously returned from getMixin.
   */
  releaseMixin(id: string, mixinDevice: any): Promise<void>;
}
/**
 * The HttpRequestHandler allows handling of web requests under the endpoint path: /endpoint/npm-package-name/*.
 */
export interface HttpRequestHandler {
  /**
   * Callback to handle an incoming request.
   */
  onRequest(request: HttpRequest, response: HttpResponse): Promise<void>;

}
export interface HttpRequest {
  body?: string;
  headers?: object;
  isPublicEndpoint?: boolean;
  method?: string;
  rootPath?: string;
  url?: string;
  username?: string;
}
/**
 * Response object provided by the HttpRequestHandler.
 */
export interface HttpResponse {
  send(body: string): void;

  send(body: string, options: HttpResponseOptions): void;

  send(body: Buffer): void;

  send(body: Buffer, options: HttpResponseOptions): void;

  sendFile(path: string): void;

  sendFile(path: string, options: HttpResponseOptions): void;

}
export interface HttpResponseOptions {
  code?: number;
  headers?: object;
}
export interface EngineIOHandler {
  onConnection(request: HttpRequest, webSocketUrl: string): Promise<void>;

}
export interface PushHandler {
  /**
   * Callback to handle an incoming push.
   */
  onPush(request: HttpRequest): Promise<void>;

}
export interface SystemDeviceState {
  /**
   * The last time the state was updated, even if it did not change.
   */
  lastEventTime?: number;
  /**
   * The last time the state changed.
   */
  stateTime?: number;
  value?: any;
}
export interface MediaStatus {
  duration?: number;
  mediaPlayerState?: MediaPlayerState;
  metadata?: any;
  position?: number;
}
export enum MediaPlayerState {
  Idle = "Idle",
  Playing = "Playing",
  Paused = "Paused",
  Buffering = "Buffering",
}
export type SettingValue = string|number|boolean|string[]|number[];
export interface Setting {
  key?: string;
  title?: string;
  group?: string;
  description?: string;
  placeholder?: string;
  type?: 'string' | 'password' | 'number' | 'boolean' | 'device' | 'integer';
  readonly?: boolean;
  choices?: string[];
  combobox?: boolean;
  deviceFilter?: string;
  multiple?: boolean;
  value?: SettingValue;
}

export enum ScryptedInterface {
  ScryptedDevice = "ScryptedDevice",
  OnOff = "OnOff",
  Brightness = "Brightness",
  ColorSettingTemperature = "ColorSettingTemperature",
  ColorSettingRgb = "ColorSettingRgb",
  ColorSettingHsv = "ColorSettingHsv",
  Notifier = "Notifier",
  StartStop = "StartStop",
  Pause = "Pause",
  Dock = "Dock",
  TemperatureSetting = "TemperatureSetting",
  HumiditySetting = "HumiditySetting",
  Fan = "Fan",
  Thermometer = "Thermometer",
  HumiditySensor = "HumiditySensor",
  Camera = "Camera",
  VideoCamera = "VideoCamera",
  Intercom = "Intercom",
  Lock = "Lock",
  PasswordStore = "PasswordStore",
  Authenticator = "Authenticator",
  Scene = "Scene",
  Entry = "Entry",
  EntrySensor = "EntrySensor",
  DeviceProvider = "DeviceProvider",
  Battery = "Battery",
  Refresh = "Refresh",
  MediaPlayer = "MediaPlayer",
  Online = "Online",
  SoftwareUpdate = "SoftwareUpdate",
  BufferConverter = "BufferConverter",
  Settings = "Settings",
  BinarySensor = "BinarySensor",
  IntrusionSensor = "IntrusionSensor",
  PowerSensor = "PowerSensor",
  AudioSensor = "AudioSensor",
  MotionSensor = "MotionSensor",
  OccupancySensor = "OccupancySensor",
  FloodSensor = "FloodSensor",
  UltravioletSensor = "UltravioletSensor",
  LuminanceSensor = "LuminanceSensor",
  PositionSensor = "PositionSensor",
  MediaSource = "MediaSource",
  MessagingEndpoint = "MessagingEndpoint",
  OauthClient = "OauthClient",
  MixinProvider = "MixinProvider",
  HttpRequestHandler = "HttpRequestHandler",
  EngineIOHandler = "EngineIOHandler",
  PushHandler = "PushHandler",
  Program = "Program",
  Scriptable = "Scriptable",
  ObjectDetector = "ObjectDetector",
}

export enum ScryptedInterfaceProperty {
  id = "id",
  interfaces = "interfaces",
  mixins = "mixins",
  info = "info",
  name = "name",
  providedInterfaces = "providedInterfaces",
  providedName = "providedName",
  providedRoom = "providedRoom",
  providedType = "providedType",
  providerId = "providerId",
  room = "room",
  type = "type",
  on = "on",
  brightness = "brightness",
  colorTemperature = "colorTemperature",
  rgb = "rgb",
  hsv = "hsv",
  running = "running",
  paused = "paused",
  docked = "docked",
  thermostatAvailableModes = "thermostatAvailableModes",
  thermostatMode = "thermostatMode",
  thermostatActiveMode = "thermostatActiveMode",
  thermostatSetpoint = "thermostatSetpoint",
  thermostatSetpointHigh = "thermostatSetpointHigh",
  thermostatSetpointLow = "thermostatSetpointLow",
  temperature = "temperature",
  temperatureUnit = "temperatureUnit",
  humidity = "humidity",
  lockState = "lockState",
  entryOpen = "entryOpen",
  batteryLevel = "batteryLevel",
  online = "online",
  updateAvailable = "updateAvailable",
  fromMimeType = "fromMimeType",
  toMimeType = "toMimeType",
  binaryState = "binaryState",
  intrusionDetected = "intrusionDetected",
  powerDetected = "powerDetected",
  motionDetected = "motionDetected",
  audioDetected = "audioDetected",
  occupied = "occupied",
  flooded = "flooded",
  ultraviolet = "ultraviolet",
  luminance = "luminance",
  position = "position",
}

export interface RTCAVMessage {
  id: string;
  description: RTCSessionDescriptionInit;
  candidates: RTCIceCandidateInit[];
  configuration: RTCConfiguration;
}

export enum ScryptedMimeTypes {
  AcceptUrlParameter = 'accept-url',
  Url = 'text/x-uri',
  InsecureLocalUrl = 'text/x-insecure-local-uri',
  LocalUrl = 'text/x-local-uri',
  PushEndpoint = 'text/x-push-endpoint',
  FFmpegInput = 'x-scrypted/x-ffmpeg-input',
  RTCAVOffer = 'x-scrypted/x-rtc-av-offer',
  RTCAVAnswer = 'x-scrypted/x-rtc-av-answer',
}

export const SCRYPTED_MEDIA_SCHEME = 'scryped-media://';

export interface ScryptedInterfaceDescriptor {
  name: string;
  properties: ScryptedInterfaceProperty[];
  methods: string[];
}

export const ScryptedInterfaceDescriptors: { [scryptedInterface: string]: ScryptedInterfaceDescriptor } = {
  ScryptedDevice: {
    name: "ScryptedDevice",
    properties: [
      "id",
      "interfaces",
      "mixins",
      "info",
      "name",
      "providedInterfaces",
      "providedName",
      "providedRoom",
      "providedType",
      "providerId",
      "room",
      "type",
    ],
    methods: [
      "listen",
      "setName",
      "setRoom",
      "setType",
    ]
  },
  OnOff: {
    name: "OnOff",
    properties: [
      "on",
    ],
    methods: [
      "turnOff",
      "turnOn",
    ]
  },
  Brightness: {
    name: "Brightness",
    properties: [
      "brightness",
    ],
    methods: [
      "setBrightness",
    ]
  },
  ColorSettingTemperature: {
    name: "ColorSettingTemperature",
    properties: [
      "colorTemperature",
    ],
    methods: [
      "getTemperatureMaxK",
      "getTemperatureMinK",
      "setColorTemperature",
    ]
  },
  ColorSettingRgb: {
    name: "ColorSettingRgb",
    properties: [
      "rgb",
    ],
    methods: [
      "setRgb",
    ]
  },
  ColorSettingHsv: {
    name: "ColorSettingHsv",
    properties: [
      "hsv",
    ],
    methods: [
      "setHsv",
    ]
  },
  Notifier: {
    name: "Notifier",
    properties: [
    ],
    methods: [
      "sendNotification",
    ]
  },
  StartStop: {
    name: "StartStop",
    properties: [
      "running",
    ],
    methods: [
      "start",
      "stop",
    ]
  },
  Pause: {
    name: "Pause",
    properties: [
      "paused",
    ],
    methods: [
      "pause",
      "resume",
    ]
  },
  Dock: {
    name: "Dock",
    properties: [
      "docked",
    ],
    methods: [
      "dock",
    ]
  },
  TemperatureSetting: {
    name: "TemperatureSetting",
    properties: [
      "thermostatAvailableModes",
      "thermostatMode",
      "thermostatActiveMode",
      "thermostatSetpoint",
      "thermostatSetpointHigh",
      "thermostatSetpointLow",
    ],
    methods: [
      "setThermostatMode",
      "setThermostatSetpoint",
      "setThermostatSetpointHigh",
      "setThermostatSetpointLow",
    ]
  },
  Thermometer: {
    name: "Thermometer",
    properties: [
      "temperature",
      "temperatureUnit",
    ],
    methods: [
    ]
  },
  HumiditySensor: {
    name: "HumiditySensor",
    properties: [
      "humidity",
    ],
    methods: [
    ]
  },
  Camera: {
    name: "Camera",
    properties: [
    ],
    methods: [
      "takePicture",
    ]
  },
  VideoCamera: {
    name: "VideoCamera",
    properties: [
    ],
    methods: [
      "getVideoStream",
      "getVideoStreamOptions",
    ]
  },
  Intercom: {
    name: "Intercom",
    properties: [
    ],
    methods: [
      "startIntercom",
      "stopIntercom",
    ]
  },
  Lock: {
    name: "Lock",
    properties: [
      "lockState",
    ],
    methods: [
      "lock",
      "unlock",
    ]
  },
  PasswordStore: {
    name: "PasswordStore",
    properties: [
    ],
    methods: [
      "addPassword",
      "getPasswords",
      "removePassword",
    ]
  },
  Authenticator: {
    name: "Authenticator",
    properties: [
    ],
    methods: [
      "checkPassword",
    ]
  },
  Scene: {
    name: "Scene",
    properties: [
    ],
    methods: [
      "activate",
      "deactivate",
      "isReversible",
    ]
  },
  Entry: {
    name: "Entry",
    properties: [
    ],
    methods: [
      "closeEntry",
      "openEntry",
    ]
  },
  EntrySensor: {
    name: "EntrySensor",
    properties: [
      "entryOpen",
    ],
    methods: [
    ]
  },
  DeviceProvider: {
    name: "DeviceProvider",
    properties: [
    ],
    methods: [
      "discoverDevices",
      "getDevice",
    ]
  },
  Battery: {
    name: "Battery",
    properties: [
      "batteryLevel",
    ],
    methods: [
    ]
  },
  Refresh: {
    name: "Refresh",
    properties: [
    ],
    methods: [
      "getRefreshFrequency",
      "refresh",
    ]
  },
  MediaPlayer: {
    name: "MediaPlayer",
    properties: [
    ],
    methods: [
      "getMediaStatus",
      "load",
      "seek",
      "skipNext",
      "skipPrevious",
    ]
  },
  Online: {
    name: "Online",
    properties: [
      "online",
    ],
    methods: [
    ]
  },
  SoftwareUpdate: {
    name: "SoftwareUpdate",
    properties: [
      "updateAvailable",
    ],
    methods: [
      "checkForUpdate",
      "installUpdate",
    ]
  },
  BufferConverter: {
    name: "BufferConverter",
    properties: [
      "fromMimeType",
      "toMimeType",
    ],
    methods: [
      "convert",
    ]
  },
  Settings: {
    name: "Settings",
    properties: [
    ],
    methods: [
      "getSettings",
      "putSetting",
    ]
  },
  BinarySensor: {
    name: "BinarySensor",
    properties: [
      "binaryState",
    ],
    methods: [
    ]
  },
  IntrusionSensor: {
    name: "IntrusionSensor",
    properties: [
      "intrusionDetected",
    ],
    methods: [
    ]
  },
  PowerSensor: {
    name: "PowerSensor",
    properties: [
      "powerDetected",
    ],
    methods: [
    ]
  },
  AudioSensor: {
    name: "AudioSensor",
    properties: [
      "audioDetected",
    ],
    methods: [
    ]
  },
  MotionSensor: {
    name: "MotionSensor",
    properties: [
      "motionDetected",
    ],
    methods: [
    ]
  },
  OccupancySensor: {
    name: "OccupancySensor",
    properties: [
      "occupied",
    ],
    methods: [
    ]
  },
  FloodSensor: {
    name: "FloodSensor",
    properties: [
      "flooded",
    ],
    methods: [
    ]
  },
  UltravioletSensor: {
    name: "UltravioletSensor",
    properties: [
      "ultraviolet",
    ],
    methods: [
    ]
  },
  LuminanceSensor: {
    name: "LuminanceSensor",
    properties: [
      "luminance",
    ],
    methods: [
    ]
  },
  PositionSensor: {
    name: "PositionSensor",
    properties: [
      "position",
    ],
    methods: [
    ]
  },
  MediaSource: {
    name: "MediaSource",
    properties: [
    ],
    methods: [
      "getMedia",
    ]
  },
  MessagingEndpoint: {
    name: "MessagingEndpoint",
    properties: [
    ],
    methods: [
    ]
  },
  OauthClient: {
    name: "OauthClient",
    properties: [
    ],
    methods: [
      "getOauthUrl",
      "onOauthCallback",
    ]
  },
  MixinProvider: {
    name: "MixinProvider",
    properties: [
    ],
    methods: [
      "canMixin",
      "getMixin",
      "releaseMixin",
    ]
  },
  HttpRequestHandler: {
    name: "HttpRequestHandler",
    properties: [
    ],
    methods: [
      "onRequest",
    ]
  },
  EngineIOHandler: {
    name: "EngineIOHandler",
    properties: [
    ],
    methods: [
      "onConnection",
    ]
  },
  PushHandler: {
    name: "PushHandler",
    properties: [
    ],
    methods: [
      "onPush",
    ]
  },
  Program: {
    name: "Program",
    properties: [
    ],
    methods: [
      "run",
    ]
  },
  Scriptable: {
    name: "Scriptable",
    properties: [
    ],
    methods: [
      "saveScript",
      "loadScripts",
      "eval",
    ]
  },
  ObjectDetector: {
    name: "ObjectDetector",
    properties: [
    ],
    methods: [
      "getDetectionInput",
      "getObjectTypes",
    ]
  },
  HumiditySetting: {
    name: "HumiditySetting",
    properties: [
      "humiditySetting",
    ],
    methods: [
      "setHumidity",
    ]
  },
  Fan: {
    name: "Fan",
    properties: [
      "fan",
    ],
    methods: [
      "setFanSpeed",
    ],
  }
} as any;

export interface ScryptedStatic {
  /**
   * @deprecated
   */
  log?: Logger,

  deviceManager?: DeviceManager,
  endpointManager?: EndpointManager,
  mediaManager?: MediaManager,
  systemManager: SystemManager,

  pluginHostAPI?: any;
}
