
// input selectors 
let nameInput = document.querySelector('.cardholder-name-input');
let numberInput = document.querySelector('.cardholder-number-input');
let monthInput = document.querySelector('.month-input');
let yearInput = document.querySelector('.year-input');
let cvcInput = document.querySelector('.cvc-number-input');


// card -> output
let name = document.querySelector('.name-holder');
let number = document.querySelector('.card-number');
let month = document.querySelector('#date-month');
let year = document.querySelector('#date-year');
let cvc = document.querySelector('.card-cvc');

// show on card the input -------------------------------------------------------
function showName(){
    document.querySelector('.name-holder').innerHTML = nameInput.value.toUpperCase();
}

// grupam nr-ul din input a.i. sa aiba grupe de cate 4 cifre si le afisam pe card
numberInput.addEventListener('input', function(e){
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    document.querySelector('.card-number').innerHTML = numberInput.value;
})

function showMonth(){
    // f (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    if(monthInput.value.length > 2){
        monthInput.value = monthInput.value.slice(0,2);
    }
    document.querySelector('#date-month').innerHTML = monthInput.value;
}

function showYear(){
    // f (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    if(yearInput.value.length > 2){
        yearInput.value = yearInput.value.slice(0,2);
    }
    document.querySelector('#date-year').innerHTML = yearInput.value;
}

function showCvc(){
    document.querySelector('.card-cvc').innerHTML = cvcInput.value;
}

// errors messages ---------------------------------------------------------------
function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
}

function onlyLetters(str) {
    return /^[a-zA-Z ]+$/.test(str);
}

function blurEventFuncName() {
    if (this.value === ''){
        this.style.border = "2px solid #f47777";
        document.querySelector('#name-error').innerHTML = "Can't be blank";
        countErrors(0,1);
    }else if(!onlyLetters(this.value)){
        document.querySelector('#name-error').innerHTML = "Wrong format, letters only";
        this.style.border = "2px solid #f47777";
        countErrors(0,1);
    } else {
        this.style.border = "2px solid hsl(270, 3%, 87%)";
        document.querySelector('#name-error').innerHTML = "";
        countErrors(0,0);
  }
}
nameInput.addEventListener('blur', blurEventFuncName);


function blurEventFuncNumber() {
    if (this.value === ''){
        this.style.border = "2px solid #f47777";
        document.querySelector('#card-number-error').innerHTML = "Can't be blank";
        countErrors(1,1);
    } else if(this.value.length < 19){
        document.querySelector('#card-number-error').innerHTML = "Wrong format";
        this.style.border = "2px solid #f47777";
        countErrors(1,1);
    }
    else {
        this.style.border = "2px solid hsl(270, 3%, 87%)";
        document.querySelector('#card-number-error').innerHTML = "";
        countErrors(1,0);
  }
}
numberInput.addEventListener('blur', blurEventFuncNumber);

function blurEventFuncDate() {
    if ((monthInput.value === '') || (yearInput.value === '') ){
        if(monthInput.value === ''){
            monthInput.style.border = "2px solid #f47777";
        }else{
            monthInput.style.border = "2px solid hsl(270, 3%, 87%)";
        }
        if(yearInput.value === ''){
            yearInput.style.border = "2px solid #f47777";
        }else{
            yearInput.style.border = "2px solid hsl(270, 3%, 87%)";
        }
        document.querySelector('#date-error').innerHTML = "Can't be blank";
        countErrors(2,1);
    }else if(!onlyNumbers(monthInput.value) || !onlyNumbers(yearInput.value)){
        if(!onlyNumbers(monthInput.value)){
            monthInput.style.border = "2px solid #f47777";
        }else{
            monthInput.style.border = "2px solid hsl(270, 3%, 87%)";
        }
        if(!onlyNumbers(yearInput.value)){
            yearInput.style.border = "2px solid #f47777";
        }else{
            yearInput.style.border = "2px solid hsl(270, 3%, 87%)";
        }   
        document.querySelector('#date-error').innerHTML = "Wrong format, numbers only";
        countErrors(2,1);
    } else {
        this.style.border = "2px solid hsl(270, 3%, 87%)";
        document.querySelector('#date-error').innerHTML = "";
        countErrors(2,0);
  }
}
monthInput.addEventListener('blur', blurEventFuncDate);
yearInput.addEventListener('blur', blurEventFuncDate);

function blurEventFuncCvc() {
    if (this.value === '' ){
        this.style.border = "2px solid #f47777";
        document.querySelector('#cvc-error').innerHTML = "Can't be blank";
        countErrors(3,1);
    } else if(this.value.length <3){   
        document.querySelector('#cvc-error').innerHTML = "Wrong format";
        this.style.border = "2px solid #f47777";
        countErrors(3,1);
    }else if(!onlyNumbers(cvcInput.value)){   
        document.querySelector('#cvc-error').innerHTML = "Wrong format, numbers only";
        this.style.border = "2px solid #f47777";
        countErrors(3,1);
    }else {
        this.style.border = "2px solid hsl(270, 3%, 87%)";
        document.querySelector('#cvc-error').innerHTML = "";
        countErrors(3,0);
  }
}
cvcInput.addEventListener('blur', blurEventFuncCvc);

let errors = [1, 1, 1, 1];
function countErrors(index, value){
    errors[index] = value;
    console.log(errors);
}


// prevent refreshing page when sumbit was clicked
document.querySelector("#card-details").addEventListener('submit', function (event){
    event.preventDefault();
})

// submit change the section2 into section3
function submitCard(){
    if(verifyIfComplet()){
        document.querySelector(".section2").style.display = "none";
        document.querySelector(".section3").style.display = "flex";
    }else{
        document.querySelector("#submit-error").innerHTML = "You must have all the relevant fields filled out"
    }

}
// verify to have 0 errors
function verifyIfComplet(){
    
    for(let i = 0; i < 4; i++){
        if(errors[i] === 1 ){
            return false;
        }
    }
    return true;
}