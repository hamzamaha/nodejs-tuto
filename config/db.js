const mysql = require('mysql2');
const config ={
    host: 'localhost',
    user: 'root',
    port:3306,
    password:'',
    database: 'codingtech_db'
  }

const connection = mysql.createPool(config);


// const pool=mysql.createPool(config)

// const myPool=pool.promise()

module.exports=connection.promise()
