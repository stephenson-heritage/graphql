const db = require('../config/db');

module.exports = {
    getAllCourses: async () => {

        let conn = await db.getConnection();
        let courses = await conn.query('SELECT `name`, `description`, `courseId` AS `id` FROM course');

        let ret = [];
        for (let i = 0; i < courses.length; i++) {
            ret.push(courses[i]);
        }
        console.log(ret);
        conn.release();
        return ret;
    },
    getCoursesByTeacher: async (args) => {
        let conn = await db.getConnection();
        let courses = await conn.query('SELECT `name`, `description`, `courseId` AS `id` FROM course WHERE teacherId = ?',
            [args.id]);

        let ret = [];
        for (let i = 0; i < courses.length; i++) {
            ret.push(courses[i]);
        }



        conn.release();

        return ret;
    },
    getCoursesByStudent: async (args) => {
        let conn = await db.getConnection();
        let courses = await conn.query('SELECT course.courseid AS `id` , course.name, course.description FROM course JOIN coursestudent ON coursestudent.courseId = course.courseId WHERE studentid = ?',
            [args.id]);

        let ret = [];
        for (let i = 0; i < courses.length; i++) {
            ret.push(courses[i]);
        }

        conn.release();

        return ret;
    }

}