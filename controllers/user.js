const {insertEmployee,checkEmp,getProfile,insertLeave,showTimesheets,getTimesheetsForemp,getSheets,uploadTimesheet,getAllEmployees,getLeavesData,updateLeave,getLeavesPerson}=require('../services/userService');
const addEmployee=async (req,res)=>
{
    console.log("hello");
    try{
    const data=req.body;
    console.log("controller",data)
    const result=await insertEmployee(data);
    console.log(result);
    return res.status(201).json({message:result});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
const checkEmployee=async (req,res)=>
{
    try{
        console.log("hello buddy");
  const data=req.body;
  const result=await checkEmp(data);
  console.log("control",result);
  return res.status(200).json({message:result});
    } catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
const checkProfile=async (req,res)=>
{
    try{
        console.log("profile");
        console.log("hello");
        const data=req.body;
        const result=await getProfile(data);
        return res.status(200).json({message:result});
    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}

const leaveRequest=async (req,res)=>
{
    try{
        const data=req.body;
        const result=await insertLeave(data);
        return res.status(201).json({message:result});
    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}

const getLeaves=async (req,res)=>
{
    try{
        console.log("leaves");
        const result=await getLeavesData();
        return res.status(200).json({message:result});

    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
const leaveChangeRequest=async (req,res)=>
{
  try{
    const data=req.body;
    console.log("leave change",data);
    const result=await updateLeave(data);
    console.log("leave change result",result);
    return res.status(200).json({message:result});
  }catch(err)
  {
    return res.status(500).json({message: err.message});
  }
}
const getLeavesForeachPerson=async (req,res)=>
{
    try{
        console.log("leaves");
        const data=req.body;
        const result=await getLeavesPerson(data);
        return res.status(200).json({message:result});

    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}

const getEmployees=async (req,res)=>
{
  try{
       const body=req.body;
        console.log("employees");
        const result=await getAllEmployees(body);
        return res.status(200).json({message:result});
  }catch(err)
  {
    return res.status(500).json({message: err.message});
  }

        
}
const timeSheetupload=async (req,res)=>
{
    try{
        const data=req.body;
        const result=await uploadTimesheet(data);
        return res.status(200).json({message:result});

    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
 const getTimesheets=async (req,res)=>
{
    try{
        const result=await getSheets();
        return res.status(200).json({message:result});
    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
const getTimesheetsStatus=async (req,res)=>
{
    try{
        const data=req.body;
        const result=await showTimesheets(data);
        return res.status(201).json({message:result});
    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
const getTimesheetsShow=async (req,res)=>
{
    const body=req.body;
    try{
        const result=await getTimesheetsForemp(body);
        return res.status(200).json({message:result});
    }catch(err)
    {
        return res.status(500).json({message: err.message});
    }
}
module.exports={addEmployee,checkEmployee,getTimesheetsStatus,getTimesheetsShow,timeSheetupload,getTimesheets,checkProfile,leaveRequest,getLeaves,getEmployees,leaveChangeRequest,getLeavesForeachPerson};