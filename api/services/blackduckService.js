let SastService = require('./sastService');
let sastService = new SastService();
let BlackduckAssesmentReport = require('../model/blackduck');
let blackduckAssesmentReport = new BlackduckAssesmentReport();

class BlackduckService {
    constructor() {
        this.requestParams = {
            headers: {
                "Content-Type": "application/json",
                Authorization: ""
            },
            async: true,
            crossDomain: true
        };
    }

    getProjectDetails(projectName, projectVersionName) {
        blackduckAssesmentReport.ProjectName = ProjectName;
        blackduckAssesmentReport.ProjectVersionName = ProjectVersionName;
    }

    getTagsOfProject(projectId) {
        return new Promise(async (resolve, reject) => {
            try {

                let apiURL = `${config.get('Blackduck.baseurl')}/api/projects/${projectId}/tags`;
                this.requestParams["url"] = apiURL;
                this.requestParams["method"] = "GET";
                let apiResponse = await sastService.getAPIResult(this.requestParams);
                if (!!apiResponse) {
                    //TODO: write proper logic
                    // if(!!TagCount){
                    //     blackduckAssesmentReport.TagCount = apiResponse.TagCount;
                    // }
                    // if(!!Tags) {
                    //     blackduckAssesmentReport.Tags = apiResponse.Tags;
                    // }

                }
                resolve(true);
            } catch (err) {
                console.log("Error while fetching tags of project :: ", JSON.stringify(err));
                resolve(false);
            }

        });
    }

    getComponentsDetailsOfProject(projectId) {
        return new Promise((resolve, reject) => {
            try {

                let apiURL = `${config.get('Blackduck.baseurl')}/api/projects/${projectId}/versions/components`;
                this.requestParams["url"] = apiURL;
                this.requestParams["method"] = "GET";
                let apiResponse = await sastService.getAPIResult(this.requestParams);
                if (!!apiResponse) {
                    //TODO: write proper logic
                    blackduckAssesmentReport.TotalComponentsCount = apiResponse;
                    blackduckAssesmentReport.ComponentDetails = apiResponse;
                }
                resolve(true);
            }
            catch (err) {
                console.loog(JSON.stringify(err));
                resolve(false);
            }
        });
    }

    main(projectName, projectVersionName, projectId) {
        return new Promise(async (resolve, reject) => {
            let listOfAPIResponse = [];

            listOfAPIResponse.push(this.getProjectDetails(projectName, projectVersionName),
                this.getTagsOfProject(projectId),
                this.getComponentsDetailsOfProject(projectId));
                let allPromiseRes = await Promise.all(listOfAPIResponse);
                console.log("all done !!!", JSON.stringify(allPromiseRes));
                return (blackduckAssesmentReport);
        });
        
    }
}