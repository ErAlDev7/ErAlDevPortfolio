import type { Project } from './types';

/**
 * The only file you edit to add a project.
 * 1. Put screenshots in assets/projects/<Folder>/Website|Mobile/1.png, 2.png ...
 * 2. Add an entry below. `alts` needs one line per screenshot, in order.
 * 3. Run `npm run build` (it checks that files and alt texts match).
 */
export const projects: Project[] = [
  {
    slug: 'e-raporto',
    name: 'E-Raporto',
    types: ['website', 'mobile'],
    status: 'deployed',
    statusNote: 'Website is live. The mobile app is not released yet.',
    year: 2026,
    role: 'Developer, website and mobile app',
    summary:
      'A reporting platform for Albanian municipalities. Citizens report potholes, broken streetlights and overflowing bins; the system classifies each report, merges duplicates and routes it to the right department.',
    description: [
      'A citizen photographs a problem and sends it. AI classifies the report, checks it against open reports nearby so the same pothole does not turn into forty tickets, and routes it to the right municipal department and person.',
      'Every status change goes back to the citizen and to the staff dashboard in real time. Staff can override any AI suggestion.',
    ],
    stack: ['React Native', 'TypeScript', 'C# Web API', 'PostgreSQL', 'Lovable (website)'],
    liveUrl: 'https://e-raporto.lovable.app/',
    media: [
      {
        kind: 'website',
        alts: [
          'E-Raporto home page: headline “One channel for every problem in your city” next to a phone showing a pothole report.',
          'Section about duplicate detection, showing three separate reports linked to one likely shared cause.',
          'Four-step flow from creating an account to tracking a report’s status in real time.',
          'Dashboard section for municipal staff, with report categories and options for live analytics and duplicate review.',
          'Diagram of five reports about one pothole merging into a single ticket with a raised priority.',
        ],
      },
      {
        kind: 'mobile',
        alts: [
          'Sign-in screen with email and password fields and a language switch.',
          'Create-account form asking for name, email, optional phone and password.',
          'Prompt asking permission to use the phone’s location to find the user’s municipality.',
          'Confirmation of the detected municipality, with an option to choose another.',
          'Map of problems near the user, with colored markers and category filters.',
          'Report form with a photo button, a description field and problem type chips.',
          'Report form, location step: a map with a draggable marker and the street address below it.',
          'My reports tab in its empty state.',
          'Notifications tab in its empty state.',
          'Profile screen showing the user’s name, municipality and language setting.',
          'Profile account details and a form to change name and phone.',
          'Password, privacy, sign-out and delete-account options.',
        ],
      },
    ],
  },
  {
    slug: 'kthema-gati',
    name: 'KthemaGati',
    types: ['website'],
    status: 'deployed',
    statusNote: 'The mobile app is in development by the ErAlDev team.',
    year: 2026,
    role: 'Developer, website and mobile app',
    summary:
      'A vehicle maintenance platform for Albania: book a car service, follow it and manage it from your phone.',
    description: [
      'Drivers book a car service, follow it and manage their car’s maintenance from their phone.',
      'The website presents the service and its features, explains the process in four steps, links to the app downloads and lays out three subscription plans with a comparison table.',
      'The website is live. The mobile app, built with React Native, TypeScript and a C# Web API, is in development.',
    ],
    stack: ['React', 'React Native', 'TypeScript', 'C# Web API'],
    liveUrl: 'https://kthemagati.al/',
    media: [
      {
        kind: 'website',
        alts: [
          'Home page on a dark blue background with the headline “Kthema Gati” and a live service tracker card.',
          'Services section titled “Everything you need for your car” with six features: booking, real-time monitoring, certified network, digital invoices, push notifications and secure payments.',
          'How it works: four numbered steps from downloading the app to a car that is ready, above a row of figures.',
          'App download section with a phone mockup, App Store and Google Play buttons, and a “Ready to start?” call to action.',
          'Pricing section with three plans: Essential, Comfort (marked most popular) and VIP.',
          'Plan comparison table listing the features included in each plan.',
          'Pricing page with the heading “Transparent Pricing, Real Value” above the three plan cards.',
        ],
      },
    ],
  },
  {
    slug: 'nest-albania',
    name: 'NestAlbania',
    types: ['mobile'],
    status: 'undeployed',
    year: 2026,
    role: 'Developer, mobile app',
    summary:
      'A real estate app for the Albanian market with property listings, market analysis, nearby services and a community.',
    description: [
      'Built as a complete platform: a mobile app, an admin dashboard and a REST API. The app covers property search with filters, market analysis, a mortgage calculator, real estate news, a blog and community posts, and chat with agents.',
      'Not released yet.',
    ],
    stack: ['React Native', 'TypeScript', 'C# Web API', 'PostgreSQL'],
    media: [
      {
        kind: 'mobile',
        alts: [
          'Create-account screen with username, email, phone and city fields.',
          'Personalize-your-feed step asking whether the user wants to buy, rent or both.',
          'Home screen with a “Today’s Choice” section and a prompt to set preferences.',
          'Explore Properties screen with a search bar, in its empty state.',
          'Market Analysis screen with property counts, average price and price range tiles.',
          'Nearby Services screen listing bus stops with call and directions buttons.',
          'Profile screen with an avatar, a “Become an Agent” button and settings.',
          'Side menu listing preferences, reports, chats, financial consulting, community, blog and news.',
          'Sign-in screen with username and password fields.',
          'Live Consulting screen with no conversations yet.',
          'My Reports screen with a button to create the first report.',
          'Preferences screen with buy or rent choice, property types and bedroom filters.',
          'Financial Consulting screen with a mortgage calculator.',
          'Real Estate News screen with search and a list of articles.',
          'Blog & Resources screen with search and category filters.',
          'Community screen with filter chips and a create button.',
        ],
      },
    ],
  },
  {
    slug: 'ea-clean-service',
    name: 'E&A Clean Service',
    types: ['website'],
    status: 'deployed',
    year: 2026,
    role: 'Developer, website',
    summary:
      'A one-page German website for a garden and cleaning company serving private homes and apartments.',
    description: [
      'The page covers garden care, window and terrace cleaning, hedge trimming and snow clearing, plus floor cleaning and deep cleaning for apartments. It has a before-and-after gallery, a four-step process (contact, on-site assessment, work plan, execution) and customer reviews.',
      'Visitors can reach the company by phone, email, WhatsApp or the form on the page.',
    ],
    stack: ['React'],
    liveUrl: 'https://eacleanservice.com/',
    media: [
      {
        kind: 'website',
        alts: [
          'Home section with the headline “Natur in jedem Detail” in large light serif type on a pale green background.',
          'Photo of a person cleaning a moss-covered tiled roof, next to the text “Qualität, die man sieht und fühlt”.',
          'Process section on a dark green background with numbered steps starting with Kontakt and Vor-Ort-Bewertung.',
          'Before-and-after gallery with photos of windows, hedges and roofs.',
          'Contact section with phone number, opening hours and a WhatsApp button.',
        ],
      },
    ],
  },
  {
    slug: 'qendra-kazus',
    name: 'Qendra Kazus',
    types: ['website'],
    status: 'deployed',
    year: 2026,
    role: 'Developer, website',
    summary:
      'The website of a youth organization in Korçë, Albania that works on youth activism and public decision-making.',
    description: [
      'The site presents the organization’s mission, its projects (filterable by theme such as culture and environment), a media section with news posts, notifications and contact details.',
    ],
    stack: ['React'],
    liveUrl: 'https://qendrakazus.com/',
    media: [
      {
        kind: 'website',
        alts: [
          'Home page with the heading “Our Mission” and three photos of young people at events.',
          'About section titled “Empowering Youth to Lead Change” above a group photo with several national flags.',
          'Our Projects page with theme filters and project cards.',
          'Media page with activity posts, a petition and an eco-action picnic.',
          'Contact page with the organization’s address, phone, email and a photo of a workshop.',
        ],
      },
    ],
  },
  {
    slug: 'smart-bus-al',
    name: 'SmartBus Albania',
    types: ['website'],
    status: 'deployed',
    year: 2025,
    role: 'Developer, website',
    summary:
      'The website for a digital bus ticketing platform: a mobile app, validation devices and a management system for operators.',
    description: [
      'The site, in Albanian, explains the product: digital ticket purchase, route management and payments for operators, and the five steps from choosing a line to automatic registration on the bus.',
      'The website was built with v0.',
    ],
    stack: ['v0'],
    liveUrl: 'https://v0-smart-bus-albania-website.vercel.app/',
    media: [
      {
        kind: 'website',
        alts: [
          'Home page with the heading “Transformimi Dixhital i Biletave” and a phone showing the app.',
          'Section presenting the solution with feature cards for the mobile app and the QR validator.',
          'Benefits section with six cards about transparency, efficiency and security.',
          'Five-step diagram: line selection, digital payment, QR code generation, bus scan and automatic registration.',
          'Team page with the company’s values: innovation, commitment and passion.',
        ],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
