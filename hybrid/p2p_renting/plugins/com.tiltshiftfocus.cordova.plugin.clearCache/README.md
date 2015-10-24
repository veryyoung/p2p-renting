Cache
=============

This is a WebView cache plugin for Phonegap 3.3.0 / Cordova 3.3.1 supporting Android (>=2.3.3) and iOS(>=6.0).
It allows to clear the cordova webview cache.

There are two methods:

* clear(successCallback, errorCallback)
* cleartemp()

Manual Installation
======
You may use phonegap CLI as follows:

<pre>
➜ cordova plugin add https://github.com/tiltshiftfocus/cordova-plugin-cache.git
</pre>

Usage
====
```javascript
document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady()
{
        var success = function(status) {
            alert('Message: ' + status);
        }

        var error = function(status) {
            alert('Error: ' + status);
        }

        window.cache.clear( success, error );
        window.cache.cleartemp(); // 
}
```