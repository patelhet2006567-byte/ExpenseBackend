import nodemailer from "nodemailer";

export const sendMail = async (email,subject,template) => {
    try{
        const config = nodemailer.createTransport({
            service : "gamil",
            auth : {
                user : process.env.SENDER_EMAIL,
                pass : process.env.SENDER_PASSWORD
            }
        });
        
        const options = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : subject,
            html : template
        }
        await config.sendMail(options);
        return true
    }catch(err){
        return false;
    }
}