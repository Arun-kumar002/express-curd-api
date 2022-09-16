const EmployeeSchema = require("../Models/Employee")

/*
@access private
@URL /api/create-emp
@HTTP method => POST
*/
exports.createEmployeecontoller = async (req, res, next) => {
    console.log(req.body)
    let payload = await EmployeeSchema.create(req.body);
    res.status(201).json({ success: true, message: "Successfully employee created", payload })
}

/*
@access public
@URL /api/emp-all
@HTTP method => get
*/

exports.fetchAllEmpController = async(req, res, next) => {
    try{
        let payload = await EmployeeSchema.find({})
        res.status(200).json({success:true, payload})
    }catch(error){
        console.log(error)
    }
}
exports.fetchoneEmpController=async(req,res)=>{
    let payload=await EmployeeSchema.findOne({_id:req.params.id})
    res.status(200).json({success:true,payload})
}

exports.filterController = async(req, res, next) => {
    try{
     
        let payload = await EmployeeSchema.find({
            $or: [{ emp_name: { $regex: req.params.id } }
                , { emp_email: { $regex: req.params.id } }
                , { emp_edu: { $regex: req.params.id } }
                , { emp_gender: { $regex: req.params.id } }
                , { emp_exp: { $regex: req.params.id } }
                , { emp_designation: { $regex: req.params.id } }]
        }).lean();
        res.status(200).json({success:true, payload})
    }catch(error){
        console.log(error)
    }
}

exports.updateEmpController = async(req, res, next) => {
    try{
        let updateddata = {...req.body}
        console.log(req.body)
        let payload = await EmployeeSchema.updateOne({_id:req.params.id},{$set:updateddata})
        res.status(201).json({success:true,message: "content update successfully", payload})
    }catch(error){
        console.log(error)
    }
}

exports.deleteEmpController = async(req, res, next) => {
    try{
        await EmployeeSchema.deleteOne({_id:req.params.id})
        res.status(201).json({success:true,message: "Delete content successfully"})
    }catch(error){
        console.log(error)
    }
}