let homepage = document.querySelector(".homepage")
let navbar = document.querySelector(".navbar > article > nav")
let create = document.querySelector(".create > article")
let formpage = document.querySelector(".create")


let baseUrl = "http://localhost:5000/api"

// to display form
navbar.children[2].addEventListener("click", e => {
    e.preventDefault()
    let payload = []
    for (i = 0; i < 12; i++) {
        payload.push('')
    }
    createform(payload)
    formpage.style.display = 'flex';
    homepage.style.display = 'none';
})

navbar.children[4].addEventListener('keyup',e=>{
    console.log('im filter');
    console.log(e.target.value);
    e.preventDefault()
    employeedetials(e.target.value)
})

async function employeedetials(filter) {
    let empdtl;
    if(filter){
        let empdtll = await fetch(`http://localhost:5000/api/filter/${filter}`)
        empdtl = await empdtll.json()
    }
    else{
    let empdtll = await fetch("http://localhost:5000/api/emp-all")
    empdtl = await empdtll.json()
   }
    let output = ''
    
    empdtl.payload.forEach(emp => {
        output += `<div class='singelemp'>
        <main>
            <h1>${emp.emp_name}</h1>
            <p>${emp.emp_id}</p>
            <p>${emp.emp_email}</p>
            <p>${emp.emp_phone}</p>
            <p>${emp.emp_exp}</p>
            <p>${emp.emp_edu}</p>
            <p>${emp.emp_designation}</p>
            <p>${emp.emp_gender}</p>
            <p>${emp.emp_city}</p>
            <p>${emp.emp_salary}</p>
            <p>${emp.emp_skills}</p>
            </main> 
            <footer class='${emp._id}'>
            <i class="fas fa-edit" onclick='invoke(this)'></i>
            <i class="fas fa-trash" onclick='invoke1(this)'></i>
            </footer>
        </div>`
    })

    homepage.children[0].children[0].innerHTML = output
}

employeedetials()

async function invoke(a) {
  
        let udetails = a.parentElement.className;
        console.log(udetails);
        let editdtl = await fetch(`http://localhost:5000/api/emp/${udetails}`)
        editdtl = await editdtl.json()
        console.log(editdtl);
        payload = Object.values(editdtl.payload)
        createform(payload)
        formpage.style.display = 'flex';
        homepage.style.display = 'none';
        // window.location.reload()
   
   
    
}
async function invoke1(a){
    let udetails = a.parentElement.className;
    let editdtl = await fetch(`http://localhost:5000/api/emp/${udetails}`,{
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
        status: 201,
    })
    // window.location.reload()
}


// creation of form
function createform(payload) {
   console.log(payload);
    create.innerHTML = `  <form id="formpost" class = ${payload[0]}>
    <input type="text" placeholder="Enter Employee id" name="emp_id" value="${payload[1]}">
    <input type="text" placeholder="Enter Employee Name" name="emp_name" value="${payload[2]}">
    <input type="email" placeholder="Enter Employee Email" name="emp_email" value="${payload[3]}">
    <input type="tel" placeholder="Enter Employee Number" name="emp_phone" value="${payload[4]}">
    <input type="number" placeholder="Enter Employee Experience" name="emp_exp" value="${payload[5]}">
    <input type="text" placeholder="Enter Employee Education" name="emp_edu" value="${payload[6]}">
    <input type="text" placeholder="Enter Employee Designation" name="emp_designation" value="${payload[7]}">
    <div>
        <label for="emp_gender">Select Gender : </label>
        <select name="emp_gender" id="emp_gender">
            <option value="${payload[8]}" selected></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    </div>

    <input type="text" placeholder="Enter Employee City" name="emp_city" value="${payload[9]}">
    <input type="number" placeholder="Enter Employee Salary" name="emp_salary" value="${payload[10]}">
    <div>
        <label for="skill">Choose your Skill from the list:</label>
        <input list="skills" name="skill" id="skill">

        <datalist id="skills">
            <option value="${payload[11]}"></option>
            <option value="hmtl"></option>
            <option value="css"></option>
            <option value="js"></option>
            <option value="nodejs"></option>
            <option value="reactjs"></option>
        </datalist>
    </div>
    <button>Submit</button>
</form>`


    let formpost = document.querySelector("form")
    formpost.lastElementChild.onclick = formdata()
}





function formdata() {
    formpost.addEventListener("submit", async e => {
         e.preventDefault()
        try {
            let emp_id = e.target[0].value;
            let emp_name = e.target[1].value
            let emp_email = e.target[2].value
            let emp_phone = e.target[3].value
            let emp_exp = e.target[4].value
            let emp_edu = e.target[5].value
            let emp_designation = e.target[6].value
            let emp_gender = e.target[7].value
            let emp_city = e.target[8].value
            let emp_salary = e.target[9].value
            let emp_skills = e.target[10].value

            let payload = {
                emp_id,
                emp_name,
                emp_email,
                emp_phone,
                emp_exp,
                emp_edu,
                emp_designation,
                emp_gender,
                emp_city,
                emp_salary,
                emp_skills,
            }
            if (e.target.className) {
                console.log("update")
                await fetch(`http://localhost:5000/api/emp/${e.target.className}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(payload),
                    status: 201,
                })
                console.log(payload)
                console.log(e.target.className)
            } else {
                await fetch(`${baseUrl}/create-emp`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(payload)
                })
            }



        } catch (error) {
            console.log(error)
        }
    })
}