// Define the structure of an Event
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  fee?: string;
  rules?: string | string[];
  posterSrc: string;
}

// Define the updated structure of a Department
export interface Department {
  id: number;
  slug: string;
  name: string;
  colors: {
    bg: string;
    fg: string;
  };
  events: Event[];
  

}

// The main data array for 11 departments
export const departmentData: Department[] = [
  {
    id: 1,
    slug: 'ad',
    name: 'Artificial Intelligence & Data Science',
    colors: { bg: '#FFECD5', fg: '#882D33' },
    events: [
      { id: 'ad1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
       { id: 'ad2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'ad3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'ad4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'ad5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'ad6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'ad7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'ad8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 2,
    slug: 'cs',
    name: 'Computer Science',
    colors: { bg: '#F0EDE4', fg: '#B3542E' },
    events: [
      { id: 'cs1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'cs2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'cs3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'cs4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'cs5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'cs6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'cs7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'cs8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 3,
    slug: 'mba',
    name: 'Business Administration (MBA)',
    colors: { bg: '#F7F0DA', fg: '#217868' },
    events: [
      { id: 'mba1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'mba2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'mba3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'mba4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'mba5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'mba6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'mba7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'mba8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 4,
    slug: 'ca',
    name: 'Computer Applications',
    colors: { bg: '#FFFFEC', fg: '#9767A8' },
    events: [
      { id: 'ca1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'ca2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'ca3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'ca4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'ca5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'ca6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'ca7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'ca8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 5,
    slug: 'mca',
    name: 'Master of Computer Applications',
    colors: { bg: '#F0FAFF', fg: '#2D357E' },
    events: [
      { id: 'mca1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'mca2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'mca3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'mca4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'mca5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'mca6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'mca7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'mca8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 6,
    slug: 'ece',
    name: 'Electronics & Communication',
    colors: { bg: '#FFFAF3', fg: '#CA9942' },
    events: [
      { id: 'ece1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'ece2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'ece3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'ece4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'ece5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'ece6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'ece7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'ece8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 7,
    slug: 'er',
    name: 'Electronics & Robotics',
    colors: { bg: '#FBFBFB', fg: '#CB7579' },
    events: [
      { id: 'er1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'er2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'er3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'er4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'er5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'er6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'er7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'er8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 8,
    slug: 'eee',
    name: 'Electrical & Electronics',
    colors: { bg: '#F6F8FF', fg: '#272059' },
    events: [
      { id: 'eee1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'eee2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'eee3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'eee4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'eee5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'eee6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'eee7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'eee8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 9,
    slug: 'civil',
    name: 'Civil Engineering',
    colors: { bg: '#FAF7F0', fg: '#596066' },
    events: [
      { id: 'ce1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'ce2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'ce3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'ce4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'ce5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'ce6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'ce7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'ce8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 10,
    slug: 'me',
    name: 'Mechanical Engineering',
    colors: { bg: '#FEFADF', fg: '#BC6C25' },
    events: [
      { id: 'me1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'me2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'me3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'me4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'me5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'me6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'me7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'me8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 11,
    slug: 'cy',
    name: 'Cyber Security',
    colors: { bg: '#E1E5D5', fg: '#273617' },
    events: [
      { id: 'cy1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'cy2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'cy3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'cy4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'cy5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'cy6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'cy7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'cy8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 1,
    slug: 'general',
    name: 'General Events',
    colors: { bg: '#E1E5D5', fg: '#273617' },
    events: [
      { id: 'cy1', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
       { id: 'cy2', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
        { id: 'cy3', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
         { id: 'cy4', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
          { id: 'cy5', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
           { id: 'cy6', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
      { id: 'cy7', title: 'Data Visualization Challenge', description: 'A competition to create the most insightful data visuals.', date: 'SEP 19',posterSrc:'/assets/poster.png' },
       { id: 'cy8', title: 'AI Ethics Workshop', description: 'Exploring the ethical implications of modern AI.', date: 'SEP 18',posterSrc:'/assets/poster.png' },
    ],
  },
];