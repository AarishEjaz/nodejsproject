
const { privateDecrypt } = require('crypto')
const Product = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async errors')

    const products = await Product.find({price:{$gt:30,$lt:100}})
    .sort('price')
    .select('name price')
    .limit(10)
    .skip(5)
    res.status(200).json({products,nbHits: products.length })
}
const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured==='true'?true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:'i'}
    }
    if(numericFilters){
        const operatorMap ={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        console.log(numericFilters)
    }
    console.log(queryObject)
    let result = Product.find(queryObject)
    if(sort){
        const sortList =sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result  =  result.sort('createAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result= result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1 // this tells number of pages
    const limit = Number(req.query.limit) || 10 // this is the amount of items to be displayed on the page
    const skip = (page-1)*limit
    result = result.skip(skip).limit(limit)
    const products =  await result
    console.log(req.query)
    res.status(200).json({products,nbHits: products.length})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}