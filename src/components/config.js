//JSON object for literals and constants
// will be hosted in some cloud storage
// all keys are lower case, Use underscore for longer keys

let config = {
    'cloud_host': 'xxx',
    'cloud_host_credentials':'yyyy',
    'application_id': 'rm_01',
    'application_version': '0.0.2',
    'application_name': 'Reliability Measures microservices',
    'application_short_name': 'rm_microservices',
    'service_url': 'http://api.reliabilitymeasures.com/',
    'test_url': 'http://127.0.0.1:5000/',
    'services': [
        // use the shot_name key for service path and in response key.
        // Must follow Python/JS variable rules
        {'id': 0},  // left  empty on purpose
        {
            'id': 1,
            'name': 'KR20',
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
            'name': 'Scores',
            'short_name': 'scores',
            'description': 'Test scores',
            'type': 'list of floats'
        },
        {
            'id': 5,
            'name': 'Average',
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
            'description': 'Items to exclude based on IDr',
            'type': 'list of ints'  // item id might not be only ints?
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

export {get_service_config}
export {get_config}
export {convertToArrayOfObjects}
export {saveJSON}
