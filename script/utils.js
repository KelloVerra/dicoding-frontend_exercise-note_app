/*
============================= CONSTANTS =============================
*/
export const fontfamily = '"Convergence",sans-serif';

export const palette = {
  'primary0': '#1A00FF',
  'secondary0': '#FFFFFF',
  'secondary1': '#EBF5F8',
  'overlay': '#111624',
};

export const note_palette = [
  ["#A200CB", "#FDB4B5", "#FB8AB3"],
  ["#1A00FF", "#A0D3F8", "#90AEF9"],
  ["#E91B00", "#FFE5AD", "#FFC09E"],
  ["#FFE5AD", "", ""],
  ["#FFE5AD", "", ""],
];

export const notes = [];

export const on_search_queried_event = new Event('ONSEARCHQUERIED');
document.addEventListener(on_search_queried_event.type, on_search_queried_handler);

export const dummynotedata = [
    {
      id: 'notes-jT-jjsyz61J8XKiI',
      title: 'Welcome to Notes, Dimas!',
      body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
      createdAt: '2022-07-28T10:03:12.594Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-aB-cdefg12345',
      title: 'Meeting Agenda',
      body: 'Discuss project updates and assign tasks for the upcoming week.',
      createdAt: '2022-08-05T15:30:00.000Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-XyZ-789012345',
      title: 'Shopping List',
      body: 'Milk, eggs, bread, fruits, and vegetables.',
      createdAt: '2022-08-10T08:45:23.120Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-1a-2b3c4d5e6f',
      title: 'Personal Goals',
      body: 'Read two books per month, exercise three times a week, learn a new language.',
      createdAt: '2022-08-15T18:12:55.789Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-LMN-456789',
      title: 'Recipe: Spaghetti Bolognese',
      body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
      createdAt: '2022-08-20T12:30:40.200Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-QwErTyUiOp',
      title: 'Workout Routine',
      body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
      createdAt: '2022-08-25T09:15:17.890Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-abcdef-987654',
      title: 'Book Recommendations',
      body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
      createdAt: '2022-09-01T14:20:05.321Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-zyxwv-54321',
      title: 'Daily Reflections',
      body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
      createdAt: '2022-09-07T20:40:30.150Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-poiuyt-987654',
      title: 'Travel Bucket List',
      body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
      createdAt: '2022-09-15T11:55:44.678Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-asdfgh-123456',
      title: 'Coding Projects',
      body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
      createdAt: '2022-09-20T17:10:12.987Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-5678-abcd-efgh',
      title: 'Project Deadline',
      body: 'Complete project tasks by the deadline on October 1st.',
      createdAt: '2022-09-28T14:00:00.000Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-9876-wxyz-1234',
      title: 'Health Checkup',
      body: 'Schedule a routine health checkup with the doctor.',
      createdAt: '2022-10-05T09:30:45.600Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-qwerty-8765-4321',
      title: 'Financial Goals',
      body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
      createdAt: '2022-10-12T12:15:30.890Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-98765-54321-12345',
      title: 'Holiday Plans',
      body: 'Research and plan for the upcoming holiday destination.',
      createdAt: '2022-10-20T16:45:00.000Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
    {
      id: 'notes-1234-abcd-5678',
      title: 'Language Learning',
      body: 'Practice Spanish vocabulary for 30 minutes every day.',
      createdAt: '2022-10-28T08:00:20.120Z',
      archived: false,
      palette: Math.floor(Math.random() * 3)
    },
  ];




/*
============================= UTILITIES =============================
*/

/**
 * @param {String} color
 * @param {Number} opacity in percentage (not float)
 * @returns {String} color-mix css function with transparency
 */
export function css_transparent(color, opacity) {
    if(opacity === 0) return 'transparent';
    if(opacity === 1) return 'color';
    return `color-mix(in srgb, ${color} ${opacity}%, transparent)`
}

/**
 * @param {Boolean} archived note type
 * @returns {Array} of the requested note type
 */
export function getNotes(archived) {
    return notes.filter(v => v.archived === archived);
}

/**
 * @returns {String} of unique id
 */
export function unique() {
    return btoa(Number(new Date())).replaceAll('=','');
}

/**
 * @returns {Object} of the note with unique id
 */
export function newNote() {
    return {
      id: `notes-${unique()}`,
      title: 'Untitled Note',
      body: '...',
      createdAt: (new Date()).toISOString(),
      archived: false,
      palette: Math.floor(Math.random() * 3)
    };
}

/**
 * @returns {Boolean} depends on the stringput
 */
export function booleanize(stringput) {
    return stringput.toLowerCase() === "true";
}

/**
 * @param {Integer} mode - sets the mode, 0 = default img, 1 = special svg
 * @returns {HTMLImageElement}
 */
export function initImage(mode, path='') {

  let img = null;
  switch(mode) {
    case 0:
      img = document.createElement('img');
      img.setAttribute('src', path);
      break;
    case 1:
      img = document.createElementNS('http://www.w3.org/2000/svg', 'img');
      img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', path);
      break;
  }

  return img;
}




/*
=========================== EVENT HANDLER ===========================  
*/
function on_search_queried_handler() {
    const query = document.querySelector('#search_input').value;
    console.log(query)
}

function on_load() {
    console.log('a')
}
document.addEventListener('DOMContentLoaded',on_load);