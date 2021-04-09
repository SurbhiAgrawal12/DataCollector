const axios = require('axios');
const config = require('config');
const debug = require('debug')('app:sastService');
const Database = require('../../database');
const Sast = require('../model/sast')
const sast = new Sast();
const BlackduckService = require('./blackduckService');
const blackduckService = new BlackduckService();
const SonarqubeService = require('./sonarqubeService');
const sonarqubeService = new SonarqubeService();

class Sast {
    constructor() {
    }

    getAPIResult(requestParams, reportName) {
        return new Promise(async (resolve, reject) => {

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

    main(traceId, projectName, projectKey, projectVersion) {
        return new Promise(async (resolve, reject) => {
            let listOfAPIResponse = [];
            
            listOfAPIResponse.push(blackduckService.main(projectName, projectVersionName, projectId),
                sonarqubeService.getmetricStatisticsOfSonarQube(projectKey, projectName));
            
                let allPromiseRes = await Promise.all(listOfAPIResponse);
            console.log("all done !!!", JSON.stringify(allPromiseRes));
            // sast["SonarqubeAssesmentReport"] =  listOfAPIResponse.pop();
            // sast["BlackduckAssesmentReport"] = listOfAPIResponse.pop();
            sast["HSPtraceId"] = traceId;
            sast["ProjectName"] = projectName;
            sast["ProjectKey"] = projectKey;

            // let listOfSastTool = ["Sonarqube", "Blackduck"];

            // for (let eachtool of listOfSastTool) {
            //     let toolConfig = config.get(`${eachtool}`);
            //     for (let eachAPI of toolConfig["APIUrl"]) {
            //         listOfAPIResponse.push(this.getAPIResult(eachAPI, toolConfig["Authorization"],`${eachtool}AssesmentReport`));
            //     }
            // }

            // let allPromiseRes = await Promise.all(listOfAPIResponse);
            // console.log("all done !!!", JSON.stringify(allPromiseRes));

            resolve();

        });
    }
}
module.exports = Sast;