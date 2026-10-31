class App {
    drinks;
    stage;
}

class Drink {
    name;
    varieties;
}

class DrinkVariety {
    size;
    temp;
    flavourTea1;
    flavourTea2;
    flavourOther;
    baseTea;
    baseMilk;
    baseWater;
    creamer;
    decoration;
    sugar1;
    sugar2;
    ice;
}

const convertData = () => {
    app.drinks = [];

    for (let od of drinkData) {
        let d = new Drink();
        d.name = od.name;
        d.varieties = [];

        for (let ov of od.varieties) {
            let v = new DrinkVariety();
            v.size = ov.size;
            v.temp = ov.temp;
            v.flavourTea1 = ov.flavourTea1;
            v.flavourTea2 = ov.flavourTea2;
            v.flavourOther = ov.flavourOther;
            v.baseTea = ov.baseTea;
            v.baseMilk = ov.baseMilk;
            v.baseWater = ov.baseWater;
            v.creamer = ov.creamer;
            v.decoration = ov.decoration;
            v.sugar1 = ov.sugar1;
            v.sugar2 = ov.sugar2;
            v.ice = ov.ice;

            d.varieties.push(v);
        }

        app.drinks.push(d);
    }
}

const createScenes = () => {
    app.stage = new Stage();
    app.stage.createScene("game", "#gamePanel");
    app.stage.createScene("help", "#helpPanel", "#btnHelp");
    app.stage.setDefault("game");
}

const populateDrinksPanel = () => {

}

const init = () => {
    app = new App();
    createScenes();
    convertData();
    populateDrinksPanel();
}

let app;

$(document).ready(init);
