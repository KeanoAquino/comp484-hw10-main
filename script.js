$(function() { 
  console.info("Giga Pet application initialized."); // Log Info
  console.table(pet_info); // Log Table
  
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
  console.group("Treat Button Clicked"); // Log Group (Start)
  
  pet_info.happiness += 5;
  pet_info.weight += 2;    
  
  // Log Custom (CSS styling)
  console.log("%c Jiji was fed a treat! Stats increased.", "color: #ff9900; font-weight: bold; font-size: 14px; background: #222; padding: 3px;");
  
  triggerPetReaction(imgHappy, "Yum! That was delicious!");
  checkAndUpdatePetInfoInHtml();
  
  console.groupEnd(); // Log Group (End)
}

function clickedPlayButton() {
  pet_info.happiness += 10; 
  
  pet_info.weight -= 5;     
  triggerPetReaction(imgHappy, "So much fun! Let's play again!");
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  pet_info.happiness -= 10; 
  pet_info.weight -= 10;    
  
  // Cause TypeError intentionally
  let uninitializedVariable;
  uninitializedVariable.doSomething(); 

  triggerPetReaction(imgSad, "Phew... I'm exhausted.");
  checkAndUpdatePetInfoInHtml();
}

function clickedNapButton() {
  // Cause Violation: Blocking the main thread intentionally for 3 seconds
  const start = Date.now();
  while (Date.now() - start < 3000) { /* busy wait loop */ }

  pet_info.happiness += 5; 
  pet_info.weight -= 2;    
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
  if (pet_info.weight <= 10) {
    console.warn("Warning: Jiji's weight is dangerously low!"); // Log Warning
  }
  
  if (pet_info.weight < 0) {
    console.error("Error: Weight cannot be less than zero. Resetting to 0."); // Log Error
    pet_info.weight = 0;
  }
  
  if (pet_info.happiness < 0) {
    console.error("Error: Happiness cannot be less than zero. Resetting to 0."); // Log Error
    pet_info.happiness = 0;
  }
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
}