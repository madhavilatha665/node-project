var User = require("../model/users");
var EmailNotifier= require("../utilities/emailnotifier")

// exports.getAllUsernames= function(request,response){
//      var array=["ravikumar","rajesh","kiran"];
//       response.send(array);
// }
exports.registerUser = function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var emailId = req.body.emailId;
    var password = req.body.password;
    var mobilenumber = req.body.mobilenumber;
    var newUser = new User({
        username:username,
        emailId: emailId,
        password: password,
        mobilenumber: mobilenumber
    });
    console.log(newUser)
    User.findOne({ emailId: emailId }, function (err, event) {
        if (err) {
            res.send({status : false, message:"Error occured while finding if email exists", err});
            console.error(err);
        }
        else {
            if (event == null) {
                newUser.save(function (err1, result) {
                    if (err1) {
                        res.send({ status: false, message: "Registration failed", err1 });
                        console.error(err1);
                    } else {
                        res.send({ status: true, message: "Registration successful", result });
                        console.log(result);
                    }
                });
            } else {
                res.send({ status: false, message: "Email already exists:", event });
                console.log("email already exists:" + event);
            }
        }
    });
}
exports.loginUser = function (req, res){
    var emailId = req.body.emailId;
    var password = req.body.password;
    User.findOne({emailId : emailId}, function (err, obj) {
       if(err){
           res.send({status: false, message: "error occured while procesing login request"});
           console.log(err);
       } else {
           if(obj == null){
               res.send({status : false, message : "User not registered"});
           } else {
               if(obj.password == password){
                   res.send({status : true, message : "login successful", obj});
                   console.log(obj);
               } else {
                   res.send({status : false, message : "Incorrect password"});
                   console.log(obj);
               }
           }
       }
    });
}


exports.forgotPassword=function(req,res)  {

    var emailId= req.body.emailId;
    console.log(emailId);
    var subject="Your Password";
    // Password

    User.findOne({emailId : emailId}, function (err, obj) {
        if(err){
            res.send({status: false, message: "error occured while procesing forgot password request"});
            console.log(err);
        } else {
            if(obj == null){
                res.send({status : false, message : "User not registered"});
            } else {
                 var password=obj.password;
                 // use email notification manager
                 var result=EmailNotifier.sendEmail(emailId,subject,password);
                 if(result)
                 {
                     res.send({status:true, message: "Password sent to email!!"});
                 }
            }
        }
     });
    // Email Logic
}




