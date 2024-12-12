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


// Clears all elements from the screen
function clearScreen(){
    screen.firstChild.remove();
    screen.lastChild.remove();
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

// Allows user to "deposit" entered amount, n; Increases accntBalance by n
function makeDeposit(){
    clearScreen();
    
    const depositData = document.createElement('div');
    depositData.classList.add('dsplFormat');
    const depositText = document.createElement('h1');
    depositText.innerHTML = "DEPOSIT AMOUNT:"
    depositData.appendChild(depositText);
    screen.appendChild(depositData);
    screen.appendChild(userAmount);
}
deposit.addEventListener('click', makeDeposit);

// Allows user to "withdrawl" entered amount, n; Reduces accntBalance by n
function makeWithdrawl(){
    clearScreen();

    const withdrawlData = document.createElement('div');
    withdrawlData.classList.add('dsplFormat');
    const withdrawlText = document.createElement('h1');
    withdrawlText.innerHTML = "WITHDRAWL AMOUNT:"
    withdrawlData.appendChild(withdrawlText);
    screen.appendChild(withdrawlData);
    screen.appendChild(userAmount);
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
    //enterKey.addEventListener('click', selectAccount);
    noBtn.addEventListener('click', clearScreen);
    //cancelKey.addEventListener('click', clearScreen);
}
checkBalance.addEventListener('click', checkAccBalance);

// Initial screen display; Displays prompt asking for user pin
function triggerScreen(event){
    const pinPrompt = document.createElement('h1');
    pinPrompt.innerHTML = "ENTER YOUR PIN";
    pinField.value = "";
    screen.appendChild(pinPrompt);
    screen.appendChild(pinField);
}
cardReader.addEventListener('click', triggerScreen);

// Fills text field with up to 4 asterisks; Once filled, triggers account selection screen  
function populateTextField(event){
    if(pinField.value.length < 4){
        pinField.value += "*";
    };
    if(pinField.value.length === 4){
        enterKey.addEventListener('click', selectAccount);
    };
}
numPad.addEventListener('click', populateTextField);

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
}
cancelKey.addEventListener('click', cancelTransaction);