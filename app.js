const cl = console.log;

const stuContainer = document.getElementById('stdContainer');
const stuForm = document.getElementById('stuForm');

const fnameControl = document.getElementById('fName');
const lnameControl = document.getElementById('lName');
const emailControl = document.getElementById('Email');
const contactControl = document.getElementById('contact');

const addStdBtn = document.getElementById('addStdBtn');
const updateStdBtn = document.getElementById('updateStdBtn');

let stuArr = [
  { fname:'neera', lname:'yernale', email:'abc@gmail.com', contact:'7709802138', stdId:'1' },
  { fname:'nagesh', lname:'yernale', email:'abc@gmail.com', contact:'7709802138', stdId:'2' },
  { fname:'neera', lname:'yernale', email:'abc@gmail.com', contact:'7709802138', stdId:'3' }
];

function createArr(arr) {

  let result = '';

  arr.forEach((stu, i) => {

    result += `
      <tr id="${stu.stdId}">
        <td>${i + 1}</td>

        <td>${stu.fname} ${stu.lname}</td>

        <td>${stu.email}</td>

        <td>${stu.contact}</td>

        <td>
          <i 
            onClick="onStdEdit(this)"  
            class="fa-solid fa-pen-to-square fa-2x text-primary"
            role="button">
          </i>
        </td>

        <td>
          <i 
            onClick="onStdRemove(this)"
            class="fa-solid fa-trash fa-2x text-danger"
            role="button">
          </i>
        </td>
      </tr>
    `;
  });

  stuContainer.innerHTML = result;
}

createArr(stuArr);

function onStuSubmit(eve) {

  eve.preventDefault();

  let NEW_STU = {

    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    stdId: Date.now().toString()
  };

  cl(NEW_STU);

  stuArr.push(NEW_STU);

  let tr = document.createElement('tr');

  tr.id = NEW_STU.stdId;

  tr.innerHTML = `
    <td>${stuArr.length}</td>

    <td>${NEW_STU.fname} ${NEW_STU.lname}</td>

    <td>${NEW_STU.email}</td>

    <td>${NEW_STU.contact}</td>

    <td>
      <i 
        onClick="onStdEdit(this)"
        class="fa-solid fa-pen-to-square fa-2x text-primary"
        role="button">
      </i>
    </td>

    <td>
      <i 
        onClick="onStdRemove(this)"
        class="fa-solid fa-trash fa-2x text-danger"
        role="button">
      </i>
    </td>
  `;

  stuContainer.append(tr);

  stuForm.reset();
}

function onStdRemove(eve) {

  let REMOVE_ID = eve.closest('tr').id;

  let getIndex = stuArr.findIndex(std => {
    return std.stdId === REMOVE_ID;
  });

  stuArr.splice(getIndex, 1);

  eve.closest('tr').remove();

  let allTrs = [...document.querySelectorAll('#stdContainer tr')];

  allTrs.forEach((tr, i) => {
    tr.firstElementChild.innerText = i + 1;
  });
}

let EDIT_ID;

function onStdEdit(eve) {

  EDIT_ID = eve.closest('tr').id;

  let EDIT_OBJ = stuArr.find(std => {
    return std.stdId === EDIT_ID;
  });

  fnameControl.value = EDIT_OBJ.fname;
  lnameControl.value = EDIT_OBJ.lname;
  emailControl.value = EDIT_OBJ.email;
  contactControl.value = EDIT_OBJ.contact;

  addStdBtn.classList.add('d-none');
  updateStdBtn.classList.remove('d-none');
}

function onStuUpdate() {

  let UPDATE_ID = EDIT_ID;

  let UPDATE_OBJ = {

    fname: fnameControl.value,
    lname: lnameControl.value,
    email: emailControl.value,
    contact: contactControl.value,
    stdId: UPDATE_ID
  };

  cl(UPDATE_OBJ);

  let getIndex = stuArr.findIndex(u => {
    return u.stdId === UPDATE_ID;
  });

  stuArr[getIndex] = UPDATE_OBJ;

  let tr = document.getElementById(UPDATE_ID).children;

  tr[1].innerText = `${UPDATE_OBJ.fname} ${UPDATE_OBJ.lname}`;
  tr[2].innerText = `${UPDATE_OBJ.email}`;
  tr[3].innerText = `${UPDATE_OBJ.contact}`;

  stuForm.reset();

  addStdBtn.classList.remove('d-none');
  updateStdBtn.classList.add('d-none');
}

stuForm.addEventListener('submit', onStuSubmit);

updateStdBtn.addEventListener('click', onStuUpdate);