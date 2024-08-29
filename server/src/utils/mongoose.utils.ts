export const mongooseLowerRegex = (value: string) => {
  return {
    $regex: `^${value}$`,
    $options: "i",
  };
};
