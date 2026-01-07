const createBtn = document.getElementsByClassName("add-btn")[0];
const updateBtn = document.getElementsByClassName("update-btn")[0];
const detailsBtn = document.getElementsByClassName("details-btn")[0];
const trsBtn = document.getElementsByClassName("trs-btn")[0];
const acData = document.getElementById('acc-data');

const sender = document.getElementById('sender')
const receiver = document.getElementById('receiver')
const amount = document.getElementById('amount')
const trBtn = document.getElementById('transfer-btn');

const createSection = document.getElementById("create");
const updateSection = document.getElementById("updation");
const detailsSection = document.getElementById("details");
const transferSection = document.getElementById('transfer');



// Create
const accntNo = document.getElementById("accnt-no");
const accntName = document.getElementById("accnt-name");
const openingBal = document.getElementById("open-bal");
const cityName = document.getElementById("city");
const createAccntBtn = document.getElementById("create-btn");
// Update

const upAccno = document.getElementById("trans-account-no");
const upAmnt = document.getElementById("up-amnt");
const transType = document.getElementById("trans-type");
const upBtn = document.getElementById("trans-btn");

// 
let ACC_NO;
if (localStorage.getItem("accno") === null) {
  ACC_NO = 1001;
} else {
  ACC_NO = +localStorage.getItem("accno");
}

const accountsData = JSON.parse(localStorage.getItem("accounts")) ?? [];

createBtn.addEventListener("click", () => {
  createSection.classList.remove("hide");
  updateSection.classList.add("hide");
  detailsSection.classList.add('hide');
  transferSection.classList.add('hide');
  accntNo.value = ACC_NO;
});

updateBtn.addEventListener("click", () => {
  createSection.classList.add("hide");
  updateSection.classList.remove("hide");
  detailsSection.classList.add('hide');
  transferSection.classList.add('hide');
});

detailsBtn.addEventListener('click',()=>{
    createSection.classList.add("hide");
  updateSection.classList.add("hide");
  detailsSection.classList.remove('hide');
  transferSection.classList.add('hide');
 let data = ''
 accountsData.forEach((obj,index)=>{
    data+=
    `
    <tr class="row">
        <td>${index+1}</td>
        <td>${obj.accno}</td>
        <td>${obj.name}</td>
	<td>${obj.balance}</td>
	<td>${obj.city}</td>
    </tr>

    `
    acData.innerHTML = data;
 })
})

trsBtn.addEventListener('click',()=>{
    createSection.classList.add("hide");
    updateSection.classList.add("hide");
    detailsSection.classList.add('hide');
    transferSection.classList.remove('hide');
})
// Create Account

createAccntBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    accntName.value.trim() === "" ||
    openingBal.value === "" ||
    cityName.value.trim() === ""
  ) {
    alert("Please enter all the values");
    return;
  }
  accountsData.push({
    accno: ACC_NO,
    name: accntName.value.trim(),
    balance: +openingBal.value,
    city: cityName.value.trim(),
  });
  ACC_NO++;
  localStorage.setItem("accno", ACC_NO);
  localStorage.setItem("accounts", JSON.stringify(accountsData));
  alert('Account Created Successfully!')
  resetCreateForm();
});

function resetCreateForm() {
  accntNo.value = ACC_NO;
  accntName.value = "";
  openingBal.value = "";
  cityName.value = "";
  upAccno.value = "";
  upAmnt.value = "";
  sender.value = '';
  receiver.value = '';
  amount.value = ''
}

upBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let acNo = upAccno.value.trim();
  let amnt = +upAmnt.value;
  let choice = transType.value;
  if (acNo === "" || amnt == "") {
    alert("Please enter all the details!");
    return;
  }
  let userObj = accountsData.filter((obj) => obj.accno === +acNo);
  console.log(userObj);
  if (userObj.length === 0) {
    alert("Account Doesn't exist");
    return;
  }
  switch (+choice) {
    case 1:
      if (amnt > userObj[0].balance) {
        alert("Insufficient Balance!");
        return;
      } else {
        // userObj.balance-=amnt;
        accountsData.forEach((obj) => {
          if (obj.accno === +acNo) {
            obj.balance -= amnt;
          }
        });
      }
      break;
    case 2:
      accountsData.forEach((obj) => {
        if (obj.accno === +acNo) {
          obj.balance += amnt;
        }
      });
      break;
  }
  updateAccounts(accountsData);
  alert('Transaction Completed!');
  resetCreateForm();
});

trBtn.addEventListener('click',()=>{
    let s = sender.value.trim();
    let r = receiver.value.trim();
    let amt = +amount.value;
    if(s==='' || r==='' || amt==='' ){
        alert('Please enter all the values!');
        return;
    }
    let sObj = accountsData.filter(obj=>obj.accno===+s);
    let rObj = accountsData.filter(obj=>obj.accno===+r);
    if(sObj.length===0 || rObj.length===0){
        alert("Account doesn't exist!");
        return;
    }
    if(amt<sObj[0].balance){
        accountsData.forEach(obj=>{
            if(obj.accno===+s){
                obj.balance-=amt;
            }
            if(obj.accno===+r){
                obj.balance+=amt;
            }
        })
    }
    else{
        alert('Insufficient Balance!');
        return;
    }
    updateAccounts(accountsData);
    alert('Transfer Completed!')
    resetCreateForm();
})

function updateAccounts(data) {
  localStorage.setItem("accounts", JSON.stringify(data));
}
