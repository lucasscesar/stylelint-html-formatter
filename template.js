module.exports = 
`<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>StyleLint Report</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <style>
            p,
            .alert {
                margin-bottom: 0;
            }

            .details__line {
                justify-content: space-between !important;
                display: flex !important;
                align-items: center !important;
                padding: 5px 10px;
                border-radius: 0;
            }

            .details__body {
                display: none;
                border: 1px solid #ddd;
                border-width: 0 1px;
            }

            .details__header {
                font-weight: 700;
                cursor: pointer;
            }

            .details__name:before {
                content: "[+]";
                display: inline-block;
            }

            .details__header.details__header--active .details__name:before {
                content: "[-]";
            }

            .details__header.details__header--active+.details__body {
                display: block;
            }

            .details__line:not(.details__header) {
                border-bottom: 1px solid #ddd;
            }
        </style>
    </head>

    <body>
        {{HEADER}}
        <main id="teste-lint" ng-controller="testeLintController as ctrl">
            <div class="container">
                <div class="summary my-5 w-50">
                    <h2 class="mb-4">Summary</h2>
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Rules</th>
                                <th>Errors</th>
                                <th>Warnings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{SUMMARY}}
                        </tbody>
                    </table>
                </div>

                <div class="details">
                    <h2 class="mb-4">Details</h2>
                    <div class="details__table">{{DETAILS}}</div>
                </div>
            </div>
        </main>

        <script src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script>
            $(document).on('click', '.details__header', function () {
                $(this).toggleClass('details__header--active');
            });
        </script>
    </body>
</html>`;