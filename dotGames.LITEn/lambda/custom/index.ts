import * as Alexa from "alexa-sdk";
import * as Request from "request";

let handlers: Alexa.Handlers<Alexa.Request> = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'SessionEndedRequest' : function() {
        let request = this.event.request as Alexa.SessionEndedRequest;
        console.log('Session ended with reason: ' + request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, open lighten'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that.");
    }
};

export function handler(event: Alexa.RequestBody<Alexa.Request>, context: Alexa.Context) {
    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
