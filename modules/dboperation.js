const execsp = require("./execute_sp");

  function getWarehouseList(id) {
    return execsp.exec_sp("usp_Test_Proc", 1, parseInt(id), true);
  }


  async function getCustomerDetails(custcd) {
    return execsp.exec_sp("USP_CustomerMaster_List", 2, custcd);
  }

  module.exports = {
    op1: getWarehouseList,
    op2: getCustomerDetails
  }