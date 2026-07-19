import emailjs from "@emailjs/browser";

export const sendEmails = async (formData) => {
  const params = {
    user_name: formData.full_name,
    user_email: formData.email,
    course: formData.course,
  };

  try {
    await emailjs.send(
      "service_zh6iurt",
      "template_zqrpau9",
      params,
      "whx0UgQQo2wS5Dkqi"
    );

    await emailjs.send(
      "service_zh6iurt",
      "template_awfytic",
      params,
      "whx0UgQQo2wS5Dkqi"
    );

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
};