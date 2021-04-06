const axios = require('axios');
const config = require('config');
const debug = require('debug')('app:sastService');
const Database = require('../../database');

class Sast {
    constructor() {
    }

    getAPIResult(apiURL, authToken, reportName) {
        return new Promise(async (resolve, reject) => {

            const requestParams = {
                method: "GET",
                url: apiURL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken
                },
                // auth: {
                //     username: 'admin',
                //     password: 'admin'
                // },
                async: true,
                crossDomain: true
            };
            axios(requestParams)
                .then(response => {
                    debug("API-RESPONSE :: ", JSON.stringify(response.data));
                    let result = {};
                    result[reportName] = response.data;
                    resolve(result);
                })
                .catch(function (error) {
                    // handle error
                    debug(" API-RESPONSE ERROR CATCH BLOCK :: ", JSON.stringify(error));
                    resolve(error);
                });
        });
    }

    main() {
        return new Promise(async (resolve, reject) => {
            let listOfAPIResponse = [];


            let listOfSastTool = ["sonarqube"];

            for (let eachtool of listOfSastTool) {
                let toolConfig = config.get(`${eachtool}`);
                for (let eachAPI of toolConfig["APIUrl"]) {
                    listOfAPIResponse.push(this.getAPIResult(eachAPI, toolConfig["Authorization"],`${eachtool}AssesmentReport`));
                }
            }

            let allPromiseRes = await Promise.all(listOfAPIResponse);
            console.log("all done !!!", JSON.stringify(allPromiseRes));

            resolve();

        });
    }
}
module.exports=Sast;