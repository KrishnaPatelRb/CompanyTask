import React,{useEffect, useState} from "react"


export default function Body(){
    const [studentArr,SetStudentArr]=useState([])
    const [addFormOPen,setAddFormOpen]=useState(false);
    const [input,setInput]=useState("")
    const [editFormOpen,setEditFormOpen]=useState(false)
    const [searchFormOpen,setSearchFormOpen]=useState(true)
    const [currentId,setCurrentId]=useState("")
    const [currentStudentName,setCurrentStudentName]=useState("")
    const [update,setUpdate]=useState(0)
    const [search,setSearch]=useState("")
    let deleteId;
    let Student="http://localhost:8080/student"
  
    // here useEffect is used because we want auto refrsh the student list after any operation(add,update,delete) by just fetching current actual data
    useEffect(()=>{
      if(search){
        Student=`http://localhost:8080/student/name/${search}`
      }
      else{
        Student="http://localhost:8080/student"
      }
      fetch(Student).then((res)=>{
         return res.json();
      }).then((res)=>{
        SetStudentArr(res)
      })
    },[input,update,search])

  
    // UpdateStudent function will send the put request with updated name as body
    function UpdateStudent(){
      const data={
        title:input
      }
      fetch(`http://localhost:8080/student/${currentId}`,
       { method: 'PUT',
         mode: 'cors',
         headers: {
          'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      }).then((res)=>{
        return res.json();
     }).then((res)=>{
     })
    }
  

    // DeleleStudent function will send the delete request with id(which student to be delete) as a params
    function DeleteStudent(){
      fetch(`http://localhost:8080/student/${deleteId}`,
       { method: 'DELETE',
         mode: 'cors',
         headers: {
          'Content-Type': 'application/json'
         },
      }).then((res)=>{
        return res.json();
     }).then((res)=>{
      setUpdate(update+1) // it is used for auto update the list in UI because update variable attach in useEffect method as a dependency element
     })
    }
   

    // AddStudent function will send the post request with new name(which we want to add in student list) as a body 
    function AddStudent(){
        const data={
          title:input
        }
        fetch("http://localhost:8080/student",
        { method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res)=>{
          return res.json();
      }).then((res)=>{
        
      })
    }
  
    
  
    return (<>
    {/* Add new Student button */}
    <div className="addNewStudent">
      <button onClick={()=>{
        if(!editFormOpen){
          setSearchFormOpen(false)
          setAddFormOpen(true)
          setInput("")
        }
        }} >Add New Student
      </button>
    </div>

    {/*input field and Search button for search the student name*/}
    {searchFormOpen?
      <div className="form" >
        <input value={input} onChange={(event)=>{setInput(event.target.value)}} type="text" placeholder="Type name" />
        <button onClick={()=>{
          setSearch(input)
        }} >Search</button>
      </div>
    :""}
    
    
    {/* input field, Add and Close button which add the student and will appear based on conditional rendering */}
    {addFormOPen?
      <div className="form" >
        <input value={input} onChange={(event)=>{setInput(event.target.value)}} type="text" placeholder="Name" />
        <button onClick={()=>{
          if(input.length>0  && !input.match(/^[0-9]/) && !input.match(/^[/*-+.]/)){
            AddStudent()
            setInput("")
          }
          else{
            alert("please inter valid Name")
          }
          }}>Add
        </button>
        <button onClick={()=>{
          setInput("")
          setAddFormOpen(false)
          setSearchFormOpen(true)
          }}>Close
        </button>
      </div>
    :""}

  
    {/* input field, Update and Close button which update the student and will appear based on conditional rendering */}
    {editFormOpen?
      <div className="form" >
        <input value={input} onChange={(event)=>{setInput(event.target.value)}} type="text" placeholder="Name" />
        <button onClick={()=>{
          if(input.length>0 && !input.match(/^[0-9]/) && !input.match(/^[/*-+.]/)){
            UpdateStudent()
            setInput("")
            setEditFormOpen(false)
            setSearchFormOpen(true)
          }
          else{
            alert("please inter valid student name")
          }
          }} >Update
        </button>
        <button onClick={()=>{
          setInput("")
          setEditFormOpen(false)
          setSearchFormOpen(true)
          }} >Close
        </button>
      </div>
    :""}
  
    {/*Student list*/}
    <div className="listContainer">
      <table>
        <thead>
          <th>SR. No.</th>
          <th>Students id</th>
          <th>Students Name</th>
        </thead>
        <tbody>
          {studentArr.map((currentStudent,index)=>{
            return (<>
                <tr>
                  <td>{index+1 }</td>
                  <td>{currentStudent.id}</td>
                  <td>{currentStudent.name}</td>
                  <button onClick={()=>{
                    if(!addFormOPen){
                      setSearchFormOpen(false)
                      setEditFormOpen(true)
                      setCurrentId(currentStudent.id)
                      setCurrentStudentName(currentStudent.name)
                      setInput(currentStudent.name)
                    }
                    }} >Edit
                  </button>
                  <button onClick={()=>{
                    deleteId=currentStudent.id 
                    DeleteStudent()
                    setUpdate(update+1)
                    }}>Delete
                  </button>
                </tr>
            </>)
          })}
        </tbody>
      </table>
    </div>
    
    
    </>)
  }