const {checkEmployee,addEmployee,checkProfile,leaveRequest,getTimesheetsStatus,getTimesheetsShow,getTimesheets,timeSheetupload,getLeaves,leaveChangeRequest,getLeavesForeachPerson,getEmployees}=require('../controllers/user')
const {upsertResume,searchResumes} = require('./qdrant.db');
const express=require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router=express.Router();
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const uploadDir = path.join(__dirname, './uploads');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Ensure the upload directory exists
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.route('/upload-resume').post(upload.single('resume'), async (req, res) => {
    try {
      const email = req.body.email;
      const resumeNo = req.body.resumeNo;
      const filePath = req.file.path;
  
      // Process and upsert the resume
      await upsertResume(filePath, email, resumeNo);
  
      return res.status(200).json({ message: 'Resume uploaded and processed successfully' });
    } catch (error) {
      console.error('Error uploading resume:', error);
      res.status(500).json({ message: 'Error uploading and processing resume' });
    }
  });

  router.route("/search-resumes").post(async (req, res) => {
    try {
      console.log(req.body);
      const results = await searchResumes(req.body);
  
      return res.status(200).json({ message: 'Search completed', results: results });
    } catch (error) {
      console.error('Error searching resumes:', error);
      return res.status(500).json({ message: 'Error searching resumes' });
    }
  })

router.route('/genratereason').post(async (req,res)=>{
    console.log("hello server");
    const reason=req.body;
    const value=JSON.stringify(reason);
    const prompt =`give the leave reason it should be accepted 
    by the manager and it should be in paragraph form based be provide type and should be in 50 words and it should in simple english language
    description: ${value}`;
    try{
        const FirstResponse = await model.generateContent(prompt);
        console.log("Answer:", FirstResponse.response.text());
        return res.json({message:FirstResponse.response.text()});
    }catch(err){
        console.error(err);
        return res.status(500).json({error:err.message});
    }
})
router.route("/register").post(addEmployee);
router.route("/login").post(checkEmployee);
router.route("/profile").post(checkProfile);
router.route("/leave").post(leaveRequest);
// router.route("/generate").post(generateReason);
router.route("/leaverequests").get(getLeaves);
router.route("/leavechange").post(leaveChangeRequest);
router.route("/leavesforeachperson").post(getLeavesForeachPerson);
router.route("/employeesearch").post(getEmployees);
router.route("/timesheet").post(timeSheetupload);
router.route("/gettimesheets").get(getTimesheets);
router.route("/timesheetsShow").post(getTimesheetsShow);
router.route("/gettimesheetsstatus").post(getTimesheetsStatus);
module.exports=router;