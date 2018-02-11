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
    'PlayIntent': function () {
         let request = this.event.request as Alexa.IntentRequest;
         let name = request.intent.slots.color.value;
         this.response.speak('Color is ' + name);
         this.emit(':responseReady');
     },
    'CreateGame' : function() {
      let token = this.event.session.user.accessToken;
      var self = this;

      let options = {
          url: 'https://liten.keisenb.io/v1/api/liten/game/start',
          headers: {
              'Authorization': 'Bearer ' + token
          }
      };

      self.response.speak('Authorization with dotGames required')
                   .linkAccountCard();
/*
      Request.get(options, function (error, response) {
          if (!response) {
              self.response.speak('I am having issues geting your rent');
              self.emit(':responseReady');
              return;
          }

          if(response.statusCode != 200) {
              if(response.statusCode == 401) {
                  self.response.speak('Authorization with dotGames required')
                               .linkAccountCard();
                  self.emit(':responseReady');
                  return;
              }

              self.response.speak('I am having issues geting your rent');
              self.emit(':responseReady');

              return;
          }*/


        //this.response.speak('Creating game');
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
