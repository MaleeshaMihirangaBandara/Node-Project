
module.exports.successWithData = (response,data)=>{

    return response.send({                       
        Status: true,
        Data: data
    });

}



module.exports.successWithMassage = (response,msg)=>{
    response.send({
        Status: true,
        Data: msg
    });
}




module.exports.errorWithMassage = (response,msg)=>{

    response.send({
        Status: false,
        Data: msg
    });
}




