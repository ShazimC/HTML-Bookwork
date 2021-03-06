/* 
    todo: Regular Expressions
    * Summary: 
    Regular expressions are objects that represent patterns in strings.
    Method 'test' tests whether a given string matches the pattern
    Method 'exec' returns an array containing all matched groups
    when a match is found. The index property of this array indicates
    where the match started.
    ? What is a group, what is a matched group?

    Strings have a 'match' method to match them against a regexp
    and a 'search' method to search for one, returning only the
    starting position of the match. 'replace' method will replace
    matches of the pattern with string/function.

    Regexps can have options which are written after the closing slash.
    The 'i' option makes the match case insensitive. The 'g' option makes 
    the expression global, which, among other things, causes the replace
    method to replace all instances instead of just the first. The y option
    makes it sticky, which means that it will not search ahead and skip part
    of the string when looking for a match. The u option turns on Unicode mode,
    which fixes a number of problems around the handling of characters that
    take up two code units.

    * Regular expressions are a sharp tool with an awkward handle.
        - They simplify some tasks tremendously but can quickly become
        unmanageable when applied to complex problems.
        - Part of knowing how to use them is resisting the urge to try to
        shoehorn things that they cannot cleanly express into them.
*/

let re1 = new RegExp("abc");
let re2 = /abc/;

console.log(re2.test("123abc456"));
console.log(re1.test("cba"));

// testing whether a string contains any numbers
console.log(/[0123456789]/.test("in 1992")); // --> true
console.log(/[0-9]/.test("in 1992")); // --> true
console.log(/\d/.test("I have a day left")); // --> false
console.log(/\d/.test("I have 1 day left")); // --> true
// * refer to page 147 for list of shortcuts
// testing if string contains characters a,b,c,d,e or f.
console.log(/[a-f]/.test("xyz")); // --> false
console.log(/[a-f]/.test("xyaz")); // --> true

// * '^' is used to invert a set of characters
let zeroOrOne = /[01]/; // finding 0 or 1 in a string
console.log(zeroOrOne.test("maybe?")); // -> false;
console.log(zeroOrOne.test("defin1tely")); // -> true;
let notBinary = /[^01]/; // finding anything except 0 and 1.
console.log(notBinary.test("01")); // -> false, no non-binary chars found
console.log(notBinary.test("o1")); // -> true, o is non-binary

/* 
    * Repeating parts of a pattern
    - + --> element may be present 1 or more times
    - * --> element may be present 0 or more times
    - ? --> element may be present 0 or 1 times
*/

// the ? element is useful for allowing multiple spellings.
let colorSpelling = /colou?r/;
console.log(colorSpelling.test("color")); // --> true
console.log(colorSpelling.test("colour")); // -- true
console.log(colorSpelling.test("colouur")); // -- false

// to indicate that a pattern should occur a precise number of times use {}
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
// {z} --> element must occur exactly z times
// {x,y} --> element must occur at least x times and at most y
// {x,} --> element must occur at least x times
console.log(dateTime.test("1-30-2003 8:45")); // --> true
let atMost4Digits = /\d{4}-\d{4}/;
console.log(atMost4Digits.test("123-123")); // --> true
console.log(atMost4Digits.test("123123-123123")); // --> true

/* 
    * Grouping Subexpressions
    - to use an operator like * or + on more than one element at a time,
    you have to use ().
*/

let cartoonCrying = /boo+(hoo+)+/i;
// i at the end is an option specifying case insensitivity.
console.log(cartoonCrying.test("Boohoooohoohooo")); // -> true

/* 
    * Matches and Groups
    - test method is the simplest way to test for a regexp
    - exec method will return with an info object if a match is found
    or else return null.
*/

let match = /\d+/.exec("one two 100");
console.log(match.index, `, input: '${match.input}', match object: `, match);

/* 
    when the regexp contains subexps gruoped with parentheses,
    the text that matched those groups will also show up in the array.
*/

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));

console.log(/bad(ly)?/.exec("bad"));
console.log(/(\d)+/.exec("123"));

/* 
    * The Date Class
    - class for date objects
    - month follows index notation apparantly, where jan = 0.
*/

console.log(new Date());
console.log(new Date(2009, 12 - 1, 9));

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));

/*
 * Word and String Boundaries
 */

console.log(/cat/.test("concatenate"));
// --> true
console.log(/\bcat\b/.test("concatenate"));
// --> false
console.log(/\bcat\b/.test("con cat enate"));
// --> true

/* 
    * Choice Patterns
    - we want to know whether a string contains not only a number
    - but a number followed by one of the words pig, cow, or chicken
*/

/* 
    * Regexp Golf
    - is the practice of writing the smallest possible reuglar expression 
        for a given pattern and ONLY that pattern.
    - write one out testing whether ONLY the given substrings occur in any
        input string: see list on pg 164.
*/
console.log("\n1. --------");
const one = /ca(r|t)/;
console.log(one.test("hahacabhaha"));
console.log(one.test("hahacarhaha"));
console.log(one.test("hahacathaha"));

console.log("\n2. --------");
const two = /pr?op/;
console.log(two.test("hahaplophaha"));
console.log(two.test("hahapophaha"));
console.log(two.test("hahaprophaha"));

console.log("\n3. --------");
const three = /ferr(et|y|ari)/;
console.log(three.test("hahaferrohaha"));
console.log(three.test("hahaferrethaha"));
console.log(three.test("hahaferryhaha"));
console.log(three.test("hahaferrarihaha"));

console.log("\n4. --------");
const four = /\wious$/;
console.log(four.test("should fail"));
console.log(four.test("delicious"));
console.log(four.test("very prec ious"));

console.log("\n5. --------");
const five = /\s[.,:;]/;
console.log(five.test(" f"));
console.log(five.test(" ."));
console.log(five.test("\t;"));
console.log(five.test("\n:"));

console.log("\n6. --------");
const six = /\w{7,}/;
console.log(six.test("six"));
console.log(six.test("weather"));
console.log(six.test("very very sorry"));

console.log("\n7. --------");
const seven = /\b[^\We]+\b/i;
verify(
  seven,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]
);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}
/* 
    * Quoting Style
    - you want to replace all the single quotes used for distinguishing
        dialogue like: he said, '...' with double quotes.
    - this should not include apostrophes from words like aren't, didn't etc.
    - accomplish this using regular expresssions and the replace method.
*/

/* 
    * Numbers Again
    - Write a regexp that recognizes JS style numbers including:
        - optional minus/plus sign in beginning
        - the decimal dot, but the dot alone is invalid
        - exponent notation: 5e-3 or 1e10
*/

// * Fireship 100 sec tutorial
const exactWordMatch = /bob/;
const global_regex = /bob/g; // will look for multiple matches in the text
const wordORword = /Bob|Alice/; // will look for Bob or Alice in the text
const grouping = /(Bob|Alice)Jones/; // will look for BobJones or AliceJones
const zeroOr1 = /colou?r/; // will accept color or colour but not colouur
const zeroOrMany = /booo*/; // will accept boo with 2 or more o's.
const oneOrMany = /haha!+/; // will accept haha! with 1 or more !'s.
const explicitCounts = /colou?r{2,6}/; // will accept colou?r with 2 to 6 r's.
