var XP = 0;


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
