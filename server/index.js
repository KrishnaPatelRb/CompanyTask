const express= require("express");
const app= express();

const cors=require("cors")
app.use(cors());


app.use(express.json())
const mysql=require("mysql")
const con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"database1"
})

con.connect( function (err){
   if(err){
     throw err;
    }
    else{
     console.log("connection stablised succesfully")
    }
})

// For Add new Student in student table
app.post("/student", function(req,res){
    const data=req.body;
    const title=data.title;
    const query=`INSERT INTO student(name) VALUES("${title}")`;
    con.query(query,function(err,result){
        if(err){
            res.status(500).send("student not inserted")
        }
        else{
            res.status(200).send("successful")
        }
    })
})


// for fetch the all records from the student table
app.get("/student", function(req,res){
    const query=`SELECT * FROM student`
    con.query(query,function(err,result){
        if(err){
            res.status(500).send("students not available")
        }
        else{
            res.status(200).send(result);
        }
    })
})


// for search the student by keyword which contains this keyword 
app.get("/student/name/:keyword", function(req,res){
    const query=`SELECT * FROM student where name like '%${req.params.keyword}%' `
    con.query(query,function(err,result){
        if(err){
            res.status(500).send("students not available")
        }
        else{
            res.status(200).send(result);
        }
    })
})


// Search the student by id
app.get("/student/:studentId", function(req,res){
    const studentId=req.params.studentId;
    const query=`SELECT * FROM student where id="${studentId}"`
    con.query(query,function(err,result){
        if(err){
            res.status(500).send("Students not available")
        }
        else{
            res.status(200).send(result);
        }
    })
})


// update the student name by id
app.put("/student/:studentId",function(req,res){
    const Id= req.params.studentId;
    const name= req.body.title;
    const query=`Update student set name ='${name}' where id=${Id}`;
    con.query(query,function(err){
        if(err){
            res.status(500).send("cant update this student")
        }
        else{
            res.status(200).send("student updation successfully");
        }
    })
})


// Delete a student by id
app.delete("/student/:studentId",function(req,res){
const studentId= req.params.studentId;
const query=`DELETE FROM student where id=${studentId}`;
con.query(query,function(err){
    if(err){
        res.status(500).send("can't delete this student")
    }
    else{
        res.status(200).send("student deleted successfully");
    }
})
})

// Delete all student entries
app.delete("/student",function(req,res){
    const query=`DELETE FROM student`;
    con.query(query,function(err){
        if(err){
            res.status(500).send("can't delete this student")
        }
        else{
            res.status(200).send("student deleted successfully");
        }
    })
    })
    

app.listen(8080,()=>{
    console.log("Started Server on 8080")
})


