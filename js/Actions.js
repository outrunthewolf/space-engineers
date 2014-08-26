var XP = 0;



var missions = {
    1: {
        name: "",
        length: 2,
        success_params: {
            weapons: {
                "online": true
            },
            life_support: {
                "online": true
            }
        }
    },
    2: {
        name: "",
        length: 10,
        success_params: {
            shields: {
                online: true
            },
            life_support: {
                online: true
            }
        },
    }
}



// Register an event to capture messages
function register_flash_messages() {

    // Add an event to handle messages
    document.addEvent('flashMessage', function(position, announce, type, callback) {

        var holder = document.getElementsByClassName(position);
        var messages = holder[0].getElementsByClassName('messages');
        var message = new Element('div', {class: 'message ' + type, html: announce});

        // If callback, add it to the element
        if(callback)
            message.addEvent('click', function(event) {
                callback(event);
            });

        // Inject into the container
        message.inject(messages[0], 'top');
    });
}



// Create mission
function create_mission() {

}

function accept_mission(n) {
    //console.log('accepted mission: ' + n);
    //console.log(missions[n]);

    var c = 0;
    document.addEvent('second', function() {
        ++c;
        if(c == missions[n].length) {
            Object.each(missions[n].success_params, function(v, k) {
                Object.each(v, function(a, b) {
                    var sys = system[k];

                    //console.log(b);
                    console.log(sys[b] == a);

                //    console.log(system[k][b] == a);

                })
            })
        }
    });
}

function mission_success() {

}

function mission_fail() {

}

