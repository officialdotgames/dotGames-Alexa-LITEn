"use strict";
exports.__esModule = true;
var Alexa = require("alexa-sdk");
var Request = require("request");
/*         let token = this.event.session.user.accessToken; */
var APP_ID = "b1db8a57-e5c0-490d-8488-77112b457d36";
var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'SessionEndedRequest': function () {
        var request = this.event.request;
        console.log('Session ended with reason: ' + request.reason);
    },
    'Continue': function () {
        var self = this;
        var options = {
            url: 'https://liten.keisenb.io/v1/api/liten/game/generate',
            headers: {
                'Authorization': 'Bearer ' + APP_ID
            }
        };
        Request.post(options, function (error, response) {
            if (!response) {
                self.response.speak('I am having issues talking to dot games');
                self.emit(':responseReady');
                return;
            }
            if (response.statusCode != 200) {
                if (response.statusCode == 401) {
                    self.response.speak('Invalid state');
                    self.emit(':responseReady');
                    return;
                }
                self.response.speak('I am having issues talking to dot games');
                self.emit(':responseReady');
                return;
            }
        });
    },
    'PlayIntent': function () {
        var request = this.event.request;
        var name = request.intent.slots.color.value;
        var options = {
            url: 'https://liten.keisenb.io/v1/api/liten/game/submit',
            headers: {
                'Authorization': 'Bearer ' + APP_ID
            }
        };
        var self = this;
        Request.post(options, function (error, response) {
            if (!response) {
                self.response.speak('I am having issues talking to dot games');
                self.emit(':responseReady');
                return;
            }
            if (response.statusCode != 200) {
                if (response.statusCode == 401) {
                    self.response.speak('Invalid state');
                    self.emit(':responseReady');
                    return;
                }
                self.response.speak('I am having issues talking to dot games');
                self.emit(':responseReady');
                return;
            }
            self.response.speak("The round is beginning");
            self.emit(':responseReady');
        });
        /*if(CHECK BODY){
          this.response.speak('Correct');
          this.emit(':responseReady');
        }
        else{
          this.response.speak('Incorrect');
          this.emit(':responseReady');
        }*/
    },
    'CreateGame': function () {
        var self = this;
        var options = {
            url: 'https://liten.keisenb.io/v1/api/liten/game/start',
            headers: {
                'Authorization': 'Bearer ' + APP_ID
            }
        };
        Request.post(options, function (error, response) {
            if (!response) {
                self.response.speak('I am having issues talking to dot games');
                self.emit(':responseReady');
                return;
            }
            if (response.statusCode != 200) {
                if (response.statusCode == 401) {
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
