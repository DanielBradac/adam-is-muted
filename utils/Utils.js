export function getRandomName() {
    const dataSet = [
        'Debílek',
        'Amogus',
        'Opičák',
        'Opičácký debílek',
        'Tvůj táta'
    ];
    const index = (Math.floor(Math.random() * dataSet.length));
    return dataSet[index];
};
