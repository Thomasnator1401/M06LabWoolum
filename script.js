// A function to check if a string is a palindrome
function isPalindrome(str) {
  // Convert the string to lowercase and remove any non-alphanumeric characters
  str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Initialize a variable to store the reversed string
  let reversed = "";
  // Loop through the string from the end and append each character to the reversed string
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  // Compare the original and the reversed strings and return true if they are equal, false otherwise
  return str === reversed;
}
// A function to check if a string is a palindrome
function isPalindrome(str) {
  // Convert the string to lowercase and remove any non-alphanumeric characters
}
