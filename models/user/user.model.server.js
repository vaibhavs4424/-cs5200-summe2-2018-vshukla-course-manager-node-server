var mongoose = require('mongoose')
var userSchema = require('./user.schema.server')

userModel = mongoose.model('UserModel',userSchema);


function createUser(user){
    return userModel.create(user);
}

function updateProfile(user,userId) {

    return userModel.update({
        _id : userId
    },{
        $set: user
    })
}


function findAllUsers() {
    return userModel.find();
}


function findUserByCredentials(credentials) {
    return userModel.findOne(credentials,{
        username: -1
    });
}


function findUserById(userId) {
    console.log('find by ids');
    // console.log(userModel.findOne({ _id :userId }));
    return userModel.findOne({ _id :userId })
    // return userModel.findById(userId);
}

var api ={
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateProfile: updateProfile
}


module.exports = api;