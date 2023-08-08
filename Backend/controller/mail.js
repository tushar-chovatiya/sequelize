var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'botraj8253019502@gmail.com',
        pass: 'sfhbqtregmvkvgvc'
    }
});

exports.mailoption = (values, action) => {
    // console.log(values, "values")
    var mailOptions =
    {
        from: 'shivam.patel@fotoouro.com',
        to: 'shivam.patel@fotoouro.com',
        subject: 'User Was ' + action,
        html:
            "<table border='0' style='text-align: left; padding:2rem'><thead>" +
            "<tr><th>Name</th><td style='padding-left:2rem'>" + values.dataValues.name + "</td></tr>" +
            "<tr><th>Email</th><td style='padding-left:2rem'>" + values.dataValues.email + "</td></tr>" +
            "<tr><th>Role</th><td style='padding-left:2rem'>" + values.dataValues.tbl_role.role_name + "</td></tr>" +
            "<tr><th>Company</th><td style='padding-left:2rem'>" + values.dataValues.tbl_company.company_name + "</td></tr>" +
            "<tr><th>Designation</th><td style='padding-left:2rem'>" + values.dataValues.tbl_designation.designation_name + "</td></tr>" +
            "</table >"
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

}



