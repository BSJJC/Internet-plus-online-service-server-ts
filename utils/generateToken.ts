import jwt from "jsonwebtoken";

/**
 * @description              Generate jwt token by id
 * @param id                  The unique id
 * @param expires         Valid duration
 * @param unit               Valid duration unit
 * @returns                      Token created by id
 */
function generateToken(id: string, expires: number, unit: "d" | "h") {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: `${expires}${unit}`,
  });
}

export default generateToken;
