function createEl(parent: HTMLElement, tag: string, ...className: string[]) {
  if (!parent) throw new Error ("parent is not found")
  const el = document.createElement(tag);
  className.forEach(item => {
    el.classList.add(item)
  })
  parent.append(el);
  return el;
}

export default createEl;