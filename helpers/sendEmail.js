import nodemailer from "nodemailer";

const { META_PASSWORD } = process.env;

const nodemailConfig = {
  host: "smtp.meta.ua",
  post: 465,
  secure: true,
  auth: {
    user: "khmilevskyivlad@meta.ua",
    pass: META_PASSWORD
  }
}

const transport = nodemailer.createTransport(nodemailConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "khmilevskyivlad@meta.ua" };
  transport.sendMail(email);
  return true;
}

export default sendEmail;