class SonarqubeAssesmentReport {
    constructor(ProjectKey, projectName, projectDescription, qualifier, measures) {
        this.ProjectKey = ProjectKey;
        this.ProjectName = projectName;
        this.ProjectDescription = projectDescription;
        this.ProjectVersionName = ProjectVersionName;
        this.qualifier = qualifier;
        this.measures = measures;
    }
}
module.exports = SonarqubeAssesmentReport;