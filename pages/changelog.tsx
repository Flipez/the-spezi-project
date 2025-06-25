import React from 'react';

const CHANGELOG = [
  {
    date: '05.11.22',
    entries: [
      'added Eizbach Cryztal Cola',
      'added Penny Cola',
      'added afri cola ohne zucker',
      'added Gut und günstig Cola Zero',
      'added Gut und günstig Cola light',
      'added fritz kola super zero',
      'added Vita Cola Original zuckerfrei',
      'added sunfit Cola Mix',
      'added Pöllinger Cola Mix',
      'added Kuchlbauer Cola~Mix',
      'added Landbrauerei Cola-Mix',
      'added Bad Brambacher Cola Mix',
      'added Hoellen Sprudel Cubana',
      'added Almdudler Spezi',
      'added deit zuckerfrei Cola Mix',
      'added XXL Limonade Cola Mix',
    ],
  },
  {
    date: '10.06.22',
    entries: [
      'added Land L!mo - Thanks Marvin!',
      'added Frische Mische - Thanks Marvin!',
      'added Kuchlbauer Cola~Mix - Thanks Juliane!',
      'added Pöllinger Cola Mix - Thanks Juliane!',
      'added Landbrauerei Cola-Mix - Thanks Juliane!',
    ],
  },
  {
    date: '23.04.22',
    entries: [
      'added Gluggerla Cola-Mix',
      'added Nawinta Cola-Mix',
      'added Günni’s Cola-Mix',
      'added afri cola ohne zucker - Thanks Jochen!',
      'added now black cola',
      'added Jarritos Mexican Cola',
      'added Fentimans Curiosity Cola',
    ],
  },
  {
    date: '09.04.22',
    entries: [
      'added Adelholzener Cola Mix',
      'added Maisacher Cola-Mix',
      'added Paul Anderl’s Schwupp Cola-Mix',
      'added Petrusquelle Cola-Mix',
      'added Gut und günstig Cola Mix',
      'added ja! Cola-Mix',
      'updated sugar normalization from min 6.8 / max 11 to min 2.3 / max 12',
    ],
  },
  {
    date: '03.04.22',
    entries: ['added Paulaner Spezi Zero'],
  },
  {
    date: '20.03.22',
    entries: [
      'added Eichbaum Braumeisters Cola-Mix - Thanks Jochen!',
      'added alwa Limo Cola-Mix - Thanks Jochen!',
      'added Teinacher Genuss Cola-Mix - Thanks Jochen!',
      'added Ensinger Cola-Mix Limonade - Thanks Jochen!',
    ],
  },
  {
    date: '19.03.22',
    entries: [
      'added Mezzo Mix zero',
      'added Freeway Mixx Max',
      'added Freeway Cola Zero',
      'changed Community Cola Zuckerfrei rating from 3 to 4',
    ],
  },
  {
    date: '18.03.22',
    entries: ['added Auer Cola Mix - Thanks Joshi!', 'added Paul Anderl Cola-Mix'],
  },
  {
    date: '13.03.22',
    entries: [
      'added ja! Cola',
      'added Freeway Cola',
      'added Springe Cola - Thanks Patrick!',
      'added Club Cola - Thanks Patrick!',
      'added Vita Cola - Thanks Patrick!',
    ],
  },
  {
    date: '06.03.22',
    entries: [
      'added Mio Mio Cola Zero',
      'added Coca Cola Zero',
      'added Coca Cola Zero koffeinfrei',
      'added Pepsi Max',
      'added Pepsi Light',
      'added Dr. Pepper Zero',
    ],
  },
  {
    date: '25.02.22',
    entries: [
      'added Gut & Günstig Cola',
      'added Döner Cola',
      'added The Real Cola by Booster',
      'added adfri cola',
    ],
  },
];

export default function Changelog() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Changelog</h1>
      <div className="space-y-8">
        {CHANGELOG.map(({ date, entries }) => (
          <div key={date}>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{date}</h2>
            <ul className="list-disc ml-6 text-base text-gray-700 space-y-1">
              {entries.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
