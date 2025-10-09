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
    new Date("2026-07-08").toLocaleDateString(),
    new Date("2026-08-01").toLocaleDateString(),
    new Date("2026-10-01").toLocaleDateString(),
    new Date("2027-01-01").toLocaleDateString(),
    new Date("2027-07-01").toLocaleDateString(),
  ];
  const revisionDates = calculateRevisionDate(selectedDate);
  assert.equal(revisionDates,expectedDates);
});