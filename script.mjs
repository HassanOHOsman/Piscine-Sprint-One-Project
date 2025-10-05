// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";

window.onload = function () {
  const users = getUserIds();
  //document.querySelector("body").innerText = `There are ${users.length} users`;

  //create user drop-down list
  const selectUserElm = document.createElement("select");
  selectUserElm.id = "userSelect";
  document.body.appendChild(selectUserElm);

  //create user-select placeholder
  const userSelectPlaceHolder = document.createElement("option");
  userSelectPlaceHolder.value = "";
  userSelectPlaceHolder.textContent = "Select a User :";
  userSelectPlaceHolder.disabled = true;
  userSelectPlaceHolder.selected = true;
  selectUserElm.appendChild(userSelectPlaceHolder);

  //create user-select options

  users.forEach((number, index) => {
    const selectOption = document.createElement("option");
    selectOption.value = index + 1;
    selectOption.innerText = `User ${index + 1}`;
    selectUserElm.appendChild(selectOption);
  });
};
