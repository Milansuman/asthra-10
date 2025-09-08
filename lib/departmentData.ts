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
    ],
  },
  {
    id: 2,
    slug: 'cs',
    name: 'Computer Science',
    colors: { bg: '#F0EDE4', fg: '#B3542E' },
    events: [
      { id: 'cs1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 3,
    slug: 'mba',
    name: 'Master of Business Administration',
    colors: { bg: '#F7F0DA', fg: '#217868' },
    events: [
      { id: 'mba1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 4,
    slug: 'ca',
    name: 'Computer Science Engineering (artificial intelligence)',
    colors: { bg: '#FFFFEC', fg: '#9767A8' },
    events: [
      { id: 'ca1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 5,
    slug: 'mca',
    name: 'Master of Computer Applications',
    colors: { bg: '#F0FAFF', fg: '#2D357E' },
    events: [
      { id: 'mca1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 6,
    slug: 'ece',
    name: 'Electronics & Communication Engineering',
    colors: { bg: '#FFFAF3', fg: '#CA9942' },
    events: [
      { id: 'ece1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 7,
    slug: 'er',
    name: 'Electronics & Computer Engineering',
    colors: { bg: '#FBFBFB', fg: '#CB7579' },
    events: [
      { id: 'er1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 8,
    slug: 'eee',
    name: 'Electrical & Electronics Engineering',
    colors: { bg: '#F6F8FF', fg: '#272059' },
    events: [
      { id: 'eee1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 9,
    slug: 'civil',
    name: 'Civil Engineering',
    colors: { bg: '#FAF7F0', fg: '#596066' },
    events: [
      { id: 'civil1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 10,
    slug: 'mec',
    name: 'Mechanical Engineering',
    colors: { bg: '#FEFADF', fg: '#BC6C25' },
    events: [
      { id: 'mec1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 11,
    slug: 'cc',
    name: 'Cyber Security',
    colors: { bg: '#E1E5D5', fg: '#273617' },
   events: [
      { id: 'cy1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
  {
    id: 12,
    slug: 'general',
    name: 'General Events',
    colors: { bg: '#FFFFFF', fg: '#0B91A6' },
    events: [
      { id: 'general1', title: 'AI Ethics Workshop', description:`St. Joseph’s College of Engineering and Technology, Palai, established by the Diocesan Technical Education Trust,
                                is a premier institution offering quality technical education. With NBA accreditation for five B.Tech programs,
                                NAAC A-grade recognition, and ISO certifications, it ensures academic excellence and holistic development.
                                The college emphasizes discipline, eco-friendliness, and innovative teaching methods, supported by state-of-the-art`, date: 'SEP 18',fee:'1999',rules:["Event Description Event Description Event Description Event Description Event Description",
        "Rule 2 Event Description Event Description Event Description Event Description",
        "Rule 3 Event Description Event Description Event Description Event Description"],posterSrc:'/assets/poster.png' },
    ],
  },
];