import {getOffers } from "./manageOffers";

function priceFormatter(price){
    if(price<1000) return price
    price+=''
    price = price.split('').reverse().toString().replaceAll(',','')
    let firstPart = price.slice(0,3)
    price = `${firstPart}-${price.slice(3)}`.split('').reverse().toString().replaceAll(',','')
    return price.replace('-',',')

}
function stringSplitter([string,length]){
    if(string.length<=length)return string
    return `${string.slice(0, length)}...`
}

function isEmail(email){
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?
        true:false
}
function validateInp(id){
    let inp = document.getElementById(id)
    let val = inp.value
    if(id==='firstName'){
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='lastName'){
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='email'){
        if(!isEmail(val)){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='company'){
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='phones'){
        if(val==='' || val.length<10){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='password1'){
        let specialChar,uppercase,number,lowercase,specials
        specials = [ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
            "~", "*", "?", ":","\"","\\",'.',',','@']
        specialChar=uppercase=number=lowercase=false
        for (let i = 0; i < val.length; i++) {
            if (specials.includes(val[i])){
                specialChar = true
            }
            else if (!isNaN(val[i])){
                number = true
            }
            else if (val[i]===val[i].toUpperCase()){
                uppercase=true
            }
            else if (val[i]===val[i].toLowerCase()){
                lowercase=true
            }
        }
        if(lowercase===false || uppercase===false || specialChar===false || number===false || val.length<8){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id==='password2'){
        if(document.getElementById('password1').value!==val){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else{
        if(val==='' || val.length<2){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    inp.classList.add('input-valid')
    inp.classList.remove('input-invalid')
}
function formIsValid (formId){
    let form  = document.getElementById(formId)
    let inps = form.getElementsByTagName('input')
    let txt = form.getElementsByTagName('textarea')
    inps = [...inps,...txt]
    for (let i = 0; i < inps.length; i++) {
        let inp = inps[i]
        validateInp(inp.id)
    }
    let invalids = document.getElementsByClassName('input-invalid')
    if(invalids.length === 0 )return true
}




export {
        stringSplitter,priceFormatter,getOffers,isEmail,validateInp,formIsValid
}
