let mainContainer = new PIXI.Container(); 
const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view); 

PIXI.loader
.add("menuTileset", "files/images/menuTilesets/menuTileset.json")
.load(setup);

let idMenuTexture; 

let menu = {

/////////////////////// Tło  //////////////////////////

    x : 0, 
    y : 0,
    background : {}, 
    backgroundInitialization : function() { 
        this.background = new PIXI.Sprite.fromFrame("menuBackground.png"); 
        this.background.position.set(this.x, this.y); 
        this.background.width = window.innerWidth; 
        this.background.height = window.innerHeight; 
        mainContainer.addChild(this.background); 
    },

/////////////////////// Logo //////////////////////////

    logoW : 1000,
    logoH : 300,
    logo : {},
    logoInitialization: function() {
        this.logo = new PIXI.Sprite.fromFrame("welcome_twitch.png");    
        this.logo.width = this.logoW; 
        this.logo.height = this.logoH;
        this.logo.position.set(window.innerWidth/2 - this.logo.width/2, 0); 
        mainContainer.addChild(this.logo);
    },

/////////////////////// Nowa gra //////////////////////////

    newGameW : 200,
    newGameH : 80,
    newGameWindowStatement : false,
    newGameWindow: {},
    newGame : {},
    newGameInitialization : function() {
        this.newGame = new PIXI.Sprite.fromFrame("welcome_twitch.png"); 
        this.newGame.interactive = true;
        this.newGame.buttonMode = true;     
        this.newGame.width = this.newGameW; 
        this.newGame.height = this.newGameH;
        this.newGame.position.set(window.innerWidth/2 - this.newGame.width/2, window.innerHeight/10 * 3  - this.newGame.height/2); 
        mainContainer.addChild(this.newGame);
    },
    newGameFunctionality : function() {
        this.newGame.mouseover = function() {
            menu.newGame.texture = PIXI.Texture.fromFrame("shedule_twitch.png");
        };

        this.newGame.mouseout = function() {
            menu.newGame.texture = PIXI.Texture.fromFrame("welcome_twitch.png");
        };

        this.newGame.click = function() {
                menu.newGameWindow = {
                backgroundW : window.innerWidth,
                backgroundH : window.innerHeight,
                background : {},
                backgroundInitialization : function() {
                    this.background = new PIXI.Sprite.fromFrame("welcome_twitch.png");
                    this.background.width = this.backgroundW;
                    this.background.height = this.backgroundH;
                    mainContainer.addChild(this.background);
                },

                backButtonW : 100,
                backButtonH : 100,
                backButton : {},
                backButtonInitialization : function() {
                    this.backButton = new PIXI.Sprite.fromFrame("shedule_twitch.png");
                    this.backButton.interactive = true;
                    this.backButton.buttonMode = true; 
                    this.backButton.width = this.backButtonW;
                    this.backButton.height = this.backButtonH;
                    mainContainer.addChild(this.backButton);
                },
                backButtonFunctionality : function() {
                    this.backButton.click = function() {
                        menuInitializations();
                        menu.newGameWindow.background.destroy();
                        menu.newGameWindow.backButton.destroy();
                    }
                }
            };
            
            menu.newGameWindow.backgroundInitialization();
            menu.newGameWindow.backButtonInitialization();
                
            menu.newGame.destroy();
            menu.profil.destroy();
            menu.tutorial.destroy();
            menu.music.destroy();
            menu.credits.destroy();


            menu.newGameWindowStatement = true;
            
            
        };
    },

/////////////////////// Profil //////////////////////////

    profilW : 200,
    profilH : 80,
    profil : {},
    profilInitialization : function() {
        this.profil = new PIXI.Sprite.fromFrame("welcome_twitch.png");
        this.profil.interactive = true;
        this.profil.buttonMode = true;     
        this.profil.width = this.profilW; 
        this.profil.height = this.profilH;
        this.profil.position.set(window.innerWidth/2 - this.profil.width/2, window.innerHeight/10 * 4.5  - this.profil.height/2); 
        mainContainer.addChild(this.profil);
    },
    profilFunctionality : function() {
        this.profil.mouseover = function() {
            menu.profil.texture = PIXI.Texture.fromFrame("shedule_twitch.png");
        };

        this.profil.mouseout = function() {
            menu.profil.texture = PIXI.Texture.fromFrame("welcome_twitch.png");
        }
    },

/////////////////////// Tutorial //////////////////////////    

    tutorialW : 200,
    tutorialH : 80,
    tutorial : {},
    tutorialInitialization : function() {
        this.tutorial = new PIXI.Sprite.fromFrame("welcome_twitch.png");
        this.tutorial.interactive = true;
        this.tutorial.buttonMode = true;  
        this.tutorial.width = this.tutorialW;
        this.tutorial.height = this.tutorialH;
        this.tutorial.position.set(window.innerWidth/2 - this.tutorial.width/2, window.innerHeight/10 * 6 - this.tutorial.height/2);
        mainContainer.addChild(this.tutorial);
    },
    tutorialFunctionality : function() {
        this.tutorial.mouseover = function() {
            menu.tutorial.texture = PIXI.Texture.fromFrame("shedule_twitch.png");
        };

        this.tutorial.mouseout = function() {
            menu.tutorial.texture = PIXI.Texture.fromFrame("welcome_twitch.png");
        }
    },

/////////////////////// Music //////////////////////////

    musicW : 200,
    musicH : 80,
    music : {},
    musicInitialization : function() {
        this.music = new PIXI.Sprite.fromFrame("welcome_twitch.png");
        this.music.interactive = true;
        this.music.buttonMode = true;  
        this.music.width = this.musicW; 
        this.music.height = this.musicH;
        this.music.position.set(window.innerWidth/2 - this.music.width/2, window.innerHeight/10 * 7.5 - this.music.height/2);
        mainContainer.addChild(this.music);
    },
    musicFunctionality : function() {
        this.music.mouseover = function() {
            menu.music.texture = PIXI.Texture.fromFrame("shedule_twitch.png");
        };

        this.music.mouseout = function() {
            menu.music.texture = PIXI.Texture.fromFrame("welcome_twitch.png");
        }
    },

/////////////////////// Credits //////////////////////////    

    creditsW : 200,
    creditsH : 80,
    credits : {},
    creditsInitialization : function() {
        this.credits = new PIXI.Sprite.fromFrame("welcome_twitch.png");
        this.credits.interactive = true;
        this.credits.buttonMode = true;  
        this.credits.width = this.creditsW;
        this.credits.height = this.creditsH;
        this.credits.position.set(window.innerWidth/2 - this.credits.width/2, window.innerHeight/10 * 9 - this.credits.height/2);
        mainContainer.addChild(this.credits);
    },
    creditsFunctionality : function() {
        this.credits.mouseover = function() {
            menu.credits.texture = PIXI.Texture.fromFrame("shedule_twitch.png");
        };

        this.credits.mouseout = function() {
            menu.credits.texture = PIXI.Texture.fromFrame("welcome_twitch.png");
        }
    }
};

let menuInitializations = function() {
    menu.backgroundInitialization();
    menu.logoInitialization();
    menu.newGameInitialization();    
    menu.profilInitialization();
    menu.tutorialInitialization(); 
    menu.musicInitialization();
    menu.creditsInitialization();
   
};

let menuFunctionalities = function() {
    menu.newGameFunctionality();
    if(menu.newGameWindowStatement) {
        menu.newGameWindow.backButtonFunctionality();
    }
    menu.profilFunctionality();
    menu.tutorialFunctionality();
    menu.musicFunctionality();
    menu.creditsFunctionality();
};

function setup() {
    menuInitializations();

    gameInitiate();
};

function gameInitiate(){
      requestAnimationFrame(gameInitiate);

      menuFunctionalities();

      renderer.render(mainContainer);
};