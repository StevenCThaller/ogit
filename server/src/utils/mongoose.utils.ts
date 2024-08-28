export const mongooseLowerRegex = (value: string) => ({
  $regex: new RegExp("^" + value.toLowerCase(), "i"),
});
