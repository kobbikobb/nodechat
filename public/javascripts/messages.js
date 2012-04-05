function Message()
{
    var self = this;
    self.name = ko.observable("");
    self.message = ko.observable("");
    self.isValid = ko.computed(function(){
        return self.name().length > 0 && self.message().length > 0;
    });
}

function Get_Cookie( check_name ) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for ( i = 0; i < a_all_cookies.length; i++ )
    {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split( '=' );


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if ( cookie_name == check_name )
        {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if ( a_temp_cookie.length > 1 )
            {
                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if ( !b_cookie_found )
    {
        return null;
    }
}

function Messages() {
    var self = this;
    self.socket = io.connect();
    self.messages = ko.observableArray();
    self.message = new Message();
    
    self.socket.emit('register', Get_Cookie('username'));
    
    self.sendMessage = function() {
        if(self.message.message() == "")
            return;
            
        self.socket.emit("message", { message: self.message.message() });
        self.message.message("");
    }
    
    self.socket.on('message', function (message) {
        self.messages.unshift(message);
    });
    
    self.socket.on('messages', function (messages) {
        self.messages(messages)
    });
}