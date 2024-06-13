// Asynchronous IIFE
(async () =>
{
    // Create a PixiJS application.
    const app = new PIXI.Application();

    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    // Load the bunny texture.
    const texture = await PIXI.Assets.load('bunny.png');

    // Create a new Sprite from an image path.
    const bunnies = [];
    for (var i = 0; i < 10000; i++) {
        var bunny = new PIXI.Sprite(texture);
        app.stage.addChild(bunny);
        bunny.anchor.set(0.5);
        bunny.x = i % 1000;
        bunny.y = i / 10;
        bunnies.push(bunny);
    }
    
    // Add an animation loop callback to the application's ticker.
    app.ticker.add((time) =>
    {
        for (var i = 0; i < bunnies.length; i++) {
            bunnies[i].x = (bunnies[i].x + 0.1 * time.deltaTime) % 1000;
        }
    });
})();
