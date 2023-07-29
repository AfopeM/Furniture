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
