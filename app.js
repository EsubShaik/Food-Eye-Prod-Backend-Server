const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const userRouter = require("./routes/userRoute");
const { isAuthenticated } = require("./Middleware/verifyJWT");
const bodyParser = require('body-parser');
const User = require("./models/User");

const mongoURI = process.env.MONGODB_URL;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });


  // const { Expo } = require('expo-server-sdk');
  const cron = require('node-cron');
  
  // // Create a new Expo client
  // const expo = new Expo();
  
  // const notifyarr = [
  //   {
  //     title: '⏰ 𝗧𝗶𝗺𝗲 𝗳𝗼𝗿 𝗮 𝗙𝗼𝗼𝗱𝗦𝗻𝗮𝗽 𝗨𝗽𝗱𝗮𝘁𝗲! ⏰',
  //     body: "🍎 Don't forget to log your latest meal. Your journey to a healthier lifestyle starts with every entry. 🌿",
  //   },
  //   {
  //     title: '⚡ 𝗤𝘂𝗶𝗰𝗸 𝗨𝗽𝗱𝗮𝘁𝗲: 𝗠𝗲𝗮𝗹 𝗧𝗶𝗺𝗲! ⚡',
  //     body: "🥗 Don't miss out on recording your latest meal. Each entry counts towards a healthier lifestyle journey. 🥦 ",
  //   },
  //   {
  //     title: '⌚ 𝗙𝗼𝗼𝗱𝗦𝗻𝗮𝗽 𝗔𝗹𝗲𝗿𝘁: 𝗧𝗶𝗺𝗲 𝘁𝗼 𝗟𝗼𝗴! ⌚',
  //     body: "🍔 Your meal log awaits! Make every entry count on your path to a healthier and happier you. 🌾",
  //   },
  // ];
  // const currentDate = new Date();
  // const currentHour = currentDate.getHours();
  
  // function sendExpoNotification(expoPushToken, title, body) {
  //   const notification = {
  //     to: expoPushToken,
  //     sound: 'default',
  //     title,
  //     body,
  //   };
  
  //   expo.sendPushNotificationsAsync([notification])
  //     .then((receipts) => {
  //       console.log('Notification sent successfully:', receipts);
  //     })
  //     .catch((error) => {
  //       console.error('Error sending notification:', error);
  //     });
  // }
  
  // let notificationMessage;
  // if (currentHour === 7 || currentHour === 13 || currentHour === 19) {
  //   const index = currentHour === 7 ? 0 : currentHour === 13 ? 1 : 2;
  //   notificationMessage = notifyarr[index];
  
  //   cron.schedule(`0 ${currentHour} * * *`, async() => {
  //     const allusers = await User.find({}) ;
  //     for(var i = 0 ; i < allusers.length; i++){
  //       if(allusers[i].pushtoken != '' && allusers[i].pstatus === 1){
  //         sendExpoNotification(allusers[i].pushtoken, notificationMessage.title, notificationMessage.body);
  //       }
  //     }
  //     // const expoPushToken = 'ExponentPushToken[8LSRkkItMdZQGn_lGWdF1V]';
  //     // sendExpoNotification(expoPushToken, notificationMessage.title, notificationMessage.body);
  //   }, {
  //     timezone: 'Asia/Kolkata',
  //   });
  // }

// Define the cron expressions for each schedule
// const sundaySchedule = '0 0 * * 0'; // Every Sunday at 12:00 AM
const sundaySchedule = '48 9 * * *'; // Every Sunday at 12:00 AM
const monthlyFirstSchedule = '0 0 1 * *'; // Every 1st day of the month at 12:00 AM
const yearlyJanuaryFirstSchedule = '0 0 1 1 *'; // January 1st at 12:00 AM
// 2020-08-14T22:30:30.000+00:00
// Schedule the tasks
cron.schedule(sundaySchedule, () => {
  let currentDate = new Date();

  // Get the date 7 days ago
  let sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  
  // Extract date components for the current date
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getUTCDate()).padStart(2, '0');
  
  // Extract time components for the current date
  const currentHours = String(currentDate.getUTCHours()).padStart(2, '0');
  const currentMinutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
  const currentSeconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
  const currentMilliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');
  
  // Construct the formatted date string for the current date
  const currentFormattedDateString = `${currentYear}-${currentMonth}-${currentDay}T${currentHours}:${currentMinutes}:${currentSeconds}.${currentMilliseconds}+00:00`;
  
  // Extract date components for the date 7 days ago
  const sevenDaysAgoYear = sevenDaysAgo.getUTCFullYear();
  const sevenDaysAgoMonth = String(sevenDaysAgo.getUTCMonth() + 1).padStart(2, '0');
  const sevenDaysAgoDay = String(sevenDaysAgo.getUTCDate()).padStart(2, '0');
  
  // Extract time components for the date 7 days ago
  const sevenDaysAgoHours = String(sevenDaysAgo.getUTCHours()).padStart(2, '0');
  const sevenDaysAgoMinutes = String(sevenDaysAgo.getUTCMinutes()).padStart(2, '0');
  const sevenDaysAgoSeconds = String(sevenDaysAgo.getUTCSeconds()).padStart(2, '0');
  const sevenDaysAgoMilliseconds = String(sevenDaysAgo.getUTCMilliseconds()).padStart(3, '0');
  
  // Construct the formatted date string for the date 7 days ago
  const sevenDaysAgoFormattedDateString = `${sevenDaysAgoYear}-${sevenDaysAgoMonth}-${sevenDaysAgoDay}T${sevenDaysAgoHours}:${sevenDaysAgoMinutes}:${sevenDaysAgoSeconds}.${sevenDaysAgoMilliseconds}+00:00`;
  
  console.log("Current Date:", currentFormattedDateString);
  console.log("7 days ago Date:", sevenDaysAgoFormattedDateString);
}, {
  timezone: 'Asia/Kolkata',
});

const monthlyFirstTask = cron.schedule(monthlyFirstSchedule, () => {
  console.log('Running scheduled task for every 1st day of the month...');
});

const yearlyJanuaryFirstTask = cron.schedule(yearlyJanuaryFirstSchedule, () => {
  console.log('Running scheduled task for January 1st...');
});

// function sendEmailReport(email, userid){

// }

// cron.schedule(sundaySchedule, async() => {
//   const allusers = await User.find({}) ;
//   for(var i = 0 ; i < allusers.length; i++){
//     if(allusers[i].fstatus === 1) {
//       sendExpoNotification(notificationMessage.title, notificationMessage.body);
//     }
//   }
// }, {
//   timezone: 'Asia/Kolkata',
// });

// // Start the tasks
// sundayTask.start();
// monthlyFirstTask.start();
// yearlyJanuaryFirstTask.start();



app.use("/api/user", userRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(8000, () => {
  console.log("server started in terminal");
});
