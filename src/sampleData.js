const sampleData = [
  {
    'id': 2,
    'autor': 'Isaac Asimov',
    'titel': 'Foundation',
    'spice': 3,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2021-02-15',
    'isbn': '9780553293357',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Ein Muss für Sci-Fi Fans',
    'leseexemplar': false,
    'verliehen an': 'Anna Müller',
    'verlag': 'Gnome Press',
  },
  {
    'id': 3,
    'autor': 'J.R.R. Tolkien',
    'titel': 'The Hobbit',
    'spice': 1,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Fantasy',
    'beendet am': '2020-12-20',
    'isbn': '9780345339683',
    'ist reihe': true,
    'band': 0,
    'favorit': true,
    'anmerkung': 'Ein epischer Einstieg in Mittelerde',
    'leseexemplar': false,
    'verliehen an': 'John Doe',
    'verlag': 'George Allen & Unwin',
  },
  {
    'id': 4,
    'autor': 'George Orwell',
    'titel': '1984',
    'spice': 2,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Dystopie',
    'beendet am': '2021-03-10',
    'isbn': '9780451524935',
    'ist reihe': false,
    'band': 0,
    'favorit': true,
    'anmerkung': 'Ein erschreckendes Zukunftsbild',
    'leseexemplar': false,
    'verliehen an': 'Lisa Schmidt',
    'verlag': 'Secker & Warburg',
  },
  {
    'id': 5,
    'autor': 'Mary Shelley',
    'titel': 'Frankenstein',
    'spice': 2,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Horror',
    'beendet am': '2021-04-18',
    'isbn': '9780486282114',
    'ist reihe': false,
    'band': 0,
    'favorit': false,
    'anmerkung': 'Ein zeitloser Klassiker',
    'leseexemplar': false,
    'verliehen an': 'Karl Meyer',
    'verlag': 'Lackington, Hughes, Harding, Mavor & Jones',
  },
  {
    'id': 6,
    'autor': 'Margaret Atwood',
    'titel': "The Handmaid's Tale",
    'spice': 2,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Dystopie',
    'beendet am': '2021-05-23',
    'isbn': '9780385490818',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Ein erschütternder Blick auf die Zukunft',
    'leseexemplar': false,
    'verliehen an': 'Maria Hoffmann',
    'verlag': 'McClelland and Stewart',
  },
  {
    'id': 7,
    'autor': 'Philip K. Dick',
    'titel': 'Do Androids Dream of Electric Sheep?',
    'spice': 3,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2021-06-11',
    'isbn': '9780345404473',
    'ist reihe': false,
    'band': 0,
    'favorit': false,
    'anmerkung': 'Die Vorlage für Blade Runner',
    'leseexemplar': false,
    'verliehen an': 'Peter Fischer',
    'verlag': 'Doubleday',
  },
  {
    'id': 8,
    'autor': 'Ray Bradbury',
    'titel': 'Fahrenheit 451',
    'spice': 1,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Dystopie',
    'beendet am': '2021-07-01',
    'isbn': '9781451673319',
    'ist reihe': false,
    'band': 0,
    'favorit': true,
    'anmerkung': 'Ein fesselnder Klassiker',
    'leseexemplar': false,
    'verliehen an': 'Claudia Jung',
    'verlag': 'Ballantine Books',
  },
  {
    'id': 9,
    'autor': 'Aldous Huxley',
    'titel': 'Brave New World',
    'spice': 2,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Dystopie',
    'beendet am': '2021-08-10',
    'isbn': '9780060850524',
    'ist reihe': false,
    'band': 0,
    'favorit': false,
    'anmerkung': 'Eine düstere Zukunftsvision',
    'leseexemplar': false,
    'verliehen an': 'Ursula Becker',
    'verlag': 'Chatto & Windus',
  },
  {
    'id': 10,
    'autor': 'Arthur C. Clarke',
    'titel': '2001: A Space Odyssey',
    'spice': 3,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2021-09-15',
    'isbn': '9780451452733',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Ein Meilenstein der Science Fiction',
    'leseexemplar': false,
    'verliehen an': 'Thomas Weber',
    'verlag': 'Hutchinson',
  },
  {
    'id': 11,
    'autor': 'Robert A. Heinlein',
    'titel': 'Stranger in a Strange Land',
    'spice': 3,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2021-10-20',
    'isbn': '9780441790340',
    'ist reihe': false,
    'band': 0,
    'favorit': false,
    'anmerkung': 'Ein faszinierendes Gedankenspiel',
    'leseexemplar': false,
    'verliehen an': 'Günther Schulz',
    'verlag': 'Putnam',
  },
  {
    'id': 12,
    'autor': 'William Gibson',
    'titel': 'Neuromancer',
    'spice': 3,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Cyberpunk',
    'beendet am': '2021-11-05',
    'isbn': '9780441569595',
    'ist reihe': true,
    'band': 1,
    'favorit': false,
    'anmerkung': 'Der Beginn des Cyberpunk-Genres',
    'leseexemplar': false,
    'verliehen an': 'Susanne Lehmann',
    'verlag': 'Ace Books',
  },
  {
    'id': 13,
    'autor': 'Orson Scott Card',
    'titel': "Ender's Game",
    'spice': 3,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2021-12-01',
    'isbn': '9780812550702',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Eine spannende Geschichte über Krieg und Strategie',
    'leseexemplar': false,
    'verliehen an': 'Markus Wagner',
    'verlag': 'Tor Books',
  },
  {
    'id': 14,
    'autor': 'Douglas Adams',
    'titel': "The Hitchhiker's Guide to the Galaxy",
    'spice': 2,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2022-01-10',
    'isbn': '9780345391803',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Ein humorvoller Sci-Fi Klassiker',
    'leseexemplar': false,
    'verliehen an': 'Sabrina Schmidt',
    'verlag': 'Pan Books',
  },
  {
    'id': 15,
    'autor': 'J.K. Rowling',
    'titel': "Harry Potter and the Sorcerer's Stone",
    'spice': 1,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Fantasy',
    'beendet am': '2022-02-14',
    'isbn': '9780439708180',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Der Beginn einer magischen Reise',
    'leseexemplar': false,
    'verliehen an': 'Nina Müller',
    'verlag': 'Bloomsbury',
  },
  {
    'id': 16,
    'autor': 'Stephen King',
    'titel': 'The Shining',
    'spice': 2,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Horror',
    'beendet am': '2022-03-05',
    'isbn': '9780307743657',
    'ist reihe': true,
    'band': 1,
    'favorit': false,
    'anmerkung': 'Ein gruseliger Klassiker',
    'leseexemplar': false,
    'verliehen an': 'Lena Hoffmann',
    'verlag': 'Doubleday',
  },
  {
    'id': 17,
    'autor': 'H.G. Wells',
    'titel': 'The War of the Worlds',
    'spice': 3,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2022-04-10',
    'isbn': '9780141441030',
    'ist reihe': false,
    'band': 0,
    'favorit': true,
    'anmerkung': 'Ein Meilenstein der Sci-Fi-Literatur',
    'leseexemplar': false,
    'verliehen an': 'Tom Becker',
    'verlag': 'Heinemann',
  },
  {
    'id': 18,
    'autor': 'Neil Gaiman',
    'titel': 'American Gods',
    'spice': 2,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Fantasy',
    'beendet am': '2022-05-01',
    'isbn': '9780062080233',
    'ist reihe': true,
    'band': 1,
    'favorit': false,
    'anmerkung': 'Ein episches Abenteuer durch die USA',
    'leseexemplar': false,
    'verliehen an': 'Erik Braun',
    'verlag': 'William Morrow',
  },
  {
    'id': 19,
    'autor': 'Frank Herbert',
    'titel': 'Dune Messiah',
    'spice': 2,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2022-06-10',
    'isbn': '9780441172696',
    'ist reihe': true,
    'band': 2,
    'favorit': false,
    'anmerkung': 'Die Fortsetzung des Dune-Epos',
    'leseexemplar': false,
    'verliehen an': 'Monika Fischer',
    'verlag': 'Putnam',
  },
  {
    'id': 20,
    'autor': 'Kazuo Ishiguro',
    'titel': 'Never Let Me Go',
    'spice': 1,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Dystopie',
    'beendet am': '2022-07-15',
    'isbn': '9781400078776',
    'ist reihe': false,
    'band': 0,
    'favorit': true,
    'anmerkung': 'Ein bewegendes und tiefgründiges Werk',
    'leseexemplar': false,
    'verliehen an': 'Julia Maier',
    'verlag': 'Faber and Faber',
  },
  {
    'id': 21,
    'autor': 'C.S. Lewis',
    'titel': 'The Lion, the Witch and the Wardrobe',
    'spice': 1,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Fantasy',
    'beendet am': '2022-08-05',
    'isbn': '9780064471046',
    'ist reihe': true,
    'band': 1,
    'favorit': false,
    'anmerkung': 'Ein zeitloser Fantasy-Klassiker',
    'leseexemplar': false,
    'verliehen an': 'Oliver Schmidt',
    'verlag': 'Geoffrey Bles',
  },
  {
    'id': 22,
    'autor': 'Harper Lee',
    'titel': 'To Kill a Mockingbird',
    'spice': 1,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Klassiker',
    'beendet am': '2022-09-01',
    'isbn': '9780061120084',
    'ist reihe': false,
    'band': 0,
    'favorit': true,
    'anmerkung': 'Ein wichtiges Werk über Rassismus und Gerechtigkeit',
    'leseexemplar': false,
    'verliehen an': 'Alexandra Weber',
    'verlag': 'J.B. Lippincott & Co.',
  },
  {
    'id': 23,
    'autor': 'George R.R. Martin',
    'titel': 'A Game of Thrones',
    'spice': 3,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Fantasy',
    'beendet am': '2022-10-15',
    'isbn': '9780553103540',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Der Beginn der epischen Saga',
    'leseexemplar': false,
    'verliehen an': 'Sven Köhler',
    'verlag': 'Bantam Books',
  },
  {
    'id': 24,
    'autor': 'Ursula K. Le Guin',
    'titel': 'The Left Hand of Darkness',
    'spice': 2,
    'bewertung': 5,
    'gelesen': true,
    'genre': 'Science Fiction',
    'beendet am': '2022-11-20',
    'isbn': '9780441478125',
    'ist reihe': true,
    'band': 1,
    'favorit': true,
    'anmerkung': 'Ein tiefgründiger Klassiker',
    'leseexemplar': false,
    'verliehen an': 'Clara Winter',
    'verlag': 'Ace Books',
  },
  {
    'id': 25,
    'autor': 'Herman Melville',
    'titel': 'Moby-Dick',
    'spice': 1,
    'bewertung': 4,
    'gelesen': true,
    'genre': 'Klassiker',
    'beendet am': '2022-12-10',
    'isbn': '9780142437247',
    'ist reihe': false,
    'band': 0,
    'favorit': false,
    'anmerkung': 'Ein episches Abenteuer',
    'leseexemplar': false,
    'verliehen an': 'Felix Bauer',
    'verlag': 'Harper & Brothers',
  },
];

export default sampleData;