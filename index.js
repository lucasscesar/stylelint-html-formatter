let template = require('./template');

module.exports = function (results) {
    const warningObj = { error: 0, warning: 0 };

    if (Array.isArray(results)) {
        let total = { ...{ time: new Date() }, ...warningObj }
        let summary = {};
        let tmpSummary = {};

        let details = results.reduce((previous, current) => {
            let tmpTotal = { ...{}, ...warningObj };

            tmpSummary = current.warnings.reduce((previous, current) => {
                if (!previous[current.rule]) {
                    previous[current.rule] = { ...{}, ...warningObj };
                }

                previous[current.rule][current.severity] += 1;
                total[current.severity] += 1;
                tmpTotal[current.severity] += 1;

                return previous;
            }, {});

            Object.keys(tmpSummary).forEach((key) => {
                if (!summary[key]) {
                    summary[key] = { ...{}, ...warningObj };;
                }

                summary[key].error += tmpSummary[key].error;
                summary[key].warning += tmpSummary[key].warning;
            });

            previous.push({
                source: current.source,
                obj: current.warnings,
                error: tmpTotal.error,
                warning: tmpTotal.warning
            });

            return previous;
        }, []);

        const typeMsg = (obj) => {
            if (obj.error > 0) {
                return 'alert alert-danger';
            } else if (obj.warning > 0) {
                return 'alert alert-warning';
            } else {
                return 'alert alert-success';
            }
        }

        var makeSummary = _ => Object.keys(summary).map((key) => `<tr>
                <td>${key}</td>
                <td>${summary[key].error}</td>
                <td>${summary[key].warning}</td>
            </tr>`).join('');


        const makeHeader = _ => `<header class="header ${typeMsg(total)} p-3">
                <div class="container">
                    <h1 class="header__title">StyleLint Report</h1>
                    <p class="header__description">
                        <b class="header__error">${total.error + total.warning} problems (${total.error} errors, ${total.warning} warning)</b> - ${total.time}
                    </p>
                </div>
            </header>`;

        const makeDetails = _ => details.map((value) => `<div class="details__row">
                        <div class="details__header details__line ${typeMsg(value)}">
                            <p class="details__name">${value.source}</p>
                            <p class="details__error">${value.error + value.warning} problem (${value.error} error, ${value.warning} warnings)</p>
                        </div>
                        <div class="details__body">
                            ${value.obj.map((war) =>
            `<div class="details__line">
                                    <p class="details__local">ln: <b>${war.line}</b> col: <b>${war.column}</b></p>
                                    <p class="details__rule">${war.rule}</p>
                                    <p class="details__description">${war.text}</p>
                                    <a href="https://stylelint.io/user-guide/rules/${war.rule}" class="details__link" target="_blank">${war.rule}</a>
                                </div>`
        ).join('')}
                        </div>
                    </div>`).join('');

        return template.replace('{{HEADER}}', makeHeader()).replace('{{DETAILS}}', makeDetails()).replace('{{SUMMARY}}', makeSummary());

    }

    return false;
};