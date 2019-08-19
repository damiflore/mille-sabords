// here we could run lighthouse report
// but there is no way to point it back to the github request
// or something valuable.
// we could enable heroku CI but it's 10$/month
// and I would still have to create a bot to write
// lighthouse report diff

console.log("process.env.HEROKU_APP_NAME", process.env.HEROKU_APP_NAME)
