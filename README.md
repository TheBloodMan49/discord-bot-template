# Typescript discord bot template

Here is a template to create a healthy discord bot.
Steps to get it working :

- Click "use template"
- Clone your freshly created repo
- Get node.js version >=12
- Navigate to the folder where this README is
- Execute `npm install`
- Rename ".env.exemple" to ".env"
- Get a bot token and put it in the .env file

You can then run the bot with `npm run start`

**Important note :** this will use ts-node which is slower, if you want it to run for more than a few hours, 
I recommend compiling to javascript.

You just have to type `npm run build` and it will create a "dist" folder with the compiled code.

To run this version, type `npm run start:prod`

To create functionnalities, simply create files in the subfolders in the style the examples use

During developpement, you can type `npm run start:dev` which will restart the bot when you change a file using ts-node-dev.

Don't forget to compile to javascript when you are done adding your awesome features !

*I'm not a professionnal so I might have made mistakes, don't hesitate to report any problems.*

Happy coding ! :)
