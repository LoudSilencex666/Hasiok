        let mainContainer = new PIXI.Container(); // Tworzenie głównego containera który na końcu będziemy wyświetlać.
        const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight); //rozmiar canvasa szerokość i wysokość
        document.body.appendChild(renderer.view); //dodawnie canvasu do documentu HTML

        PIXI.loader
        .add("menuTileset", "files/images/menuTilesets/menuTileset.json")
        .load(setup);

        let idMenuTexture; // randomowe zmienne które bedziemy używać

        let menu = { //obiekt menu
            x : 0, //koordynat x
            y : 0, //koordynat y
            background : {}, //obiekt tła
            backgroundInitialization : function() { //generowanie tła na ekranie gry
                idMenuTexture = PIXI.loader.resources["menuTileset"].textures; // odnośnik by nie musieć pisać tego PIXI (patrz forma 3 w poradniku o displejowaniu spritów z tileseta)
                this.background = new PIXI.Sprite(idMenuTexture["menuBackground.png"]); //Tworzenie Sprita i przypisanie go do nazwy background
                this.background.position.set(this.x, this.y); //pozycja backgroundu
                this.background.width = window.innerWidth; //szerokość
                this.background.height = window.innerHeight; //wysokość
                mainContainer.addChild(this.background); //dodawanie sprite'a (backgroundu) do głównego containera -to co w głównym się znajdzie to zostaje pokazanie na ekranie
            },

            musicX : 898,
            musicY : 694,
            music : {},
            musicInitialization : function() {
                idMenuTexture = PIXI.loader.resources["menuTileset"].textures;
                this.music = new PIXI.Sprite(idMenuTexture["welcome_twitch.png"]);
                this.music.position.set(this.musicX, this.musicY);
                mainContainer.addChild(this.music);
            },
            newGameW : 200,
            newGameH : 80,
            newGame : {},
            newGameInitialization : function() {
                idMenuTexture = PIXI.loader.resources["menuTileset"].textures; 
                this.newGame = new PIXI.Sprite(idMenuTexture["welcome_twitch.png"]);    
                this.newGame.width = this.newGameW; 
                this.newGame.height = this.newGameH;
                this.newGame.position.set(window.innerWidth/2 - this.newGame.width/2, window.innerHeight/10 * 2  - this.newGame.height/2); 
                mainContainer.addChild(this.newGame);
            },
            profilW : 200,
            profilH : 80,
            profil : {},
            profilInitialization : function() {
                idMenuTexture = PIXI.loader.resources["menuTileset"].textures; 
                this.profil = new PIXI.Sprite(idMenuTexture["welcome_twitch.png"]);    
                this.profil.width = this.profilW; 
                this.profil.height = this.profilH;
                this.profil.position.set(window.innerWidth/2 - this.profil.width/2, window.innerHeight/10 * 4  - this.profil.height/2); 
                mainContainer.addChild(this.profil);
            }

        }
      
        function setup() {
            menu.backgroundInitialization(); //wywołanie funkcji backgroundu, jeśli nie wywołamy w setupie to instrukcja nigdy sie nie wykona 
            menu.musicInitialization();
            menu.newGameInitialization();    
            menu.profilInitialization();
            renderer.render(mainContainer); //ukazanie na ekranie naszego mainContainer
        }