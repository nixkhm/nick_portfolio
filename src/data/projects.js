import uac1 from '../assets/utility_account_connection/utility_account_connection_1.jpg';
import uac2 from '../assets/utility_account_connection/utility_account_connection_2.jpg';
import uac3 from '../assets/utility_account_connection/utility_account_connection_3.jpg';
import uac4 from '../assets/utility_account_connection/utility_account_connection_4.jpg';
import uac5 from '../assets/utility_account_connection/utility_account_connection_5.jpg';
import uac6 from '../assets/utility_account_connection/utility_account_connection_6.jpg';
import uac7 from '../assets/utility_account_connection/utility_account_connection_7.jpg';
import uac8 from '../assets/utility_account_connection/utility_account_connection_8.jpg';

import dbr1 from '../assets/3d_reconstruction/3DBR_1.png';
import dbr2 from '../assets/3d_reconstruction/3DBR_2.png';
import dbr3 from '../assets/3d_reconstruction/3DBR_3.png';
import dbr4 from '../assets/3d_reconstruction/3DBR_4.png';

import ms1 from '../assets/mstevens/mstevens_1.png';
import ms2 from '../assets/mstevens/mstevens_2.png';
import ms3 from '../assets/mstevens/mstevens_3.png';
import ms4 from '../assets/mstevens/mstevens_4.png';

export const projects = [
  {
    id: 'utility',
    emoji: '🔌',
    title: 'Utility Account Connection',
    sub: 'EverBright · Associate Software Engineer · 2025',
    cardDesc:
      'Third-party data aggregation service that sources verified homeowner utility usage data',
    cardTags: ['FastAPI', 'Pydantic'],
    overview:
      'FastAPI microservice that allows homeowners to securely connect their utility account through a third-party data provider and extracts up to 12 historical months of verified consumption data to power accurate savings projections and system sizing.',
    bullets: [
      'Designed and stood up microservice (API routes, data models, request/response schema validation) with integration to main sales application.',
      'Implemented asynchronous webhook processing pipelines to handle concurrent data ingestion events.',
      'Processed raw 15-minute interval data using Pandas, aggregating into hourly totals with timestamps and interpolating partial values.',
      'Handled multi-meter edge cases for homes with detached units and email-based credential submission for remote sales workflows.',
      'Optimized frequent rate schedule lookups with Redis caching.',
    ],
    stack: [
      { ico: 'FA', bg: '#009688', fg: '#fff', name: 'FastAPI' },
      { ico: 'Pd', bg: '#E92063', fg: '#fff', name: 'Pydantic' },
      { ico: 'Al', bg: '#6B4FBB', fg: '#fff', name: 'Alembic' },
      { ico: 'R', bg: '#DC382D', fg: '#fff', name: 'Redis' },
      { ico: 'Pa', bg: '#150458', fg: '#E70488', name: 'Pandas' },
    ],
    images: [uac1, uac2, uac3, uac4, uac5, uac6, uac7, uac8],
  },
  {
    id: 'reconstruction',
    emoji: '🛰️',
    title: '3D Building Reconstruction',
    sub: 'EverBright · Hackathon · 2024',
    cardDesc:
      'Machine learning pipeline that processes aerial RGB imagery to generate 3D reconstructions of roof elements',
    cardTags: ['Python'],
    overview:
      'Convolutional Neural Network trained to predict structural roof elements (eaves, ridges, and hips) that receives RGB aerial imagery as input and outputs color-coded 3D reconstructions, illustrating roof heights and rooftops. Won award at 2024 EverBright Hackathon.',
    bullets: [
      'Collaborated with team to fine-tune a CNN trained on aerial RGB imagery for roofline segmentation, owning model output post-processing pipeline.',
      'Added patch-based image processing: split larger aerial images into 224px x 224px tiles, run interference on each, then stitch back into full reconstruction.',
      'Built the prismatic representation pipeline — extracting ridge lines, eave contours, and hip lines from model output and compositing into a final 3D surface rendering.',
    ],
    stack: [
      { ico: 'Py', bg: '#3776AB', fg: '#FFD43B', name: 'Python' },
      { ico: 'PT', bg: '#EE4C2C', fg: '#fff', name: 'PyTorch' },
      { ico: 'Np', bg: '#4DABCF', fg: '#fff', name: 'NumPy' },
      { ico: 'Ju', bg: '#F37626', fg: '#fff', name: 'Jupyter' },
    ],
    images: [dbr3, dbr4, dbr1, dbr2],
  },
  {
    id: 'mstevens',
    emoji: '🏠',
    title: 'MStevens Roofing & Remodeling',
    sub: 'Freelance · 2024',
    cardDesc:
      'Business website remodel for roofing/construction company, built with 3D animations',
    cardTags: ['React', 'TypeScript'],
    overview:
      'Modern business website redesign for roofing and remodeling company, replacing legacy website built on Adobe Muse.',
    bullets: [
      'Built interactive 3D roof model using React Three Fiber and Three.js, rendered directly in the browser with custom lighting and camera controls.',
      'Integrated Google Drive as a Gallery photo backend (via Service Account) to expose an API endpoint to fetch images and subdirectories.',
      'Managed global contact modal state with Zustand and wired contact form to EmailJS.',
    ],
    stack: [
      { ico: 'Re', bg: '#20232a', fg: '#61DAFB', name: 'React' },
      { ico: 'TS', bg: '#3178C6', fg: '#fff', name: 'TypeScript' },
      { ico: '3F', bg: '#000', fg: '#049EF4', name: 'Three.js' },
    ],
    link: 'https://mstevensroofing.vercel.app/',
    images: [ms1, ms2, ms3, ms4],
  },
];
