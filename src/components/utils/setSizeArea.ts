function setSizeArea(
  increase: boolean,
  area: HTMLElement | null
) {
  if (!area) throw new Error("area is not found");

  const currentSize = +getComputedStyle(area)
    .getPropertyValue("--sizeCell")
    .replace("px", "");

  const newSize =
    (!increase && currentSize > 10)
      ? currentSize - 1
      : (increase && currentSize < 50)
      ? currentSize + 1
      : currentSize; 

  area?.style.setProperty("--sizeCell", `${newSize}px`);
};

export default setSizeArea;