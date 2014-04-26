Labyrinth
==============
This is a HTML5/Javascript project that demonstrates device orientation events. Note that the project was programmed such that it only works on a mobile device (e.g. phones, tablets).

## Usage
After loading the demo, it will ask you to rotate your device to landscape mode. After rotating, tap the screen to begin, and you can begin tilting your device to move a "marble" around on the screen. Rotating back to portrait mode will "pause" the demo.

Each time you resume the demo from a paused state, it will recalibrate the center position based on how the device is held.

The demo can be found [here](http://mycowsworld.com/code/Labyrinth/).

## Documentation
### Media Queries
This project used media queries to determine what kind of device is being used by the user. In CSS, different styles were applied based on the device type. For example, the first block would apply to phones, and the second block would apply to tablets. Note that if using a tablet, it would apply the phone styling first, then also apply the tablet styling on top of it.
```
@media only screen and (min-device-width: 320px) {
	#overlaytext {
		font-size: 25px;
	}
}
@media only screen and (min-device-width: 768px) {
	#overlaytext {
		font-size: 50px;
	}
}
```

In Javascript, I first checked to see if the browser supported this functionality. Then, I added some if statements to determine the device type. I used this to set certain settings that would be more "optimized" for a phone versus a tablet.
```
if (window.matchMedia) {
	// PHONE
	if (window.matchMedia('(max-device-width: 767px)').matches) {
		// do something
	}
	// TABLET
	else if (window.matchMedia('(max-device-width: 1024px)').matches) {
		// do something
	}
}
```

### Device Orientation Change - Portrait/Landscape
To detect when a device changes orientation (from landscape to portrait and vice versa), I employed the use of the window.onorientationchange event. All modern mobile browsers support this event.
```
if (window.DeviceOrientationEvent) {
    // do something...
}
else {
    // display text that this device does not support device orientation
}
```
Once you have determined that the device supports orientation events, you can then receive notifications of when a device changes orientation and subsequently perform an action.
```
window.onorientationchange = function() {
	switch(window.orientation) {
	    // Note: The following numbers don't necessarily work on all devices
	    // See http://www.matthewgifford.com/blog/2011/12/22/a-misconception-about-window-orientation/ for more detail
  		case -90: // landscape
  		    // do something
  			break;
 		case 90: // landscape
 		    // do something
    		break;
  		default: // portrait
  		    // do something
    		break;
	}
};
```

### Device Orientation Change - Ball Movement
In addition to receiving notifications when a device changes orientation from landscape to orientation, you can add a listener to receive notifications whenever a device changes its orientation at all.
```
window.addEventListener('deviceorientation', function(event) {
    // event.gamma - angle of device around x axis
    // event.beta - angle of device around y axis
    // event.alpha - angle of device around z axis
}
```

### Animation
Instead of using a timer loop to create animations, there is a feature to allow the browser to notify your application when it is ready for the next frame of the animation.
```
// obtain a reference to the appropriate function name (this function has different names between browsers)
// if the browser does not support it, we'll fall back to using a timer loop
window.reqAnimFrame = window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.requestAnimationFrame ||
                function(callback) {
          			window.setTimeout(callback, 1000 / 60);
        		};

function animate() {
    // draw something here

    reqAnimFrame(animate); // call animate function again when browser is ready
}

// initial animate call
animate();
```


## References
<i>Media Queries</i>
- http://www.quirksmode.org/blog/archives/2010/09/combining_meta.html
- http://www.javascriptkit.com/dhtmltutors/cssmediaqueries2.shtml

<i>Device Orientation</i>
- http://www.html5rocks.com/en/tutorials/device/orientation/
- http://www.matthewgifford.com/blog/2011/12/22/a-misconception-about-window-orientation/

<i>Animation</i>
- http://tutorials.jenkov.com/html5-canvas/animation.html
- http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
