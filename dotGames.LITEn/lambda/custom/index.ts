import * as Alexa from "alexa-sdk";
import * as Request from "request";
import * as Dotenv from "dotenv";

/*         let token = this.event.session.user.accessToken; */

let APP_ID = "17ead988-5dda-4eaa-8937-6c172f019354";

let handlers: Alexa.Handlers<Alexa.Request> = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'SessionEndedRequest' : function() {
        let request = this.event.request as Alexa.SessionEndedRequest;
        console.log('Session ended with reason: ' + request.reason);
    },
    'Continue' : function() {
        this.response.speak(APP_ID);
        this.emit(':responseReady');
    },
    'PlayIntent': function () {
         let request = this.event.request as Alexa.IntentRequest;
         let name = request.intent.slots.color.value;
         this.response.speak('Color is ' + name);
         this.emit(':responseReady');
     },
    'CreateGame' : function() {
      var self = this;

      let options = {
          url: 'https://liten.keisenb.io/v1/api/liten/game/start',
          headers: {
              'Authorization': 'Bearer ' + APP_ID
          }
      };

      Request.get(options, function (error, response) {
          if (!response) {
              self.response.speak('I am having issues talking to dot games');
              self.emit(':responseReady');
              return;
          }

          if(response.statusCode != 200) {
              if(response.statusCode == 401) {
                  self.response.speak('Invalid state');
                  self.emit(':responseReady');
                  return;
              }

              self.response.speak('I am having issues talking to dot games');
              self.emit(':responseReady');

              return;
          }
          self.response.speak("Game successfully created.  Say continue to show pattern");
          self.emit(':responseReady');
        });
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
