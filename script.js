class App {
    drinks;
    stage;
    substage;

    // currently selected
    drink;
    size;
    temp;
}

class Drink {
    name;
    varieties;
    colour1;
    colour2;

    getID = () => {
        return this.name.toLowerCase().replace(/[^a-z]/gm,"");
    }

    formatCard = () => {
        let style = "";

        if (! this.colour2) {
            // 1 colours
            style = `background-color: #${this.colour1}`;

        } else {
            // 2 colours
            style = `background-image: linear-gradient(135deg, #${this.colour1}, #${this.colour2})`;
        }

        let title = `<div class="dCardTitle">${this.name}</div>`;

        return `<div id="d-card-${this.getID()}" class="dCardWrap flexCol" style="${style}">${title}</div>`;
    }
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

        // csv handling may result in non-significant 0 stripping...
        d.colour1 = (! od.colour1) ? "" : String(od.colour1).padStart(6, '0');
        d.colour2 = (! od.colour2) ? "" : String(od.colour2).padStart(6, '0');
        
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

    app.drinks.sort((a, b) => a.name.localeCompare(b.name));
}

const createScenes = () => {
    app.stage = new Stage();
    app.stage.createScene("game", "#gamePanel");
    app.stage.createScene("help", "#helpPanel", "#btnHelp");
    app.stage.setDefault("game");
    app.stage.show("game");

    app.substage = new Stage();
    app.substage.createScene("choose", "#drinksPanel");
    app.substage.createScene("options", "#drinkOptionsPanel");
    app.substage.createScene("info", "#drinkInfoPanel");
    app.substage.setDefault("choose");
    app.substage.show("choose");
}

const populateDrinksPanel = () => {
    let dp = $('#drinksPanel')
    for (let d of app.drinks) {
        dp.append(d.formatCard());
    } 
}

const bindDrinks = () => {
    for (let d of app.drinks) {
        $(`#d-card-${d.getID()}`).click(() => {
            showDrinkOptions(d);
        });
    }
}

const bindGeneral = () => {
    $('#btnOptionsBack').click(() => {
        app.drink = null;
        app.substage.show('choose');
        $('#drinkOptionsDrink').html("");
        $('#drinkInfoDrink').html("");
    });

    $('#btnInfoBack').click(() => {
        app.substage.show('options');
    });

    $('#btnOptionsForward').click(() => {
        app.substage.show('info');
    });
}

const showDrinkOptions = (drink) => {
    if (! app.substage.showing("choose")) {
        console.log(app.substage.active);
        return;
    }

    app.drink = drink;
    app.substage.show('options');
    $('#drinkInfoDrink').html(drink.formatCard());
    $('#drinkOptionsDrink').html(drink.formatCard());
}

const init = () => {
    app = new App();
    app.drink = null;

    createScenes();
    convertData();
    populateDrinksPanel();
    bindDrinks();
    bindGeneral();
}

let app;

$(document).ready(init);
