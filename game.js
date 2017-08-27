
        let mainContainer = new PIXI.Container();
        const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.view);

        PIXI.loader
        .add("menuTileset", "files/images/menuTilesets/menuTileset.json")
        .load(setup);

        let idMenuTexture;

        let menu = {
            x : 0,
            y : 0,
            background : {},
            initialization : function() {
                idMenuTexture = PIXI.loader.resources["menuTileset"].textures;
                this.background = new PIXI.Sprite(idMenuTexture["menuBackground.png"]);
                this.background.position.set(this.x, this.y);
                this.background.width = window.innerWidth;
                this.background.height = window.innerHeight;
                mainContainer.addChild(this.background);
            }
        }
      
        function setup() {
            menu.initialization();        
            
            renderer.render(mainContainer);
        }
        
        