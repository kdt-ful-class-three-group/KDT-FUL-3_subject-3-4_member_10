function createTag(tag, content, attribute) {
  let attributeString = "";
  if (attribute) {
    for (let key in attribute) {
      attributeString = attributeString + ` ${key}="${attribute[key]}"`;
    }
  }
  return `<${tag}${attributeString}>${content}</${tag}>`;

}

function divTag(content, className) {
  return createTag('div',content,{class : className})
};


export { createTag, divTag };