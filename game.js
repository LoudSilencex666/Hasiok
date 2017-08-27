
        let stage = new PIXI.Container();
        const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.view);
       
        
        

        PIXI.loader
        .add("testTileset", "files/images/testTilesets/testName.json")
        .load(setup);

        
      
        function setup() {
            let testTexture = PIXI.loader.resources["testTileset"].textures;
            let sprite1 = new PIXI.Sprite(testTexture["test1.png"]);
            let sprite2 = new PIXI.Sprite(testTexture["test2.png"]);
            let sprite3 = new PIXI.Sprite(testTexture["test3.png"]);
            
            sprite1.position.set(100, 100);
            sprite2.position.set(600, 400);
            sprite3.position.set(1000, 700);
            
            stage.addChild(sprite1, sprite2, sprite3);
            
            renderer.render(stage);
        }
        
        