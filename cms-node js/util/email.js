const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, templateId, dynamicTemplateData }) => {
  const msg = {
    to,
    from: {
      name: "Deixa",
      email: "carlos@deixa.io",
    },
    templateId,
    dynamicTemplateData,
  };
  return await sgMail.send(msg);
};

exports.sendEmailVerification = async ({ to, verifyLink, name }) => {
  return await sendEmail({
    to,
    templateId: "d-c8959b8488744a06af70a65c3f606f52",
    dynamicTemplateData: {
      name,
      verifyLink,
    },
  });
};
