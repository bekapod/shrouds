import component from "./component";

(async () => {
  const $component = await component();
  $(".js-insert-component").append($component);
})();
