import emailjs from "@emailjs/browser";

export const sendEmails = async (formData) => {
  try {
    const studentParams = {
      user_name: formData.full_name,
      user_email: formData.email,
      course: formData.course,
    };

    // Email to Student
    await emailjs.send(
      "service_zh6iurt",
      "template_zqrpau9",
      studentParams,
      "whx0UgQQo2wS5Dkqi"
    );

    // Email to Admin
    const adminParams = {
      user_name: formData.full_name,
      user_email: formData.email,
      course: formData.course,
      admin_email: "youradmin@gmail.com", // Replace with your admin email
    };

    await emailjs.send(
      "service_zh6iurt",
      "template_awfytic",
      adminParams,
      "whx0UgQQo2wS5Dkqi"
    );

    return true;
  } catch (error) {
    console.error("EmailJS Error:", error);
    return false;
  }
};