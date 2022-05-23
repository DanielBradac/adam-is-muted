export function getRandomName() {
    const dataSet = [
        'Opice',
        'Debílek',
        'Amogus',
        'Opičák'
    ];
    const index = (Math.floor(Math.random() * dataSet.length));
    return dataSet[index];
};
