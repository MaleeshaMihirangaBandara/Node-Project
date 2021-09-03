const { response } = require('express');
const { request } = require('http');
var responseData = require('../../services/commenResponce');
var UserServiceData = require('./userService');



// create user....
module.exports.createUserControllerFunc = async (request,response)=>{
    //should arguments request not request.body...
    var resultUserCreate = await UserServiceData.createUserServiceFunc(request);

    responseData.successWithMassage(response,resultUserCreate.msg)


}


// login user...
module.exports.loginUserControllerFunc = async (request,response)=>{


    try {
        var resultUserLogin = await UserServiceData.loginUserServiceFunc(request);

        if(resultUserLogin.status){
            responseData.successWithData(response,resultUserLogin.msg)
        }else{
            responseData.errorWithMassage(response,resultUserLogin.msg)
        }    
        
    } catch (error) {
        responseData.errorWithMassage(response,'Something went wrong...');
    }

}


// update user...
module.exports.updateUserControllerFunc = async (request,response)=>{

    try {
        var resultUserUpdate = await UserServiceData.updateUserServiceFunc(request.params.id,request.body);
        responseData.successWithData(response,resultUserUpdate.msg)

    } catch (error) {
        responseData.errorWithMassage(response,'Something went wrong...');      
    }
}


// delete user...
module.exports.deleteUserControllerFunc = async (request,response)=>{

    try {
        var resultUserDelete = await UserServiceData.deleteUserServiceFunc(request.params.id);
        responseData.successWithData(response,resultUserDelete.msg)

    } catch (error) {
        responseData.errorWithMassage(response,'Something went wrong...');      

    }
}

// get all user...
module.exports.getAllUserControllerFunc = async (request,response)=>{

    try {
        var resultUserGet= await UserServiceData.getUserServiceFunc();
        if(resultUserGet){
            responseData.successWithData(response,resultUserGet)
       }else{
        responseData.errorWithMassage(response,'Something Went Wrong')
       }

    } catch (error) {
        responseData.errorWithMassage(response,'Something went wrong...');      
    }

}



