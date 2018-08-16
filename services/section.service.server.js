module.exports = function(app){

    app.post('/api/course/:courseId/section',createSection)
    app.get('/api/course/:courseId/section',findSectionsForCourse)
    app.post('/api/section/:sectionId/enrollment',enrollStudentInSection)
    app.get('/api/student/section', findSectionsForStudent)
    app.post('/api/section/:sectionId/unenrollment',unenrollStudentInSection)
    app.delete('/api/section/:sectionId',deleteSection)
    app.get('/api/section/:sectionId',getSection)
    app.put('/api/section/:sectionId',editSection);


    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');


    function enrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser =   req.session.currentUser;
        var userId = currentUser._id;
        var enrollment = {
            student : userId,
            section : sectionId
        };

        // res.json(enrollment);

        sectionModel.decrementSectionSeats(sectionId)
            .then(function () {
                return  enrollmentModel
                    .enrollStudentInSection(enrollment)

            })
            .then(function (enrollment) {
                res.json(enrollment);
            })


    }

    function unenrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser =   req.session.currentUser;
        var userId = currentUser._id;
        var enrollment = {
            student : userId,
            section : sectionId
        };

        // res.json(enrollment);

        sectionModel.incrementSectionSeats(sectionId)
            .then(function () {
                return  enrollmentModel
                    .unenrollStudentInSection(enrollment)

            })
            .then(function (enrollment) {
                res.json(enrollment);
            })


    }


    function findSectionsForStudent(req, res) {
        var currentUser = req.session['currentUser'];
        var studentId = currentUser._id;
        enrollmentModel.findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            })

    }





    function findSectionsForCourse(req, res) {
        var id = req.params['courseId'];
        sectionModel.findSectionsForCourse(id)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;

        //res.send(user);

        sectionModel.createSection(section)
            .then(function (section) {
                console.log("section is"+section);
                // req.session['currentUser']= user;
                res.json(section);
            })
    }


    function getSection(req, res) {
        var id = req.params['sectionId'];
        sectionModel.findSectionById(id)
            .then(function (section) {
                res.json(section);

            })
    }


    function editSection(req, res) {
        var section = req.body;
        var id = req.params['sectionId'];

        //res.send(user);

        sectionModel.editSection(id,section)
            .then(function (section) {
                console.log("section is"+section);
                // req.session['currentUser']= user;
                res.json(section);
            })
    }


    function deleteSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser =   req.session.currentUser;
        var userId = currentUser._id;
        var enrollment = {
            student : userId,
            section : sectionId
        };

        // res.json(enrollment);

        sectionModel.removeSection(sectionId)
            .then(function () {
                return  enrollmentModel
                    .removeEnrollment(enrollment)

            })
            .then(function (enrollment) {
                res.json(enrollment);
            })


    }


}
