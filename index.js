/*
 * Initialize Firebase
 */ 

var config = {
    apiKey: "AIzaSyCxN9WkUXTzmYmobSEa8KHHp2vhB91tESY",
    authDomain: "yasser-c336f.firebaseapp.com",
    databaseURL: "https://yasser-c336f.firebaseio.com",
  storageBucket: "yasser-c336f.appspot.com",
};
firebase.initializeApp(config);

/*
 * Interact with firebase data
 */

// sync list with firebase
firebase.database().ref('users/').on('value', function(snapshot) {
  writeList(snapshot.val());
});

function writeList(studentsObj) {
  var str = '<ul>';
  for (var key in studentsObj) {
    if (studentsObj.hasOwnProperty(key)) {
        str += "<li>" + studentsObj[key].firstName + " " + studentsObj[key].lastName + " (" + studentsObj[key].school + ")</li>";
    }
  }
  str += '</ul>';
  
  $('#student-list').html(str);
}

function addStudent(studentObj) {
  var newPostKey = firebase.database().ref().child('users').push().key;
  var updates = {};
  updates['/users/' + newPostKey] = studentObj;
  return firebase.database().ref().update(updates);
}

/*
 * Add click handlers to DOM elements
 */

$('#new-student-form').submit(function(e){
  e.preventDefault();
  var studentObj = {};
  studentObj.Username = $('#firstName').val();
  studentObj.Password = $('#lastName').val();
  studentObj.school = $('#school').val();
  addStudent(studentObj);
  $('#firstName, #lastName, #school').val('');
  $('#message').html('Student Added!');
});
