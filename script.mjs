// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.


import { getUserIds } from "./common.mjs";
import { getData } from "./storage.mjs";
import { addData } from "./storage.mjs";
import { clearData } from "./storage.mjs";
import { calculateRevisionDate } from "./common.mjs";



window.onload = function () {
  const users = getUserIds();

  //clear stored agenda so users start with a clear state
  if (!localStorage.getItem("app-initialized")) {
    users.forEach((id) => clearData(id));
    localStorage.setItem("app-initialized", "true");
  }

  // label for user menu
  const userLabel = document.createElement("label");
  userLabel.setAttribute("for", "userSelect");
  userLabel.textContent = "Pick a user";

  //create user drop-down list
  const userMenu = document.createElement("select");
  userMenu.id = "userSelect";

  //Add user label and user drop-down list to Body
  document.body.appendChild(userLabel);
  document.body.appendChild(userMenu);

  //create user-select placeholder
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Select a User :";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  userMenu.appendChild(placeholderOption);

  //create user-select options

  users.forEach((id) => {
    const userOption = document.createElement("option");
    userOption.value = id;
    userOption.innerText = `User ${id}`;
    userMenu.appendChild(userOption);
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
  userMenu.addEventListener("change", function () {
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

    // Sort agenda by date ascending
    agendaArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    agendaContent.innerHTML = "";
    const agendaUl = document.createElement("ul");

    agendaArray.forEach((item) => {
      const agendaLi = document.createElement("li");
      agendaLi.textContent = `${item.topic} - ${new Date(
        item.date
      ).toLocaleDateString()}`;
      agendaUl.appendChild(agendaLi);
    });

    agendaContent.appendChild(agendaUl);
  }

  //create form
  const form = document.createElement("form");
  document.body.append(form);

  //create div to hold form components
  const div = document.createElement("div");
  form.append(div);

  //create label for text input area
  const topicLabel = document.createElement("label");
  topicLabel.setAttribute("for", "topicInput");
  topicLabel.textContent = "Enter a topic";
  
  //create text area for the topics
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "topicInput";
  textInput.placeholder = "Enter a Topic";

  //append the text input label and the text input tag
  div.append(topicLabel);
  div.append(textInput);

  // set validation for topic input to ensure user enters a valid text before submitting the form
  form.addEventListener("submit", function (event) {
    if (!textInput.value.trim()) {
      event.preventDefault();
      alert("You must enter a topic name before submitting the form!");
    }
    if (!userMenu.value) {
      // Make sure that a user ID is selected before submitting the form.
      event.preventDefault();
      alert("Please select a user!");
    }
  });

  //create label for date picker
  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("for", "date-picker");
  dateLabel.textContent = "Pick a date";

  //create date picker
  const datePicker = document.createElement("input");
  datePicker.id = "date-picker";
  datePicker.type = "date";

  //append both date label and date picker tag to the div
  div.append(dateLabel);
  div.append(datePicker);

  // set date picker to default to today's date on first page load
  const today = new Date().toISOString().split("T")[0];
  datePicker.value = today;

  // set validation for date picker to ensure user picks a date before submitting the form
  form.addEventListener("submit", function (event) {
    if (!datePicker.value) {
      event.preventDefault();
      alert("You must pick a date before submitting the form!");
    }
  });

  //create submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "submit";
  div.append(submitBtn);

  // store new data and display full agenda (including addition) when a user is selected

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = userMenu.value;
    const topic = textInput.value.trim();
    const date = new Date(datePicker.value);

    // Get calculated revision dates
    const revisionDates = calculateRevisionDate(date);

    // Only include revision dates that are today or in the future
    const today = new Date();
    const agendaItems = revisionDates
      .map((dateStr) => {
        const revDate = new Date(dateStr);
        return revDate >= today ? { topic, date: dateStr } : null;
      })
      .filter(Boolean); // remove nulls

    // Add to user data
    addData(userId, agendaItems);

    // Reset form
    textInput.value = "";
    datePicker.value = new Date().toISOString().split("T")[0];

    // Show updated agenda
    showUserAgenda(userId);
  });
};
