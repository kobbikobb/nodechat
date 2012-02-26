function Message()
{
    var self = this;

    self.name = ko.observable("");
    self.message = ko.observable("");

    self.isValid = ko.computed(function(){
        return self.name().length > 0 && self.message().length > 0;
    });
}

function AppViewModel() {

    var self = this;

    self.socket = io.connect();

    self.messages = ko.observableArray();

    self.message = new Message();

    self.sendMessage = function() {
        self.socket.emit("message", { name: self.message.name(), message: self.message.message() });
        self.message.message("");
    }

    self.socket.on('message', function (message) {
        self.messages.unshift(message);
    });

    self.socket.on('messages', function (messages) {
        self.messages(messages)
    });
}

$(function() {
    ko.applyBindings(new AppViewModel());
});