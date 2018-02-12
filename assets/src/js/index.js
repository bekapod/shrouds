import component from "./component";

(async () => {
  const $component = await component();
  $(".js-insert-component").append($component);

  const svgDefs = await fetch("/assets/dist/svg-defs.svg").then(response =>
    response.text()
  );
  const $svgDefs = $('<div class="hidden" />').append(svgDefs);
  $("body").prepend($svgDefs);
})();

// var ajax = new XMLHttpRequest();
// ajax.open("GET", "svg/sprite.svg", true);
// ajax.send();
// ajax.onload = function(e) {
//   var div = document.createElement("div");
//   div.innerHTML = ajax.responseText;
//   document.body.insertBefore(div, document.body.childNodes[0]);
// }
