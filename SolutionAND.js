/**
 * The following is the function where the solution shall be written
 */

function solution(input) {
  // remove all other charcters with regex
  let int = input.replace(/\D/g, "");

  // handle edge cases
  if (int.length === 0) return "error: no integers in the input";
  if (int.length === 1) return int;
  if (int.length === 2 && int[0] === int[1]) return int;
  if (int.length === 2 && int[0] !== int[1]) return [int, int[1] + int[0]];

  // arrOfInt is an array to hold each character in the integer
  // results will hold an array of arrays, first iteration will be the first integer only
  let arrOfInt = int.split("");
  let results = [[arrOfInt.shift()]];

  while (arrOfInt.length) {
    // take the next integer from arrOfInt
    const currentInt = arrOfInt.shift();
    let tempResults = [];

    // iterate through the results array and each inner array
    results.forEach(result => {
      let resultIdx = 0;
      while (resultIdx <= result.length) {
        // first create a copy of the results array
        const temp = [...result];

        // insert current integer at position result index
        temp.splice(resultIdx, 0, currentInt);
        tempResults.push(temp);
        resultIdx++;
      }
    });

    results = tempResults;
  }

  // join the inner array to have just one array of strings;
  // filter it to have unique elements
  // sort it descending
  let finalArray = results
    .map(integerArray => integerArray.join(""))
    .filter((element, index, self) => self.indexOf(element) === index)
    .sort((a, b) => b - a);

  // turn strings into integers and join them by a comma
  return finalArray.map(el => parseInt(el, 10)).join(",");
}

// example inputs
console.log(solution("326")); // expected ouput: 632,623,362,326,263,236
console.log(solution("A 3B2 C6D")); // expected ouput: error: no integers in the input
console.log(solution("ABC")); // expected ouput: error: no integers in the input
console.log(solution("3333")); // expected ouput: 3333
