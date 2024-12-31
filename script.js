const displayBox = document.querySelector(".display"),
 displayInput = document.querySelector(".display-input"),
 displayResult = document.querySelector(".display-result"),
 buttons = document.querySelectorAll("button"),
 operator = ["%", "÷", "x", "-", "+"];

 let input = "",
 result = "",
 lastCalcultor = false;
 // main function to handle calculator logic //
 const calculate = btnValue =>{
    const lastChar = input.slice(-1),
    secondToLastChar = input.slice(-2,-1),
    with0utLastChar = input.slice(0,-1),
    isLastCharOperator = operator.includes(lastChar),
    isInvaildResult = ["Error","Infinity"].includes(result);
    // handle event //
    if(btnValue === "="){
        if(
            input === ""||
            lastChar === '.' ||
            lastChar === '(' ||
            isLastCharOperator && lastChar !== "%" ||
            lastCalcultor
        )
        return;
        const formattedInput = replaceOperators(input);
       try {
        const calculatedValue = eval(formattedInput);
        result = parseFloat(calculatedValue.toFixed(7)).toString();
       }

        catch {
        result = "Error";
       }
       input += btnValue;
       lastCalcultor = true;
       displayBox.classList.add("active");
    }
    // handle Ac all clear value method //
    else if (btnValue === "AC") {
        resetCalcultor("");
    }
    // handle backspace //
    else if(btnValue === ""){
        if(lastCalcultor){
            if(isInvaildResult) resetCalcultor("");
            resetCalcultor(result.slice(0,-1));
        }
        else input = with0utLastChar;
    }
    // hadle operators //
    else if(operator.includes(btnValue)){
        if (lastCalcultor) {
            // if(isInvaildResult) return;
        resetCalcultor(result + btnValue);
    }
    else input += btnValue;
}
    // handle number
    else{
        if(lastCalcultor) resetCalcultor(btnValue);
        else input +=btnValue;
    }

    // update display //
    displayInput.value = input;
    displayResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;
 };
 
 // function to replace division (÷) and multiplicative (x) symbol with javascript-compatiable operators 
 const replaceOperators = (input) =>
    input.replaceAll("÷", "/").replaceAll("×", "*");

 // function reset calculator state with a new input value //
 const resetCalcultor = newInput => {
    input = newInput;
    result = "";
    lastCalcultor = false;
    displayBox.classList.remove("active");
 };
  

 // add click event Listeners to all buttons //
 buttons.forEach(button =>
    button.addEventListener("click",e => calculate(e.target.textContent))
 );
