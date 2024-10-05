import React from 'react'
import './About.css'
import FirstDoctor from '../Images/doctor john.png'
import SecondDoctor from '../Images/doctor sara.png'
import EquipmentOne from '../Images/Dental-Equipment.png'
import EquipmentTwo from '../Images/dental-kit-transparent-free-png.webp'
import EquipmentOneThree from '../Images/dental-x-ray-machine-1000x1000.png'

export default function About() {
  return (
    <div className='main'>

      <div className='headingAbout'>
        <h1>About Us</h1>
      </div>

      <div className="message">

        <div className="message-one">

          <div className='Doctor-photo'>

          <img src={FirstDoctor} alt="Doctor photo" style={{
                width: "200px",height:'200px'
              }}/>
            
          </div>

          <div className="Doctor-message">
            <h3>Chief Doctor Message</h3>
            <br />
            <p>Dear Patients, prioritizing rest and hydration is crucial for recovery. Adhering to prescribed medication and treatment plans ensures optimal health outcomes. Your commitment to self-care greatly contributes to your well-being. Thank you for entrusting us with your health. Best wishes for a speedy recovery. Chief Doctor.</p>

          </div>

        </div>

        <div className="message-one">

          <div className='Doctor-photo'>
            <img src={SecondDoctor} alt="Doctor photo" style={{
                width: "200px",height:'200px'
              }} />
           
           
          </div>

          <div className="Doctor-message">
            <h3>Assistant Doctor Message</h3>
            <br />
            <p>Dear Patients, I'm here to support your healing journey. Trust in the prescribed treatments and remember to rest well. Your well-being is our priority. Reach out if you have any concerns. Wishing you a smooth recovery. Assistant Doctor.</p>

          </div>

        </div>

      </div>

      <div className="quotes">
        <p>Smile, it's the best accessory you can wear! Let your smile shine bright and spread joy wherever you go. Remember, good dental health is key to a happy and confident life.</p>
      </div>

      <div className="infrastructure">

        <div className="infra">
          <img src={EquipmentOne} alt="photo"/>
          <p>At Dental Clinic, we pride ourselves on providing top-quality dental care in a comfortable and welcoming environment. Our state-of-the-art facility is equipped with the latest technology to ensure the best possible treatment for our patients.</p>
        </div>

        <div className="infra">
          <p>Located in the heart of [City/Area], our clinic is conveniently situated for easy access from all parts of town. Whether you're coming from work or home, our central location makes it simple to fit dental appointments into your busy schedule.</p>
          <img src={EquipmentTwo} alt="photo" />
        </div>

        <div className="infra">
          <img src={EquipmentOneThree} alt="photo" />
          <p>At Dental Clinic, our team of experienced dentists and friendly staff are dedicated to providing comprehensive dental services tailored to your individual needs. From routine check-ups and cleanings to cosmetic dentistry and oral surgery, we offer a wide range of treatments to help you achieve and maintain a healthy smile.</p>
        </div>

      </div>


    </div>


  )
}
