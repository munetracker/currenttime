// https://www.youtube.com/watch?v=xCjrbXsuAG8
// 25, 5, 25, 5, 25, 5, 25, 15

// Required variables
var session_seconds = "00";
var session_minutes = 1;
var session_sets = [25, 5, 25, 5, 25, 5, 25, 30];
// var session_sets = [2, 1, 2, 1, 2, 1, 2, 3];
var session_current_set = 0;
var s1 = 1;
var s2 = 1;

session_minutes = session_sets[session_current_set];

// Audio files
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

// Starting template for the timer
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function start_timer() {
  click_sound.play();

  // Change the minutes and seconds to starting time
  session_minutes--;
  session_seconds = 59;

  // Add the seconds and minutes to the page
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;

  // Start the countdown
  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  // Functions
  // Function for minute counter
  function minutesTimer() {
    session_minutes = session_minutes - 1;
    document.getElementById("minutes").innerHTML = session_minutes;
  }

  // Function for second counter
  function secondsTimer() {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    // Check if the seconds and minutes counter has reached 0
    // If reached 0 then end the session
    if (session_seconds <= 0) {
      if (session_minutes <= 0) {
        // Clears the interval i.e. stops the counter
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        let my_message ="";
        let my_color ="";
        if(session_current_set < 7){
          if( session_current_set % 2 == 0 ){
            my_message = s1+" Break: Take a Break, Relax and CHILL";
            s1++;
            document.getElementById("done").style.color = "#272343";            
            document.getElementById("done").style.background = "white";
          }else{
            s2++;
            my_message = "Phase "+s2+": Focus Time";
            document.getElementById("done").style.color = "white";            
            document.getElementById("done").style.background = "green";
          }
        }else{
          my_message = "Take a Long BREAK";
          document.getElementById("done").style.color = "white";
          document.getElementById("done").style.background = "blue";
        }

        // PLay the bell sound to tell the end of session
        bell.play();
        session_current_set++;
        if(session_current_set < 8){
          // Add the message to the html
          document.getElementById("done").innerHTML = my_message;
          // Make the html message div visible
          document.getElementById("done").classList.add("show_message");

          session_minutes = session_sets[session_current_set];
          start_timer();
        }else{
          // Add the message to the html
          document.getElementById("done").innerHTML = "END SESSION, Start Again";
          document.getElementById("done").style.background = "gray";
        }
      }

      // Reset the session seconds to 60
      session_seconds = 60;
    }
  }
}
