const db = require('../config/db');

module.exports = {
    getAllStudents: async () => {
        let conn = await db.getConnection();
        let students = await conn.query('SELECT `first`, `last`,`dob`, `studentId` AS `id` FROM student');

        let ret = [];
        for (let i = 0; i < students.length; i++) {
            ret.push(students[i]);
        }

        conn.release();
        return ret;
    },
    getStudentsByCourse: async (arg) => {
        let conn = await db.getConnection();
        let students = await conn.query('SELECT student.studentid AS `id` , student.first, student.`last`, student.dob FROM student JOIN coursestudent ON coursestudent.studentId = student.studentId WHERE courseid = ?',
            [arg.id]);

        let ret = [];
        for (let i = 0; i < students.length; i++) {
            ret.push(students[i]);
        }

        conn.release();
        return ret;
    },

}