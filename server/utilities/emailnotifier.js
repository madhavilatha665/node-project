var nodemailer = require('nodemailer');


exports.sendEmail=function(to, subject,text){

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

var mailOptions = {
  from: 'testdluser101@gmail.com',
  to: to,
  subject: subject,
  text: text,
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
     if(info.response.includes('OK'))
     {
        return true;
     }
     else
     {
         return false;
     }
  }
});
}

