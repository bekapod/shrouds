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
