// Begin

window.addEventListener("load", function(){
    "use strict";

    let rotate = document.getElementById("rotate");
    let flag = document.getElementById("flag");
    let canvas = document.getElementById("einCanvas");
    let ctx = canvas.getContext("2d");
    let maxHight = canvas.getAttribute("height");
    let maxWidth = canvas.getAttribute("width");
    let windrichtung = document.getElementById("richtung");
    let richtung = ["N", "NO", "O", "SO", "S", "SW", "W", "NW", "N"];
    let waveArray = genArray();
    let zeitBeimErstenAufruf = null;
    let v = 50; // Geschwindigkeit Wolken
    let verschiebung = 0;
    let bool = true;
    let verschArray;

    windrichtung.innerText = "-";

    rotate.addEventListener("input", function () {

        if (flag.value !== "0") {

            drawFlag(flag.value, rotate.value);

            windrichtung.innerText = richtung[rotate.value];
        } else {
            windrichtung.innerText = "-";
        }
    });

    flag.addEventListener("input", function () {

        drawFlag(flag.value, rotate.value);

        if (flag.value !== "0") {
            windrichtung.innerText = richtung[rotate.value];
        } else {
            windrichtung.innerText = "-";
        }
    });

    function repaint(zeitBeimAufruf) {

        ctx.clearRect(0, 0, maxWidth, maxHight);

        if (zeitBeimErstenAufruf === null)
            zeitBeimErstenAufruf = zeitBeimAufruf;

        var zeitIntervallSeitErstemAufruf = zeitBeimAufruf - zeitBeimErstenAufruf;

        var s = v * zeitIntervallSeitErstemAufruf / 1000.0;

        if (s < 1110) {

            draw(s - 175, 140);
            verschArray = drawOcean(waveArray, verschiebung, bool);
            bool = verschArray[0];
            verschiebung = verschArray[1];

            drawFlag(flag.value, rotate.value);

        } else {
            zeitBeimErstenAufruf = null;
        }

        window.requestAnimationFrame(repaint);
    }

    window.requestAnimationFrame(repaint);

});

function draw(x, y) {

    drawCloud(x, y);
    drawCloud(x / 2, y - 70);
    drawCloud( (x - 200) / 1.5, y - 40);
}

function drawCloud(startX, startY){
    let canvas = document.getElementById("einCanvas");
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#0000ff";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(startX, startY); //70 + 70
    ctx.bezierCurveTo(startX - 10,startY + 30,startX + 80,startY + 30,startX + 70, startY);
    ctx.bezierCurveTo(startX + 90,startY + 10, startX + 90,startY - 30, startX + 80, startY - 20);
    ctx.bezierCurveTo(startX + 80, startY - 60, startX - 10, startY - 60, startX, startY - 20);
    ctx.bezierCurveTo(startX - 10, startY - 30, startX - 30, startY + 10 , startX, startY);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}

function drawOcean(array, shift, shiftBool){
    let canvas = document.getElementById("einCanvas");
    let ctx = canvas.getContext("2d");
    let shiftArray = [];

    if (shift === 50){
        shiftBool = false;
        shiftArray.push(shiftBool);
    } else if (shift === -50){
        shiftBool = true;
        shiftArray.push(shiftBool);
    } else {
        shiftArray.push(shiftBool)
    }

    if (shiftBool) {
        ctx.beginPath();
        ctx.moveTo(-50 + shift, 450);
        ctx.bezierCurveTo(-50 + shift, 500, 50 + shift, 500, array[0] + shift, 450);
        ctx.bezierCurveTo(50 + shift, 500, 150 + shift, 500, array[1] + shift, 450);
        ctx.bezierCurveTo(150 + shift, 500, 250 + shift, 500, array[2] + shift, 450);
        ctx.bezierCurveTo(250 + shift, 500, 350 + shift, 500, array[3] + shift, 450);
        ctx.bezierCurveTo(350 + shift, 500, 450 + shift, 500, array[4] + shift, 450);
        ctx.bezierCurveTo(450 + shift, 500, 550 + shift, 500, array[5] + shift, 450);
        ctx.bezierCurveTo(550 + shift, 500, 650 + shift, 500, array[6] + shift, 450);
        ctx.lineTo(550 + shift, 650);
        ctx.lineTo(-50 + shift, 650);
        ctx.lineTo(-50 + shift, 450);
        ctx.closePath();

        ctx.fillStyle = "#2268d8";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#0000ff";
        ctx.stroke();

        shift += 1;
        shiftArray.push(shift);
    } else if (!shiftBool) {
        ctx.beginPath();
        ctx.moveTo(-50 + shift, 450);
        ctx.bezierCurveTo(-50 + shift, 500, 50 + shift, 500, array[0] + shift, 450);
        ctx.bezierCurveTo(50 + shift, 500, 150 + shift, 500, array[1] + shift, 450);
        ctx.bezierCurveTo(150 + shift, 500, 250 + shift, 500, array[2] + shift, 450);
        ctx.bezierCurveTo(250 + shift, 500, 350 + shift, 500, array[3] + shift, 450);
        ctx.bezierCurveTo(350 + shift, 500, 450 + shift, 500, array[4] + shift, 450);
        ctx.bezierCurveTo(450 + shift, 500, 550 + shift, 500, array[5] + shift, 450);
        ctx.bezierCurveTo(550 + shift, 500, 650 + shift, 500, array[6] + shift, 450);
        ctx.lineTo(550 + shift, 650);
        ctx.lineTo(-50 + shift, 650);
        ctx.lineTo(-50 + shift, 450);
        ctx.closePath();

        ctx.fillStyle = "#2268d8";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#0000ff";
        ctx.stroke();

        shift -= 1;
        shiftArray.push(shift);
    }

    console.log(shiftBool + " " + shift);

    return shiftArray;
}

function drawFlag(type, rotation) {
    let canvas = document.getElementById("einCanvas");
    let ctx = canvas.getContext("2d");

    let rotateArray = [0, 45, 90, 135, 180, 225, 270, 315, 360];
    let maxHight = canvas.getAttribute("height");
    let maxWidth = canvas.getAttribute("width");
    var min = Math.min(maxWidth, maxHight);
    var radius = 0.1 * min/2;
    var phiStart = 0;
    var phiEnde = 2 * Math.PI; // Bogenmaß
    var mathPositiv = true;

    var x = maxWidth / 2;
    var y = maxHight / 2;

    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";

    if (parseInt(type) === 0){
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc((maxWidth / 2), (maxHight / 2), radius, phiStart, phiEnde, mathPositiv);
        ctx.stroke();

    } else {

        let drei, restdrei, zehn, restzehn, fuenf, i, abstand = 0;

        ctx.save();
        ctx.translate(maxWidth / 2, maxHight / 2);
        ctx.rotate(rotateArray[rotation] * Math.PI / 180);
        ctx.translate(-maxWidth / 2, -maxHight / 2); // Rotiert das Canvas

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 5, y);
        ctx.lineTo(x - 5, y);
        ctx.lineTo(x - 5, y - 200);
        ctx.lineTo(x + 5, y - 200);

        drei = Math.floor(parseInt(type) / 50);
        restdrei = parseInt(type) % 50;

        for (i = 0; i < drei; i++){
            ctx = drawDreieck(ctx, abstand);
            abstand += 40;
        }

        zehn = Math.floor(restdrei / 10);
        restzehn = restdrei % 10;

        for (i = 0; i < zehn; i++){
            ctx = drawStrichGross(ctx, abstand);
            abstand += 20;
        }

        fuenf = Math.floor(restzehn / 5);

        for (i = 0; i < fuenf; i++){
            ctx = drawStrichKlein(ctx, abstand);
            abstand +=20
        }

        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();

        ctx.restore();

    }
}

function drawStrichKlein(ctx, entf) {

    let canvas = document.getElementById("einCanvas");

    let maxHight = canvas.getAttribute("height");
    let maxWidth = canvas.getAttribute("width");

    let dxEnde = maxWidth / 2 + 5;
    let dyEnde = maxHight / 2 - 200;

    ctx.moveTo(dxEnde, dyEnde + entf);
    ctx.lineTo(dxEnde + 30, dyEnde - 10 + entf);
    ctx.lineTo(dxEnde + 30, dyEnde + entf);
    ctx.lineTo(dxEnde, dyEnde + entf + 10);

    return ctx;

}

function drawStrichGross(ctx, entf) {

    let canvas = document.getElementById("einCanvas");

    let maxHight = canvas.getAttribute("height");
    let maxWidth = canvas.getAttribute("width");

    let dxEnde = maxWidth / 2 + 5;
    let dyEnde = maxHight / 2 - 200;

    ctx.moveTo(dxEnde, dyEnde + entf);
    ctx.lineTo(dxEnde + 60, dyEnde - 20 + entf);
    ctx.lineTo(dxEnde + 60, dyEnde - 10 + entf);
    ctx.lineTo(dxEnde, dyEnde + entf + 10);

    return ctx;

}

function drawDreieck(ctx, entf) {

    let canvas = document.getElementById("einCanvas");

    let maxHight = canvas.getAttribute("height");
    let maxWidth = canvas.getAttribute("width");

    let dxEnde = maxWidth / 2 + 5;
    let dyEnde = maxHight / 2 - 200;
    let ausgleich = 10;

    ctx.moveTo(dxEnde, dyEnde + entf + 20 + ausgleich);
    ctx.lineTo(dxEnde + 60, dyEnde + entf + ausgleich);
    ctx.lineTo(dxEnde, dyEnde + entf);

    return ctx;

}

function range (number){

    rand = Math.floor(Math.random() * 20);

    return (number - rand);
}

function genArray() {

    let numberArray = [];
    let number = 50;
    let output;

    for (let i = 0; i < 6; i++) {
        output = range(number);
        numberArray.push(output);
        number += 100;
    }

    return numberArray;

}


















// End
