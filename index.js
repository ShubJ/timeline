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
      liElement = `<li class="last-li">
      <div>
        <div class="time">
          <time>${events[i].time}</time>
          <div>
            <span class="move-up">&#8639;</span>
            <span class="move-down">&#8642;</span>
          </div>
        </div>
        <div>${events[i].text}</div>
      </div>
      <span>+</span>
      </li>`;
    else
      liElement = `<li>
      <div>
        <div class="time">
          <time>${events[i].time}</time>
          <div>
          <span class="move-up">&#8639;</span>
          <span class="move-down">&#8642;</span>
          </div>
        </div>
        <div>${events[i].text}</div>
      </div>
      <span></span>
      </li>`;
    eventList.append(liElement);
  }
  addEventClickEventBinder();
  // add hover effect to display move up and down buttons
  addHover();

  bindMoveEventUpDown();

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

function addEventClickEventBinder() {
  $("ul li.last-li > span").on("click", addNewEventListener);
}

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
  $("ul li.last-li > span").text("").off("click");
  $("ul li.last-li").removeClass("last-li").addClass("before-last-added");

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
      // remove class before-last-added to indicate that the empty div is no longer.
      $("ul li:nth-last-child(2)").removeClass("before-last-added");
      // remove the last li element and add a new li with user input content.
      $("ul li:last-child").remove();
      eventList.append(
        `<li class="last-li">
        <div>
          <div class="time">
            <time>${yearValue}</time>
            <div style="display: none">
            <span class="move-up">&#8639;</span>
            <span class="move-down">&#8642;</span>
            </div>
          </div>
          <div>${textValue}</div>
        </div>
        <span>+</span>
        </li>`
      );
      addEventClickEventBinder();
      bindMoveEventUpDown();
      addHover();
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
  $("ul li:last-child").addClass("last-li").removeClass("before-last-added");
  // Show "+"
  $("ul li.last-li > span").text("+");
  addEventClickEventBinder();
}
function bindMoveEventUpDown() {
  $("li > div > div.time > div > span.move-up").on("click", function () {
    // Get the index of clicked li element.
    let liIndex = $(this).closest("li").index();
    // Exchange the html of li elements.
    let temp = $(`ul li:nth-child(${liIndex + 1})`).html();
    $(`ul li:nth-child(${liIndex + 1})`).html(
      $(`ul li:nth-child(${liIndex})`).html()
    );
    $(`ul li:nth-child(${liIndex})`).html(temp);

    // If clicked li is the last li then add the "+" to the new last li and vice versa.
    if (liIndex == events.length - 1) {
      let classes = $(`ul li:nth-child(${liIndex + 1})`).attr("class");
      if (classes.includes("before-last-added")) {
        $(`ul li:nth-child(${liIndex + 1}) > span`).text("");
      } else {
        $(`ul li:nth-child(${liIndex + 1}) > span`).text("+");
        addEventClickEventBinder();
      }
      $(`ul li:nth-child(${liIndex}) > span`).text("");
    }
    // Bind move up and down events to the new li elements
    bindMoveEventUpDown();
  });

  $("li > div > div.time > div > span.move-down").on("click", function () {
    // Get the index of clicked li element
    let liIndex = $(this).closest("li").index();
    // Exchange the html of li elements.
    let temp = $(`ul li:nth-child(${liIndex + 1})`).html();
    $(`ul li:nth-child(${liIndex + 1})`).html(
      $(`ul li:nth-child(${liIndex + 2})`).html()
    );
    $(`ul li:nth-child(${liIndex + 2})`).html(temp);

    // If clicked li is the last li then add the "+" to the new last li and vice versa.
    if (liIndex == events.length - 2) {
      let classes = $(`ul li:nth-child(${liIndex + 2})`).attr("class");
      if (classes.includes("before-last-added")) {
        $(`ul li:nth-child(${liIndex + 2}) > span`).text("");
      } else {
        $(`ul li:nth-child(${liIndex + 2}) > span`).text("+");
        addEventClickEventBinder();
      }
      $(`ul li:nth-child(${liIndex + 1}) > span`).text("");
    }
    // Bind move up and down events to the new li elements
    bindMoveEventUpDown();
  });
}

function addHover() {
  $("ul li").hover(
    function () {
      let index = $("ul li").index(this);
      $(`ul li:nth-child(${index + 1}) > div > div.time > div`).css(
        "display",
        "flex"
      );
    },
    function () {
      let index = $("ul li").index(this);
      $(`ul li:nth-child(${index + 1}) > div > div.time > div`).css(
        "display",
        "none"
      );
    }
  );
}
