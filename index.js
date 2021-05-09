var eventList = $(".timeline ul");
// Default Events
var events = [
  {
    time: "1206",
    text: `Qutb-ud-Din becomes sultan of Delhi. His dynasty is overthrown in 1296 by Feroz Shah, a Turk, who builds Delhi’s second city east of Lal Kot`,
  },
  {
    time: "1934",
    text: `We deem worthy of them, and they are accusing those who hate the righteous, But, in truth, and the truth of them, and they are accusing the blandishments of the things present and the present, and the blandishments of those who we deem worthy of hatred of the righteous`,
  },
];

(function () {
  // Append the default events as soon as the page is loaded.
  for (let i = 0; i < events.length; i++) {
    let liElement = "";
    if (i == events.length - 1)
      liElement = `<li class="last-li"><div><time>${events[i].time}</time>${events[i].text}</div><span>+</span></li>`;
    else
      liElement = `<li><div><time>${events[i].time}</time>${events[i].text}</div><span></span></li>`;
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

$("ul li.last-li span").on("click", addNewEventListener);

function addNewEventListener() {
  let liElement = `<li><div class="empty"><input placeholder="YEAR" type="text" />
  <span class="year error">Year should be of 4 digits.</span>
  <textarea placeholder="TEXT" class="event-text" ></textarea>
  <span class="text error">Make sure the input length is more than 5.</span>
  <div class="event-action">
  <span class="add-event">&#10003;</span>
  <span class="cancel-event">&#10540;</span>
  </div></div><span></span></li>`;

  eventList.append(liElement);
  // Bind click events
  addEventAddCancelBinder();

  // Disable click from the last-li span element.
  $("ul li.last-li span").text("").off("click");
  $("ul li.last-li").removeClass("last-li");

  // $("ul li div.empty input").focus();
  // Scroll to bottom of the page
  window.scrollTo(0, document.body.scrollHeight);
}

function addEventAddCancelBinder() {
  let addEventElement = $("ul li div.event-action span.add-event");
  let cancelEventElement = $("ul li div.event-action span.cancel-event");

  addEventElement.on("click", addEvent);
  cancelEventElement.on("click", cancelEvent);
}

function addEvent() {
  // Get user inputs.
  let yearValue = $("ul li div.empty input").val();
  let textValue = $("ul li div.empty textarea").val();
  // Validate Year and Text.
  if (yearValue.match(/^\d{4}$/)) {
    if (textValue.length > 5) {
      events.push({ time: yearValue, text: textValue });
      // remove the last li element and add a new li with user input content.
      $("ul li:last-child").remove();
      eventList.append(
        `<li class="last-li"><div><time>${yearValue}</time>${textValue}</div><span>+</span></li>`
      );
      $("ul li.last-li span").on("click", addNewEventListener);
      console.log(events);
    } else {
      // Display error for 1 sec
      $("ul li div.empty span.error.text").removeClass("error");
      setTimeout(() => {
        $("ul li div.empty span.text").addClass("error");
      }, 1000);
    }
  } else {
    // Display error for 1 sec
    $("ul li div.empty span.error.year").removeClass("error");
    setTimeout(() => {
      $("ul li div.empty span.year").addClass("error");
    }, 1000);
  }
}
function cancelEvent() {
  // remove the empty div created for taking user input.
  $("ul li:last-child").remove();
  // mark it as the last li.
  $("ul li:last-child").addClass("last-li");
  // Show "+" and bind addNewEventListener function on click.
  $("ul li.last-li span").text("+").on("click", addNewEventListener);
}
