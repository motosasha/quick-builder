import { ready } from "@scripts/utils/documentReady.js";
import { getScrollSize } from "@scripts/utils/getScrollSize.js";

ready(function () {
  document.documentElement.style.setProperty("--css-scroll-size", `${getScrollSize()}px`);
});
