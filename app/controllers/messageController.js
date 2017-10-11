const nodemailer = require('nodemailer');

exports.homePage = (req, res) => {
    res.render('home')
};

exports.contactPage = (req, res) => {
    res.render('contact')
};

exports.sendMessage = (req, res) => {
    const transport = nodemailer.createTransport({
        service: 'hotmail',
        host: process.env.MAIL_HOST,
        secureConnection: false, // use SSL,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        tls:{
            ciphers:'SSLv3'
        }
    });

    const output = `
        <!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
        <title>Lindores & Griffin Contact</title>
        
        <style type="text/css">
            body {width: 100%; background-color: #ffffff; margin:0; padding:0; -webkit-font-smoothing: antialiased;font-family: Georgia, Times, serif}
            table {border-collapse: collapse;}
        
            @media only screen and (max-width: 640px)  {
                            .deviceWidth {width:440px!important; padding:0;}
                            .center {text-align: center!important;}
                    }
        
            @media only screen and (max-width: 479px) {
                            .deviceWidth {width:280px!important; padding:0;}
                            .center {text-align: center!important;}
                    }
        
        </style>
        </head>
        
        <body marginwidth="0" marginheight="0" style="font-family: Georgia, Times, serif">
                    <table width="580"  class="deviceWidth" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#eeeeed" style="margin:0 auto;">
                        <tr>
                            <td valign="top" style="padding:0" bgcolor="#ffffff">
                            </td>
                        </tr> 
                        <tr>
                            <td style="font-size: 13px; color: #959595; font-weight: normal; text-align: left; font-family: Georgia, Times, serif; line-height: 24px; vertical-align: top; padding:10px 8px 10px 8px" bgcolor="#eeeeed">
        
                                <table>
                                    <tr>
                                        <td valign="top" style="padding:0 10px 10px 0">
        
                                        </td>
                                        <td valign="middle" style="padding:0 10px 10px 0"><p style="text-decoration: none; color: #272727; font-size: 16px; color: #272727; font-weight: bold; font-family:Arial, sans-serif ">You have a new contact message!</p>
                                        </td>
                                    </tr>
                                </table>
                                    <h3>Contact Details:</h3>
                                    <ul style="list-style: none;">
                                        <li>Name: ${req.body.name}</li>
                                        <li>Email: ${req.body.email}</li>
                                        <li>Number: ${req.body.phone}</li>
                                        <li>Company: ${req.body.company}</li>
                                    </ul>
                                    <h3>Message:</h3>
                                    <p>${req.body.message}</p>
                            </td>
                        </tr>
                    </table><!-- End One Column -->
        </body>
        </html>
    `;

    const mailOptions = {
        to: "taylor@lindoresgriffin.co.uk",
        from: `'Lindores & Griffin 👻' <taylor-lindores@hotmail.co.uk>`,
        subject: 'Contact Request',
        html: output,
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        req.flash('success', 'Thanks for getting in touch! One of us will be in touch with you soon.');
        res.redirect('/')
    });
};