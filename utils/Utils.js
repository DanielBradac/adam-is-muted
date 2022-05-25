

export function getDefaultName() {
    return 'Neumím si nastavit jméno';
};

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
