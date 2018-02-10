"use strict";
exports.__esModule = true;
var Alexa = require("alexa-sdk");
var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'SessionEndedRequest': function () {
        var request = this.event.request;
        console.log('Session ended with reason: ' + request.reason);
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
    }
};
function handler(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
}
exports.handler = handler;
;
