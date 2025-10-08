// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


import { getUserIds } from "./common.mjs";
import { getData } from "./storage.mjs";
import { addData } from "./storage.mjs";
import { clearData } from "./storage.mjs";


window.onload = function () {
  const users = getUserIds();

  addTestData();
  console.log(getData("1"));

  //create user drop-down list
  const selectUserElm = document.createElement("select");
  selectUserElm.id = "userSelect";
  //Add user drop-down list to Body
  document.body.appendChild(selectUserElm);

  //create user-select placeholder
  const userSelectPlaceHolder = document.createElement("option");
  userSelectPlaceHolder.value = "";
  userSelectPlaceHolder.textContent = "Select a User :";
  userSelectPlaceHolder.disabled = true;
  userSelectPlaceHolder.selected = true;
  selectUserElm.appendChild(userSelectPlaceHolder);

  //create user-select options

  users.forEach((id) => {
    const selectOption = document.createElement("option");
    selectOption.value = id;
    selectOption.innerText = `User ${id}`;
    selectUserElm.appendChild(selectOption);
  });

  //Create User Agenda Section

  const userAgendaSection = document.createElement("div");
  userAgendaSection.id = "sectionDiv";

  //Create Section placeholder
  const sectionTitle = document.createElement("p");
  sectionTitle.textContent = "The selected user’s agenda is displayed below :";
  userAgendaSection.appendChild(sectionTitle);
  //Add Agenda Section to Body
  document.body.appendChild(userAgendaSection);

  //Agenda Content
  const agendaContent = document.createElement("div");
  agendaContent.id = "agendaContent";
  agendaContent.textContent = "No user is currently selected ! ";
  userAgendaSection.appendChild(agendaContent);

  //when userId changes
  selectUserElm.addEventListener("change", function () {
    const selectedUserId = this.value;
    const userAgenda = getData(selectedUserId);
    if (!userAgenda || userAgenda.length === 0) {
      agendaContent.textContent = `There is no information available for  user ${selectedUserId}. `;
    } else {
      agendaContent.textContent = `User ${selectedUserId} agenda is displayed below : `;
      showUserAgenda(selectedUserId);
    }
  });
  function addTestData() {
    clearData("1");
    //Add data for sample and test
    addData("1", [
      { topic: "Test Topic", date: "2026-07-26" },
      { topic: "Test Topic", date: "2026-08-19" },
    ]);
  }

  function showUserAgenda(userId) {
    const agendaArray = getData(userId);
    agendaContent.innerHTML = "";
    const agendaUl = document.createElement("ul");
    agendaArray.forEach((item) => {
      const agendaLi = document.createElement("li");
      agendaLi.textContent = `${item.topic} - ${item.date} `;
      agendaUl.appendChild(agendaLi);
    });
    agendaContent.appendChild(agendaUl);
  }
  // This function calculates revision dates for a given date.
  // Input: a Date object (selectedDate).
  // Output: an array of Date objects for 1 week, 1 month, 3 months, 6 months, and 1 year after the input date.

  function calculateRevisionDate(selectedDate) {
    const revisionDateArray = [];
    //one week later
    const oneWeek = new Date(selectedDate);
    oneWeek.setDate(selectedDate.getDate() + 7);
    revisionDateArray.push(oneWeek.toLocaleDateString());
    //One Month Later
    const oneMonth = new Date(selectedDate);
    oneMonth.setMonth(selectedDate.getMonth() + 1);
    revisionDateArray.push(oneMonth.toLocaleDateString());
    //Three Month Later
    const threeMonth = new Date(selectedDate);
    threeMonth.setMonth(selectedDate.getMonth() + 3);
    revisionDateArray.push(threeMonth.toLocaleDateString());
    //Six Month Later
    const sixMonth = new Date(selectedDate);
    sixMonth.setMonth(selectedDate.getMonth() + 6);
    revisionDateArray.push(sixMonth.toLocaleDateString());
    //One Year
    const oneYear = new Date(selectedDate);
    oneYear.setFullYear(selectedDate.getFullYear() + 1);
    revisionDateArray.push(oneYear.toLocaleDateString());
    return revisionDateArray;
  }
};
