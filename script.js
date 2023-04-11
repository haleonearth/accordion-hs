/* This script simply changes the data attribute 'selected',
but doesn't handle any animation. All animation is done in CSS. 
If the target element's 'data-sync' attribute is true, only
one accordion can be opened at a time. */

function buildAccordion(el) {

  var accordion = el,
    accordionItems = accordion.children,
    oneAtTime = accordion.getAttribute('data-sync'),
    hideAllItems = function(ex) {
      var activeItems = accordion.querySelectorAll('.hs-accordion__item[aria-expanded="true"]');
      Array.prototype.forEach.call(accordionItems, function(el, i) {
        if (el !== ex && (activeItems.length > 1 || !el.classList.contains('active'))) {
          el.setAttribute('aria-expanded', 'false');
          el.classList.remove('active');
        }
      });
    },
    toggleItem = function(el) {
      /* Toggle whether item is selected or not */
      if (el.getAttribute('aria-expanded') == 'true') {
        if (oneAtTime) {
          hideAllItems(el);
          return;
        }
        el.setAttribute('aria-expanded', 'false');
      }
      else {
        if (oneAtTime) {
          hideAllItems(el);
        }
        el.setAttribute('aria-expanded', 'true');
      }
    },
    clickBind = function() {
      accordion.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName == "BUTTON") {
          /* Should only 1 item show? */
          if (oneAtTime) {
            hideAllItems(e.target.parentNode);
          }
          /* Toggle the item */
          toggleItem(e.target.parentNode);
          e.target.parentNode.classList.toggle('active'); // add this line
        }
      });
    },
    /* Go time */
    init = (function() {
      clickBind();
    })();
}

var accordions = document.querySelectorAll('.hs-accordion');
Array.prototype.forEach.call(accordions, function(el) {
  buildAccordion(el);     /* Find all instances of '.hs-accordion' and initialize for each of them */
});

