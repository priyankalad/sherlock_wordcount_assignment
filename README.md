# Project: Word Count assignment

# Steps:

1. Download the code on local system
2. Open the IDE (or terminal) and go to the folder path "src"
3. run "npm install"
4. run "node index 10" or "node index". (Here 10 is number of top words. You can change it to any number and the program will display those many top words. Default is 10)

# Assumptions:

1. This code with consider only alphabets with case insensitivity.
2. Number will not be considered as a word
3. alphabets with special characters like "...", "--" etc will not be considered.

# Technical:

1. Third party library "axios" is used to get the document and dictionary definations
2. "async await" syntax is used to handle asynchronous flow
3. Javascript Map is used to store all words(key) and their respective counts(value). This map is then sorted by values
4. IIFE(Immediately Invoked Function Expression) is used.
5. Many ES6 sytaxes are used like let, const, arrow functions, for...of, spread operator etc
6. The result will be displayed on a console as an array of json objects
