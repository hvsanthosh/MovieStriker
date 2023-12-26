import bcrypt from "bcrypt";
// function to hash password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
// function to compare
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
export { hashPassword, comparePassword };
