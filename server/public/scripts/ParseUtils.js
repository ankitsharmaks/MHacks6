var Roast = Parse.Object.extend("Roast");
var Comment = Parse.Object.extend("Comment");
var Friend = Parse.Object.extend("Friend");
var Notification= Parse.Object.extend("Notification");

function isLoggedIn(){
  if(Parse.User.current()){
    console.log("Logged in as "+Parse.User.current().get("username"));
    return true;
  } else{
    console.log("Not Logged in");
    return false;
  }
}

function getLoggedInUser(){
	if(isLoggedIn()){
        console.log("Logged in user:"+Parse.User.current().get("username"));
		return Parse.User.current().get("username");
	} else {
		console.log("Not Logged in");
	}
}

function postRoast(victim,content){
	var roast = new Roast();
    var resp = '';
	roast.set("roaster",getLoggedInUser());
	roast.set("victim",victim);
	roast.set("content",content);
	roast.set("file",null);
	roast.save({
	success :function(obj){
	  console.log("roast Saved!");
      resp = 'Your roast has been saved.';
	}, error : function(error){
	  console.log("roast Save Error:"+error.message);
      resp = 'Error in saving roast: ' + error.message;
	}
	});
    return resp;
}

function postComment(){
	var comment = new Comment();
	comment.set("content",getComment());
	comment.set("user",getLoggedInUser());
	comment.set("roast",getRoast());
	comment.save({
	success :function(obj){
	  console.log("Comment Saved!");
	}, error : function(error){
	  console.log("Comment Save Error:"+error.message);
	}
	});
}

function getFriendList(){
	var query = new Parse.Query(Friend);
    query.include("user");
    query.include("friend");
    query.equalTo("user",getUser());
    query.find({
        success: function(results){

        }, error: function(error){

        }
    });
}

function signinOrSignupUser(userId, userFullName){
    var query = new Parse.Query(Parse.User);
    query.equalTo("username",userId);
    query.find({
        success: function(results){
            if(results.length>0){
                loginUser(userId);
            } else{
                signupUser(userId, userFullName);
            }
        }, error: function(error){
            console.log("signinOrSignupUser error:"+error.message);
        }
    });
}

function loginUser(userId){
    console.log("Login for:"+userId);
    var name = userId;
    var password = userId;
    Parse.User.logIn(name,password,{
    success : function(user){
      console.log("Login Success");
    },error : function(user,error){
      console.log("Login error"+error.message);
    }
    });
}

function signUpIfNotExist(userId, userFullName){
    var query = new Parse.Query(Parse.User);
    query.equalTo("username",userId);
    query.find({
        success: function(results){
            if(results.length>0){
            } else{
                signupUser(userId, userFullName);
            }
        }, error: function(error){
            console.log("signUpIfNotExist error:"+error.message);
        }
    });
}

function signupUser(userId, userFullName){
    console.log("SignUp for:"+userId+"  "+userFullName);
    var name = userId;
    var password = userId;
    var user = new Parse.User();
    user.set("username",name);
    user.set("password",password);
    user.set("userFullName",userFullName);
    
    user.signUp(null,{
    success : function(user){
      console.log("Signup Success");
    },error : function(user,error){
      console.log("Signup error");
    }
    })
}

function getComment(){
	//Return comment String
}

function getRoast(){
	//Return Roast Object
}

function getRoastContent(){
	//Return Roast String
}

function getVictim(){
	//Return User object
}

function getFile(){
	//Return File Object
}

function temp(){
    console.log("temp logs");
}