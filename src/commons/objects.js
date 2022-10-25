
function insertKey(data,keyName){
    data = makeExtensible(data)
    let tempData = {}
    Object.keys(data).forEach(key=>{
        let keyData = {}
        keyData = data[key]
        keyData[keyName]  = key
        tempData[key] = keyData
    })
    return tempData

}
function makeExtensible(data){
    let tmp = {}
    Object.keys(data).forEach(key=>{
        tmp[key] = data[key]
    })
    return JSON.parse(JSON.stringify(tmp))
}

function filterData(data,[field,opStr,value,matchCase]){
    let types = ['string','number',null]
    let isMatchable = types.includes(typeof (value))
    let isObject
    if(!data.length){
        isObject = true
        data = Object.values(insertKey(data,'filterCustomKey'))
    }
    let filteredData
    if(!opStr && !value){
        if(field.includes('!')){
            filteredData = data.filter(a=>{
                return !a[field.replace('!','')]
            })
        }else {
            filteredData = data.filter(a=>{
                return a[field]
            })
        }

    }else if(opStr === '=='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() === value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field]  === value
            })

       }
    }else if(opStr === '!='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() !== value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field]  !== value
            })

        }

    }else if(opStr === 'includes'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase().includes(value.toString().toLowerCase())
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field].includes(value)
            })

        }

    }else if(opStr === '>'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() > value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] > value
            })

        }

    }else if(opStr === '>='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() >= value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] >= value
            })

        }

    }else if(opStr === '<'){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() < value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] < value
            })

        }

    }else if(opStr === '<='){
        if(matchCase && isMatchable){
            filteredData = data.filter(a => {
                return a[field] && a[field].toString().toLowerCase() <= value.toString().toLowerCase()
            })
        }
        else {
            filteredData = data.filter(a => {
                return a[field] && a[field] <= value
            })

        }

    }else {
        filteredData =  data
    }
    if(isObject){
        let tempObject = {}
        filteredData.forEach(item=>{
            let key =  item['filterCustomKey']
            delete item['filterCustomKey']
            tempObject[key] = item
        })
        filteredData = tempObject
    }
    return filteredData

}
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
export {
    filterData ,insertKey,removeFromArray,makeExtensible
}
