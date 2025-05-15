if (!window.domFinderInjected) {
  window.domFinderInjected = true;

  window.cleanupDomFinder = () => {
    document.querySelector(".domFinder-container")?.remove();
    document.removeEventListener("mouseover", window.handleMouseOver);
    document.removeEventListener("mousemove", window.displayElementInfo);
    document.removeEventListener("click", window.handleClick);

    window.isLocked = false;
    window.selectedElement = null;
    window.highlight = null;
    window.elementInfo = null;
    window.domFinderInjected = false;
  };

  window.isLocked = false;
  window.selectedElement = null;

  window.highlight = document.createElement("div");
  window.highlight.className = "domFinder-highlight";
  document.body.appendChild(window.highlight);

  window.elementInfo = document.createElement("div");
  window.elementInfo.className = "domFinder-elementInfo";
  document.body.appendChild(window.elementInfo);

  // Handle mouse over
  window.handleMouseOver = (event) => {
    if (window.isLocked) return; // Prevent changes when locked
    window.selectedElement = event.target;
    const rect = window.selectedElement.getBoundingClientRect();
    window.highlight.style.width = `${rect.width}px`;
    window.highlight.style.height = `${rect.height}px`;
    window.highlight.style.left = `${rect.left + window.scrollX}px`;
    window.highlight.style.top = `${rect.top + window.scrollY}px`;
  };

  // Handle click to toggle lock
  window.handleClick = () => {
    if (!window.selectedElement) return;
    window.isLocked = !window.isLocked;

    window.highlight.className = window.isLocked
      ? "domFinder-highlight locked"
      : "domFinder-highlight";
  };

  // Handle user press "L" key to lock/unlock
  window.handleKeyPress = (event) => {
    if (event.key === "l" || event.key === "L") {
      window.isLocked = !window.isLocked;
      window.highlight.className = window.isLocked
        ? "domFinder-highlight locked"
        : "domFinder-highlight";
    }
  };

  // Display element info
  window.displayElementInfo = () => {
    if (!window.selectedElement) return;

    const style = getComputedStyle(window.selectedElement);
    window.elementInfo.innerHTML = `
      <div class="info-box">
          <h3>Typography</h3>
          <ul>
              <li><strong>Font Family:</strong> ${style.fontFamily}</li>
              <li><strong>Font Size:</strong> ${style.fontSize}</li>
              <li><strong>Font Weight:</strong> ${style.fontWeight}</li>
              <li><strong>Line Height:</strong> ${style.lineHeight}</li>
          </ul>
      </div>

      <div class="info-box">
          <h3>Colors</h3>
          <ul>
              <li><strong>Text Color:</strong> ${style.color}</li>
              <li><strong>Background Color:</strong> ${
                style.backgroundColor
              }</li>
          </ul>
      </div>

      <div class="info-box">
        <h3>Dimensions</h3>
        <ul>
            <li><strong>Width:</strong> ${Math.round(
              window.selectedElement.offsetWidth
            )}px</li>
            <li><strong>Height:</strong> ${Math.round(
              window.selectedElement.offsetHeight
            )}px</li>
            <li><strong>Padding:</strong> ${style.padding}</li>
            <li><strong>Margin:</strong> ${style.margin}</li>
        </ul>
      </div>

      <div class="info-box">
        <h3>Position</h3>
        <ul>
            <li><strong>Position:</strong> ${style.position}</li>
            <li><strong>Display:</strong> ${style.display}</li>
            <li><strong>Z-Index:</strong> ${style.zIndex}</li>
        </ul>
      </div>
    `;
  };

  // Event listeners
  document.addEventListener("mouseover", window.handleMouseOver, true);
  document.addEventListener("mousemove", window.displayElementInfo, true);
  document.addEventListener("click", window.handleClick, true);
  document.addEventListener("keypress", window.handleKeyPress, true);
}
