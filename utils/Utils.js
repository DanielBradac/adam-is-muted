export function getDefaultName() {
    return 'Neumím si nastavit jméno';
};

// Random facts for system annoucements
export function getRandomFact() {
    const facts = [
        'Astralis nejsou a nikdy nebyli dobrý tým.',
        'Pájino only fans je pouze za 4.99 měsíčně, což je velmi férová cena.',
        'Lano je nejlepší přítel člověka.',
        'Skok z dvanáctého patra je nejlepší víkendová zábava.',
        'Adam je nejspíš na téesku muted, ale to vám nemusím říkat, protože proto jste tady, hahaha.',
        'Pokud Páji neseženeme zavčas počítač, tak její věk předběhne počet jejích ef pé es.',
        'Meloun vzkazuje, že to nebude číst.',
        'je mi to jedno, že vyrušuji, protože tu hru stejně prohrajete.'
    ]

    return facts[Math.floor(Math.random() * facts.length)];
}

// If message mateches keyword, we play an audio file instead of given message
export function getAudioFileName(message) {
    switch (message.toLowerCase()) {
        case 'sus':
            return 'sus.mp3';
        case 'amogus':
            return 'amogus.mp3';
        case 'babage':
            return 'babage.mp3';
        case 'bruh':
            return 'bruh.mp3';
        case 'gay':
            return 'gay.mp3';
        case 'oof':
            return 'oof.mp3';
        case 'what':
            return 'what.mp3';
        default:
            return '';
    }
}