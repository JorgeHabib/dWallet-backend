const milisecondsInAYear = 31536000000;
const milisecondsInAYearBi = 31622400000;
const milisecondsInAMonth = 2678400000;
const milisecondsInADay = 86400000;


function isBisexto(year) {
    if (year%400 === 0){
        return true;
    }

    if ((year%4 === 0) && (year%100 !== 0)){
        return true;
    }

    return false;
}

function daysOfMonth(number, year) {
    if (number === 2) {
        if (isBisexto(year)){
            return 29;
        }

        return 28;
    }

    if (number === 8) {
        return 31;
    }
    
    if (number === 1 || number === 3 || number === 5 || number === 7 || number === 9 || number === 11){
        return 31;
    }

    return 30;
}

function miliseconds_to_string (ms) {
    const x = Date(ms);

    return stringifyDate(x);
}

function stringifyDate (string) {
    let num = getMonthFromAbrv(`${string[4]}${string[5]}${string[6]}`);
    let month;

    if (num >= 10){
        month = num;
    }else{
        month = `${0}${num}`;
    }

    let day = `${string[8]}${string[9]}`;
    let year = `${string[11]}${string[12]}${string[13]}${string[14]}`;

    let hour = `${string[16]}${string[17]}`;
    let minuts = `${string[19]}${string[20]}`;
    let seconds = `${string[22]}${string[23]}`;

    return `${year}-${month}-${day} ${hour}:${minuts}:${seconds}`;
}

function getDayFromAbrv(string) {
    if (string == 'Sun')
        return 1;
    if (string == 'Mon')
        return 2;
    if (string == 'Tue')
        return 3;
    if (string == 'Wed')
        return 4;
    if (string == 'Thu')
        return 5;
    if (string == 'Fri')
        return 6;
    if (string == 'Sat')
        return 7;
}

function getMonthFromAbrv(string) {
    if (string === 'Jan')
        return 1;
    if (string === 'Feb')
        return 2;
    if (string === 'Mar')
        return 3;
    if (string === 'Apr')
        return 4;
    if (string === 'May')
        return 5;
    if (string === 'Jn')
        return 6;
    if (string === 'Jul')
        return 7;
    if (string === 'Aug')
        return 8;
    if (string === 'Sep')
        return 9;
    if (string === 'Oct')
        return 10;
    if (string === 'Nov')
        return 11;
    if (string === 'Dec' )
        return 12;
}

module.exports = { isBisexto, daysOfMonth, getMonthFromAbrv, getDayFromAbrv, miliseconds_to_string }
