// This will serve as an index to availableText object category/type of characters
var categorySelected = [0];

var availableText = [
"abcdefghijklmnopqrstuvwxyz",           // lowercase
"ABCDEFGHIJKLMNOPQRSTUVWXYZ",           // uppercase
"0123456789",                           // numbers
" !”#$%&’()*+,-./:;<=>?@[\\]^_`{|}~"    // special characters
];

// Get the length and optional password requirements
function passwordRequirements() {
  categorySelected = [0];
  var passwordLength = prompt("Please enter the password length [8-128]: ");
  passwordLength = parseInt(passwordLength, 10);

  // check for valid number and required length
  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    alert("Please enter a valid number between 8 to 128");
    return passwordRequirements();
  }

  if (confirm("Do you want to add CAPITAL letters?")) {
    categorySelected.push(1);
  }

  if (confirm("Do you want to add NUMBERS?")) {
    categorySelected.push(2);
  }

  if (confirm("Do you want to add SPECIAL Characters?")) {
    categorySelected.push(3);
  }

  return passwordLength;
}

// Generate random password based on selected requirements
function generatePassword() {
  var passwordLength = passwordRequirements();
  var selectedIndex = 0;
  var passwordText = "";
  var charIndex = 0;

  // None of the optional additional categories were selected
  // Default: all lowercase
  if (categorySelected.length === 1) {
    for (var i = 0; i < passwordLength; i++) {
      charIndex = Math.floor(Math.random() * availableText[0].length);
      passwordText += availableText[0][charIndex];
    }
    return passwordText;
  }

  // Make a copy of the categorySelected array
  var tempCategorySelected = [...categorySelected];
 
  // Make sure we have at least one character in each category selected
  for (var i = 0; i < categorySelected.length; i++) {
    // Select the category randomly
    selectedIndex = Math.floor(Math.random() * tempCategorySelected.length);
    charIndex = Math.floor(Math.random() * availableText[tempCategorySelected[selectedIndex]].length);
    passwordText += availableText[tempCategorySelected[selectedIndex]][charIndex];
    
    // Remove the category that has been used from temporary array
    tempCategorySelected.splice(selectedIndex, 1);
  }
  
  // Get the rest of the characters from random category selected
  for (var i = categorySelected.length; i < passwordLength; i++ ) {
    selectedIndex = Math.floor(Math.random() * categorySelected.length);
    charIndex = Math.floor(Math.random() * availableText[categorySelected[selectedIndex]].length);
    passwordText += availableText[categorySelected[selectedIndex]][charIndex];
  }

  return passwordText;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  // Make sure we captured the space in case it is the first or last character of the password
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
