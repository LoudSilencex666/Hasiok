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
    backgroundInitialization : function() { 
        idMenuTexture = PIXI.loader.resources["menuTileset"].textures; 
        this.background = new PIXI.Sprite(idMenuTexture["menuBackground.png"]); 
        this.background.position.set(this.x, this.y); 
        this.background.width = window.innerWidth; 
        this.background.height = window.innerHeight; 
        mainContainer.addChild(this.background); 
    },

    logoW : 0,
    logoH : 0,
    logo : {},
    logoInitialization: function {

    },

    musicW : 200,
    musicH : 80,
    music : {},
    musicInitialization : function() {
        idMenuTexture = PIXI.loader.resources["menuTileset"].textures;
        this.music = new PIXI.Sprite(idMenuTexture["welcome_twitch.png"]);
        this.music.width = this.musicW; 
        this.music.height = this.musicH;
        this.music.position.set(window.innerWidth/2 - this.music.width/2, window.innerHeight/10 * 8 - this.music.height/2);
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

let initializations = function() {
    menu.backgroundInitialization(); 
    menu.musicInitialization();
    menu.newGameInitialization();    
    menu.profilInitialization();
}

function setup() {
    initializations();
    renderer.render(mainContainer); 
}