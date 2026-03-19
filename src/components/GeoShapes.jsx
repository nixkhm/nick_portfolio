import { useId } from 'react';
import { motion } from 'framer-motion';
import { geoIn } from '../utils/animations';

// Two circles clipped to the upper-left + upper-right quadrants (used in TL positions)
export function GeoDuoUpper({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <motion.div className={`geo ${className}`} {...geoIn}>
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id={`${id}a`}>
          <rect x="0" y="0" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="59"
          r="54"
          fill="#2e6fa3"
          clipPath={`url(#${id}a)`}
        />
        <clipPath id={`${id}b`}>
          <rect x="59" y="0" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="0"
          r="50"
          fill="#52D96A"
          clipPath={`url(#${id}b)`}
        />
      </svg>
    </motion.div>
  );
}

// Three concentric circles from the top-left corner (0, 0)
export function GeoTripleTL({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <motion.div className={`geo ${className}`} {...geoIn}>
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id={id}>
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle cx="0" cy="0" r="108" fill="#3a7ab5" clipPath={`url(#${id})`} />
        <circle cx="0" cy="0" r="76" fill="#52D96A" clipPath={`url(#${id})`} />
        <circle cx="0" cy="0" r="46" fill="#2e6fa3" clipPath={`url(#${id})`} />
      </svg>
    </motion.div>
  );
}

// Three concentric circles from the bottom-right corner (118, 118)
export function GeoTripleBR({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <motion.div className={`geo ${className}`} {...geoIn}>
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id={id}>
          <rect x="0" y="0" width="118" height="118" />
        </clipPath>
        <circle
          cx="118"
          cy="118"
          r="108"
          fill="#3a7ab5"
          clipPath={`url(#${id})`}
        />
        <circle
          cx="118"
          cy="118"
          r="76"
          fill="#52D96A"
          clipPath={`url(#${id})`}
        />
        <circle
          cx="118"
          cy="118"
          r="46"
          fill="#2e6fa3"
          clipPath={`url(#${id})`}
        />
      </svg>
    </motion.div>
  );
}

// Two circles clipped to the lower-right + lower-left quadrants (used in BR positions)
export function GeoDuoLower({ className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <motion.div className={`geo ${className}`} {...geoIn}>
      <svg width="100%" height="100%" viewBox="0 0 118 118">
        <clipPath id={`${id}a`}>
          <rect x="59" y="59" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="59"
          r="54"
          fill="#2e6fa3"
          clipPath={`url(#${id}a)`}
        />
        <clipPath id={`${id}b`}>
          <rect x="0" y="59" width="59" height="59" />
        </clipPath>
        <circle
          cx="59"
          cy="118"
          r="50"
          fill="#52D96A"
          clipPath={`url(#${id}b)`}
        />
      </svg>
    </motion.div>
  );
}
