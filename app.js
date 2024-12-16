const cardReader = document.querySelector('.cardReader');
const screen = document.querySelector('.screen');
const numPad = document.querySelector('.numPad');
const numKey = document.querySelector('.btnType2');
const cancelKey = document.querySelector('.btnType3');
const enterKey = document.querySelector('.btnType4');

let accntBalance = 0;
const pinField = document.createElement('input');
pinField.type = "text";
pinField.id = "pinField";

const ckAccnt = document.createElement('div');
ckAccnt.classList.add('accountType');
const svAccnt = document.createElement('div');
svAccnt.classList.add('accountType');

const deposit = document.createElement('div');
deposit.classList.add('cashOp1');
const withdrawl = document.createElement('div');
withdrawl.classList.add('cashOp2');
const checkBalance = document.createElement('div');
checkBalance.classList.add('bal');

const userAmount = document.createElement('input');
userAmount.type = "text";
let amountEntered = 0;

let firstTransaction = true;

let inDepo = false;
let inWith = false;


// Clears all elements from the screen
function clearScreen(){
    inDepo = false;
    inWith = false;
    userAmount.value = "";
    screen.firstChild.remove();
    screen.lastChild.remove();
}


// Transaction completed display screen
function transactionComplete(){
    clearScreen();

    const completeText = document.createElement('h1');
    completeText.classList.add('dsplFormat');
    completeText.innerHTML = "TRANSACTION COMPLETE";
    screen.appendChild(completeText);

    const anotherTransaction = document.createElement('div');
    const anotherTransactionText = document.createElement('h2');
    anotherTransaction.innerHTML = "WOULD YOU LIKE TO DO ANOTHER TRANSACTION?";
    const yesBtn = document.createElement('button');
    yesBtn.innerHTML = "YES";
    const noBtn = document.createElement('button');
    noBtn.innerHTML = "NO";
    
    anotherTransaction.appendChild(anotherTransactionText);
    anotherTransaction.appendChild(yesBtn);
    anotherTransaction.appendChild(noBtn);
    screen.appendChild(anotherTransaction);

    yesBtn.addEventListener('click', selectAccount);
    noBtn.addEventListener('click', resetScreen);
}


// displays accounts for user to select between
function selectAccount(){
    clearScreen();

    ckAccnt.innerHTML = "CHECKING ACCOUNT";
    svAccnt.innerHTML = "SAVINGS ACCOUNT";
    screen.appendChild(ckAccnt);
    screen.appendChild(svAccnt);

    pinField.value = "";
};


// displays transactions for user to select between
function selectTransaction(event){
    clearScreen();

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('optsCont')

    deposit.innerHTML = "DEPOSIT";
    withdrawl.innerHTML = "WITHDRAWL";
    checkBalance.innerHTML = "CHECK BALANCE";

    optionsContainer.appendChild(deposit);
    optionsContainer.appendChild(withdrawl);

    screen.appendChild(optionsContainer);
    screen.appendChild(checkBalance);
}
ckAccnt.addEventListener('click', selectTransaction);
svAccnt.addEventListener('click', selectTransaction);


// Get the user entered value 
function getVal(event){
    if(/^\d+$/.test(event.target.textContent)){
        userAmount.value += event.target.textContent;
        amountEntered = Number(userAmount.value);
    };
}


// Caculates the new balance after deposit
function calIncreasedBal(event){
    if(inWith){
        return;
    };

    if(inDepo && !inWith){
        accntBalance = accntBalance + amountEntered;
        userAmount.value = "";
        inDepo = false;
        transactionComplete();
    };
}


// Caculates the new balance after 
function calReducedBal(event){
    if(inDepo){
        return;
    };

    if(!inDepo && inWith){
        if(accntBalance >= amountEntered){
            accntBalance = accntBalance - amountEntered;
            userAmount.value = "";
            inWith = false;
            transactionComplete();
        }else{
            userAmount.value = "";
            clearScreen();
    
            const insufficientFundsText = document.createElement('h1');
            insufficientFundsText.classList.add('dsplFormat');
            insufficientFundsText.innerHTML = "INSUFFICIENT FUNDS"
    
            const anotherTransaction = document.createElement('div');
            const anotherTransactionText = document.createElement('h2');
            anotherTransaction.innerHTML = "WOULD YOU LIKE TO TRY ANOTHER AMOUNT?";
            const yesBtn = document.createElement('button');
            yesBtn.innerHTML = "YES";
            const noBtn = document.createElement('button');
            noBtn.innerHTML = "NO";
            
            anotherTransaction.appendChild(anotherTransactionText);
            anotherTransaction.appendChild(yesBtn);
            anotherTransaction.appendChild(noBtn);
    
            screen.appendChild(insufficientFundsText);
            screen.appendChild(anotherTransaction);
            
            yesBtn.addEventListener('click', makeWithdrawl);
            noBtn.addEventListener('click', cancelTransaction);
        };
    };
}


// Allows user to "deposit" entered amount, n; Increases accntBalance by n
function makeDeposit(event){
    clearScreen();
    inDepo = true;
    const depositData = document.createElement('div');
    depositData.classList.add('dsplFormat');
    const depositText = document.createElement('h1');
    depositText.innerHTML = "DEPOSIT AMOUNT:"
    depositData.appendChild(depositText);
    screen.appendChild(depositData);
    screen.appendChild(userAmount);
    numPad.addEventListener('click', getVal);
    enterKey.addEventListener('click', calIncreasedBal);
}
deposit.addEventListener('click', makeDeposit);


// Allows user to "withdrawl" entered amount, n; Reduces accntBalance by n
function makeWithdrawl(event){
    clearScreen();
    inWith = true;
    const withdrawlData = document.createElement('div');
    withdrawlData.classList.add('dsplFormat');
    const withdrawlText = document.createElement('h1');
    withdrawlText.innerHTML = "WITHDRAWL AMOUNT:"
    withdrawlData.appendChild(withdrawlText);
    screen.appendChild(withdrawlData);
    screen.appendChild(userAmount);
    numPad.addEventListener('click', getVal);
    enterKey.addEventListener('click', calReducedBal);
}
withdrawl.addEventListener('click', makeWithdrawl);


// Check the account balance
function checkAccBalance(event){
    clearScreen();

    const displayBalance = document.createElement('h1');
    displayBalance.classList.add('dsplFormat');
    displayBalance.innerHTML = `ACCOUNT BALANCE: $${accntBalance}`;
    screen.appendChild(displayBalance);

    const anotherTransaction = document.createElement('div');
    const anotherTransactionText = document.createElement('h2');
    anotherTransaction.innerHTML = "WOULD YOU LIKE TO DO ANOTHER TRANSACTION?";
    const yesBtn = document.createElement('button');
    yesBtn.innerHTML = "YES";
    const noBtn = document.createElement('button');
    noBtn.innerHTML = "NO";

    anotherTransaction.appendChild(anotherTransactionText);
    anotherTransaction.appendChild(yesBtn);
    anotherTransaction.appendChild(noBtn);
    screen.appendChild(anotherTransaction);

    yesBtn.addEventListener('click', selectAccount);
    enterKey.addEventListener('click', selectAccount);
    noBtn.addEventListener('click', triggerScreen);
    cancelKey.addEventListener('click', triggerScreen);
}
checkBalance.addEventListener('click', checkAccBalance);


// Fills text field with up to 4 asterisks; Once filled, triggers account selection screen  
function populateTextField(event){
    if(pinField.value.length < 4){
        if(/^\d+$/.test(event.target.textContent)){
            pinField.value += "*"; // don't want this to populate if pinField isn't onscreen
        }
    };
    if(pinField.value.length === 4){
        enterKey.addEventListener('click', selectAccount); // needs turned off after the click event 
    };
}
numPad.addEventListener('click', populateTextField);


// Initial screen display; Displays prompt asking for user pin
function triggerScreen(event){
    console.log(firstTransaction);
    if(!firstTransaction){
        clearScreen();
    }
    const pinPrompt = document.createElement('h1');
    pinPrompt.innerHTML = "ENTER YOUR PIN";
    pinField.value = "";
    screen.appendChild(pinPrompt);
    screen.appendChild(pinField);
    firstTransaction = false;
}
cardReader.addEventListener('click', triggerScreen);


// Cancel the transaction
function cancelTransaction(event){
    clearScreen();

    const canceledText = document.createElement('h1');
    canceledText.classList.add('dsplFormat');
    canceledText.innerHTML = "TRANSACTION CANCLED";
    screen.appendChild(canceledText);

    const continueText = document.createElement('h3');
    continueText.innerHTML = "TAP CARD TO BEGIN";
    screen.appendChild(continueText);

    cardReader.addEventListener('click', triggerScreen);
}
cancelKey.addEventListener('click', cancelTransaction);

function resetScreen(e){
    clearScreen();
    triggerScreen(e);
}