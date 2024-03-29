const mysql = require('mysql');
const util = require('util');
const CONFIG = require('./config')


const connection = mysql.createConnection({
    host: CONFIG.DB.HOST,
    user: CONFIG.DB.USER,
    password: CONFIG.DB.PASSWORD,
    database: CONFIG.DB.SCHEMA,
    multipleStatements: true
});

const connect = () => {
    console.log(`
        Initializing connection to databse using config: ${JSON.stringify(CONFIG.DB, null, 2)}
    `)

    connection.connect()
}

const query = util.promisify(connection.query).bind(connection);

const seed = async () => {
    try {
        await query(`
DROP TABLE IF EXISTS image_HTML_URl;
CREATE TABLE image_HTML_URl (
    id         INT AUTO_INCREMENT NOT NULL,
    HTML_URL      VARCHAR(300) NOT NULL,
    Name_of_image      VARCHAR(128) NOT NULL,
    tag      VARCHAR(128) NOT NULL,
    PRIMARY KEY (\`id\`)
);

INSERT INTO image_HTML_URl 
    (HTML_URL, Name_of_image, tag) 
VALUES
    ('/uploads/Billy_puppy.PNG', 'Billy_puppy', 'dog'),
    ('test2', 'pic', 'cat');
        `)
        console.log("seeded database")

        process.exit(0)
    } catch (err) {
        console.warn(err)
        process.exit(1)
    }
}

module.exports = {
    connection,
    query,
    connect,
    seed
}