/**
 * Single source of truth for every word on the site.
 * Everything here comes from the resume PDF (public/Rahul_Gautam_Resume.pdf).
 * Edit this file to update the site; components never hard-code resume facts.
 */

export const profile = {
  name: 'Rahul Gautam',
  firstName: 'Rahul',
  lastName: 'Gautam',
  title: 'Junior Developer',
  location: 'Pune, Maharashtra',
  photo: {
    webp480: '/rahul-480.webp',
    webp864: '/rahul-864.webp',
    jpg: '/rahul-864.jpg',
    alt: 'Portrait of Rahul Gautam in a navy blazer and patterned tie',
  },
  resumeUrl: '/Rahul_Gautam_Resume.pdf',
  resumeFileName: 'Rahul_Gautam_Resume.pdf',
  /** Resume objective, verbatim. */
  objective:
    'Motivated junior developer skilled in Java, MySQL, HTML, CSS, and JavaScript. Eager to build user-friendly solutions and grow in software development. Brings enthusiasm and a strong problem-solving mindset to the team.',
  /** Short hero introduction, written only from resume facts. */
  intro:
    'A motivated junior developer with an MCA and a web development internship behind me. I build user-friendly solutions with Java, MySQL, HTML, CSS, JavaScript and React, and I bring a strong problem-solving mindset to the team.',
  headlineStack: ['Java', 'MySQL', 'JavaScript', 'React'],
} as const

export const contact = {
  email: 'rahulgautam1342@gmail.com',
  phone: '+91 7028928328',
  phoneHref: 'tel:+917028928328',
  linkedin: {
    label: 'linkedin.com/in/rahul-gautam-56a7b1281',
    href: 'https://linkedin.com/in/rahul-gautam-56a7b1281',
  },
  github: {
    label: 'github.com/rahul-1342',
    href: 'https://github.com/rahul-1342',
  },
  location: 'Pune, Maharashtra',
} as const

export interface EducationEntry {
  degree: string
  institution: string
  place: string
  period: string
  cgpa: string
}

export const education: EducationEntry[] = [
  {
    degree: 'MCA',
    institution: 'DY Patil Institute of MCA',
    place: 'Akurdi, Pune',
    period: '2023 – 2025',
    cgpa: '7.79',
  },
  {
    degree: 'BCA',
    institution: 'P.O Nahata College',
    place: 'Bhusawal',
    period: '2020 – 2023',
    cgpa: '9.38',
  },
]

export interface Deliverable {
  id: string
  title: string
  description: string
  features: string[]
}

export const experience = {
  role: 'Web Development Intern',
  company: 'TechSolid Development',
  mode: 'Remote',
  period: 'Sept 2025 – Dec 2025',
  deliverables: [
    {
      id: 'ecommerce',
      title: 'E-commerce web application',
      description:
        'Developed and maintained a full-stack e-commerce web application.',
      features: [
        'User authentication',
        'Product listing',
        'Shopping cart',
        'Order management',
        'Secure checkout',
      ],
    },
    {
      id: 'social',
      title: 'Social media platform',
      description: 'Built a social media platform with profiles and post interactions.',
      features: [
        'User profiles',
        'Post creation',
        'Like',
        'Comment',
        'Share',
        'Edit',
        'Delete',
      ],
    },
  ] satisfies Deliverable[],
} as const

export type ProjectIcon = 'family' | 'home' | 'cart' | 'chat'

export interface Project {
  id: string
  name: string
  period: string
  /** Length stated in the resume, when there is one. */
  duration?: string
  origin: 'standalone' | 'internship'
  icon: ProjectIcon
  summary: string
  /** Resume "Objective" line, kept close to the original wording. */
  objective: string
  contribution: string[]
  achievements: string[]
  tools: string[]
  features: string[]
}

export const projects: Project[] = [
  {
    id: 'orphanage',
    name: 'Orphanage Management System',
    period: 'Aug 2024 – Dec 2024',
    duration: '4 months',
    origin: 'standalone',
    icon: 'family',
    summary:
      'An orphanage management system built in four months, with easy-to-use modules and a securely set-up database.',
    objective:
      'Helped build an Orphanage Management System in 4 months. Created easy-to-use modules that improved work speed by 30%. Handled secure database setup and worked with different teams to finish the project on time.',
    contribution: [
      'Helped build the system over 4 months',
      'Created easy-to-use modules',
      'Handled secure database setup',
      'Worked with different teams to finish the project on time',
    ],
    achievements: ['Modules improved work speed by 30%'],
    tools: ['Android Studio', 'Firebase'],
    features: [],
  },
  {
    id: 'house-renting',
    name: 'Online House Renting System',
    period: 'Aug 2023 – Dec 2023',
    origin: 'standalone',
    icon: 'home',
    summary:
      'A user-friendly online platform that connects property owners and renters, built and deployed with Java and MySQL.',
    objective:
      'Developed and deployed a user-friendly online platform using Java and MySQL, facilitating seamless connections between property owners and renters for improved accessibility.',
    contribution: [
      'Developed and deployed the platform',
      'Connected property owners and renters for improved accessibility',
    ],
    achievements: [],
    tools: ['Java', 'MySQL', 'Eclipse'],
    features: [],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce web application',
    period: 'Sept 2025 – Dec 2025',
    origin: 'internship',
    icon: 'cart',
    summary:
      'A full-stack e-commerce application developed and maintained during the TechSolid Development internship.',
    objective:
      'Developed and maintained a full-stack E-commerce web application, implementing features such as user authentication, product listing, shopping cart, order management, and secure checkout.',
    contribution: ['Developed and maintained the full-stack application'],
    achievements: [],
    tools: [],
    features: [
      'User authentication',
      'Product listing',
      'Shopping cart',
      'Order management',
      'Secure checkout',
    ],
  },
  {
    id: 'social',
    name: 'Social media platform',
    period: 'Sept 2025 – Dec 2025',
    origin: 'internship',
    icon: 'chat',
    summary:
      'A social media platform with user profiles and full post interactions, built during the same internship.',
    objective:
      'Built a Social Media Platform with functionalities including user profiles, post creation, like, comment, share, edit, and delete features.',
    contribution: ['Built the platform and its post interactions'],
    achievements: [],
    tools: [],
    features: [
      'User profiles',
      'Post creation',
      'Like',
      'Comment',
      'Share',
      'Edit',
      'Delete',
    ],
  },
]

export interface Skill {
  name: string
  /** Where the resume itself connects this skill to something. Empty means it is only listed. */
  appearsIn: string[]
}

export interface SkillGroup {
  id: 'technical' | 'tools' | 'soft'
  title: string
  note: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'technical',
    title: 'Technical skills',
    note: 'As listed in the resume',
    skills: [
      { name: 'MySQL', appearsIn: ['Online House Renting System'] },
      { name: 'HTML', appearsIn: [] },
      { name: 'CSS', appearsIn: [] },
      { name: 'JavaScript', appearsIn: ['JavaScript Training, IIT Bombay'] },
      { name: 'React', appearsIn: [] },
      { name: 'Java', appearsIn: ['Online House Renting System'] },
    ],
  },
  {
    id: 'tools',
    title: 'Project tools',
    note: 'Named in the project entries',
    skills: [
      { name: 'Android Studio', appearsIn: ['Orphanage Management System'] },
      { name: 'Firebase', appearsIn: ['Orphanage Management System'] },
      { name: 'Eclipse', appearsIn: ['Online House Renting System'] },
    ],
  },
  {
    id: 'soft',
    title: 'Soft skills',
    note: 'As listed in the resume',
    skills: [
      { name: 'Communication', appearsIn: [] },
      { name: 'Active Listening', appearsIn: [] },
      { name: 'Team Collaboration', appearsIn: [] },
      { name: 'Quick Learning', appearsIn: [] },
    ],
  },
]

export interface Certification {
  id: string
  title: string
  issuer: string
  kind: string
}

export const certifications: Certification[] = [
  {
    id: 'js-iitb',
    title: 'JavaScript Training',
    issuer: 'IIT Bombay',
    kind: 'Certificate of completion',
  },
  {
    id: 'dbms-infosys',
    title: 'Database Management System',
    issuer: 'Infosys SpringBoard',
    kind: 'Certification',
  },
  {
    id: 'c-cst',
    title: 'Industrial training on C',
    issuer: 'CST Institute, Bhusawal',
    kind: 'Successfully completed',
  },
]

export const strengths = [
  'Communication',
  'Active Listening',
  'Team Collaboration',
  'Quick Learning',
  'Problem-solving mindset',
] as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id'] | 'certifications'
