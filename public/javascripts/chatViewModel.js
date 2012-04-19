function Message()
{
    var self = this;
    
    self.text = ko.observable("");
    
    self.isValid = ko.computed(function(){
        return self.text().length > 0;
    });   
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
    
    self.sendMessage = function() {
    	if(self.newMessage.text() == "")
            return;
            
        self.socket.emit("message", { text: self.newMessage.text() });
        self.newMessage.text("");
    }
}