"use strict";
exports.__esModule = true;
var Alexa = require("alexa-sdk");
/*         let token = this.event.session.user.accessToken; */
var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'SessionEndedRequest': function () {
        var request = this.event.request;
        console.log('Session ended with reason: ' + request.reason);
    },
    'Continue': function () {
        this.response.speak('Testing mode, accessing lighten');
        this.emit(':responseReady');
    },
    'Play': function () {
        var request = this.event.request;
        var color = request.intent.slots["color"].value;
        this.response.speak("Color is garbage");
        this.emit(':resopnseReady');
    },
    'CreateGame': function () {
        this.response.speak('Creating game');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak("You can try: 'alexa, open lighten'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak("Sorry, I didn't get that.");
        this.emit(':responseReady');
    }
};
function handler(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
}
exports.handler = handler;
;
