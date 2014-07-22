
var max_power= 20;
var available_power = max_power;
var used_power = 0;
var count = 0;
var over_power_timer = 600; // seconds
var over_power_count = 0;


init();


function init() {

    var holder = document.getElementById("holder");

    // create the power bar
    var power = "<div class='box av_power'>" +
                    "<ul>" +
                        "<li>Available Power<div class='power fill'>" + available_power + "</div></li>" +
                        "<li>Available Engineers<div class='engineer fill'>" + available_engineers + "</div></li>" +
                    "</ul>" +
                "</div>";
    holder.innerHTML += power;

    // create the power bar
    /*
    var spares = "<div class='box av_spares'>" +
                    "<ul>" +
                        "<li>Repair Queue<div class='fill'>" + available_spares + "</div></li>"
                    "</ul>" +
                "</div>";
    holder.innerHTML += spares;
    */

    // Create the various boxes
    for(var i in system) {
        var html = "<div class='box " + i + "'><h3>" + system[i].title + "</h3>" +
                        "<a class='add_" + i + "' href='javascrip:void(0)'>++</a>" +
                        "<a class='remove_" + i + "' href='javascript:void(0)'>--</a>" +
                        "<ul>" +
                            "<li>Power<div class='fill power'>" + system[i].power + "</div></li>" +
                            "<li>Output<div class='fill output'></div></li>" +
                            "<li>Damage<div class='fill damage'></div></li>" +
                            "<li>Online<div class='fill status'></div></li>" +
                        "</ul>" +
                        "<div class='engineers'>" +
                            "<a class='add_eng_" + i + "' href='javascrip:void(0)'>++</a>" +
                            "<a class='remove_eng_" + i + "' href='javascript:void(0)'>--</a>" +
                            "<div class='count'>" + system[i].engineer_count + "</div>" +
                        "</div>" +
                        "<div class='messages'></div>" +
                        "<div class='r-queue'></div>"
                    "</div>";
        holder.innerHTML += html;
    }

    // Add all power click events
    $$(".add_shields").addEvent('click', function() {
        add_power(system.shields);
    });
    $$(".add_life_support").addEvent('click', function() {
        add_power(system.life_support);
    });
    $$(".add_weapons").addEvent('click', function() {
        add_power(system.weapons);
    });
    $$(".add_engines").addEvent('click', function() {
        add_power(system.engines);
    });

    // Add engineer click events
    $$(".add_eng_shields").addEvent('click', function() {
        add_engineer(system.shields);
    });
    $$(".add_eng_life_support").addEvent('click', function() {
        add_engineer(system.life_support);
    });
    $$(".add_eng_weapons").addEvent('click', function() {
        add_engineer(system.weapons);
    });
    $$(".add_eng_engines").addEvent('click', function() {
        add_engineer(system.engines);
    });

    // Remove power click events
    $$(".remove_shields").addEvent('click', function() {
        remove_power(system.shields);
    });
    $$(".remove_life_support").addEvent('click', function() {
        remove_power(system.life_support);
    });
    $$(".remove_weapons").addEvent('click', function() {
        remove_power(system.weapons);
    });
    $$(".remove_engines").addEvent('click', function() {
        remove_power(system.engines);
    });

    // Remove engineer click events
    $$(".remove_eng_shields").addEvent('click', function() {
        remove_engineer(system.shields);
    });
    $$(".remove_eng_life_support").addEvent('click', function() {
        remove_engineer(system.life_support);
    });
    $$(".remove_eng_weapons").addEvent('click', function() {
        remove_engineer(system.weapons);
    });
    $$(".remove_eng_engines").addEvent('click', function() {
        remove_engineer(system.engines);
    });

    register_flash_messages();

}

// Add some power to a system
function add_power(system) {

    if(available_power <= 0)
        return false;

    if(system.damage == 100)
        return false;

    // Allocate some power of the main stack
    ++system.power;
    --available_power;
    used_power = max_power - available_power;

    // Calculate some system outputs
    system.output = (system.power / (system.power_ratio + system.damage)) * 100

    // If the system online?
    if(system.output >= system.operational_output) {
        system.online = true;
        system.offline_warning = true;
    }
}

// Remove power from a system
function remove_power(system) {

    if(system.power <= 0)
         return false;

    --system.power;
    ++available_power;
    used_power = max_power - available_power;

    // Calculate some system outputs
    system.output = (system.power / (system.power_ratio + system.damage)) * 100

    // Is the system online?
    if(system.output < system.operational_output)
        system.online = false;
}


// Render some stats
function render() {

    ++count;
    if(count >= 60) {
        document.fireEvent('second');
        count = 0;
    }

    // loop and Render All elements
    for(var i in system) {

        // Calculate some system outputs
        system[i].output = (system[i].power / (system[i].power_ratio + system[i].damage)) * 100

        // Is the system online?
        if(system[i].output < system[i].operational_output) {
            system[i].online = false;

            if(system[i].offline_warning) {
                document.fireEvent('flashMessage', [i, system[i].title + " offline", "warning"]);
                system[i].offline_warning = false;
                system[i].online_warning = true;
            }
        }else{
            system[i].online = true;

            if(system[i].online_warning) {
                document.fireEvent('flashMessage', [i, system[i].title + " online", "info"]);
                system[i].online_warning = false;
            }
        }

        // Render some elements
        var el = document.getElementsByClassName(i);

        // Clear out old messages, only ones that are info or success
        var ms = el[0].getElementsByClassName('message');
        if(ms.length > 3) {
            for(var y = 3; y < ms.length; ++y) {
                if((ms[y].hasClass("info")) || (ms[y].hasClass("success")) || (ms[y].hasClass("warning"))) {
                    ms[y].destroy();
                }
            }
        }

        // Fill all items
        var power = el[0].getElementsByClassName("power");
        var output = el[0].getElementsByClassName("output");
        var damage = el[0].getElementsByClassName("damage");
        var status = el[0].getElementsByClassName("status");
        var engineers = el[0].getElementsByClassName("count");

        // Update the styles
        try {

            power[0].style.height = (system[i].power * 10) + "px";
            power[0].innerHTML = (system[i].power).toFixed(2);

            output[0].style.height = system[i].output + "px";
            output[0].innerHTML = (system[i].output).toFixed(2);

            damage[0].style.height = system[i].damage + "px";

            status[0].innerHTML = system[i].online;

            engineers[0].innerHTML = system[i].engineer_count;
        }catch(ex) {
            console.log(ex);
        }
    }

    // Update the power bar
    var el = document.getElementsByClassName("av_power");
    var power = el[0].getElementsByClassName("power");
    power[0].innerHTML = available_power;
    power[0].style.height = (available_power * 5) + 'px';

    // Update the engineer bar
    var el = document.getElementsByClassName("av_power");
    var power = el[0].getElementsByClassName("engineer");
    power[0].innerHTML = available_engineers;
    power[0].style.height = (available_engineers * 5) + 'px';
}


// Add damage to any system that has been overpowered
function over_power() {

    // loop all systems and check if we're overpowered
    ++over_power_count;
    if(over_power_count >= over_power_timer) {
        for(var i in system) {
            // Calculate some system outputs
            if(system[i].output > 100) {
                add_damage(system[i], 1);
                document.fireEvent('flashMessage', [i, system[i].title + " damaged due to overloading", "serious"]);
            }
        }
        over_power_count = 0;
    }
}

// Degenerate a subsystem, i.e. remove power from it
function degenerate_power(system, amount) {

    // if the system is online degenerate some power
    system.output = system.output - amount;
    console.log('updated');
    console.log(system);

    // if the system is offline... do nothing
    // if we degenerated, we need to allow the system to
    // regenerate to its previous position
}
