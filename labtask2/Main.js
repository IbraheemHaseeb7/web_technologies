const contentCircles = $(".content-circle");
const mainContainer = $("section.main-container");

function handleMainContainerHovering(e) {
    contentCircles.each((index, element) => {
        let x = e.pageX / 100 - 8;
        let y = e.pageY / 100 - 8;

        element.style = `transform: translate(${x}%, ${y}%)`;
    });
}

mainContainer.mousemove(handleMainContainerHovering);
