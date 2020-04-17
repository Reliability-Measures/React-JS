//JSON object for literals and constants
// will be hosted in some cloud storage
// all keys are lower case, Use underscore for longer keys

let config = {
    'application_id': 'rm_01',
    'application_version': '0.1.6',
    'application_name': 'Reliability Measures microservices',
    'application_short_name': 'rm_microservices',
    'application_form': 'Calculate Exam Reliability',
    'service_url': 'http://api.reliabilitymeasures.com/',
    'test_url': 'http://localhost:5001/',
    'sample_method': 'sample/',
    'keywords': {
            'item_responses': 'item_responses',
            'student_list': 'student_list',
            'item_id': 'item_id',
            'response': 'response',
            'exclude_items': 'exclude_items',
            'id': 'id',

            'exclude_threshold_1': 0.09,
            'exclude_threshold_2': 0,
            'exclude_length_1': 0.5,
            'exclude_length_2': 0.8,
            'bad_exam': 'bad_exam',

            'bad_std': 'Invalid data - No Std. Dev.',
            'bad_mean': 'Invalid data - No mean'
    },  
    'services': [
        // use the shot_name key for service path and in response key.
        // Must follow Python/JS variable rules
        {'id': 0},  // left  empty on purpose
        {
            'id': 1,
            'name': 'kr20',
            'short_name': 'kr20',
            'description': 'KR20 value',
            'type': 'float'
        },
        {
            'id': 2,
            'name': 'Item discrimination',
            'short_name': 'idr',
            'description': 'Item discrimination, Point biserial correlation coefficient',
            'type': 'list of floats'
        },
        {
            'id': 3,
            'name': 'Item difficulty',
            'short_name': 'difficulty',
            'description': 'Item difficulty',
            'type': 'list of floats'
        },
        {
            'id': 4,
            'name': 'scores',
            'short_name': 'scores',
            'description': 'Test scores',
            'type': 'list of floats'
        },
        {
            'id': 5,
            'name': 'average',
            'short_name': 'average',
            'description': 'Student Average',
            'type': 'list of floats'
        },
        {
            'id': 6,
            'name': 'Test Analysis',
            'short_name': 'analysis',
            'api_method': 'analyzeTest/',
            'description': 'The whole test analysis with all results',
            'type': 'list of items'
        },
        {
            'id': 7,
            'name': 'Weighted Scores',
            'short_name': 'weighted_scores',
            'description': 'Weighted test scores',
            'type': 'list of floats'
        },
        {
            'id': 8,
            'name': 'Weighted Average',
            'short_name': 'weighted_avg',
            'description': 'Weighted Average of Weighted test scores',
            'type': 'float'
        },
        {
            'id': 9,
            'name': 'exclude_items',
            'short_name': 'exclude',
            'description': 'Items to exclude based on idr',
            'type': 'list of item ids'
        },
        {
            'id': 10,
            'name': 'difficulty_average',
            'short_name': 'diff_avg',
            'description': 'The average difficulty',
            'type': 'float'
        },
        {
            'id': 11,
            'name': 'discrimination_average',
            'short_name': 'idr_avg',
            'description': 'The average item discrimination',
            'type': 'float'
        },
        {
            'id': 12,
            'name': 'Correct responses',
            'short_name': 'num_correct',
            'description': 'The absolute number of an item\'s correct responses',
            'type': 'list of ints'
        },
        {
            'id': 13,
            'name': 'student_response_assumptions',
            'short_name': 'assumptions',
            'description': 'The assumption of the score 0 for items that the student does not have a response for',
            'type': 'dictionary of item ids'
        }
    ] 
}


function get_service_config(service_id, key) {
    return config['services'][service_id][key]
}

function get_config(config_key){
    return config[config_key]
}

function convertToArrayOfObjects(data) {
    let keys = data.shift(),
        i = 0, k = 0,
        obj = null,
        output = [];

    for (i = 0; i < data.length; i++) {
        obj = {};

        for (k = 0; k < keys.length; k++) {
            obj[keys[k]] = data[i][k];
        }

        output.push(obj);
    }

    return output;
}

function saveJSON(dataStr, element) {
    let data = JSON.parse(document.getElementById(dataStr).innerHTML);
    let fname = "result";
    if (data.exam_info) {
        fname = data.exam_info.name;
    }
    fname = prompt("Please Enter Filename",fname + ".json");
    if (fname===null) return;
    // console.log(document.getElementById(dataStr).innerHTML);

    console.log(data);
    let json = JSON.stringify(data, null, 4);
    dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);

    let dlAnchorElem = document.getElementById(element);
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", fname);
    dlAnchorElem.click();
}

function getFilename(dname) {
    return prompt("Please enter a File name:", dname);
}

function fnExcelReport(table_id, file_name)
{
    let fname = getFilename(file_name + ".xls");
    if (fname==null) return;

    let tab_text="<table border='2px'><tr>";
    // eslint-disable-next-line
    let textRange; let j=0;
    let tab = document.getElementById(table_id); // id of table

    for(let j = 0 ; j < tab.rows.length ; j++)
    {
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<a[^>]*>|<\/a>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");
    let sa = null;
    // eslint-disable-next-line
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
/*        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        let sa=txtArea1.document.execCommand("SaveAs",true,"test.xls");*/
    }
    else {                 //other browser not tested on IE 11
        let a = document.createElement('a');
        //getting data from our div that contains the HTML table
        // eslint-disable-next-line
        let data_type = 'data:application/vnd.ms-excel';
        let url = URL.createObjectURL( new Blob( [tab_text], {type:'data:application/vnd.ms-excel'} ) );
        //a.href = data_type + ', ' + encodeURIComponent(tab_text);
        a.href = url;
        //setting the file name
        a.download = fname;
        //triggering the function
        a.click();
        //just in case, prevent default behaviour
        //e.preventDefault();
        //var sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    }

    return (sa);
}
// eslint-disable-next-line
function fnSavePDF(file_name, data)
{
    var fname = file_name;
    //var fname = getFilename(file_name + ".pdf");
    //if (fname==null) return;

        var a = document.createElement('a');
        var url = URL.createObjectURL( new Blob( [data], {type:'application/pdf'} ) );
        a.href = url;
        //setting the file name
        a.download = fname;
        //triggering the function
        a.click();
        //just in case, prevent default behaviour
        //e.preventDefault();
        //var sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

    return ;
}
/*

function exportTableToCSV(table_id, filename) {

    var fname = getFilename(filename + ".xls");
    if (fname==null) return;
    let $table = document.getElementById(table_id); // id of table
    let $rows = $table.find('tr:has(td),tr:has(th)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            let $row = $(row), $cols = $row.find('td,th');

            return $cols.map(function (j, col) {
                let $col = $(col), text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',



        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        console.log(csv);

        if (window.navigator.msSaveBlob) { // IE 10+
            //alert('IE' + csv);
            window.navigator.msSaveOrOpenBlob(new Blob([csv], {type: "text/plain;charset=utf-8;"}), "csvname.csv")
        }
        else {
            var url = URL.createObjectURL( new Blob( [csvData], {type:'text/plain'} ) );
            $(this).attr({ 'download': fname, 'href': csvData, 'target': '_blank' });
        }
}
*/

export {get_service_config}
export {get_config}
export {convertToArrayOfObjects}
export {saveJSON}
export {fnExcelReport}
