import emailjs from '@emailjs/browser'

export const sendOtp = (user, otpVal) => {
  emailjs.init('aRGzeGr-TDyVeXc5d')


  const templateParams = {
   to_name: user.firstName,
    to_email: user.email,
    from_name:'ChatterApp',
    message: otpVal
  }; 
  emailjs
    .send(
      'service_vv18r4c',
      'template_lrzqm5r',
      templateParams
    )
    .then(
      (res) => {
        console.log(res.status, res.text, otpVal)
      },
      (error) => {
        console.log(error)
      }
    )
}
