#! /usr/bin/env node

var pkg = require('../package.json')
var program = require('commander')
var example = require('../')
var Surge = require('surge')
var surge = new Surge

// This is where we’ll insert our own actions around Surge’s
var hooks = {}

program
  .version(pkg.version)

// Let’s add a basic Surge command, first: login.
program

  // Establish the name of the Commander command.
  // This can be whatever you want. Now when you run
  // `example login` you will get a similar experience to
  // running `surge login`.
  .command('login')

  // Map the command it to the `surge.login()` action, and pass in the `hooks`.
  .action(surge.login(hooks))

  // Give the command a description for when people run `--help`
  .description('Login to publish projects to the web.')

// Now, let’s add a hook. There are a variety of pre- and
// post- action hooks available via the Surge module,
// documented here: [TODO]

// This `preAuth` hook runs each time before checking
// someone is logged in.

hooks.preAuth = function (req, next) {

  // If you want to see all the data available to you,
  // you could log the entire `req` object.
  console.log('')
  if (req.authed) {
    // Here, if the user is already authenticated, we’re saying hello.
    console.log('       Hello ' + req.creds.email + '!')
  } else {
    // If you’re not logged in yet, hi!
    console.log('       Welcome!')
  }
  console.log('')

  // Call next() to continue to the next step.
  next()
}


// Here, we can add a `postProject` hook to run before
// after the project directory has been determined, but
// before it has been publish. This is incredibly useful if
// you are making any kind of build tool or static site generator:
// your library can compile any files here before moving onto the
// next step.
hooks.postProject = function (req, next) {
  example('The project is at ' + req.project + ' Your CLI could do something with it here.')
  next()
}

// Let’s also add a `postPublish` hook to run
// after the publishing step is successful.
hooks.postPublish = function (req, next) {
  example('Nice, it worked! 🚀  Published to ' + req.domain)
  next()
}

// Now let’s make the main Surge command run when your user runs `example publish`.
program
  .command('publish [projectPath] [domain]')
  .description('Publishes a project to the web using Surge.')
  .action(surge.publish(hooks))

// Now that our core functionality has been added, let’s
// add the remainder of the Surge commands so that people
// can use our example CLI successfully. Remember, these
// commands can be named whatever you want or used within
// other commands, depending on what your specific tool does.

program
  .command('whoami')
  .description('Check who you are logged in as.')
  .action(surge.whoami(hooks))

program
  .command('list')
  .description('List all the projects you’ve published.')
  .action(surge.list(hooks))

program
  .command('teardown [domain]')
  .description('Remove a live project.')
  .action(surge.teardown(hooks))

program
  .command('plus [domain]')
  .description('Upgrade a project to Surge Plus')
  .action(surge.plus(hooks))

program
  .command('logout')
  .description('Log out of your account.')
  .action(surge.logout(hooks))


program.parse(process.argv)

if (program.args.length < 1) {
  program.help()
}
