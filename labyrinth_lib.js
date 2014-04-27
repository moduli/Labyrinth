
// ==================================
//
// WINDOW MANAGEMENT
//
// ==================================
// handles when orientation changes
function orientationCheck() {
  switch(window.orientation) {
    case -90: // landscape
      changeToLandscape();
      break;
    case 90: // landscape
      changeToLandscape();
      break;
    default: // portrait
      changeToPortrait();
      break;
  }
}

// sets settings for overlay div to respond to user touch
function setOverlay() {
  document.getElementById("overlaydiv").addEventListener('touchend', function() {
    document.getElementById("overlaydiv").style.display = "none";
    unpause();
  }, true);
}

// performs actions when orientation changes to portrait mode
function changeToPortrait() {
  pause();
  document.getElementById("overlaytext").innerHTML = "Rotate to Landscape";
  document.getElementById("overlaydiv").style.display = "table";
  document.getElementById("gameboarddiv").style.display = "none";
}

// performs actions when orientation changes to landscape mode
function changeToLandscape() {
  document.getElementById("overlaytext").innerHTML = "Paused<br />Tap to Continue";
  document.getElementById("overlaydiv").style.display = "table";
  document.getElementById("gameboarddiv").style.display = "inline";
  setOverlay();

  if (window.matchMedia) {
    // PHONE
    if (window.matchMedia('(max-device-width: 767px)').matches) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 40;
    }
    // TABLET
    else if (window.matchMedia('(max-device-width: 1024px)').matches) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 50;
    }
  }
}

// sets response to orientation change
window.onorientationchange = function() { orientationCheck(); };

// Prevent Scrolling of web page
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

// Note for Desktop Users
if (window.matchMedia || !window.DeviceOrientationEvent) {
  if (!window.matchMedia('(max-device-width: 767px)').matches && !window.matchMedia('(max-device-width: 1024px)').matches) {
    document.getElementById("overlaytext").innerHTML = "This device does not support Device Orientation";
  }
}