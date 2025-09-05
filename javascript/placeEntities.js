const cells = document.getElementsByClassName("cell");

const placeEntity = (icon, name) => {
    let place = cells[Math.floor(Math.random() * cells.length)];
    if (place.classList.contains("wall") || place.classList.contains("entity")) {
        placeEntity(icon, name);
        return;
    }
    place.classList.add(name);
    place.classList.add("entity");
    place.textContent = icon;
    return;
}

placeEntity("👤", "player");
placeEntity("⬇️", "exit");