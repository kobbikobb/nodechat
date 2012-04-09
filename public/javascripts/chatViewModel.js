function Message()
{
    var self = this;
    
    self.username = ko.observable("");
    self.text = ko.observable("");
    
    self.isValid = ko.computed(function(){
        return self.username().length > 0 && self.text().length > 0;
    });
    
    self.socket = io.connect();
        
    self.sendMessage = function() {
    	if(self.text() == "")
            return;
            
        self.socket.emit("message", { username: self.username(), text: self.text() });
        self.text("");
    }
}

function ChatViewModel() {
    var self = this;

    self.socket = io.connect();
	
    self.newMessage = new Message();

    self.messages = ko.observableArray();    
    self.socket.on('message', function (message) {
        self.messages.push(message);
    });
    self.socket.on('messages', function (messages) {
        self.messages(messages)
    });
    
    self.users = ko.observableArray();
    self.socket.on('users', function (users) {
        self.users(users);
    });
    self.socket.on('user', function (user) {
        self.users.push(user);
    });
}