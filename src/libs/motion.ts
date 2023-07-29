export const switchBtnVariant = (value: boolean) => ({
  initial: {
    x: 8,
    y: "-50%",
  },
  animate: {
    x: value ? 14 : 90,
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
});

export const fadeInOutVariant = {
  initial: {
    opacity: 0,
    x: -25,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 25,
  },
};

export const cardVariant = (index: number, delay: number) => ({
  initial: {
    x: -25,
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
    transition: {
      delay: index * delay,
    },
  },

  exit: {
    x: 25,
    opacity: 0,
  },

  whileHover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 75,
    },
  },
});

export const productContainerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const productCardVariant = {
  initial: {
    x: -25,
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
  },
};
