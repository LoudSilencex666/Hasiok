/////////////// * Główny Kontener gry i Renderer *  //////////////////////////
let mainContainer = new PIXI.Container(); 
const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view); 

/////////////// * Loader *  //////////////////////////

PIXI.loader
.add("menuTileset", "files/images/menuTilesets/menuTileset.json")
.load(setup);

/////////////// * GlobalneZmienne *  //////////////////////////
let menuStatement = true;
let gameStatement = false;

let earthPlanetsQuantity = 1;
let icePlanetsQuantity = 1;
let firePlanetsQuantity = 1;

/////////////// * Obiekt całego Menu *  //////////////////////////

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
                
                if(menu.newGameWindowStatement) {
                    menu.newGameWindow.playersListSection.destroy();
                    menu.newGameWindow.mapsSection.destroy();
                    menu.newGameWindow.mapsReviewSection.destroy();

                    for(i = 0; i < 7; i++) {
                        menu.menuPlayers[i].playerSection.destroy();
                        menu.menuPlayers[i].playerSectionContent.destroy();
                    }

                    for(i = 0; i < maps.length; i++) {
                        menu.mapsPositioners[i].mapPositioner.destroy();
                    }
                }

                if(menu.profilWindowStatement) {
                    menu.profilWindow.titleSection.destroy();
                    menu.profilWindow.listSection.destroy()
                    menu.profilWindow.infoDisplaySection.destroy();
                }

                menu.newGameWindowStatement = false;
                menu.profilWindowStatement = false;
                menu.tutorialWindowStatement = false;
                menu.musicWindowStatement = false;
                menu.creditsWindowStatement = false; 
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
            menuNewGameWindowInitializations();
            menuNewGameWindowDestroyers();
            menu.newGameWindowStatement = true;    
        };
    },

    newGameWindowStatement : false,
    menuPlayers : [],
    menuPlayersData : [
        "Janek",
        "Janusz",
        "Brzoza",
        "Brzozka",
        "Damian",
        "Dariusz134",
        "Wilgotny Zbigniew"
    ],
    mapsPositioners : [],
    newGameWindow : {
        playersListSection : {},
        playersListSectionInitialization : function() {
            this.playersListSection = new PIXI.Sprite.fromFrame("playerList.png");
            this.playersListSection.width = 500;
            this.playersListSection.height = 600;
            this.playersListSection.position.set(0 + window.innerWidth/10, 150);
            mainContainer.addChild(this.playersListSection);
        },
        playersListSectionFunctionality : function() {
            
        },

        PlayerSection : class {
            constructor() {  
                this.playerSection = new PIXI.Sprite.fromFrame("playerWindow.png");
                this.playerSection.interactive = true;
                this.playerSection.buttonMode = true;
                this.playerSection.hoverStatement = false;
                this.playerSection.width = 480;
                this.playerSection.height = 75;
                this.playerSection.position.set(menu.newGameWindow.playersListSection.x + 10, menu.newGameWindow.playersListSection.y + 30);
                this.playerSectionContent = new PIXI.Text("",{fontFamily : 'Arial', fontSize: 20, fill : "white", align : 'center'});
                this.playerSectionContent.position.set(this.playerSection.x + 50, this.playerSection.y + this.playerSection.height/2 - this.playerSectionContent.height/2);
                mainContainer.addChild(this.playerSection, this.playerSectionContent);
            }

            playerSectionFunctionality() {
                this.playerSection.mouseover = function() {
                    this.hoverStatement = true;
                };

                this.playerSection.mouseout = function() {
                    this.hoverStatement = false;
                };
                
                if(this.playerSection.hoverStatement) {
                    this.playerSection.texture = PIXI.Texture.fromFrame("playerWindowHover.png");
                } else {
                    this.playerSection.texture = PIXI.Texture.fromFrame("playerWindow.png");
                }
            }
        },

        mapsSection : {},
        mapsSectionInitialization : function() {
            this.mapsSection = new PIXI.Sprite.fromFrame("mapsList.png");
            this.mapsSection.width = 350;
            this.mapsSection.height = 600;
            this.mapsSection.position.set(window.innerWidth/2 - this.mapsSection.width/2, 150);
            mainContainer.addChild(this.mapsSection);
        },
        mapsSectionFunctionality : function() {

        },
        MapPositioner : class {
            constructor() {  
                this.mapPositioner = new PIXI.Sprite.fromFrame("mapsPosition.png");
                this.mapPositioner.interactive = true;
                this.mapPositioner.buttonMode = true;
                this.mapPositioner.hoverStatement = false;
                this.mapPositioner.clickStatement = false;
                this.mapPositioner.width = 340;
                this.mapPositioner.height = 50;
                this.mapPositioner.position.set(menu.newGameWindow.mapsSection.x + 5, menu.newGameWindow.mapsSection.y + 20);
                this.mapPositionerContent = new PIXI.Text("",{fontFamily : 'Arial', fontSize: 10, fill : "white", align : 'center'});
                this.mapPositionerContent.position.set(this.mapPositioner.x + 50, this.mapPositioner.y + this.mapPositioner.height/2 - this.mapPositionerContent.height/2);
                mainContainer.addChild(this.mapPositioner, this.mapPositionerContent);
                
            }

            mapPositionerFunctionality() {
                this.mapPositioner.mouseover = function() {
                    this.hoverStatement = true;
                };

                this.mapPositioner.mouseout = function() {
                    this.hoverStatement = false;
                };

                this.mapPositioner.click = function() {
                    this.clickStatement = true;
                };
                
                if(this.mapPositioner.hoverStatement) {
                    this.mapPositioner.texture = PIXI.Texture.fromFrame("mapsPositionHover.png");
                } else {
                    this.mapPositioner.texture = PIXI.Texture.fromFrame("mapsPosition.png");
                }

                if(this.mapPositioner.clickStatement) {
                    this.mapPositioner.texture = PIXI.Texture.fromFrame("mapsPositionHover.png");
                }
            }
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
            this.startSection.interactive = true;
            this.startSection.buttonMode = true;
            this.startSection.position.set(window.innerWidth/2 - this.startSection.width/2, window.innerHeight/1.2);
            mainContainer.addChild(this.startSection);
        },
        startSectionFunctionality : function() {
            this.startSection.mouseover = function() {
                this.texture = PIXI.Texture.fromFrame("buttonBackHover.png");
            };
        
            this.startSection.mouseout = function() {
                this.texture = PIXI.Texture.fromFrame("buttonBack.png");
            };

            this.startSection.click = function() {
                
                menuStatement = false;


                // usuwanie newGameWindow
                
                menu.secondWindow.background.destroy();
                menu.secondWindow.backButton.destroy();
                
                if(menu.newGameWindowStatement) {
                    menu.newGameWindow.playersListSection.destroy();
                    menu.newGameWindow.mapsSection.destroy();
                    menu.newGameWindow.mapsReviewSection.destroy();
                    menu.newGameWindow.startSection.destroy();

                    for(i = 0; i < 7; i++) {
                        menu.menuPlayers[i].playerSection.destroy();
                        menu.menuPlayers[i].playerSectionContent.destroy();
                    }

                    for(i = 0; i < maps.length; i++) {
                        menu.mapsPositioners[i].mapPositioner.destroy();
                        menu.mapsPositioners[i].mapPositionerContent.destroy();
                    }
                }

                menu.newGameWindowStatement = false;
                menu.profilWindowStatement = false;
                menu.tutorialWindowStatement = false;
                menu.musicWindowStatement = false;
                menu.creditsWindowStatement = false;

                // inicjalizacja gry
                gameInitializations();
                gameStatement = true;

            }
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
                
            menuNewGameWindowDestroyers();

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
            menu.tutorialWindow.instructionSectionInitialization();
            menu.tutorialWindow.instructionLeftSectionInitialization();
            menu.tutorialWindow.instructionRightSectionInitialization();
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
        instructionSection : {},
        instructionSectionInitialization : function() {
            this.instructionSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.instructionSection.width = 1400;
            this.instructionSection.height = 800;
            this.instructionSection.position.set(window.innerWidth/2 - this.instructionSection.width/2, window.innerHeight/2 - this.instructionSection.height/2);
            mainContainer.addChild(this.instructionSection);
        },
        instructionSectionFunctionality : function() {

        },

        instructionLeftSection : {},
        instructionLeftSectionInitialization : function() {
            this.instructionLeftSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.instructionLeftSection.width = 80;
            this.instructionLeftSection.height = 100;
            this.instructionLeftSection.position.set(50, window.innerHeight/2 - this.instructionLeftSection.height/2);
            mainContainer.addChild(this.instructionLeftSection);
        },
        instructionLeftSectionFunctionality : function() {

        },

        instructionRightSection : {},
        instructionRightSectionInitialization : function() {
            this.instructionRightSection = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.instructionRightSection.width = 80;
            this.instructionRightSection.height = 100;
            this.instructionRightSection.position.set(window.innerWidth - 50 - this.instructionRightSection.width, window.innerHeight/2 - this.instructionRightSection.height/2);
            mainContainer.addChild(this.instructionRightSection);
        },
        instructionRightSectionFunctionality : function() {

        },   
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

/////////////// * Obiekt Map *  //////////////////////////

let maps = [
    {
        name : "testMap",
        players : 2,
        planets : 10,
        earthPlanets : 2,
        icePlanets : 4,
        firePlanets : 4,
    }, 
    {
        name : "testMap2",
        players : 4,
        planets : 10,
        earthPlanets : 2,
        icePlanets : 4,
        firePlanets : 4,
    },
];

/////////////// * Wybrana Mapa *  //////////////////////////

let chosenMap = {};
let choosingMap = function() {

}

/////////////// * Obiekt Planet *  //////////////////////////

let planets = {

/////////////////////// Planeta Ziemiasta  //////////////////////////

    earthPlanets : [],
    EarthPlanet : class {
        constructor() {
            this.earthPlanet = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolder.png");
            this.earthPlanet.interactive = true;
            this.earthPlanet.width = 80;
            this.earthPlanet.height = 80;
            this.earthPlanet.position.set(0, 0);
            mainContainer.addChild(this.earthPlanet);
        }
   
        earthPlanetFunctionality() {
            this.earthPlanet.mouseover = function() {
                this.alpha -= 1;
            };

            this.earthPlanet.mouseout = function() {
                this.alpha += 1;
            };
        }
    },

/////////////////////// Planeta Lodowa  //////////////////////////

    icePlanets : [],
    IcePlanet : class {
        constructor() {
            this.icePlanet = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolderBlue.png");
            this.icePlanet.interactive = true;
            this.icePlanet.width = 80;
            this.icePlanet.height = 80;
            this.icePlanet.position.set(500, 0);
            mainContainer.addChild(this.icePlanet);
        }
   
        icePlanetFunctionality() {
            this.icePlanet.mouseover = function() {
                this.alpha -= 1;
            };

            this.icePlanet.mouseout = function() {
                this.alpha += 1;
            };
        }
    },

/////////////////////// Planeta Ogniowa  //////////////////////////

    firePlanets : [],
    FirePlanet : class {
        constructor() {
            this.firePlanet = new PIXI.Sprite.fromImage("files/images/menuPics/placeHolderRed.png");
            this.firePlanet.interactive = true;
            this.firePlanet.width = 80;
            this.firePlanet.height = 80;
            this.firePlanet.position.set(800, 0);
            mainContainer.addChild(this.firePlanet);
        }
   
        firePlanetFunctionality() {
            this.firePlanet.mouseover = function() {
                this.alpha -= 1;
            };

            this.firePlanet.mouseout = function() {
                this.alpha += 1;
            };
        }
    },
}

/////////////// * Grupowane Inicjalizacje elementów Menu *  //////////////////////////
/////////////////////// Całego Menu //////////////////////////
let menuInitializations = function() {
    menu.backgroundInitialization();
    menu.logoInitialization();
    menu.newGameInitialization();    
    menu.profilInitialization();
    menu.tutorialInitialization(); 
    menu.musicInitialization();
    menu.creditsInitialization();
};
/////////////////////// Okno NewGame //////////////////////////
let menuNewGameWindowInitializations = function() {
    menu.secondWindow.backgroundInitialization();
    menu.newGameWindow.playersListSectionInitialization();

    for(i = 0; i < 7; i++) {
        menu.menuPlayers[i] = new menu.newGameWindow.PlayerSection();
        menu.menuPlayersData[i] = menu.menuPlayersData[i].toUpperCase();
        menu.menuPlayers[i].playerSectionContent.text = menu.menuPlayersData[i];
        menu.menuPlayers[i].playerSection.y += 70 * i;
        menu.menuPlayers[i].playerSectionContent.y += 70 * i;
    }
            
    menu.newGameWindow.mapsSectionInitialization();
    
    for(i = 0; i < maps.length; i++) {
        menu.mapsPositioners[i] = new menu.newGameWindow.MapPositioner();
        maps[i].name = maps[i].name.toUpperCase();
        menu.mapsPositioners[i].mapPositionerContent.text = maps[i].name;
        menu.mapsPositioners[i].mapPositioner.y += 50 * i;
        menu.mapsPositioners[i].mapPositionerContent.y += 50 * i;
    }

    console.log(menu.mapsPositioners);
    menu.newGameWindow.mapsReviewSectionInitialization();
    menu.newGameWindow.startSectionInitialization();
    menu.secondWindow.backButtonInitialization();
};

let menuNewGameWindowDestroyers = function() {
    menu.background.destroy();
    menu.logo.destroy();
    menu.newGame.destroy();
    menu.profil.destroy();
    menu.tutorial.destroy();
    menu.music.destroy();
    menu.credits.destroy();
}

/////////////// * Grupowane Inicjalizacje elementów Game *  //////////////////////////
/////////////////////// Całego Game //////////////////////////
let gameInitializations = function() {
    for(i = 0; i < earthPlanetsQuantity; i++) {
        planets.earthPlanets[i] = new planets.EarthPlanet();
        planets.earthPlanets[i].earthPlanet.x = 50 * i;
        planets.earthPlanets[i].earthPlanet.y = 50 * i;    
    }

    for(i = 0; i < icePlanetsQuantity; i++) {
        planets.icePlanets[i] = new planets.IcePlanet();
        planets.icePlanets[i].icePlanet.x += 50 * i;
        planets.icePlanets[i].icePlanet.y += 50 * i;
    }

    for(i = 0; i < firePlanetsQuantity; i++) {
        planets.firePlanets[i] = new planets.FirePlanet();
        planets.firePlanets[i].firePlanet.x += 50 * i;
        planets.firePlanets[i].firePlanet.y += 50 * i;
    }

    console.log(planets.earthPlanets);
    
}

/////////////// * Grupowane Funkcjonalności elementów Menu do gameInitiate *  //////////////////////////

let menuFunctionalities = function() {
    menu.newGameFunctionality();

    if(menu.newGameWindowStatement) {
        menu.secondWindow.backButtonFunctionality();

        for(i = 0; i < 7; i++) {    
            menu.menuPlayers[i].playerSectionFunctionality();
        }

        for(i = 0; i < maps.length; i++) {    
            menu.mapsPositioners[i].mapPositionerFunctionality();
        }

        menu.newGameWindow.startSectionFunctionality();

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

/////////////// * Grupowane Funkcjonalności elementów Game do gameInitiate *  //////////////////////////

let gameFunctionalities = function() {
    for(i = 0; i < earthPlanetsQuantity; i++) {
        planets.earthPlanets[i].earthPlanetFunctionality();
    }

    for(i = 0; i < icePlanetsQuantity; i++) {
        planets.icePlanets[i].icePlanetFunctionality(); 
    }

    for(i = 0; i < firePlanetsQuantity; i++) {
        planets.firePlanets[i].firePlanetFunctionality();
    }
}

/////////////// * Funkcje Uruchamiające grę *  //////////////////////////

function setup() {
    menuInitializations();

    gameInitiate();
};

function gameInitiate(){
    requestAnimationFrame(gameInitiate);
    if(menuStatement) {
        menuFunctionalities();
    }

    if(gameStatement) {
        gameFunctionalities();
    }

    renderer.render(mainContainer);
};




























// Janek jest super eksdi