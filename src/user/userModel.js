var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;
var userSchema = new schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    }

});

// Encript password befor store the database...
userSchema.methods.encriptPassword = async (password)=>{

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password,salt);

    return hashPassword;

};




// decript password...
userSchema.methods.validatePassword = async (dbpassword, requesstPassword)=>{

    let validateResult = await bcrypt.compare(requesstPassword,dbpassword);
    return validateResult;

}




// user -> collection name
module.exports = mongoose.model('user',userSchema);