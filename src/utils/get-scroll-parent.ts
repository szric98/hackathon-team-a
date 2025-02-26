/**
 * Finds the nearest scrollable parent of a given HTML element.
 *
 * This function traverses up the DOM tree from the provided element and returns
 * the first ancestor element that has a scrollable overflow property.
 *
 * @param element - The HTML element for which to find the scrollable parent.
 * @returns The scroll parent element.
 */
export function getScrollParent(element: HTMLElement): HTMLElement {
  const isScrollable = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    return /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX);
  };

  let parent: HTMLElement | null = element;

  while (parent) {
    if (isScrollable(parent)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return (document.scrollingElement as HTMLElement) || document.documentElement;
}
