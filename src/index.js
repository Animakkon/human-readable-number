function getNumeral(x) {
    switch (x) {
        case 0: return 'zero';
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        case 6: return 'six';
        case 7: return 'seven';
        case 8: return 'eight';
        case 9: return 'nine';
    };
}

function getDecimal(x) {
    switch (x) {
        case 1: return 'ten';
        case 2: return 'twenty';
        case 3: return 'thirty';
        case 4: return 'forty';
        case 5: return 'fifty';
        case 6: return 'sixty';
        case 7: return 'seventy';
        case 8: return 'eighty';
        case 9: return 'ninety';
    }
}

function getTeen(x) {
    switch (x) {
        case 11: return 'eleven';
        case 12: return 'twelve';
        case 13: return 'thirteen';
        case 14: return 'fourteen';
        case 15: return 'fifteen';
        case 16: return 'sixteen';
        case 17: return 'seventeen';
        case 18: return 'eighteen';
        case 19: return 'nineteen';
    }
}

function getStatus(x) {
    switch (x) {
        case 1: return ' hundred';
        case 2: return ' thousand';
    }
}
module.exports = function toReadable(number) {
    let cntr = 1, iter = 0; //счетчик сотня или тысяча
    let result = "", Finally = "";

    if (number < 10) {
        Finally = getNumeral(number);
    } else {
        do {
            result = "";
            iter = Math.floor(number % 1000);
            number = (number - iter) / 1000;

            while (iter > 0) {
                if (iter < 10) {
                    if (result != "") result += " ";
                    result += getNumeral(iter);
                    iter = 0;
                } else if (iter >= 100) {
                    if (result != "") result += " ";
                    result = getNumeral(Math.floor(iter / 100)) + getStatus(1);
                    iter = Math.floor(iter % 100);
                } else if ((Math.floor(iter / 10) >= 1 && Math.floor(iter % 10) == 0) || (Math.floor(iter / 10) > 1 && Math.floor(iter % 10) >= 0)) {
                    if (result != "") result += " ";
                    result += getDecimal(Math.floor(iter / 10));
                    iter = Math.floor(iter % 10);
                } else if (Math.floor(iter / 10) == 1 && Math.floor(iter % 10 > 0)) {
                    if (result != "") result += " ";
                    result += getTeen(iter);
                    iter = 0;
                }
            }
            if (cntr >= 2) result += getStatus(cntr);
            Finally = Finally != "" ? result + " " + Finally : result;
            if (number > 0) cntr++;

        } while (number != 0);
    }
    return Finally;
}