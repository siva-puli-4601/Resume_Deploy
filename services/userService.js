const db = require('../database/db');
require('dotenv').config(); 

const insertEmployee=async (data)=>
{
    
    try{
        const {username,password,role,address,email,imageUrl}=data;
        checkQuery="select * from users where email=?";
         const [res]=await db.query(checkQuery,[email]);
         if(res.length >0)
         {
            throw new Error("employee already exists with this email");
         }
        console.log(data);
        insertQuery="insert into users(username,password,role,address,email,profile) values(?,?,?,?,?,?)";
        const [results]=await db.query(insertQuery,[username,password,role,JSON.stringify(address),email,imageUrl]);
        console.log(results);
        return results.insertId;

    }catch(err)
    {
        throw new Error(`failed to insert ${err.message}`);
    }
}
const checkEmp=async (data)=>
{
    try
    {
     const {email,password}=data;
     console.log(data);
     checkQuery="select * from users where email=? and password=?";
     const [results]=await db.query(checkQuery,[email,password]);
     console.log(results);
     if(results.length>0)
     {
        return results[0];

     }
     else
     {
        
        throw new Error(`employee not exists`);
     }
     
    }catch(err)
    {
        console.log(err.message);
      throw new Error(`failed to get data`);
    }
}

const getProfile=async (data)=>
{
    try{
    const {email}=data;
    console.log(email);
     checkQuery="select * from users where email=?"
     const [results]=await db.query(checkQuery,[email]);

     if(results.length>0)
     {
        return results[0];

     }
     else
     {
        throw new Error(`employee not exists`);
     }
     
    }catch(err)
    {
        throw new Error(`failed to get data`);
    }

}
const insertLeave=async (data)=>
{
    try{
        console.log("hello leave");
        const {startDate,endDate,leaveType,reason,email,username}=data;
        console.log(data);
        insertQuery="insert into leaverequest(startDate,endDate,leaveType,reason,mail,username) values(?,?,?,?,?,?)";
        const [results]=await db.query(insertQuery,[startDate,endDate,leaveType,reason,email,username]);
        console.log(results);
        return results.insertId;
      }catch(err)
      {
        console.log(err.message);
       throw new Error("failed to insert leaverequest");
      }
}

const getLeavesData=async (data)=>
{
    try{
        console.log("leave data");
        selectQuery="select * from leaverequest";
        const [results]=await db.query(selectQuery);
        return results;
    }catch(err)
    {
        throw new Error("failed to getiing leaverequest");
    }
}

const updateLeave=async (data)=>
{
    try{
        const {email,status}=data;
        console.log("leave update");
        updateLeaveQuery="update leaverequest set status=? where mail=?";
        const results=await db.query(updateLeaveQuery,[status,email]);
        console.log("sivate");
        return "sucessfully updated"+status+" leaverequest";
    }catch(err)
    {
        console.log(err.message);
        throw new Error("failed to update leaverequest");
    }
}
const getLeavesPerson=async (data)=>
{
    try{
        const {email}=data;
        const selectQuery="select * from leaverequest where mail=?";
        const [results]=await db.query(selectQuery,[email]);
        return results;
    }catch(err)
    {
      throw new Error("failed to get leaverequest for user");
    }
        
}
const getAllEmployees=async (data)=>
{
    try{
        const {page,limit,search}=data;
        const offset = (page - 1) * limit;
        const query = `
        SELECT * FROM users
        WHERE username LIKE ? or email LIKE ? or role LIKE ?
        order by username
        LIMIT ? OFFSET ? `;
      
      const [results]=await db.query(query,[`%${search}%`, `%${search}%`,`%${search}%`,parseInt(limit), parseInt(offset)]);
      console.log(results);
      return results;
    }catch(err)
    {
        throw new Error("failed to get employees");
    }
}
const uploadTimesheet=async (data)=>
{
    try{
        const {startdate,enddate,totalhours,email,username}=data;
        const insertTimesheetQuery="insert into timesheetsubmit(startdate,enddata,totalhours,email,username) values(?,?,?,?,?)";
        const [results]=await db.query(insertTimesheetQuery,[startdate,enddate,totalhours,email,username]);
        return results.insertId;

    }catch(errr)
    {
        console.log(errr.message);
        throw new Error("failed to upload timesheet");
    }
}
const getSheets=async ()=>
{
    try
    {
        const selectTimesheetQuery="select * from timesheetsubmit where status='submitted'";
        const [results]=await db.query(selectTimesheetQuery);
        return results;

    }catch(err)
    {
        console.log(err.message);
      throw new Error("failed to get timesheets");
    }
}
const showTimesheets=async (data)=>
{
    try
    {
       const {id,status}=data;
       const selectTimesheetQuery="update timesheetsubmit set status=? where id=?";
       const [results]=await db.query(selectTimesheetQuery,[status,parseInt(id)]);
       return "sucessfully updated"+status+" timesheet";

    }catch(err)
    {
        console.log(err.message);
        throw new Error("failed to show timesheets");
    }
}
const getTimesheetsForemp=async (data)=>
{
    try{
        const {email}=data;
        console.log(email);
        const selectTimesheetQuery="select * from timesheetsubmit where email=?";
        const [results]=await db.query(selectTimesheetQuery,[email]);
        console.log(results);
        return results;
        
    }catch(err)
    {
        console.log(err.message);
        throw new Error("failed to get timesheets for user");
      
    }
}
module.exports={insertEmployee,checkEmp,getSheets,showTimesheets,getTimesheetsForemp,getAllEmployees,uploadTimesheet,getProfile,insertLeave,getLeavesData,updateLeave,getLeavesPerson};