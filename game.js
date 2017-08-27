
        let stage = new PIXI.Container();
        const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.view);
       
        let texture = [];
        texture[0] = ["files/images/test/test.jpeg"];
        

        PIXI.loader
        .add(texture[0])
        .load(setup);


      
        function setup() {
            let sprite = new PIXI.Sprite(
            PIXI.loader.resources[texture[0]].texture
            );

            stage.addChild(sprite);;
            
            renderer.render(stage);
        }
        
        