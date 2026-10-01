// ASCII scramble hover effect for postdigital.space
// Add this file next to style.css and load it at the bottom of each page.

(function () {
  // Characters the text jumbles into. Edit freely.
  var GLYPHS = '#%&@$*+=<>/\\|{}[]()~^?!01';

  // Which links get the effect: nav links (but not the hamburger icon)
  // and the "projects" link inside .main. Add more selectors as you like.
  var SELECTOR = 'a';

  function scramble(el) {
    if (el._busy) return;
    el._busy = true;

    var original = el.dataset.text;
    var frames = 18;
    var frame = 0;

    // Hold the link's size steady while the characters change.
    el.style.boxSizing = 'border-box';
    el.style.minWidth = el.offsetWidth + 'px';

    var timer = setInterval(function () {
      var settled = Math.floor((frame / frames) * original.length);
      el.textContent = original
        .split('')
        .map(function (ch, i) {
          if (i < settled || ch === ' ') return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      if (++frame > frames) {
        clearInterval(timer);
        el.textContent = original;
        el.style.minWidth = '';
        el.style.boxSizing = '';
        el._busy = false;
      }
    }, 40);
  }

  document.querySelectorAll(SELECTOR).forEach(function (el) {
    // Only plain-text links (skips ones containing icons or other tags).
    if (el.children.length > 0) return;
    el.dataset.text = el.textContent;
    el.addEventListener('mouseenter', function () { scramble(el); });
    el.addEventListener('focus', function () { scramble(el); });
  });
})();
