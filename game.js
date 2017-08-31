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
    logoInitialization : function() {
        this.logo = new PIXI.Sprite.fromFrame("buttonNewGame.png");    
        this.logo.width = this.logoW; 
        this.logo.height = this.logoH;
        this.logo.position.set(window.innerWidth/2 - this.logo.width/2, 0); 
        mainContainer.addChild(this.logo);
    },
/////////////////////// drugie okna w menu //////////////////////////
    secondWindow : {
        backgroundW : window.innerWidth,
        backgroundH : window.innerHeight,
        background : {},
        backgroundInitialization : function() {
            this.background = new PIXI.Sprite.fromFrame("menuBackground.png");
            this.background.width = this.backgroundW;
            this.background.height = this.backgroundH;
            mainContainer.addChild(this.background);
        },

        backButtonW : 350,
        backButtonH : 100,
        backButton : {},
        backButtonInitialization : function() {
            this.backButton = new PIXI.Sprite.fromFrame("buttonBack.png");
            this.backButton.interactive = true;
            this.backButton.buttonMode = true; 
            this.backButton.width = this.backButtonW;
            this.backButton.height = this.backButtonH;
            mainContainer.addChild(this.backButton);
        },
        backButtonFunctionality : function() {
            this.backButton.mouseover = function() {
                menu.secondWindow.backButton.texture = PIXI.Texture.fromFrame("buttonBackHover.png");
            };
        
            this.backButton.mouseout = function() {
                menu.secondWindow.backButton.texture = PIXI.Texture.fromFrame("buttonBack.png");
            };


            this.backButton.click = function() {
                menuInitializations();
                menu.secondWindow.background.destroy();
                menu.secondWindow.backButton.destroy();
            }
        }
    },

/////////////////////// Nowa gra //////////////////////////

    newGameW : 350,
    newGameH : 100,
    newGame : {},
    newGameInitialization : function() {
        this.newGame = new PIXI.Sprite.fromFrame("buttonNewGame.png"); 
        this.newGame.interactive = true;
        this.newGame.buttonMode = true;     
        this.newGame.width = this.newGameW; 
        this.newGame.height = this.newGameH;
        this.newGame.position.set(window.innerWidth/2 - this.newGame.width/2, window.innerHeight/10 * 4  - this.newGame.height/2); 
        mainContainer.addChild(this.newGame);
    },
    newGameFunctionality : function() {
        this.newGame.mouseover = function() {
            menu.newGame.texture = PIXI.Texture.fromFrame("buttonNewGameHover.png");
        };

        this.newGame.mouseout = function() {
            menu.newGame.texture = PIXI.Texture.fromFrame("buttonNewGame.png");
        };

        this.newGame.click = function() {
            
            menu.secondWindow.backgroundInitialization();
            menu.newGameWindow.playersSectionInitialization();
            menu.newGameWindow.mapsSectionInitialization();
            menu.newGameWindow.mapsReviewSectionInitialization();
            menu.newGameWindow.startSectionInitialization();
            menu.secondWindow.backButtonInitialization();
                
            menu.newGame.destroy();
            menu.profil.destroy();
            menu.tutorial.destroy();
            menu.music.destroy();
            menu.credits.destroy();

            menu.newGameWindowStatement = true;    
        };
    },

    newGameWindowStatement : false,
    newGameWindow : {
        playersSection : {},
        playersSectionInitialization : function() {
            this.playersSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.playersSection.width = 500;
            this.playersSection.height = 600;
            this.playersSection.position.set(0 + window.innerWidth/10, 150);
            mainContainer.addChild(this.playersSection);
        },
        playersSectionFunctionality : function() {

        },

        mapsSection : {},
        mapsSectionInitialization : function() {
            this.mapsSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.mapsSection.width = 300;
            this.mapsSection.height = 600;
            this.mapsSection.position.set(this.playersSection.width + this.playersSection.x + 100, 150);
            mainContainer.addChild(this.mapsSection);
        },
        mapsSectionFunctionality : function() {

        },

        mapsReviewSection : {},
        mapsReviewSectionInitialization : function() {
            this.mapsReviewSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.mapsReviewSection.width = 500;
            this.mapsReviewSection.height = 600;
            this.mapsReviewSection.position.set(window.innerWidth - this.mapsReviewSection.width -window.innerWidth/10, 150);
            mainContainer.addChild(this.mapsReviewSection);
        },
        mapsReviewSectionFunctionality : function() {

        },

        startSection : {},
        startSectionInitialization : function() {
            this.startSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.startSection.width = 350;
            this.startSection.height = 100;
            this.startSection.position.set(window.innerWidth/2 - this.startSection.width/2, window.innerHeight/1.2);
            mainContainer.addChild(this.startSection);
        },
        startSectionFunctionality : function() {

        },
    },

    

/////////////////////// Profil //////////////////////////

    profilW : 350,
    profilH : 100,
    profil : {},
    profilInitialization : function() {
        this.profil = new PIXI.Sprite.fromFrame("buttonProfil.png");
        this.profil.interactive = true;
        this.profil.buttonMode = true;     
        this.profil.width = this.profilW; 
        this.profil.height = this.profilH;
        this.profil.position.set(window.innerWidth/2 - this.profil.width/2, window.innerHeight/10 * 4 + 120  - this.profil.height/2); 
        mainContainer.addChild(this.profil);
    },
    profilFunctionality : function() {
        this.profil.mouseover = function() {
            menu.profil.texture = PIXI.Texture.fromFrame("buttonProfilHover.png");
        };

        this.profil.mouseout = function() {
            menu.profil.texture = PIXI.Texture.fromFrame("buttonProfil.png");
        }

        this.profil.click = function() {
            
            menu.secondWindow.backgroundInitialization();
            menu.profilWindow.titleSectionInitialization();
            menu.profilWindow.listSectionInitialization();
            menu.profilWindow.infoDisplaySectionInitialization()
            menu.secondWindow.backButtonInitialization();
                
            menu.newGame.destroy();
            menu.profil.destroy();
            menu.tutorial.destroy();
            menu.music.destroy();
            menu.credits.destroy();

            menu.profilWindowStatement = true;    
        };
    },
    profilWindowStatement : false,
    profilWindow : {
        titleSection : {},
        titleSectionInitialization : function() {
            this.titleSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.titleSection.width = window.innerWidth/10 * 6.5;
            this.titleSection.height = window.innerHeight/10;
            this.titleSection.position.set(window.innerWidth/10, window.innerHeight/10 + 25);
            mainContainer.addChild(this.titleSection);
        },
        titleSectionFunctionality : function() {

        },

        listSection : {},
        listSectionInitialization : function() {
            this.listSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.listSection.width = window.innerWidth/10 * 1.5;
            this.listSection.height = window.innerHeight/10 * 8;
            this.listSection.position.set(window.innerWidth/10 * 8, window.innerHeight/10 + 25);
            mainContainer.addChild(this.listSection);
        },
        listSectionFunctionality : function() {

        },
        
        infoDisplaySection : {},
        infoDisplaySectionInitialization : function() {
            this.infoDisplaySection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.infoDisplaySection.width = window.innerWidth/10 * 6.5;
            this.infoDisplaySection.height = window.innerHeight/10 * 6.5;
            this.infoDisplaySection.position.set(window.innerWidth/10, window.innerHeight/10 * 2.5 + 25);
            mainContainer.addChild(this.infoDisplaySection);
        },
        infoDisplaySectionFunctionality : function() {

        },
        
    },

/////////////////////// Tutorial //////////////////////////    

    tutorialW : 350,
    tutorialH : 100,
    tutorial : {},
    tutorialInitialization : function() {
        this.tutorial = new PIXI.Sprite.fromFrame("buttonTutorial.png");
        this.tutorial.interactive = true;
        this.tutorial.buttonMode = true;  
        this.tutorial.width = this.tutorialW;
        this.tutorial.height = this.tutorialH;
        this.tutorial.position.set(window.innerWidth/2 - this.tutorial.width/2, window.innerHeight/10 * 4 + 240 - this.tutorial.height/2);
        mainContainer.addChild(this.tutorial);
    },
    tutorialFunctionality : function() {
        this.tutorial.mouseover = function() {
            menu.tutorial.texture = PIXI.Texture.fromFrame("buttonTutorialHover.png");
        };

        this.tutorial.mouseout = function() {
            menu.tutorial.texture = PIXI.Texture.fromFrame("buttonTutorial.png");
        }
        
        this.tutorial.click = function() {
            
            menu.secondWindow.backgroundInitialization();
            menu.secondWindow.backButtonInitialization();
                
            menu.newGame.destroy();
            menu.profil.destroy();
            menu.tutorial.destroy();
            menu.music.destroy();
            menu.credits.destroy();

            menu.tutorialWindowStatement = true;    
        };
    },
    tutorialWindowStatement : false,
    tutorialWindow : {

    },

/////////////////////// Music //////////////////////////

    musicW : 350,
    musicH : 100,
    music : {},
    musicInitialization : function() {
        this.music = new PIXI.Sprite.fromFrame("buttonMusic.png");
        this.music.interactive = true;
        this.music.buttonMode = true;  
        this.music.width = this.musicW; 
        this.music.height = this.musicH;
        this.music.position.set(window.innerWidth/2 - this.music.width/2, window.innerHeight/10 * 4 + 360 - this.music.height/2);
        mainContainer.addChild(this.music);
    },
    musicFunctionality : function() {
        this.music.mouseover = function() {
            menu.music.texture = PIXI.Texture.fromFrame("buttonMusicHover.png");
        };

        this.music.mouseout = function() {
            menu.music.texture = PIXI.Texture.fromFrame("buttonMusic.png");
        }
        
        this.music.click = function() {
            
            menu.secondWindow.backgroundInitialization();
            menu.secondWindow.backButtonInitialization();
                
            menu.newGame.destroy();
            menu.profil.destroy();
            menu.tutorial.destroy();
            menu.music.destroy();
            menu.credits.destroy();

            menu.musicWindowStatement = true;    
        };
    },
    musicWindowStatement : false,
    musicWindow : {

    },
/////////////////////// Credits //////////////////////////    

    creditsW : 350,
    creditsH : 100,
    credits : {},
    creditsInitialization : function() {
        this.credits = new PIXI.Sprite.fromFrame("buttonCredits.png");
        this.credits.interactive = true;
        this.credits.buttonMode = true;  
        this.credits.width = this.creditsW;
        this.credits.height = this.creditsH;
        this.credits.position.set(window.innerWidth/2 - this.credits.width/2, window.innerHeight/10 * 4 + 480 - this.credits.height/2);
        mainContainer.addChild(this.credits);
    },
    creditsFunctionality : function() {
        this.credits.mouseover = function() {
            menu.credits.texture = PIXI.Texture.fromFrame("buttonCreditsHover.png");
        };

        this.credits.mouseout = function() {
            menu.credits.texture = PIXI.Texture.fromFrame("buttonCredits.png");
        }

        this.credits.click = function() {
            
            menu.secondWindow.backgroundInitialization();
            menu.secondWindow.backButtonInitialization();
                
            menu.newGame.destroy();
            menu.profil.destroy();
            menu.tutorial.destroy();
            menu.music.destroy();
            menu.credits.destroy();

            menu.creditsWindowStatement = true;    
        };
    },
    creditsWindowStatement : false,
    creditsWindow : {
    
    },

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
        menu.secondWindow.backButtonFunctionality();
    }

    menu.profilFunctionality();

    if(menu.profilWindowStatement) {
        menu.secondWindow.backButtonFunctionality();
    }

    menu.tutorialFunctionality();
    if(menu.tutorialWindowStatement) {
        menu.secondWindow.backButtonFunctionality();
    }

    menu.musicFunctionality();
    if(menu.musicWindowStatement) {
        menu.secondWindow.backButtonFunctionality();
    }
    menu.creditsFunctionality();

    if(menu.creditsWindowStatement) {
        menu.secondWindow.backButtonFunctionality();
    }
    
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