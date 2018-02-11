import * as Alexa from "alexa-sdk";
import * as Request from "request";

/*         let token = this.event.session.user.accessToken; */


let handlers: Alexa.Handlers<Alexa.Request> = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'SessionEndedRequest' : function() {
        let request = this.event.request as Alexa.SessionEndedRequest;
        console.log('Session ended with reason: ' + request.reason);
    },
    'Continue' : function() {
        this.response.speak('Testing mode, accessing lighten');
        this.emit(':responseReady');
    },
    'Play' : function() {
      let request = this.event.request as Alexa.IntentRequest;
      let color = request.intent.slots["color"].value;
      this.response.speak("Color is garbage");
      this.emit(':resopnseReady');
    },
    'CreateGame' : function() {
        this.response.speak('Creating game');
        this.emit(':responseReady');
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
        this.emit(':responseReady');
    }
};

export function handler(event: Alexa.RequestBody<Alexa.Request>, context: Alexa.Context) {
    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
