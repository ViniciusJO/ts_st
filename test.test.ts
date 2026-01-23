import { assert_equals, assert, run_tests, test, type TestGroup } from "./Test.ts";

test(`test assertion true`, () => {
  assert(true, `true`);
});

test(`test assertion false`, () => {
  assert(false, `false`);
});

test(`test assert equals`, () => {
  assert_equals(1, 1, `1 == 1`);
});

test(`test assert not equals`, () => {
  assert_equals(1, 2, `1 != 2`);
});

const test_group: TestGroup = [];

test(`test assert not equals default msg`, () => {
  assert_equals(3, 4);
}, test_group);

test(`test group`, test_group);

const other_test_group: TestGroup = [
  { name: `assert this`, test_fn: () => assert(true) },
  { name: `assert that`, test_fn: () => assert(false) },
  { name: `inner test group`, group: [
    { name: `equality test`, test_fn: () => assert_equals(false, true) },
    { name: `another assertion`, test_fn: () => assert(true) },
    { name: `another nested test group`, group: [
      { name: `deep test`, test_fn: () => assert_equals(false, true) },
      { name: `direct throw`, test_fn: () => { throw `MANUALLY THROWING`; } },
      { name: `last test`, test_fn: () => assert(true) },
    ]},
  ]},
];

test(`other test group`, other_test_group);

run_tests();

