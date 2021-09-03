var userModel = require('./userModel');
var authService = require('../../services/authService');



// User create service....................................................................................
module.exports.createUserServiceFunc = (request)=>{

    return new Promise(async (resolve,reject)=>{

        var userModelData = new userModel();

        userModelData.name = request.body.name;
        userModelData.email = request.body.email;
        userModelData.password = await userModelData.encriptPassword(request.body.password);
        userModelData.role = request.body.role;

        userModelData.save((error,dataValue)=>{
            if(error){
                reject({status: false, msg: 'Something went wrong...!'});
            }else{
                resolve({status: true, msg: 'User created successfully...'});
            }

        });
       
    });

}



// User login service...................................................................................
module.exports.loginUserServiceFunc = (request)=>{

    return new Promise((resolve,reject)=>{
       
        userModel.findOne({email: request.body.email}, async (error,dataValue)=>{
            if(error){
                reject(error);
            }else{
                if(dataValue.email != undefined || dataValue.email != null){
                    let userModelData = new userModel();
                    let status = await userModelData.validatePassword(dataValue.password,request.body.password);

                    if(status){
                        var resultToken = authService.genarateToken(dataValue);
                        resolve ({status: true, msg: resultToken});
                    }else{
                        resolve({status: false, msg: 'Invalid password...'});
                    }

                }else{
                    resolve({status: false, msg: 'Invalid email...'});
                }
            }

        })


    });

}


// user update service....................................................................................
module.exports.updateUserServiceFunc = (reqestId,requestData)=>{

    return new Promise((resolve,reject)=>{
        userModel.findByIdAndUpdate(reqestId,requestData,(error,dataValue)=>{

            if(error){
                reject ({status: false, msg: 'error updating data'});
            }else{
                resolve ({status: true, msg: 'successfuly updating data'});
            }

        });
        
    });

}





// user delete service....................................................................................
module.exports.deleteUserServiceFunc = (requestId)=>{

    return new Promise((resolve,reject)=>{
        userModel.findByIdAndDelete(requestId,(error,dataValue)=>{
            if(error){
                reject ({status: false, msg: 'error delete data'});
            }else{
                resolve ({status: true, msg: 'successfuly delete data'});
            }

        });

    });

}



// user getAll service....................................................................................
module.exports.getUserServiceFunc = ()=>{

    return new Promise((resolve,reject)=>{
        userModel.find({},(error,dataValue)=>{
            if(error){
                reject ({status: false, msg: 'error geting data'});
            }else{
                resolve ({status: true, msg: dataValue});
            }

        });

    });

}


// This is use in authService and after token validate check if there is actual user in db after go tp next()...
module.exports.findOne = (id)=>{

    return new Promise((resolve,reject)=>{
        userModel.findById(id,(error,dataValue)=>{
            if(error){
                reject(false);
            }else{
                resolve(true);
            }
        });
    });
}