const sql = require('mssql');
const config = require('../secrets/sql-config');

// Women by First Letter
const selectWomanByLetter = async (fl) => {
    try {
        let pool = await sql.connect(config);
        let query = 'SELECT * FROM women WHERE fLetter = @fl';
        const result = await pool.request().input('fl', sql.VarChar, fl).query(query);
        let results = [];

        if (result.recordset.length > 0) {
            for (let record of result.recordset) {
                results.push(record);
            };
            console.log(results.body);
            return results;
        } else {
            return false;
        }
        
    } catch(e) {
        throw new Error(e);
    }
}

// All Women
const selectAllWomen = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 'SELECT * FROM women';
        const result = await pool.request().query(query);
        let results = [];

        if (result.recordset.length > 0) {
            for (let record of result.recordset) {
                results.push(record);
            }
            return results;
        } else {
            return false;
        }
        
    } catch(e) {
        throw new Error(e);
    }
}

// Insert Woman
const insertWoman = async (fLetter, wName, wParrafo, wDate) => {
    try {
        let pool = await sql.connect(config);
        let query = 'INSERT INTO women (fLetter, wName, wParrafo, wBday) VALUES (@fLetter, @wName, @wParrafo, @wDate)';
        const result = await pool.request().input('fLetter', sql.VarChar, fLetter).input('wName', sql.VarChar, wName).input('wParrafo', sql.VarChar, wParrafo).input('wDate', sql.VarChar, wDate).query(query);

        //confirm that record was added
        return result.rowsAffected[0] === 1;
        
    } catch(e) {
        throw new Error(e);
    }
}

module.exports = {
    selectWomanByLetter,
    selectAllWomen,
    insertWoman
}