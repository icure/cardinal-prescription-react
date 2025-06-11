export const clickOutside = (
  node: HTMLElement,
  callback: (event: MouseEvent) => void
): { destroy: () => void } => {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      callback(event); // Trigger the callback if the click is outside the node
    }
  };

  document.addEventListener("mousedown", handleClick);

  return {
    destroy() {
      document.removeEventListener("mousedown", handleClick); // Cleanup when the element is destroyed
    },
  };
}
