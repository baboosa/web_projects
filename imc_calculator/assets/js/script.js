const form = document.querySelector("#form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const height_input = event.target.querySelector("#height");
    const weight_input = event.target.querySelector("#weight");

    const height = Number(height_input.value);
    const weight = Number(weight_input.value);
    
    if (!weight) {
        setResult("Invalid weight", false);
        return;
    }
    if (!height) {
        setResult("Invalid height", false);
        return;
    }

    const bmi = getBMI(weight, height);
    const bmiLevel = getBMICategory(bmi);

    const msg = `Your BMI is: ${bmi} (${bmiLevel}).`;
    setResult(msg, true);
});

function getBMI (weight, height) {
    const bmi = weight / height ** 2;
    return bmi.toFixed(2);
}

function getBMICategory (BMI) {
    const level = ["Underweight", "Normal weight", "Overweight", "Obesity grade I", "Obesity grade II", "Obesity grade III"];

    if (BMI < 18.5) {
        return level[0];
    }
    else if (BMI > 18.5) {
        return level[1];
    }
    else if (BMI > 25){
        return level[2];
    }
    else if (BMI > 30) {
        return level[3];
    }
    else if (BMI > 35) {
        return level[4];
    }
    else{
        return level[5];
    }
}

function createParagraph () {
    const p = document.createElement("p");
    return p;
}

function setResult (msg, isValid) {
    const newResult = document.querySelector("#result");
    newResult.innerHTML = "";
    
    const p = createParagraph();

    if (isValid) {
        p.classList.add("newP");
    }
    else {
        p.classList.add("error")
    }
    p.innerHTML = msg;
    newResult.appendChild(p);
}
