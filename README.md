# Jenkins Statistics Analyzer
## What is this?
An application that retrieves data from a running Jenkins instance, compiles and processes it, then displays a nice view with metrics based on the data. Basic statistics (jobs, builds, commits, slaves) are covered, as well as more comprehensive ones (most changed files, average build durations, build and commit timelines, etc).  

### Why do it?
First, because I like to play with data. Second, because it solved a problem I was having, with a Jenkins instance that was running slow. Doing this helped me find some of the pain points, and I was able to optimize that Jenkins in order to run faster  

### How can I use?
Two ways:
- If your Jenkins instance is visible for the outside world, just input the URL, click "start", and you're good to go
- If your Jenkins instance is hidden (firewall, intranet, etc), just get the war package, put it under a web server, then go to step 1. You'll also need [DRP](https://github.com/Andrei-Straut/drp "DRP") running under the same server

### Any issues or limitations?
Unfortunately, yes. For now, this project is only in an alpha stage, so Jenkins authentication and newer Jenkinses (Blue Ocean, job folders) aren't supported

### Can I help?
Sure. Fork the repository, change it, then send a pull request. I'll be happy to integrate it

### How does it work?
tl;dr: it uses the Jenkins API to retrieve information about everything, really. Then it compiles that information and shows a series of interactive graphs based on it.  

Long version: 
Server-side it uses [DRP](https://github.com/Andrei-Straut/drp "DRP") as a proxy for its requests, in order to go around CORS issues. The data is retrieved server-side, forwarded to the client, where it's processed using [Angular](https://angular.io/ "Angular"), and formatted using [vis.js](http://visjs.org/ "vis.js")

### How can I install / run locally?
You'll need Java, Maven, npm, and a typescript compiler.  

After cloning the project, head to `<root_folder>/src/main/webapp` and run `npm install` in order to get the dependencies and the client side set-up.  

To run the project locally, `npm run-script run`.  

To test, `npm run-script test`.  

To build, in the root folder, run `mvn clean package`. This should create a war file ready for distribution

### Plans for future development / release?
Yes, once the todos in the [issues section](https://github.com/Andrei-Straut/statkins/issues "issues") section are fixed, I will do a formal release. After that, depends on time and interest. In any case, if you want to play with the project, use it, modify it, or whatever, feel free to do so. I'm open to lend a hand and assist with anything.