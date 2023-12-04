const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')
const studentModel = require('./models/student')
const facultyModel = require('./models/faculty')
const Event= require('./models/event');
const Project = require('./models/project');
const Paper = require('./models/paper');

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
// app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your React app's URL
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

mongoose.connect("mongodb://127.0.0.1:27017/ssd_proj");

const varifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("Token is missing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Error with token")
            } else {
                if(decoded.role === "admin") {
                    next()
                } else {
                    return res.json("not admin")
                }
            }
        })
    }
}


app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then(hash => {
        UserModel.create({name, email, password: hash})
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                  const token = jwt.sign({email: user.email, role: user.role},
                        "jwt-secret-key", {expiresIn: '1d'})  
                    res.cookie('token', token)
                    return res.json({Status: "Success", role: user.role})
                }else {
                    return res.json("The password is incorrect")
                }
            })
        } else {
            return res.json("No record existed")
        }
    })
})

app.post('/events', async (req, res) => {
  try {
    const { name, desc } = req.body;
    console.log('Request Body:', req.body);
    // Generate a new student ID using uuid
    // const studentId = uuidv4();

    // Create a new student document using the Student model
    const newEvent = new Event({
      name,
      desc,
      // studentId,
    });

    // Save the student to the database
    const saveEvent = await newEvent.save();

    res.status(201).json({ status: 'success', data: saveEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ status: 'error', message: 'Unable to add event' });
  }
});


app.get('/events', async (req, res) => {
  try {
      const events = await Event.find();
      res.status(200).json({ status: 'success', data: events });
  } catch (error) {
      console.error('Error retrieving events:', error);
      res.status(500).json({ status: 'error', message: 'Unable to retrieve events' });
  }
});

app.post('/projects', async (req, res) => {
  try {
    const { name, auth, dept, grant } = req.body;
    console.log('Request Body:', req.body);
    // Generate a new student ID using uuid
    // const studentId = uuidv4();

    // Create a new student document using the Student model
    const newProj = new Project({
      name,auth,dept, grant,
    });

    // Save the student to the database
    const saveProj = await newProj.save();

    res.status(201).json({ status: 'success', data: saveProj });
  } catch (error) {
    console.error('Error adding proj:', error);
    res.status(500).json({ status: 'error', message: 'Unable to add proj' });
  }
});


app.get('/projects', async (req, res) => {
  try {
      const projects = await Project.find();
      res.status(200).json({ status: 'success', data: projects });
  } catch (error) {
      console.error('Error retrieving proj:', error);
      res.status(500).json({ status: 'error', message: 'Unable to retrieve proj' });
  }
});

app.post('/papers', async (req, res) => {
  try {
    const { name, auth, jurnl, year } = req.body;
    console.log('Request Body:', req.body);

    const newPpr = new Paper({
      name,auth,jurnl, year,
    });

    // Save the student to the database
    const savePpr = await newPpr.save();

    res.status(201).json({ status: 'success', data: savePpr });
  } catch (error) {
    console.error('Error adding paper:', error);
    res.status(500).json({ status: 'error', message: 'Unable to add paper' });
  }
});


app.get('/papers', async (req, res) => {
  try {
      const papers = await Paper.find();
      res.status(200).json({ status: 'success', data: papers });
  } catch (error) {
      console.error('Error retrieving paper:', error);
      res.status(500).json({ status: 'error', message: 'Unable to retrieve paper' });
  }
});

app.listen(3001, () => {
    console.log("Server is Running")
})

//importing schema
require("./models/imageDetails");
const Images = mongoose.model("ImageDetails");
require("./models/student");
const Students = mongoose.model("students");
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const profName = req.body.profName;
  const profRole = req.body.profRole;
  const imageName = req.file.filename;

  try {
    await Images.create({ image: imageName, name: profName, role: profRole });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/students", async (req, res) => {
  try {
    Students.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.post("/students", upload.single("image"), async (req, res) => {
  const profName = req.body.profName;
  const age = req.body.age;
  const imageName = req.file.filename;

  try {
    await Students.create({ image: imageName, name: profName, age: age });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});