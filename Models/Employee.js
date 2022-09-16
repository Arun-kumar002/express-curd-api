const {model, Schema} = require("mongoose")

const EmployeeSchema = new Schema({
    emp_id: {
        type:String,
        required: [true, "Employee id is required"]
    },
    emp_name: {
        type:String,
        required: [true, "Employee name is required"]
    },
    emp_email: {
        type:String,
        required: [true, "Employee email is required"]
    },
    emp_phone: {
        type:String,
        required: [true, "Employee phone is required"]
    },
    emp_exp: {
        type:String,
        required: [true, "Employee exp is required"]
    },
    emp_edu: {
        type:String,
        required: [true, "Employee edu is required"]
    },
    emp_designation: {
        type:String,
        required: [true, "Employee designation is required"]
    },
    emp_gender: {
        type:String,
        required: [true, "Employee gender is required"]
    },
    emp_city: {
        type:String,
        required: [true, "Employee city is required"]
    },
    emp_salary: {
        type:String,
        required: [true, "Employee Salary is required"]
    },
    emp_skills: {
        type:String,
    },
},{timestamps:true});

module.exports = model("employee", EmployeeSchema)