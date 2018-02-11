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
    'PlayIntent': function () {
        var request = this.event.request;
        var name = request.intent.slots.color.value;
        this.response.speak('Color is ' + name);
        this.emit(':responseReady');
    },
    'CreateGame': function () {
        var token = this.event.session.user.accessToken;
        var self = this;
        var options = {
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
