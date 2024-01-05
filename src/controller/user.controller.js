const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { CreateErrorResponse, CreateSuccessResponse,CreateInternalErrorResponse } = require("../helper/response.helper");
const User = require("../model/user.model")

const register = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res
            .status(400)
            .json(CreateErrorResponse("Please share proper values!","Invalid"));
        }
     
        const isUserExist = await User.findOne({email});

        if(isUserExist){
            return res
            .status(400)
            .json(CreateErrorResponse("Email already registered!","Invalid"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });

        const token = jwt.sign({id : newUser.id},process.env.SECRET,{
            expiresIn : '1h'
        } )
     
        return res
          .status(201)
          .json(CreateSuccessResponse("User registered successfully!",  {token} ));


    } catch (error) {
        return res.status(500).json(CreateInternalErrorResponse())
    }
}


const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res
            .status(400)
            .json(CreateErrorResponse("Please share valid credentials!","Invalid"));
        }
     
        const isUserExist = await User.findOne({email});

        if(!isUserExist){
            return res
            .status(400)
            .json(CreateErrorResponse("Invalid email address!","Invalid"));
        }

        if(!bcrypt.compareSync(password,isUserExist.password)){
            return res
            .status(400)
            .json(CreateErrorResponse("Invalid password","Invalid"));
        }

        const token = jwt.sign({id : isUserExist.id},process.env.SECRET,{
            expiresIn : '1h'
        } );
     
        return res
          .status(200)
          .json(CreateSuccessResponse("User registered successfully!",  {token} ));


    } catch (error) {
        return res.status(500).json(CreateInternalErrorResponse())
    }
}

module.exports = {
    register,
    login
}