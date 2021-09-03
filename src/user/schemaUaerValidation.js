var joi = require('joi');
var responseData = require('../../services/commenResponce');

var createUserFullSchema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().required()
});


module.exports.validateFullUserBody = (request,response,next)=>{
    
    var validateResult = createUserFullSchema.validate(request.body);
    
    if(validateResult.error){
        responseData.errorWithMassage(response,validateResult.error.details[0].message);
    }else{
        next();
    }
}