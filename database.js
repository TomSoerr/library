import Dexie from 'dexie';

// --- Dexie Setup ---
const db = new Dexie('library');
db.version(1).stores({
  books:
    '++id, autor, titel, spice, bewertung, gelesen, genre, favorit, leseexemplar, verliehen, ist_reihe',
});

// --- Utility Functions ---
const showDialog = (options) => {
  if (options.type === 'warning') {
    return window.confirm(options.message) ? { response: 0 } : { response: 1 };
  }
  if (options.message) {
    alert(options.message);
  }
  return { response: 0 };
};

const sortData = (arr, order) => {
  const sortedArr = [...arr];
  switch (order) {
    case 'tit':
      sortedArr.sort((a, b) => a.titel.localeCompare(b.titel));
      break;
    case 'gen':
      sortedArr.sort((a, b) => a.genre.localeCompare(b.genre));
      break;
    case 'spi-desc':
      sortedArr.sort((a, b) => b.spice - a.spice);
      break;
    case 'spi-asc':
      sortedArr.sort((a, b) => a.spice - b.spice);
      break;
    case 'bew-desc':
      sortedArr.sort((a, b) => b.bewertung - a.bewertung);
      break;
    case 'bew-asc':
      sortedArr.sort((a, b) => a.bewertung - b.bewertung);
      break;
    default:
      sortedArr.sort((a, b) => {
        const aLastName = a.autor.split(' ').pop();
        const bLastName = b.autor.split(' ').pop();
        return aLastName.localeCompare(bLastName);
      });
  }
  return sortedArr;
};

// --- Main Service Object ---
const LibraryService = {
  // CRUD
  async getBook(id) {
    return await db.books.get(id);
  },
  async getBooks(filter = 'def', order = undefined) {
    console.warn(filter, order);
    // TODO fix DexieError2 when filtering
    let books = [];
    switch (filter) {
      case 'def':
      case undefined:
      case null:
      case '':
        books = await db.books.toArray();
        break;
      case 'gel':
        books = await db.books.where('gelesen').equals(true).toArray();
        break;
      case 'ung':
        books = await db.books.where('gelesen').equals(false).toArray();
        break;
      case 'fav':
        books = await db.books.where('favorit').equals(true).toArray();
        break;
      case 'exp':
        books = await db.books.where('leseexemplar').equals(true).toArray();
        break;
      case 'ver':
        books = await db.books.where('verliehen').equals(true).toArray();
        break;
      default:
        if (typeof filter === 'string') {
          const term = filter.toLowerCase();
          books = (await db.books.toArray()).filter(
            (book) =>
              book.autor?.toLowerCase().includes(term) ||
              book.titel?.toLowerCase().includes(term) ||
              book.genre?.toLowerCase().includes(term) ||
              book.anmerkung?.toLowerCase().includes(term) ||
              book.verliehen_an?.toLowerCase().includes(term) ||
              book.isbn?.toLowerCase().includes(term),
          );
        } else {
          books = await db.books.toArray();
        }
        break;
    }
    return order ? sortData(books, order) : books;
  },
  async saveBook(id, data) {
    // Clean up and normalize data
    const cleanData = { ...data };
    ['gelesen', 'ist_reihe', 'favorit', 'leseexemplar', 'verliehen'].forEach(
      (key) => (cleanData[key] = Boolean(cleanData[key])),
    );
    ['spice', 'bewertung'].forEach(
      (key) => (cleanData[key] = Number(cleanData[key])),
    );
    cleanData.band = cleanData.band ? Number(cleanData.band) : null;
    if (!cleanData.ist_reihe) cleanData.band = null;
    if (!cleanData.gelesen) cleanData.beendet_am = null;
    if (!cleanData.verliehen) cleanData.verliehen_an = null;

    if (id !== undefined && id !== null) {
      await db.books.update(Number(id), cleanData);
    } else {
      await db.books.add(cleanData);
    }
    return true;
  },
  async deleteBook(id) {
    const { response } = showDialog({
      message: 'Möchtest du diesen Eintrag wirklich löschen?',
      type: 'warning',
    });
    if (response === 0) {
      await db.books.delete(Number(id));
      return true;
    }
    return false;
  },
  async clearDatabase() {
    const { response } = showDialog({
      message: 'Möchtest du wirklich alle Daten in der Datenbank löschen?',
      type: 'warning',
    });
    if (response === 0) {
      await db.books.clear();
      alert('Database deleted successfully');
      return true;
    }
    return false;
  },
  // Import/Export
  async importDatabase() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              const data = JSON.parse(event.target.result);
              const dataWithoutId = data.map(({ id, ...rest }) => rest);
              await db.books.clear();
              await db.books.bulkAdd(dataWithoutId);
              alert('Data imported successfully');
              resolve(true);
            } catch (error) {
              alert(`Error parsing JSON: ${error.message}`);
              resolve(false);
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    });
  },
  async exportDatabase() {
    const data = await db.books.toArray();
    const dataWithoutId = data.map(({ id, ...rest }) => rest);
    const blob = new Blob([JSON.stringify(dataWithoutId, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'library-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  },
};

export default LibraryService;
