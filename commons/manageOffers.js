import {filterData, insertKey} from "./objects";

function getOffers(offers,products){
    let tempOffers = {}
    offers = insertKey(offers,'id')
    Object.values(offers).forEach(offer=>{
        let  id = offer.id
        if(offer.products.length>0){
            tempOffers[id] = {
                ...offers[id],
                products:offer.products
            }
        }else if(offer.categories.length>0 && offer.brands.length ===0 ){
            let tempProds = []
            offer.categories.forEach(cat=>{
                tempProds = tempProds.concat(Object.keys(filterData(products,['category','==',cat])))
                // console.log('filtered',filterData(products,['category','==',cat]))
            })
            tempOffers[id] = {
                ...offers[id],
                products:(tempProds)
            }
        }else if(offer.brands.length>0 && offer.categories.length === 0){
            let tempProds = []
            offer.brands.forEach(brand=>{
                tempProds = tempProds.concat(Object.keys(filterData(products,['brand','==',brand])))
            })
            tempOffers[id] = {
                ...offers[id],
                products:tempProds
            }
        }else if(offer.brands.length>0 && offer.categories.length > 0){
            let tempProds = []
            offer.categories.forEach(cat=>{
                let tempFilter =  filterData(products,['category','==',cat])
                offer.brands.forEach(brand=>{
                    tempProds = tempProds.concat(Object.keys(filterData(tempFilter,['brand','==',brand])))
                })
            })
            tempOffers[id] = {
                ...offers[id],
                products:tempProds
            }

        }else{
            tempOffers[id] = {
                ...offers[id],
                products:'all'
            }
        }
    })
    return tempOffers


}
function getDiscount(price,discount){
    let disc = 0
    if(isNaN(discount)){
        disc = price - parseInt(discount)/100*price
    }else {
        disc = price-discount
    }
    return Math.trunc(disc)
}
function getOfferForProduct({offers, prodId,price}){
    let validOffers = filterData(offers,['products','includes',prodId])
    let highestPrice = 0
    let bestOffer = {}
    Object.values(validOffers).forEach(offer=>{
        let discount = getDiscount(price,offer.discount)
        if(discount>highestPrice){
            highestPrice = discount
            bestOffer = offer
        }
    })
    Object.values(validOffers).forEach(offer=>{
        let discount = getDiscount(price,offer.discount)
        if(discount < highestPrice){
            bestOffer = offer
        }
    })
    return bestOffer

}
function getProductsOnOffer(offers,products){
    let tempKeys = []
    Object.values(offers).forEach(offer =>{
        if(typeof (offer.products) === 'object'){
            offer.products.forEach(prod => {
                if (!tempKeys.includes(prod)) tempKeys.push(prod)
            })
        }
    })
    let tempProds = {}
    tempKeys.forEach(key=>{
        tempProds[key] = products[key]
    })
    return tempProds
}
export {
    getOffers,getDiscount,getOfferForProduct,getProductsOnOffer
}
