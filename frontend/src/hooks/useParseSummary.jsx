import { useMemo } from "react";

const objPopulator = (obj, node, index, delCounter) => {
  let invalid = false;
  const tagName = node.nodeName.toLowerCase();

  if (tagName === "del") {
    obj.type = tagName;
    obj.id = tagName + index;
    obj.text = node.textContent;
    obj.delCounter = delCounter;
    return invalid;
  }

  if (node.nodeType === 3) {
    const span = "span";
    obj.type = span;
    obj.id = span + index;
    obj.text = node.textContent;
    return invalid;
  }

  invalid = true;
  return invalid;
};

export const useParseSummary = (aiText) => {
  const result = useMemo(() => {
    let delCounter = 0;
    const parser = new DOMParser();
    const doc = parser.parseFromString(aiText, "text/html");
    const child = doc.body.childNodes;
    const parse = [];
    let isInvalid = false;

    for (let i = 0; i < child.length; i++) {
      const node = child[i];
      const obj = {};
      isInvalid = objPopulator(obj, node, i, delCounter);
      if (obj.type === "del") {
        delCounter += 1;
      }
      if (isInvalid) break;
      parse.push(obj);
    }
    return { parse, isInvalid };
  }, [aiText]);

  return result;
};
