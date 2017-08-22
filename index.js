'use strict';
exports.handler = function (event, context) {

    try {

        var request = event.request;

        if (request.type === "LaunchRequest") {
            let options = {};
            options.speechText = "We're here to give dating advice. What word best describes the woman?  Is she classy, sassy, innocent, intellectual, bossy, or alternative? ",
                options.repromptText = "What was that again...is she classy, sassy, innocent, intellectual, bossy, or alternative?",
                options.endSession = false;
            context.succeed(buildResponse(options));

        } else if (request.type === "IntentRequest") {
            let options = {};

            if (request.intent.name === "HelloIntent") {

                let name = request.intent.slots.FirstName.value;
                options.speechText = "Hello" + name + ". ";

                options.endSession = true;
                context.succeed(buildResponse(options));

            } else {
                throw "Unknown intent";
            }

        } else if (request.type === "SessionEndedRequest") {

        } else {
            throw "Unknown intent type.";
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }


}
function buildResponse(options) {
    var response = {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: options.speechText
            },
            shouldEndSession: options.endSession
        }
    };

    if (options.repromptText) {
        response.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
            }
        };
    }
    return response;
}// JavaScript source code
