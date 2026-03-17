export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.35, delay, ease: 'easeOut' },
});

export const geoIn = {
  initial: { opacity: 0, scale: 0.72, rotate: -8 },
  whileInView: { opacity: 0.28, scale: 1, rotate: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
};

export const barGrow = (width = 56, delay = 0.3) => ({
  initial: { width: 0 },
  whileInView: { width },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.38, delay, ease: 'easeOut' },
});
