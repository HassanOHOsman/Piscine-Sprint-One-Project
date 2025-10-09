export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

export function calculateRevisionDate(selectedDate) {
  const revisionDateArray = [];
  //one week later
  const oneWeek = new Date(selectedDate);
  oneWeek.setDate(selectedDate.getDate() + 7);
  revisionDateArray.push(oneWeek.toISOString().split("T")[0]);
  //revisionDateArray.push(oneWeek.toLocaleDateString());
  //One Month Later
  const oneMonth = new Date(selectedDate);
  oneMonth.setMonth(selectedDate.getMonth() + 1);
  revisionDateArray.push(oneMonth.toISOString().split("T")[0]);
  //revisionDateArray.push(oneMonth.toLocaleDateString());
  //Three Month Later
  const threeMonth = new Date(selectedDate);
  threeMonth.setMonth(selectedDate.getMonth() + 3);
  revisionDateArray.push(threeMonth.toISOString().split("T")[0]);
  //revisionDateArray.push(threeMonth.toLocaleDateString());
  //Six Month Later
  const sixMonth = new Date(selectedDate);
  sixMonth.setMonth(selectedDate.getMonth() + 6);
  revisionDateArray.push(sixMonth.toISOString().split("T")[0]);
  //revisionDateArray.push(sixMonth.toLocaleDateString());
  //One Year
  const oneYear = new Date(selectedDate);
  oneYear.setFullYear(selectedDate.getFullYear() + 1);
  revisionDateArray.push(oneYear.toISOString().split("T")[0]);
  //revisionDateArray.push(oneYear.toLocaleDateString());
  return revisionDateArray;
}
