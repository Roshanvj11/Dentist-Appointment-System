const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const {
    getUsers,
    appointMentCount,
    todayAppointment,
    todayAppointmentList,
    findUserAppointments,
    addOfflinePatient,
    findOfflinePatientList,
    findOfflinePatientAndDeleteList,
    updateOne,
    updateNotes, 
    findNotepadValues,
    pendingAppointMentCount,
    findCompletedPatients,
    findOfflinePatientsCount,
    thisWeekAppointmentList,
} = require('../services/DB/database');


//node mailer
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: "give your Email",
        pass: 'wwww xxxx yyyy zzzz',
    },
});

router.get('/doctorList', async (req, res) => {
    //  let {name,specialty,location}=req.body;
    //  console.log(req.body.name);
    try {
        // const findQuery = { specialty: 'Dentist' }
        const result = await getUsers('Dentists');
        res.json(result);
        // console.log(findQuery);
        console.log('result', result)
    } catch (error) {
        console.error("error in getting doctor data", error)
    }

})

// total Appointment Count 

router.get('/appointmentCount', async (req, res) => {
    try {
        const result = await appointMentCount('appointmentData');
        // res.json(result);
        // console.log('router Result:',result);
        const appointmentCountResult = result.map(obj => obj.string);
        console.log('appointmentCountResult:', appointmentCountResult)
        res.json(appointmentCountResult)
    } catch (error) {
        console.error("error in getting appointment count:", error);
    }
})

//today AppointmentCount
router.get('/todayAppointmentCount', async (req, res) => {
    try {
        const result = await todayAppointment('appointmentData');
        console.log("today Appointment:",result);
        const todayAppointmentCount=result.map(obj=>obj.number);
        console.log('todayAppointmentCount:', todayAppointmentCount)
        res.json(todayAppointmentCount); 
    } catch (error) {
        console.error("error in getting Todayappointment count:", error);

    }
    
})

//Today Appointments List
router.get('/todayAppointmentList', async (req, res) => {
    try {
        const result = await todayAppointmentList('appointmentData');
        console.log("today Appointment:",result);
        res.json(result); 
    } catch (error) {
        console.error("error in getting Todayappointment List", error);

    }
    
})

//This Week Appointment List 
router.get('/thisWeekAppointmentList', async (req, res) => {
    try {
        const result = await thisWeekAppointmentList('appointmentData');
        console.log("today Appointment:",result);
        res.json(result); 
    } catch (error) {
        console.error("error in getting This Week appointment List:", error);

    }
    
})

//Pending Appointment Count
router.get('/pendingAppointMentCount', async (req, res) => {
    try {
        const result = await pendingAppointMentCount('appointmentData');
        const pendingAppointMent=result.map(obj=>obj.pendingStatus)
        console.log('pendingAppointment:',pendingAppointMent);
        res.json(pendingAppointMent);
    } catch (error) {
        console.error('error in getting pending Appointments:',error);
    }
    
})

//Total Patients Count //Completed Patient and Offline Parients
router.get('/findCompletedPatients', async (req, res) => {
    try {
        const result = await findCompletedPatients('appointmentData');
        console.log('result:', result)
        const completedAppointMent=result.map(obj=>obj.Completed);
        console.log('completedAppointMent:', completedAppointMent)
        res.json(completedAppointMent);
    } catch (error) {
        console.error("error in router, getting userId with appointments", error);
    }
})

//Offline Count
router.get('/findOfflinePatientsCount', async (req, res) => {
    try {
        const result = await findOfflinePatientsCount('users');
        console.log('result:', result)
        const offlinePatient=result.map(obj=>obj.offlineCount);
        console.log('offlinePatient:', offlinePatient)
        res.json(offlinePatient);
    } catch (error) {
        console.error("error in router, getting userId with appointments", error);
    }
})

router.get('/findUserAppointments', async (req, res) => {
    try {
        const result = await findUserAppointments('appointmentData');
        res.json(result);
    } catch (error) {
        console.error("error in router, getting userId with appointments", error);
    }
})

//upload Offline Patients
router.post('/offlinePatient', async (req, res) => {
    const {
        name,
        date,
        age,
        complaint,
        treatment,
        phoneNumber,
        mode,
        cAt } = req.body;
    console.log("age", req.body.age);

    const offlineData = {
        name,
        date,
        age,
        complaint,
        treatment,
        phoneNumber,
        mode,
        cAt: new Date()
    }
    try {
        const result = await addOfflinePatient('users', offlineData);
        // global.io.emit('ORDER_STATUS_UPDATE', {
        //     updateOrder: true,
        //   });
        res.json(result);
    } catch (error) {
        console.error("error in router, getting userId with appointments", error);
    }
})

//Getting Offline Patients

router.get('/offlinePatientList', async (req, res) => {
    const result = await findOfflinePatientList('users');
    // global.io.emit('ORDER_STATUS_UPDATE', {
    //     updateOrder: true,
    //   });
    res.json(result);
})

//Cancel Offline Patients
router.delete('/deleteOfflinePatientList/:id', async (req, res) => {
    const { id } = req.params;
    console.log(" Delete Id:",req.params);
    console.log('review id:', id)

    try {
        const result = await findOfflinePatientAndDeleteList('appointmentData', id);
        res.json(result);
    } catch (error) {
        console.error("error in router, delete Appointments", error)
    }

})



//update appointment Status
router.put('/updateAppointmentStatus/:id', async (req, res) => {
    const { id } = req.params;
    console.log("req body", req.body);
    const filter = { _id: new ObjectId(id) }
    const update = { $set: req.body }
    
    try {
        const result = await updateOne('appointmentData', filter, update);
        global.io.emit('PATIENT_STATUS_UPDATE', {
            updateStatus: true,
          });
        res.json(result);

    } catch (error) {
        console.error("error in router, delete Appointments", error)
    }

})

//Appointment Mail Router 

router.post('/status', (req, res) => {
    const { to, subject, text } = req.body;
    console.log("to", req.body.to);

    const mailOption = {
        from: 'sroshanvijay@gmail.com',
        to: to,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.error('error in sending mail server', error);
            res.status(500).send('error sending mail')
        } else {
            console.log('email send', info.response);
            res.send('email send successfully');
        }
    })
})

router.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { note } = req.body;
    console.log("note:",note,"id",id);
    const filter = { _id: new ObjectId(id) }
    const update = { $set: {notes:note} }
    try {
        const result = await updateNotes('appointmentData', filter, update);
        res.json(result);
    } catch (error) {
        console.error("error in router Appointments", error)
    }
            
})


//Getting notepad values
router.get('/notesValues/:id', async (req, res) => {
    const {id}=req.params;
    console.log("id:",id);
    const query ={_id:new ObjectId(id)}
    const result = await findNotepadValues('appointmentData',query);
    console.log("result:",result);
    res.json(result);
})

module.exports = router;


