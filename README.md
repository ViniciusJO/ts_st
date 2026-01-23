# ts\_st

Simple [typescript](https://www.typescriptlang.org/) test suit with no dependencies designed to run in any of the major runtimes: [node](https://nodejs.org), [deno](https://deno.com/) and [bun](https://bun.com/).

## API

The test cases must be described by funcitons of type

```typescript
type TestFn = () => void | Promise<void>
```

There are 2 functions essential to this process:

``` typescript
// Register `test` function or group in the test system associated with the `name`
function test(name: string, test_fn: TestFn | TestGroup): void;

// Runs registered tests
function run_test(): Promise<void>;
```

The success of the test is represented by the normal ending of the funciton, while the failure is stated by throwing an exception, either manually or by the assertion functions provided:

```typescript
// Asserts the condition helping controll flow analysis and type narrowing
// If `cond` is falsy throws error with `msg`
function assert(condition: unknown, msg?: string): asserts cond;

// Asserts `a` equals `b`
// Do not act on controll flow analysis
// In case `a != b` throws an error with `msg`
function assert_equals(a: unknown, b: unknown, msg?: string): void;
```


## Example

```typescript
import { assert_equals, assert, run_tests, test, type TestGroup } from "./Test.ts";

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

const test_array: TestGroup = [
  { name: "assert this", test_fn: () => assert(true) },
  { name: "assert that", test_fn: () => assert(false) },
  { name: "inner test group", group: [
    { name: "equality test", test_fn: () => assert_equals(false, true) },
    { name: "another assertion", test_fn: () => assert(true) },
    { name: "another nested test group", group: [
      { name: "deep test", test_fn: () => assert_equals(false, true) },
      { name: "last test", test_fn: () => assert(true) },
    ]},
  ]},
];

test("group 1", test_array);

run_tests();
```

outputs on [`deno`](https://deno.com/):

```sh

[ Test Runner ]

- ✓ test assertion true
- ✗ test assertion false
  - Assertion failed: false
- ✓ test assert equals
- ✗ test assert not equals
  - Assertion failed: 1 != 2
- ✗ test assert not equals default msg
  - Assertion failed:
  > expected: 4
  < received: 3
- v - group 1
  |- ✓ assert this
  |- ✗ assert that
  |  - Assertion failed
  |- v - inner test group
  |  |- ✗ equality test
  |  |  - Assertion failed:
  |  |  > expected: true
  |  |  < received: false
  |  |- ✓ another assertion
  |  |- v - another nested test group
  |  |  |- ✗ deep test
  |  |  |  - Assertion failed:
  |  |  |  > expected: true
  |  |  |  < received: false
  |  |  |- ✓ last test
  |  |- ^ - another nested test group
  |- ^ - inner test group
- ^ - group 1

6/11 test(s) failed

- test assertion false failed
- test assert not equals failed
- test assert not equals default msg failed
- group 1 -> assert that failed
- group 1 -> inner test group -> equality test failed
- group 1 -> inner test group -> another nested test group -> deep test failed

error: Uncaught (in promise) "TestFailed"

```

# TODO

- [x] implement test groups
- [ ] better document test groups
