const https = require("https");
const hostname = 'www.lingq.com';
const port = 443;
const token = 'Token ...';
let language = '';
let contentId = '';

// 114407 ko
// 7478 ru
// 32892 sv

let options = {
    hostname: hostname,
    port: port,
    headers: {'Authorization': token}
};

const getText = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/text/';
    return callAPI(options);
};

const getVocabulary = () => {
    options.path = '/api/languages/' + language + '/lessons/' + contentId + '/lingqs/';
    return callAPI(options);
};

const callAPI = (options) => {
    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            let text = '';
            response.on('data', function (data) {
                text += data.toString();
            });
            response.on('end', function() {
                t = JSON.parse(text);
                if (t.detail === "Invalid token.") reject("Error: Invalid API token.");
                resolve(text);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

exports.getText = getText;
exports.getVocabulary = getVocabulary;