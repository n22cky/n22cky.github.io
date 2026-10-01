// Cat face in the address bar for postdigital.space
// Needs a 404.html at the repo root that redirects to "/".

(function () {
  var DEFAULT  = '=^._.^=';   // resting face
  var BLINK    = '=^-.-^=';   // blink
  var SURPRISE = '=^o.o^=';   // while hovering a link

  var BLINK_EVERY = 3000;     // ms between blinks
  var BLINK_FOR   = 500;      // ms the blink lasts

  var hovering = false;

  function setFace(face) {
    try { history.replaceState(null, '', '/' + face); } catch (e) {}
  }

  setFace(DEFAULT);

  // Blink every few seconds (skipped while a link is being hovered).
  setInterval(function () {
    if (hovering) return;
    setFace(BLINK);
    setTimeout(function () {
      if (!hovering) setFace(DEFAULT);
    }, BLINK_FOR);
  }, BLINK_EVERY);

  // Surprised face on any link hover (or keyboard focus).
  document.querySelectorAll('a').forEach(function (a) {
    function on()  { hovering = true;  setFace(SURPRISE); }
    function off() { hovering = false; setFace(DEFAULT); }
    a.addEventListener('mouseenter', on);
    a.addEventListener('mouseleave', off);
    a.addEventListener('focus', on);
    a.addEventListener('blur', off);
  });
})();
