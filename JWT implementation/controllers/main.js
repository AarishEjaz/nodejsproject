const jwt = require('jsonwebtoken')
const process = require("process")
const {BadRequestError} = require("../errors")


const login = async(req,res)=>{
    const {username,password} = req.body
    if(!username||!password){
        throw new BadRequestError('please provide username and password')
    }
    const id = new Date().getDate()
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log(username,password)
    res.status(200).json({msg:'user created',token})
}
//---------------------------------------------------------------------------------------------------//
const dashboard = async(req,res)=>{
    const luckyNumber =  Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello ${req.user.username}, `,secret:`here is your lucky number ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}