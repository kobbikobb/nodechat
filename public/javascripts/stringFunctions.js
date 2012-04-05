function getIcelandicDateString()
{
    var d = new Date();

    return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

function pad(number)
{
    if(number < 10)
        return "0" + number;
    return number;

}

exports.getIcelandicDateString = getIcelandicDateString;
