var eventList = $(".timeline ul");
// Default Events
var events = [
  {
    time: "1934",
    text: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
  praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium`,
  },
  {
    time: "1967",
    text: `Aenean condimentum odio a bibendum rhoncus. Ut mauris felis, volutpat eget porta faucibus, euismod quis ante`,
  },
];

(function () {
  // Append the default events as soon as the page is loaded.
  for (let i = 0; i < events.length; i++) {
    let liElement = `<li><div><time>${events[i].time}</time>${events[i].text}</div></li>`;
    eventList.append(liElement);
  }
  // Check if events are in viewport then trigger the animation.
  callbackFunc();
  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

/*
  Callback function to add class to li elements so that we can have some transformation 
  and hence animation to the elements as soon as they are in the Viewport.
*/
function callbackFunc() {
  let items = $(".timeline li");
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      items[i].classList.add("in-view");
    }
  }
}

function isElementInViewport(el) {
  /*
  "getBoundingClientRect" gives the position of element in the Viewport. So we check if the element's top
  and bottom are present which indicates that the element is in the Viewport.
  */
  var rect = el.getBoundingClientRect();
  /*
  Here "window.innerHeight" gives the browser window height and
  "document.documentElement.clientHeight" gives the viewport height.
  */

  // Here we check if the element is completely in the Viewport.
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
