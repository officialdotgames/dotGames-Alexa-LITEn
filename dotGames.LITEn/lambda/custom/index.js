"use strict";
exports.__esModule = true;
var Alexa = require("alexa-sdk");
var Request = require("request");
/*         let token = this.event.session.user.accessToken; */
var APP_ID = "98983250-f624-4f2e-8cff-084340c9e27e";
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
            url: 'https://theofficial.games/v1/api/liten/game/generate',
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
            self.response.speak("Sequence is showing, watch and repeat it back");
            self.emit(':responseReady');
        });
    },
    'PlayIntent': function () {
        var request = this.event.request;
        var sequence = request.intent.slots.color.value;
        var options = {
            url: 'https://theofficial.games/v1/api/liten/game/submit',
            headers: {
                'Authorization': 'Bearer ' + APP_ID,
                'sequence': sequence
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
                self.response.speak('I am having issues talking to dot games. Status code: ' + response.statusCode);
                self.emit(':responseReady');
                return;
            }
            //let answer = body as PlayResponse;
            //self.response.speak(typeof body);
            var resp = JSON.parse(response.body);
            var correct = resp.correct;
            //self.response.speak(response.body.correct);
            //self.emit(':responseReady');
            //return;
            if (correct) {
                self.response.speak("You got it! Say alexa  ask lighten to continue for the next round");
                self.emit(':responseReady');
            }
            else {
                self.response.speak("Game over. Your score is " + resp.score);
                self.emit(':responseReady');
            }
        });
    },
    'CreateGame': function () {
        var self = this;
        var options = {
            url: 'https://theofficial.games/v1/api/liten/game/start',
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
            self.response.speak("Game successfully created.  Watch the colors on the bulbs. Then when all are blue say continue to start game");
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
