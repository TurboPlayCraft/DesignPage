document.addEventListener("DOMContentLoaded", () => {
  const draggableElements = document.querySelectorAll("img,h1,p,#lottie-container");
  const debbug = false;
  let textelementX = document.getElementById("elementX");
  let textelementY = document.getElementById("elementY");
  let textstartX = document.getElementById("startX");
  let textstartY = document.getElementById("startY");

  draggableElements.forEach((element) => {
    let isDragging = false;
    let startX, startY;
    let elementX = 0,
      elementY = 0;

    element.addEventListener("mousedown", startDragging);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDragging);

    function startDragging(mouse) {
      isDragging = true;

      startX = mouse.clientX - elementX;
      startY = mouse.clientY - elementY;

      if (debbug) {
        textstartX.innerHTML = "Start X: " + startX;
        textstartY.innerHTML = "Start Y: " + startY;
        element.style.zIndex = "1000";
      }
    }

    function drag(mouse) {
      if (!isDragging) return;
      mouse.preventDefault();

      elementX = mouse.clientX - startX;
      elementY = mouse.clientY - startY;
      if (debbug) {
        textelementY.innerHTML = "Element X: " + elementY;
        textelementX.innerHTML = "Element Y: " + elementX;
      }

      element.style.transform = `translate(${elementX}px, ${elementY}px)`;
    }

    function stopDragging() {
      isDragging = false;
      element.style.zIndex = "auto";
    }
  });
});
