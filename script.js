$(function() { 
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // Button click events
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton); // New button event listener
});

// Initialize pet_info object
var pet_info = {
  name: "Jiji", 
  weight: 50, 
  happiness: 50
};

// Image Paths
var imgDefault = "images/default.png";
var imgHappy = "images/happy.png";
var imgSad = "images/sad.png";
var imgSleep = "images/sleep.png"

function clickedTreatButton() {
  pet_info.happiness += 5; // Increase happiness
  pet_info.weight += 2;    // Increase weight
  triggerPetReaction(imgHappy, "Yum! That was delicious!");
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  pet_info.happiness += 10; // Increase happiness
  pet_info.weight -= 5;     // Decrease weight
  triggerPetReaction(imgHappy, "So much fun! Let's play again!");
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  pet_info.happiness -= 10; // Decrease happiness
  pet_info.weight -= 10;    // Decrease weight
  triggerPetReaction(imgSad, "Phew... I'm exhausted.");
  checkAndUpdatePetInfoInHtml();
}

function clickedNapButton() {
  // New behavior for the Nap button
  pet_info.happiness += 5; 
  pet_info.weight -= 2;    
  // Swap out imgDefault for imgSleep right here:
  triggerPetReaction(imgSleep, "Zzz... That was a nice rest.");
  checkAndUpdatePetInfoInHtml();
}

// Global variable to store the timer
var resetImageTimer;

// Function to handle the visual notifications and image swapping
function triggerPetReaction(imagePath, message) {
  // Clear any existing timer so they don't overlap on rapid clicks
  clearTimeout(resetImageTimer);

  // 1. UNIQUE JQUERY METHOD: .replaceWith()
  $('.pet-image').replaceWith('<img class="pet-image" src="' + imagePath + '" alt="My Giga Pet">');

  // Clear any existing messages so they don't stack infinitely
  $('.pet-message').remove();

  // 2. UNIQUE JQUERY METHOD: .after()
  // By using an invisible anchor, we can use .after() to insert the message visually before the image
  $('#message-anchor').after('<p class="pet-message"><strong>' + pet_info.name + ' says:</strong> ' + message + '</p>');

  // Set a timer to revert to the default image after 3 seconds (3000 milliseconds)
  resetImageTimer = setTimeout(function() {
    $('.pet-image').replaceWith('<img class="pet-image" src="' + imgDefault + '" alt="My Giga Pet">');
    $('.pet-message').remove(); // Also remove the text bubble
  }, 3000);
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();  
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Conditional to prevent key values from going below zero
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
}