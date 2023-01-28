const app = new PIXI.Application({
  autoDensity: true,
  resizeTo: window,
  powerPreference: "high-performance",
});
document.body.appendChild(app.view);

// Create background image
const background = PIXI.Sprite.from("assets/bg.png");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

//Load door

let door = PIXI.Sprite.from("assets/door.png");

// Set the initial position
door.anchor.set(0.5);
door.height = 460;
door.width = 500;
door.x = app.view.width / 2 + 10;
door.y = app.view.height / 2 - 10;

app.stage.addChild(door);

let handle = PIXI.Sprite.from("assets/handle.png");

// Set the initial position
handle.anchor.set(0.5);
handle.height = 170;
handle.width = 170;
handle.x = app.view.width / 2 - 10;
handle.y = app.view.height / 2 - 10;

// enable the handle to be interactive... this will allow it to respond to mouse and touch events
handle.interactive = true;

// this button mode will mean the hand cursor appears when you roll over the handle with your mouse
handle.cursor = "pointer";

handle.on("pointerdown", onDragStart, handle);

app.stage.addChild(handle);

let dragTarget = null;

app.stage.interactive = true;
app.stage.hitArea = app.screen;
app.stage.on('pointerup', onDragEnd);
app.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event) {
        
    if (dragTarget) {
        let mousePosition = event.data.global
        let starts = event.data

    console.log("starts: " + starts.x);

        dragTarget.rotation = mousePosition.x /100

    }
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    // this.data = event.data;
    let start = event.data
    console.log("start: " + start.x);
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on('pointermove', onDragMove);
}

function onDragEnd() {
    if (dragTarget) {
        app.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}




