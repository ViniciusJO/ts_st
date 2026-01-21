import { assert_equals, assert, run_tests, test } from "./Test.ts";

test("test assertion true", () => {
  assert(true, "true");
});

test("test assertion false", () => {
  assert(false, "false");
});

test("test assert equals", () => {
  assert_equals(1, 1, "1 == 1");
});

test("test assert not equals", () => {
  assert_equals(1, 2, "1 != 2");
});

test("test assert not equals default msg", () => {
  assert_equals(3, 4);
});

run_tests();
