var config = require("./dbconfig");
const sql = require("mssql");

const executeStoredProcedure = async (procedureName, dbid, ...params) => {
  try {
    const pool = await sql.connect(config[dbid-1]);
    const request = pool.request();
    let inputParams = "";

    // Dynamically create input parameters for the stored procedure
    params.forEach((param, index) => {
      const paramName = `param${index + 1}`;
      // console.log(paramName, param);
      request.input(paramName, param);
      inputParams += `@${paramName},`;
    });

    inputParams = inputParams.slice(0, -1); // Remove the trailing comma

    const query = `EXEC ${procedureName} ${inputParams};`;
    // console.log("QUERY", query);
    const result = await request.query(query);

    return result.recordset;
  } catch (err) {
    console.error(err);
    return [{"Error": err}];
  }
}

  module.exports = {
    exec_sp: executeStoredProcedure,
  }