const images = document.querySelectorAll("img");
const nav = document.querySelector("nav");

window.onload = () => {
    console.log(images);

    images.forEach((image) => {
        image.addEventListener("mouseenter", () => {
            const p = document.createElement("p");
            p.innerHTML = `IMAGE NAME: ${image.alt}`;
            nav.appendChild(p);
        });

        image.addEventListener("mouseleave", () => {
            nav.removeChild(nav.lastChild);
        });
    });
};
