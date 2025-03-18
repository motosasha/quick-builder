export const getScrollSize = () => {
  const outer = document.createElement("div");
  const inner = document.createElement("div");

  outer.style.overflow = "scroll";
  outer.style.width = "100px";
  outer.style.height = "100px";
  outer.appendChild(inner);
  document.body.appendChild(outer);

  const scrollbarSize = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  return scrollbarSize;
};
