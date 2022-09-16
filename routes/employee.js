const express = require("express")
const {createEmployeecontoller, fetchAllEmpController, fetchoneEmpController, updateEmpController, deleteEmpController,filterController} = require("../controllers/employeeController")

let router = express.Router()


router.post("/create-emp", createEmployeecontoller)
router.get("/emp-all", fetchAllEmpController)
router.get("/emp/:id", fetchoneEmpController)
router.put("/emp/:id", updateEmpController)
router.get('/filter/:id',filterController)
router.delete("/emp/:id", deleteEmpController)


module.exports = router