const readlineSync = require('readline-sync');

const promptForCity = () => {
    const city = readlineSync.question('Enter the city: ');
    return city;
};

const promptForName = () => {
    const name = readlineSync.question('Enter the name: ');
    return name;
};

const promptSavePlace = () => {
    const response = readlineSync.question('Save this place? (1/0): ');
    return response === '1';
};

module.exports = { promptForCity, promptForName, promptSavePlace };
