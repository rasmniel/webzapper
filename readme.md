# The Webzapper
The Webzapper is a distributed system for controlling the Chrome web browser without the need for mouse and keyboard peripherals.
The project was initially created from a desire to author a piece of software emphasizing the accessibility of a browser. Features which would facilitate a web experience from the comfort of a couch, recliner or similar, as well as allowing people with minor to moderate disabilities to partake this experience as well.

This project is merely a prototype of that vision. Feel free to do with the project as you please.

## Origin and Future
The Webzapper became the exam project for my bachelor. After the exam, I shelved the project, and I currently don't intend to pick it up again.
I believe the idea still has relevenance, but in the process of developing it, I have found that some of the applied approaches are less than optimal.

## Usage
Setting up the system for use can be done with the following steps:
- Run the server on a public domain.
- Install and run the app on an Android smartphone.
- Open a Chrome browser with the extension installed.
- Request a connection code from the extension popup.
- Input the code in the app and hit connect.

Being connected to the browser should now allow you to navigate the currently displayed webpage, albeit with some caveats that you may discover for yourself.


## Overview
The system consists of 3 main components:
- Browser extension (developed for Chrome)
- Node.js server with Socket.IO
- React Native app (developed for Android) 

All of these components are strung together using Socket.IO and uses React and React Native for the frontends. The server conveys browser commands from the app to the extension to be carried out. Both ends of the chain uses the same approach for dispatching commands similar to that of React's unidirectional data flow.

The project includes some experimental code that is not yet part of the final product, some vestigial code used to link the app and extension together on the storefronts in a user friendly manner, and some code for submitting feedback to an external backend, which is not included in this project. These parts should probably be repurposed or removed. All live/dev urls have been replaced with 'http://localhost:3000'

## Building the Projects
Running `npm start` builds the projects for development. To generate a more release-friendly build of the extension, use `npm run build` to build with gulp. Some tests have been written, but not extensively. These can be run with `npm test`. Several other npm scripts are available for the individual projects. Examine respective `package.json` files to discover other available commands.

## Suggestions
A few thoughts pertaining to improving the system and developing it going forward.
- Some components could use some refactor, or an entire rewrite.
- Optimally the server should be replaced by a node.js server running in the extension, which can be connected to by devices on the same network. 
- Several extra input features, which should be obvious to most users, such as tabIndex navigation, escape- and arrow key emulation, and more nuanced media controls.
- Several dependencies need scrutiny, as a number of them are flagged as vulnerabilities by GitHub.
- If you have a suggestion for improvement, feel free to post an issue on this repository.


# Contribution
Go fork yourself! `;-)`


# License
This project has been released under the MIT license. Feel free to do what you want with the code.
