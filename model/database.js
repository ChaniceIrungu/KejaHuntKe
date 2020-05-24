require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "facebook",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = `DROP TABLE apartments;
    DROP TABLE owners;
    CREATE TABLE apartments (
      id int NOT NULL AUTO_INCREMENT,
      location varchar(255),
      number_of_bedrooms varchar(255),
      user_id int NULL AUTO_INCREMENT ,
      parking_space BOOLEAN NOT NULL,
      PRIMARY KEY (id)
    );
    
    CREATE TABLE owners (
      User varchar(255) NOT NULL,
      id int NOT NULL AUTO_INCREMENT,
      PRIMARY KEY (id)
    );
    
    ALTER TABLE apartments ADD CONSTRAINT apartments_fk0 FOREIGN KEY (user_id) REFERENCES owners(id);
    
    `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `students` was successful!");

    console.log("Closing...");
  });

  con.end();
});
