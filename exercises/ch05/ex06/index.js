function testTryCatchFinally(shouldThrow) {
  try {
    console.log("Inside try block");
    if (shouldThrow) {
      throw new Error("An error occurred");
    }
    console.log("No exception thrown");
  } catch (e) {
    console.log("Caught an exception:", e.message);
  } finally {
    console.log("Finally block executed");
  }

  console.log("End of function");
}

// 例外が発生しない場合
console.log("Test 1: No exception thrown");
testTryCatchFinally(false);
console.log("\n");

// 例外が発生する場合
console.log("Test 2: Exception thrown");
testTryCatchFinally(true);