module.exports = function (app) {
    app.get('/api/user', findAllUsers)
    app.get('/api/user/:userId', findUserById)
    app.post('/api/user', createUser)
    app.get('/api/profile', profile)
    app.put('/api/profile', updateProfile)
    app.post('/api/logout', logout)
    app.post('/api/login', login)

    var userModel = require('../models/user/user.model.server')


    function logout(req, res) {
        req.session.destroy();
        console.log("logout");
        res.send(200);
    }


    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function updateProfile(req, res) {
        var user = req.body;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        userModel.updateProfile(user, userId)
            .then(function (user) {
                // req.session['currentUser']=user;
                res.json(user);
            })
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        console.log('profile');
        console.log(req.session['currentUser']);
        if (typeof req.session['currentUser'] === 'undefined') {
            req.session['currentUser'] = {
                username: 'unregistered',
                password: 'unregistered'
            }
        }
        res.send(req.session['currentUser']);
    }

    function createUser(req, res) {
        var user = req.body;

        //res.send(user);

        userModel.createUser(user)
            .then(function (user) {
                console.log("status is" + user);
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
}
