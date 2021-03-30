const config = require('config');
const SonarqubeService = require('../services/sonarqube-service');

async function getSonarDataMetric (req, res, next)  {

    const metricKey = `
                complexity,
                cognitive_complexity,
                comment_lines,
                comment_lines_density,
                public_documented_api_density,
                public_undocumented_api,
                duplicated_blocks,
                duplicated_files,
                duplicated_lines,
                duplicated_lines_density,
                new_violations,
                violations,
                false_positive_issues,
                open_issues,
                confirmed_issues,
                reopened_issues,
                code_smells,
                new_code_smells,
                sqale_rating,sqale_index,
                new_technical_debt,
                sqale_debt_ratio,
                new_sqale_debt_ratio,
                alert_status,
                quality_gate_details,
                bugs, 
                new_bugs, 
                reliability_rating, 
                reliability_remediation_effort,
                new_reliability_remediation_effort,
                vulnerabilities,
                new_vulnerabilities,
                security_rating,
                security_remediation_effort,
                new_security_remediation_effort,
                classes,
                directories,
                files,
                lines,
                ncloc,
                ncloc_language_distribution,
                functions,
                projects,
                public_api,
                statements,
                branch_coverage,
                new_branch_coverage,coverage,
                new_coverage,line_coverage,
                new_line_coverage,
                lines_to_cover,
                new_lines_to_cover,
                skipped_tests,
                uncovered_conditions,
                new_uncovered_conditions,
                uncovered_lines,
                new_uncovered_lines,
                tests,
                test_execution_time,
                test_errors,
                test_failures,
                test_success_density`;
    let apiURL =  `${config.get('sonarqubeConfig.baseurl')}/measures/component?componentKey=${config.get('sonarqubeConfig.projectKey')}&metricKeys=${metricKey}`
    let sonarqubeService = new SonarqubeService(apiURL);
    let dataMetrics = await sonarqubeService.getmetricStatisticsOfSonarQube();
    next(dataMetrics);
    //return res.status(200).json({ nome: 'Rafael Dias' });
}

module.exports =  getSonarDataMetric;