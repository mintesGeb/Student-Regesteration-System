window.onload = pageload;

class Course {
  constructor(name, courseID) {
    this.name = name;
    this.courseID = courseID;
  }
  addToTotalList(arr) {
    arr.push(this);
  }
}
let courses = [];

let oop = new Course("object oriented programming", "cs303");
let ssp = new Course("server side programming", "cs477");
let algo = new Course("algorithms", "cs321");
let jsb = new Course("js basics", "cs301");
let masp = new Course("modern asynchronous programming", "cs445");
let dbsd = new Course("databases and software development", "cs418");

oop.addToTotalList(courses);
ssp.addToTotalList(courses);
algo.addToTotalList(courses);
jsb.addToTotalList(courses);
masp.addToTotalList(courses);
dbsd.addToTotalList(courses);

let students = [];

class Student {
  constructor(firstName, lastName, studentID) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.studentID = studentID;
    this.courses = [];
  }
  addToList() {
    students.push(this);
  }
  removeStudent() {
    let filtered = students.filter((item) => item.studentID !== this.studentID);
    students = filtered;
  }
  assignCourse(courseID) {
    if (
      !this.courses.map((item) => item.courseID).includes(courseID) &&
      this.courses.length <= 6
    ) {
      this.courses.push(courses.find((item) => item.courseID == courseID));
    }
  }
  removeCourse(courseID) {
    let filtered = this.courses.filter((item) => item.courseID !== courseID);
    if (filtered) {
      this.courses = filtered;
    } else {
      this.courses = [];
    }
  }
}

let jossy = new Student("Eyosias", "Tekle", "12045");
let amani = new Student("Amanuel", "Benti", "17863");
let robbie = new Student("Robbie", "Abdissa", "17143");
let mintes = new Student("Mintes", "Gebre", "11055");
let halle = new Student("Halle", "Solomon", "14565");
let amen = new Student("Amen", "Smith", "19465");

mintes.addToList();
jossy.addToList();
robbie.addToList();
amani.addToList();
halle.addToList();
amen.addToList();

for (let i = 0; i < students.length; i++) {
  for (let j = i; j < courses.length; j++) {
    students[i].assignCourse(courses[j].courseID);
  }
}
// amen.assignCourse("cs303");
// console.log(amen);
// amen.removeCourse("cs303");
// console.log(amen);

function getStudentSelection() {
  let myPeopleForm = document.querySelector(".add-remove-form");
  let addedPeople = [];
  for (let each of myPeopleForm) {
    if (each.checked) addedPeople.push(each.value);
  }
  let filteredStudents = students.filter(function (item) {
    for (let each of addedPeople) {
      if (each.includes(item.firstName)) return item;
    }
  });

  return filteredStudents;
}
function getCourseSelection() {
  let added = [];
  let myForm = document.querySelector(".courses-to-assign");
  for (let each of myForm) {
    if (each.checked) added.push(each.value);
  }

  let filteredCourse = courses.map(function (item) {
    for (let each of added) {
      if (each.includes(item.courseID)) return item.courseID;
    }
  });

  filteredCourse = filteredCourse.filter((item) => item !== undefined);

  return filteredCourse;
}

function addCourse(stu, course) {
  let stuList = getStudentSelection();
  let courseList = getCourseSelection();
  if (stuList.length === 0) {
    document.querySelector(
      ".messageDisplay"
    ).innerText = `Please select a student`;
  } else if (courseList.length === 0) {
    document.querySelector(".messageDisplay").innerText =
      "Please select a course to add/remove";
  }

  // else if (stuList.length === 0 && courseList.length === 0)
  for (let each of stuList) {
    for (let element of courseList) {
      if (each.courses.length === 6) {
        document.querySelector(".messageDisplay").innerText =
          "Student has reached maximum number of courses 😒";
      } else if (each.courses.length === 0) {
        document.querySelector(".messageDisplay").innerText =
          "Student has no more course to remove 😢";
      }
      each.assignCourse(element);
      console.log(each, element);
    }
  }

  showStudentCourseList();
  courseInput();
}

function removeCourse(stu, course) {
  let stuList = getStudentSelection();
  let courseList = getCourseSelection();

  for (let each of stuList) {
    for (let element of courseList) {
      each.removeCourse(element);
      console.log(each, element);
    }
  }

  showStudentCourseList();
  courseInput();
}

function sortCoursesByName(arr) {
  let newArr = arr.map((item) => item.name);

  let sorted = newArr.sort().map(function (item) {
    for (let each of arr) {
      if (each.name === item) return each;
    }
  });
  return sorted;
}
// console.log(sortCoursesByName(courses));

function sortStu(type, arr) {
  let sorted;
  let firstNames = arr.map((item) => item.firstName).sort();
  let lastNames = arr.map((item) => item.lastName).sort();
  let studentID = arr
    .map((item) => Number(item.studentID))
    .sort((x, y) => x - y);

  if (type === "first name") {
    sorted = firstNames.map(function (item) {
      for (let each of arr) {
        if (each.firstName === item) return each;
      }
    });
  } else if (type === "last name") {
    sorted = lastNames.map(function (item) {
      for (let each of arr) {
        if (each.lastName === item) return each;
      }
    });
  } else if (type === "id") {
    sorted = studentID.map(function (item) {
      for (let each of arr) {
        if (each.studentID == item) return each;
      }
    });
  }

  return sorted;
}
console.log(sortStu("id", students));

function sortCoursesByID(arr) {
  let newArr = arr.map(function (item) {
    let str = item.courseID;

    let numID = "";
    for (let i = 0; i < str.length; i++) {
      if (!isNaN(Number(str[i]))) numID += str[i];
    }
    return numID;
  });
  let sorted = newArr.sort().map(function (item) {
    for (let each of arr) {
      if (each.courseID.includes(item)) {
        return each;
      }
    }
  });

  return sorted;
}
console.log(sortCoursesByID(courses));

function searchStuByName(n, arr) {
  let filtered = [];

  n = n.trim().toLowerCase();

  if (n.includes(" ")) {
    let str1 = n.slice(0, n.indexOf(" "));
    let str2 = n.slice(n.indexOf(" "));

    return searchStuByName(str1, arr).concat(searchStuByName(str2, arr));
  } else if (parseInt(n.trim())) {
    return arr.filter((item) => item.studentID.includes(n));
  }

  // if (n.includes(" ")) {
  //   let str1 = n.slice(0, n.indexOf(" "));
  //   let str2 = n.slice(n.indexOf(" "));

  //   if (
  //     searchStuByName(str1, arr)[0].firstName ===
  //     searchStuByName(str2, arr)[0].firstName
  //   ) {
  //     return searchStuByName(str1, arr);
  //   } else {
  //     return [searchStuByName(str1, arr), searchStuByName(str2, arr)];
  //   }
  // }
  else {
    filtered = arr.filter(function (item) {
      return (
        item.firstName.toLowerCase().includes(n) ||
        item.lastName.toLowerCase().includes(n)
      );
    });

    return filtered;
  }
}
// console.log(searchStuByName("11055", students));

function consolidateArr(arr) {
  let newArr = [];
  let map = new Map();

  function helper(arr) {
    for (let each of arr) {
      if (Array.isArray(each)) {
        helper(each);
      } else {
        newArr.push(each);
      }
    }
  }
  if (Array.isArray(arr)) helper(arr);
  else {
    newArr.push(arr);
  }
  for (let each of newArr) {
    // let x=JSON.stringify(each);
    if (!map.has(each)) map.set(each, 1);
  }
  let consolidated = [];
  for (let each of map.keys()) {
    consolidated.push(each);
  }

  return consolidated;
}
console.log(consolidateArr(searchStuByName("11055", students)));
function searchByName(n, arr) {
  let filtered;
  n = n.trim().toLowerCase();

  if (n.includes(" ")) {
    let str1 = n.slice(0, n.indexOf(" "));
    let str2 = n.slice(n.indexOf(" "));
    return [searchByName(str1, arr), searchByName(str2, arr)];
  } else {
    if (arr[0].name) {
      filtered = arr.filter(function (item) {
        return item.name.toLowerCase().includes(n);
      });
    } else {
      filtered = arr.filter(function (item) {
        return item.firstName.toLowerCase().includes(n);
      });
    }

    return filtered;
  }
}
console.log(searchByName("programming", courses));

// ---------------------------//---------------------------

function displayObj(obj) {
  if (Array.isArray(obj)) {
    for (let each of obj) {
      return displayObj(each);
    }
  }
  let pair = Object.entries(obj);
  let strDisplay = "";
  for (let each of pair) {
    strDisplay += `${each[0]}: ${each[1]}\n`;
  }
  return strDisplay;
}

function showCourse() {
  document.querySelector(".course-list-btn").textContent = "Show Course List"; //back from "update list"
  let ul = document.querySelector(".list-of-courses");
  ul.innerHTML = "";
  let strCourses = courses.map(
    (item) => item.name + "\t ----\t" + item.courseID
  );
  strCourses.forEach(function (item) {
    let li = document.createElement("li");
    li.innerText = item;
    ul.append(li);
  });

  document.querySelector(".sort-course-list-btn").classList.remove("hidden");
}
// ---------------------------//---------------------------

function showStudents() {
  document.querySelector(".student-list-btn").classList.add("hidden"); //back from "update list"

  displaySorted(students);

  document.querySelector(".sort-student-list-btn").classList.remove("hidden");
}

// ---------------------------//---------------------------
function searchStudent(x) {
  document.querySelector(".search-result").classList.remove("hidden");
  let searchInput = document.querySelector(".search-input").value;

  let searchResultArr = consolidateArr(searchStuByName(searchInput, students));

  let ul = document.querySelector(".search-result-list");
  ul.innerHTML = "";

  let print = searchResultArr.map(
    (item) => item.firstName + " " + item.lastName + " --- " + item.studentID
  );

  print.forEach(function (item) {
    let li = document.createElement("li");
    li.innerText = item;
    ul.append(li);
  });
}
// ---------------------------//---------------------------
function searchCourse() {
  document.querySelector(".search-course-result").classList.remove("hidden");
  let searchInput = document.querySelector(".search-course-input").value;
  let searchResultArr = searchByName(searchInput, courses);
  console.log(searchResultArr);

  let ul = document.querySelector(".search-course-result-list");
  ul.innerHTML = "";
  let print = searchResultArr.map(
    (item) => item.name + " --- " + item.courseID
  );

  print.forEach(function (item) {
    let li = document.createElement("li");
    li.innerText = item;
    ul.append(li);
  });
}
// ---------------------------//---------------------------

function readyToAddStu() {
  document.querySelector(".add-first-name").classList.remove("hidden");
  document.querySelector(".add-last-name").classList.remove("hidden");
  document.querySelector(".add-student-ID").classList.remove("hidden");
  document.querySelector(".add-done").classList.remove("hidden");
  document.querySelector(".add-new-stu").classList.add("hidden");
}
function addNewStudent() {
  let newFN = document.querySelector(".add-first-name").value;
  let newLN = document.querySelector(".add-last-name").value;
  let newID = document.querySelector(".add-student-ID").value;

  let newStuName = new Student(newFN, newLN, newID);
  newStuName.addToList();

  newFN = "";
  newLN = "";
  newID = "";
  document.querySelector(".add-first-name").classList.add("hidden");
  document.querySelector(".add-last-name").classList.add("hidden");
  document.querySelector(".add-student-ID").classList.add("hidden");
  document.querySelector(".add-done").classList.add("hidden");
  document.querySelector(".add-new-stu").classList.remove("hidden");

  showStudents();
}

function readyToDeleteStu() {
  document.querySelector(".remove-student-ID").classList.remove("hidden");
  document.querySelector(".remove-done").classList.remove("hidden");
  document.querySelector(".remove-student").classList.add("hidden");
}
function deleteStudent() {
  let idInput = document.querySelector(".remove-student-ID").value;
  console.log(idInput);
  let found = students.find((item) => item.studentID == idInput);
  console.log(found);
  found.removeStudent();

  showStudents();
}
function sortStudents() {
  let sortValue = document.getElementById("sort-stu").value;
  if (sortValue === "first name") {
    displaySorted(sortStu("first name", students));
  } else if (sortValue === "last name") {
    displaySorted(sortStu("last name", students));
  } else if (sortValue === "id") {
    displaySorted(sortStu("id", students));
  }
}

function displaySorted(arr) {
  let ul = document.querySelector(".list-of-students");
  ul.innerHTML = "";

  let strArr = arr.map(
    (item) =>
      item.firstName + " " + item.lastName + " - " + item.studentID + " "
  );

  strArr.forEach(function (item) {
    let li = document.createElement("li");
    li.innerHTML = item;
    ul.append(li);
  });
}

function readyToAddCourse() {
  document.querySelector(".add-course-name").classList.remove("hidden");
  document.querySelector(".add-course-ID").classList.remove("hidden");
  document.querySelector(".add-done-btn").classList.remove("hidden");
  document.querySelector(".add-new-course").classList.add("hidden");
}

function addNewCourse() {
  let courseName = document.querySelector(".add-course-name").value;
  let courseID = document.querySelector(".add-course-ID").value;

  let newCourse = new Course(courseName, courseID);

  newCourse.addToTotalList(courses);
  document.querySelector(".add-course-name").classList.add("hidden");
  document.querySelector(".add-course-ID").classList.add("hidden");
  document.querySelector(".add-done-btn").classList.add("hidden");
  document.querySelector(".add-new-course").classList.remove("hidden");
  document.querySelector(".course-list-btn").textContent = "Update List";
}

function sortCourses() {
  let sortValue = document.getElementById("sort-courses").value;
  if (sortValue === "name") {
    let sortedByName = sortCoursesByName(courses);
    courseDisplay(sortedByName);
  } else if (sortValue === "id") {
    let sortedById = sortCoursesByID(courses);
    courseDisplay(sortedById);
  }
}

function courseDisplay(arr) {
  let ul = document.querySelector(".list-of-courses");
  ul.innerHTML = "";

  let strCourses = arr.map((item) => item.name + "\t ----\t" + item.courseID);

  strCourses.forEach(function (item) {
    let li = document.createElement("li");
    li.innerText = item;
    ul.append(li);
  });
}

function showStudentCourseList() {
  // reset some elements
  document.querySelector(".messageDisplay").innerText = "";
  let form = document.querySelector(".add-remove-form");
  form.innerHTML = "";

  let strArr = students.map(function (item) {
    let strCourses = "";
    let courseCount = 0;
    for (let each of item.courses) {
      strCourses += "\n" + each.name + " - " + each.courseID + "\t;\n";
      courseCount++;
    }
    if (strCourses.trim() === "") strCourses = "😢 No Courses";
    return `${item.firstName} \t - \t  ${item.studentID} \n \t => \t ${strCourses} ----- ${courseCount}`;
  });
  let num = 1;
  strArr.forEach(function (item) {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "stu" + num++);
    input.setAttribute("value", item);
    // label.setAttribute("for", "stu" + num++);
    label.innerHTML = item;
    form.append(input);
    form.append(label);
    form.append(document.createElement("br"));
    form.append(document.createElement("br"));
  });

  document.querySelector(".add-remove-course").style.height = "100%";

  document
    .querySelector(".course-list-menu-display")
    .classList.remove("hidden");
}

function courseInput() {
  // reset elements
  document.querySelector(".messageDisplay").innerText = "";
  let form = document.querySelector(".courses-to-assign");
  form.innerHTML = "";

  let strArr = courses.map((item) => item.name + " - " + item.courseID);
  let num = 1;

  strArr.forEach(function (item) {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", item);
    input.setAttribute("id", "course" + num++);
    label.innerHTML = item;
    form.append(input);
    form.append(label);
    form.append(document.createElement("br"));
    form.append(document.createElement("br"));
  });
}

function pageload() {
  document.querySelector(".student-list-btn").onclick = showStudents;
  document.querySelector(".search-btn").onclick = searchStudent;
  document.querySelector(".search-course-btn").onclick = searchCourse;
  document.querySelector(".add-new-stu").onclick = readyToAddStu;
  document.querySelector(".remove-student").onclick = readyToDeleteStu;
  document.querySelector(".add-done").onclick = addNewStudent;
  document.querySelector(".remove-done").onclick = deleteStudent;
  document.querySelector(".course-list-btn").onclick = showCourse;
  document.querySelector(".add-new-course").onclick = readyToAddCourse;
  document.querySelector(".add-done-btn").onclick = addNewCourse;
  document.querySelector(".sort-courses-submit").onclick = sortCourses;
  document.querySelector(".sort-stu-submit").onclick = sortStudents;
  document.querySelector(".add-course-to-stu").onclick = addCourse;
  document.querySelector(".remove-course-from-stu").onclick = removeCourse;
  document.querySelector(".stu-course-list").onclick = showStudentCourseList;
  document.querySelector(".show-courses-to-assign").onclick = courseInput;
}
