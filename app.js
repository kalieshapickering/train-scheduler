  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyCDHIlkJKT4_ihoTTakhBdXeUkQXNLE3i0",
      authDomain: "train-scheduler-c335b.firebaseapp.com",
      databaseURL: "https://train-scheduler-c335b.firebaseio.com",
      projectId: "train-scheduler-c335b",
      storageBucket: "train-scheduler-c335b.appspot.com",
      messagingSenderId: "104714130747"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#add-train').on("click", function (event) {
      event.preventDefault();

      var addTrain = $('#trainName').val().trim();
      var destination = $('#destination').val().trim();
      var firstTime = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();

      var newTrain = {
          name: addTrain,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency
      };

      database.ref().push(newTrain);
      console.log(newTrain.name);

      alert("Train was successfully added!");

      $('#trainName').val("");
      $('#destination').val("");
      $("#firstTrain").val("");
      $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());
      
      var addTrain = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var firstTime = childSnapshot.val().firstTime;
      var frequency = childSnapshot.val().frequency;

      var timeArray= firstTime.split(":")
      var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
      console.log(trainTime);

      var nextTrain = moment().diff(trainTime, "minutes");
      var minutesAway = nextTrain - frequency;
    var timeToNextTrain = frequency - minutesAway;
    var nextArrival = moment().add(timeToNextTrain, "minutes").format("hh:mm");

      var newRow = $("<tr>").append(
          $("<td>").text(addTrain),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(nextArrival),
          $("<td>").text(timeToNextTrain)
          
      );
      $("#insert-schedule > tbody").append(newRow);
  });