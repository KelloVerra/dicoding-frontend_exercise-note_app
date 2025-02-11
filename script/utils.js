/*
============================= CONSTANTS =============================
*/
export const fontfamily = '"Convergence",sans-serif';
const NOTES_STORAGE_KEY = 'notescribe-note-storages-key-IVQ4mkX21';

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
  ["#0088BA", "#A0F8B0", "#43E6CD"],
  ["#4541BE", "#CFADFF", "#AE86FE"],
];

export const starting_notes = {
  id: 'notes-jT-jjsyz61J8XKiI',
  title: 'Welcome to Note Scribe!',
  body: 'Welcome to Note Scribe! This is your first note. You can archive it, delete it, alternate its color, or create new ones!\n\n\n Click here to edit this note >>>',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  archived: false,
  palette: 0
};

export const responsive_thresholds = [
  '850px',
  '600px',
  '400px'
]

export const event_keys = {
  query_search: 'ONSEARCHQUERIED',
  note_display_rerender: 'NOTEDISPLAYRERENDER',
  note_display_header_rerender: 'NOTEDISPLAYHEADERRERENDER',
  show_noteedit_interface: 'SHOWINTERFACE',
  save_noteedit_interface: 'SAVEINTERFACECHANGES',
  hide_noteedit_interface: 'HIDEINTERFACE',
  delete_note: 'DELETENOTE',
  create_note: 'CREATENOTE',
}

export const dummyNotesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

const edit_note_interface = {
  is_active: false,
  note_item: null,
  interface_element_instance: null,
};



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
 * @returns {String} of unique id
 */
export function unique() {
  return btoa(Number(new Date())).replaceAll('=','');
}

/**
 * @returns {{id, title, body, createdAt, updatedAt, archived, palette}} of the note with unique id
 */
function newNote() {
  return {
    id: `notes-${unique()}`,
    title: '',
    body: '',
    createdAt: (new Date()).toISOString(),
    updatedAt: (new Date()).toISOString(),
    archived: false,
    palette: Math.floor(Math.random() * note_palette.length),
  };
}


/**
 * @returns {Boolean} depends on the stringput
 */
export function booleanize(stringput) {
  return stringput.toLowerCase() === "true";
}

/**
 * @param {Integer} mode - sets the mode, 0 = img, 1 = svg
 * @param {Integer} d - mode=0 acts as src, mode=1 acts as the inline svg string
 * @returns {HTMLImageElement}
 */
export function initImage(mode, d='') {

  let img = null;
  switch(mode) {
    case 0:
      img = document.createElement('img');
      img.setAttribute('src', d);
      break;
    case 1:
      img = new DOMParser().parseFromString(d, 'image/svg+xml').documentElement;
      break;
  }

  return img;
}

/**
 * Checks storage availability and initialize if possible
 */
export function storageReady() {
  if (typeof Storage === null) window.alert('Storage is not available, please enable local storage');

  if (!localStorage.getItem(NOTES_STORAGE_KEY)) localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify([starting_notes]));
}

/**
 * @param {Boolean} archived
 * @returns {Array} of specific notes from local storage
 */
export function getNotes(archived) {
  return JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY)).filter(v => v.archived === archived);
}

/**
 * @returns {Array} of every notes from local storage
 */
function getAllNotes() {
  return JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY));
}

/**
 * Saves data to local storage
 * @param {Array} d the updated note data
 */
function saveNotes(d) {
  if (!(typeof d === typeof [])) return;
  return localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(d));
}

/**
 * Saving numbers by determining ideal timeframe eg. 60 minutes => 1 hour, 48 hour => 2 days
 * @param {Date} date 
 * @returns {[amount_range:int, unit_range:String]}
 */
function getIdealTimeRange(date) {
  const past_time_ms = parseInt(date.getTime());
  const now_time_ms = (new Date()).getTime();
  const range_time_min = (now_time_ms-past_time_ms) / 1000 / 60;
  let range_time = 0;
  let unit_time = '';

  if (Math.floor(range_time_min) < 60) {                      // -- minute
    range_time = Math.floor(range_time_min);
    unit_time = 'menit';
  }
  else if (Math.floor(range_time_min / 60) < 24) {            // -- hour
    range_time = Math.floor(range_time_min / 60);
    unit_time = 'jam';
  }
  else if (Math.floor(range_time_min / 60 / 24) < 30) {       // -- day
    range_time = Math.floor(range_time_min / 60 / 24);
    unit_time = 'hari';
  }
  else if (Math.floor(range_time_min / 60 / 24 / 30) < 12) {  // -- month
    range_time = Math.floor(range_time_min / 60 / 24 / 30);
    unit_time = 'bulan';
  }
  else {                                                      // -- year
    range_time = Math.floor(range_time_min / 60 / 24 / 30 / 12);
    unit_time = 'tahun';
  }
  
  return [range_time, unit_time];
}

/**
 * Transforms ISO string into a display of when the last time it was edited
 * @param {string} ISOtime 
 * @returns {String}
 */
export function formatEditDate2IdealTimeRange(ISOtime) {
  const up_date = new Date(ISOtime);
  const [amount_range, unit_range] = getIdealTimeRange(up_date);

  return `${amount_range} ${unit_range} yang lalu`;
}




/*
=========================== EVENT HANDLER ===========================  
*/
function on_load() {
  storageReady();
}

function on_create_note() {
  const new_note = newNote();
  const notes = getAllNotes();
  notes.push(new_note);
  saveNotes(notes);
  document.dispatchEvent(new CustomEvent(event_keys.show_noteedit_interface, {detail: {
    id: new_note.id,
    pseudo_palette: 0
  }}));
}

function on_show_interface(e) {
  if (edit_note_interface.is_active) return;

  const id = e.detail.id;
  const notes = getAllNotes();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      edit_note_interface.note_item = notes[i];
      if (!notes[i].palette) edit_note_interface.note_item.palette = parseInt(e.detail.pseudo_palette);
      if (!notes[i].updatedAt) edit_note_interface.note_item.updatedAt = new Date().toISOString();

      create_edit_note_interface();
      break;
    }
  }
}

function create_edit_note_interface() {
  const note_item = edit_note_interface.note_item;
  if (!note_item) return;

  edit_note_interface.is_active = true;
  const edit_interface_element = document.createElement('edit-note-interface');

  // simple data encryption
  edit_interface_element.setAttribute('id', btoa(note_item.id));
  edit_interface_element.setAttribute('archive', btoa(note_item.archived));
  edit_interface_element.setAttribute('title', btoa(note_item.title));
  edit_interface_element.setAttribute('body', btoa(note_item.body));
  edit_interface_element.setAttribute('palette', btoa(note_item.palette));

  document.body.appendChild(edit_interface_element);
  edit_note_interface.interface_element_instance = edit_interface_element;
}

function on_save_interface(e) {
  if (!edit_note_interface.is_active) return;

  const id = e.detail.note_id;
  const new_title = e.detail.note_new_title;
  const new_body = e.detail.note_new_body;
  const new_palette = e.detail.note_new_palette;
  const archive = e.detail.note_archive;
  const notes = getAllNotes();

  for (let i = 0; i < notes.length; i++) {

    if (notes[i].id === id) {
      notes[i].title = new_title;
      notes[i].body = new_body;
      notes[i].palette = parseInt(new_palette);
      notes[i].archived = archive;
      notes[i].updatedAt = (new Date()).toISOString();
      
      saveNotes(notes);
      document.dispatchEvent(new Event(event_keys.hide_noteedit_interface));
      
      break;
    }
    
  }
}

function on_hide_edit_note_interface() {
  const instance = edit_note_interface.interface_element_instance;
  if (!instance) return;

  document.body.removeChild(instance);
  edit_note_interface.interface_element_instance = null;
  edit_note_interface.is_active = false;
  document.dispatchEvent(new Event(event_keys.note_display_rerender));
}

function on_delete_note(e) {
  const id = e.detail;
  const notes = getAllNotes();
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      saveNotes(notes);
      document.dispatchEvent(new Event(event_keys.hide_noteedit_interface));
      document.dispatchEvent(new Event(event_keys.note_display_rerender));
      break;
    }
  }
}

document.addEventListener(event_keys.show_noteedit_interface, on_show_interface);
document.addEventListener(event_keys.save_noteedit_interface, on_save_interface);
document.addEventListener(event_keys.hide_noteedit_interface, on_hide_edit_note_interface);
document.addEventListener(event_keys.delete_note, on_delete_note);
document.addEventListener(event_keys.create_note, on_create_note);
document.addEventListener('DOMContentLoaded',on_load);