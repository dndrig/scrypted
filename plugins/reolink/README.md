# Reolink Plugin for Scrypted

<span style="color:red">Reolink cameras should use the ONVIF plugin. This plugin is for older Reolink cameras that do not have ONVIF support or the ONVIF implementation is buggy.</span>

<span style="color:red">Reolink doorbells MUST use the ONVIF plugin. This plugin does not support two way audio or the doorbell button event.</span>

Reolink Cameras offer both RTMP and RTSP streams. RTMP streams are more reliable than RTSP on Reolink Cameras, but Scrypted highly recommends using RTSP streams if they are stable on your Reolink hardware. RTMP streams will be preferred by default. The defaults can be changed in the camera's Rebroadcast `Stream Management` settings.

Reolink Two Way Audio is not supported. It is a proprietary and undocumented protocol.

Some Reolink cameras support the ONVIF protocol. However, these Reolink cameras usually do not support `ONVIF Profile T`, which is necessary for ONVIF motion detection. Reolink Cameras are not known to support ONVIF two way audio either. It is worth testing the Scrypted ONVIF plugin to see if Profile T and Two Way Audio work with your camera before using this plugin.
