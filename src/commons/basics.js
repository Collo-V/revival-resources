function removeFromArray(array,item){
    if(typeof (item)=== 'object'){
        let tempArray = [...array]
        item = JSON.stringify(item)
        for (let i = 0; i < tempArray.length; i++) {
            if(item === JSON.stringify(tempArray[i])){
                tempArray = tempArray.slice(0,i).concat(tempArray.slice(i+1))
            }
        }
        return tempArray

    }else{
        let index = array.indexOf(item)
        try {
            if (index == array.length - 1) {
                array.pop()
            } else if (index == 0) {
                array = array.slice(1)
            } else {
                array = array.slice(0, index).concat(array.slice(index + 1))
            }
            return array
        } catch {
            console.error("The item does not exist in array")
        }
    }

}
function dateFormatter(date,format){
    const d = new Date(date)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = d.getDate()
    let monthNo = d.getMonth()
    let  month = months[monthNo]
    let year  = d.getFullYear()
    let hour  = d.getHours()
    let mins  = d.getMinutes()
    let abr = hour>=12?'p.m':'a.m'
    let x = day.toString()[-1]
    let sup = x==='1'?'st':
        x==='2'?'nd':
            x==='3'?'rd':'th'
    if(format === 'long-sup' || !format){
        return `${day}<sup>${sup}</sup> ${month}, ${year}, ${hour}:${mins} ${abr}`
    }else if(format === 'long-slash'){
        return `${day}/${monthNo}/${year}, ${year} at ${hour}:${mins} ${abr}`
    }else if(format === 'short-sup'){
        return `${day}<sup>${sup}</sup> ${month}, ${year}`
    }
    else if(format === 'short-slash'){
        return `${day}/${monthNo}/${year}`
    }

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

function priceFormatter(price){
    if(price<1000) return price
    price+=''
    price = price.split('').reverse().toString().replaceAll(',','')
    let parts = []
    for (let i = 0; i < price.length; i+=3) {
        parts.push(`${price.slice(i, i + 3)}-`)
    }
    price = ''
    parts.reverse().forEach(part=>{
        price += part.split('').reverse().toString().replaceAll(',','')
    })
    return price.replace('-','').replaceAll('-',',')

}

export {
    removeFromArray,dateFormatter,validateInp,priceFormatter
}
