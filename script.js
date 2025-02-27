const bunnies = [];
for (var i = 0; i < 10000; i++) {
    var bunny = {};
    bunny.x = i % 1000;
    bunny.y = i / 10;
    bunnies.push(bunny);
}

function tick(ms) {
    c.resetTransform();
    c.fillStyle = "#1099bb";
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < bunnies.length; i++) {
        //bunnies[i].x = (bunnies[i].x + 0.1 * ms) % 1000;
        img("bunny", bunnies[i].x, bunnies[i].y);
    }
}

var images = {};

function img(img, x, y) {
    if (img == null) { return; }
    if (!images[img]) {
        images[img] = new Image();
        images[img].src = img + ".png";
    }
    c.drawImage(images[img], x, y);
}

var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");
var keys = {};
var keyCodes = {};
var click = null;
var mouseDown = false;
var cursor = {x: 300, y: 300};

// Listen for key presses.
function canvasKeyUp(e) {
    keyCodes[e.which] = true;
    keys[String.fromCharCode(e.which)] = true;
}

function pressed(key) {
    return !!keys[key] || !!keyCodes[key];
}

$('body').keyup(canvasKeyUp);

// Listen for mouse stuff.
function canvasClick(e) {
    click = { "x": e.offsetX, "y": e.offsetY };
}

function canvasMouseDown(e) {
    mouseDown = true;
}

function canvasMouseUp(e) {
    mouseDown = false;
}

function canvasMove(e) {
    cursor = { "x": e.offsetX, "y": e.offsetY };
}

$('#gameCanvas').click(canvasClick).mousemove(canvasMove).mousedown(canvasMouseDown).mouseup(canvasMouseUp);

// Set up game loop.
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var lastUpdate = new Date().getTime();

function nextFrame() {
    var currentTime = new Date().getTime();
    tick(currentTime - lastUpdate);
    keys = {};
    keyCodes = {};
    click = null;
    lastUpdate = currentTime;
    requestAnimationFrame(nextFrame);
}

// Once everything is set up, start game loop.
requestAnimationFrame(nextFrame);

jQuery(window).resize(function() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
});
jQuery(window).ready(function() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
});
 
/*canvas.addEventListener("click", function() {
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.requestFullScreen) {
        canvas.requestFullScreen();
    }
});*/

