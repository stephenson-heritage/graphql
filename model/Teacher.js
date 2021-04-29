const db = require('../config/db');

module.exports = {
    getTeacherById: async (args) => {
        let conn = await db.getConnection();
        let teacher = await conn.query('SELECT `first`, `last`, `teacherId` AS `id` FROM teacher WHERE teacherId = ?',
            [args.id]);

        if (teacher.length == 1) {
            conn.release();
            return teacher[0];
        }
        conn.release();
        return {};
    },
    getTeacherByCourse: async (args) => {
        let conn = await db.getConnection();
        let teacher = await conn.query('SELECT `first`, `last`, teacher.`teacherId` AS `id` FROM course JOIN teacher ON course.teacherId = teacher.teacherId WHERE courseId = ?',
            [args.id]);

        if (teacher.length == 1) {
            conn.release();
            return teacher[0];
        }
        conn.release();
        return {};
    },
    getAllTeachers: async () => {

        let conn = await db.getConnection();
        let teachers = await conn.query('SELECT `first`, `last`, `teacherId` AS `id` FROM teacher');


        let ret = [];
        for (let i = 0; i < teachers.length; i++) {
            ret.push(teachers[i]);
        }

        conn.release();
        return ret;

    },

}