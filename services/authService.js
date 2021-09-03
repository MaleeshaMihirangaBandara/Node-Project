var jwt  = require('jsonwebtoken');
var config = require('../configs/congig');
var encryptor = require('simple-encryptor')(config.encryptorSecretKey);
var responseData = require('./commenResponce');
var UserServiceData = require('../src/user/userService');



// Genarate jwt token...
module.exports.genarateToken = (userData)=>{

    try {
        var jwtToken = jwt.sign({ id:userData._id},config.jwtSecretKey,{expiresIn: config.expiresTime}); 
        // use simple encriptor to encript jwt token...
        var tokenResult = encryptor.encrypt(jwtToken);
        return tokenResult;

    } catch (error) {
        return null;
    }
    
}


// Validate jwt token...
module.exports.validateToken = (request,response,next)=>{

    try {

        var tokenResult = getTokenFromHeader(request);
        // In here some error not decrypt.............................simple encrypter
        tokenResult = encryptor.decrypt(tokenResult);
        
        if(tokenResult){

            jwt.verify(tokenResult, config.jwtSecretKey, async (error,dataValue)=>{

                if(error){
                    responseService.errorWithMassage(response,"invalid token");
                }else{
                    var findOneResult = await UserServiceData.findOne(dataValue.id)
                    if(findOneResult){
                       
                        next();
    
                    }else{
                        responseService.errorWithMassage(response,"invalid token");
                    }
                }   
            });


        }else{
            responseData.errorWithMassage(response,"invalide token");
        }

    } catch (error) {
        return false
    }
}




// Divide only token from header...
var getTokenFromHeader = (request)=>{

    var token;
    if(request.headers.authorization){

        if(request.headers.authorization.split(" ")[1]){
            return token = request.headers.authorization.split(" ")[1];

        }
    }     
}