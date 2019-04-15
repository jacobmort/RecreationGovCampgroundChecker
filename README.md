# Recreation.gov Campsite Checker

Uses the excellent library [node-horseman](https://github.com/johntitus/node-horseman) to look for open tent campsites on [recreation.gov](https://www.recreation.gov/) website.

* `RecreationGovHorseman.js`- extension of `Horseman` to include Recreation.gov specific functions.
* `Scraper.js`- Checks for available sites and emails.
* `claudia.json`- [Claudia.js](https://github.com/claudiajs/claudia) config file.
* `index.js`- For testing on localhost.
* `lambda.js`- Entry point for AWS Lambda function.
* `phantomjs-2.1.1-linux-x86_64`- binary of phantomjs for running on lambda.

#### Setup
Designed to be run on AWS Lambda on a Cloudwatch interval trigger.

##### Env Variables
* `process.env.campsite_url`- Url for the campsite you're intersted in.  Ex. for Upper Pines in Yosemite "[https://www.recreation.gov/camping/upper-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70925](https://www.recreation.gov/camping/upper-pines/r/campgroundDetails.do?contractCode=NRSO&parkId=70925)"

* `process.env.start_date`- Date you will be arriving.  Formatted like what you would find after you select a date on the website Ex. `Thu Sep 14 2017`

* `process.env.end_date`- Date you will be leaving.  Similar format to `start_date`

* `process.env.num_people`- Number of people staying with you.

* `process.env.aws_access_key_id`- Your AWS key

* `process.env.aws_secret_access_key`- Your AWS secret key

* `process.env.ses_email_address`- Where the alert email will be from.  Should be your SES verified domain.

* `process.env.to_emails`- Emails verified in SES to send alert to when campsite(s) are available.  Separated by a space ex. `email@example.com email2@example.com`
