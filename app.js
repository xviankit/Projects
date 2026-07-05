BaseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
dropDowns=document.querySelectorAll(".select-con select");
exchangeBtn=document.querySelector(".dropdown a");
getBtn=document.querySelector("form button");
amount=document.querySelector(".amount input");
msg=document.querySelector(".message");

for(select of dropDowns){
    for(currCode in CountryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="from"&&currCode==="USD"){
            var fromSelect=select;
            newOption.selected="selected";
        }else if(select.name==="to"&&currCode==="INR"){
            var toSelect=select;
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=> {
        updateFlag(evt.target);
    })
};
const updateFlag=(element)=>{
    console.log(element)
    let currCode=element.value;
    let conCode=CountryList[currCode];
    let newSrc=`https://flagsapi.com/${conCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
getBtn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    printRate();
})
const printRate=async ()=>{
    let amt=amount.value
    if(amt===""||amt<1){
        amt=1
        amount.value=1
    }
    let fromCurr=fromSelect.value;
    let toCurr=toSelect.value;
    let URL=`${BaseURL}/${fromCurr.toLowerCase()}.json`;
    let response= await fetch(URL);
    let  data= await response.json();
    let rate=data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    finalAmt=amt*rate;
    msg.innerText= `${amt} ${fromCurr} = ${finalAmt} ${toCurr}`
}
window.addEventListener("load",printRate());
exchangeBtn.addEventListener("click",()=>{
    let temp=fromSelect.value;
    fromSelect.value=toSelect.value;
    toSelect.value=temp;
    temp=fromSelect.parentElement.querySelector("img").src;
    fromSelect.parentElement.querySelector("img").src=toSelect.parentElement.querySelector("img").src;
    toSelect.parentElement.querySelector("img").src=temp;
    printRate();
})
