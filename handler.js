'use strict';

const Axios = require('axios');
const Aws = require('aws-sdk');

const Ses = new Aws.SES({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1',
});

const sendEmail = (numSites, date, campSiteUrl, fromEmail, toEmails) => {
  return Ses.sendEmail({
    Source: fromEmail,
    Destination: {
      ToAddresses: toEmails,
    },
    Message: {
      Subject: {
        Data: 'Recreation.gov Dates Found!',
      },
      Body: {
        Text: {
          Data: `${numSites} sites available for date ${date} go go go ${campSiteUrl}`,
        },
      },
    },
  }).promise().then(() => {
    console.log('send email');
  }).catch((err) => {
    console.log(`error sending email:${err}`);
  });
}

const getAvailable = (campground, start, end) => {
  return new Promise((resolve, reject) => {
    Axios.get(`https://www.recreation.gov/api/camps/availability/campground/${campground}?start_date=${start}T00:00:00Z&end_date=${end}T00:00:00Z`)
      .then((response) => {
        const available = Object.values(response.data.campsites).filter((site) => Object.values(site.availabilities).includes('Available'));
        // console.log(available);
        resolve(available.length);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

module.exports.availability = async (event) => {
  const openings = await getAvailable(event.campground, event.start, event.end);
  if (openings > 0) {
    console.log(openings)
    const url = `https://www.recreation.gov/camping/campgrounds/${event.campground}`;
    await sendEmail(openings, url, date, process.env.FROM_EMAIL, process.env.TO_EMAILS.split(' '));
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
