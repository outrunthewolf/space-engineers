var max_engineers = 20;
var available_engineers = max_engineers;
var used_engineers = 0;
var repair_queue = [];


// Add some damage to the system
function add_damage(system, amount) {
    if(system.damage >= 100)
        return false;

    // Increase system damage
    system.damage += amount;

    if(system.damage == 100)
        system.online = false;
}

// Repeair damage on a system
function repair_damage(system, amount) {
    if(system.damage <= 0)
        return false;

    if(amount > system.damage)
        amount = system.damage;

    system.damage -= amount;
}

// Add an engineer
function add_engineer(system) {

    if(available_engineers <= 0)
        return false;

    ++system.engineer_count;
    --available_engineers;
}

// Remove an engineer
function remove_engineer(system) {

    if(available_engineers >= max_engineers)
        return false;

    --system.engineer_count;
    ++available_engineers;
}

// Anything added to the queue will be marked for fix and announce when sorted
function fix_item(e) {

    var el = event.target;
    var parent = el.getAttribute("data-parent");
    var item = el.getAttribute("data-item");

    var holder = document.getElementsByClassName(parent);
    var messages = holder[0].getElementsByClassName('r-queue');
    var message = new Element('div', {class: 'message repair', html: item + " under repair"});

    // Inject into the container and destroy the original
    message.inject(messages[0], 'top');
    el.parentElement.destroy();

    // Create a timer and event listener that fixes the item when sorted
    var zx = 0;
    var broken_item = system[parent].stability.parts[item];
    var parent_item = system[parent];

    // Add an event that fixes it when the time has passed
    document.addEvent('second', function() {
        ++zx;
        var repair_time = (broken_item.repair_time / parent_item.engineer_count);
        message.innerHTML = item + " under repair <br />" + Math.abs(zx - broken_item.repair_time);

        if(zx >= repair_time) {
            repair_damage(parent_item, broken_item.damage);
            document.removeEvent('second', arguments.callee, false);

            // Make sure we know its fixed
            document.fireEvent('flashMessage', [parent, item + " has been fixed", "success"]);

            // Remove the item from the queue
            message.destroy();
        }
    });
}

// Calculate when a subsystem might degenerate
function calculate_degredation() {
    // loop and Render All elements
    for(var i in system) {

        // Calculate some system outputs
        if(system[i].online == true) {
            if(system[i].stability) {

                // calculate the chance of a breakdown if the system is online
                var min = 1;
                var max = (3000 - system[i].stability.coeff);
                var prop = Math.floor(Math.random() * (max - min) ) + min;

                // If we get a breakdown, get a random subsystem and make it break
                if(prop == min) {
                    var items = system[i].stability.parts;
                    var n = Math.floor(Math.random() * Object.getLength(items));

                    // Show the broken object
                    var c = 0;
                    for(var g in items) {
                        if(c == n) {
                            document.fireEvent('flashMessage',
                            [
                                i,
                                g + " has failed <br /><a href='javascript:void(0)' data-parent=" + i + " data-item=" + g + ">Add to repair queue (" + items[g].repair_time + ")</a>",
                                "serious",
                                function(event) {
                                    fix_item(event);
                                }
                            ]);

                            // Does the item do damage on destruction?
                            if(items[g].damage > 0)
                                add_damage(system[i], items[g].damage)
                        }
                        ++c;
                    }

                }

            }
        }
    }
}
