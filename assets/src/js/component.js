export default async (text = "Hello World") => {
  const $element = $("<div />");
  $element.text(text);
  return $element;
};
