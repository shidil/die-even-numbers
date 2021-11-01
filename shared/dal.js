const mysql = require("mysql2/promise");
const { env } = require("process");

// Fixme: Read from env
const pool = mysql.createPool({
    host: env.DB_HOSTNAME || "localhost",
    user: env.DB_USERNAME,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    port: env.DB_PORT || 3306,
});

const tearDown = function () {
    pool.end();
};

const TABLE_NAME = "values_rec";

const getCurrentValue = async function (id) {
    const [result] = await pool.query(
        `SELECT value from \`${TABLE_NAME}\` WHERE \`id\` = "${id}"`
    );

    return result ? result[0] : null;
};

const updateValue = async function (id, value) {
    await pool.query(
        `UPDATE \`${TABLE_NAME}\` SET \`value\` = ${value}  WHERE \`id\` = "${id}"`
    );
};

// TODO insert

module.exports = {
    getCurrentValue,
    updateValue,
    tearDown,
};
