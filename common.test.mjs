import { getUserIds } from "./common.mjs";
import { calculateRevisionDate } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("calculateRevisionDate returns correct future dates", () => {
  const selectedDate = new Date("2026-07-01");
  const expectedDates = [
    new Date("2026-07-08").toISOString().split("T")[0],
    new Date("2026-08-01").toISOString().split("T")[0],
    new Date("2026-10-01").toISOString().split("T")[0],
    new Date("2027-01-01").toISOString().split("T")[0],
    new Date("2027-07-01").toISOString().split("T")[0],
  ];
  const revisionDates = calculateRevisionDate(selectedDate);
  assert.deepStrictEqual(revisionDates,expectedDates);
});
//end of month
test("calculateRevisionDate returns correct future dates", () => {
  const selectedDate = new Date("2026-01-31");
  const expectedDates = [
    new Date("2/7/2026").toISOString().split("T")[0],
    new Date("3/3/2026").toISOString().split("T")[0],
    new Date("5/1/2026").toISOString().split("T")[0],
    new Date("7/31/2026").toISOString().split("T")[0],
    new Date("1/31/2027").toISOString().split("T")[0],
  ];
  const revisionDates = calculateRevisionDate(selectedDate);
  assert.deepStrictEqual(revisionDates, expectedDates);
});
//end of year
test("calculateRevisionDate returns correct future dates", () => {
  const selectedDate = new Date("2026-12-15");
  const expectedDates = [
    new Date("12/22/2026").toISOString().split("T")[0],
    new Date("1/15/2027").toISOString().split("T")[0],
    new Date("3/15/2027").toISOString().split("T")[0],
    new Date("6/15/2027").toISOString().split("T")[0],
    new Date("12/15/2027").toISOString().split("T")[0],
  ];
  const revisionDates = calculateRevisionDate(selectedDate);
  assert.deepStrictEqual(revisionDates, expectedDates);
});
//Leap year
test("calculateRevisionDate returns correct future dates", () => {
  const selectedDate = new Date("2024-02-28");
  const expectedDates = [
    new Date("3/6/2024").toISOString().split("T")[0],
    new Date("3/28/2024").toISOString().split("T")[0],
    new Date("5/28/2024").toISOString().split("T")[0],
    new Date("8/28/2024").toISOString().split("T")[0],
    new Date("2/28/2025").toISOString().split("T")[0],
  ];
  const revisionDates = calculateRevisionDate(selectedDate);
  assert.deepStrictEqual(revisionDates, expectedDates);
});