import Cookies from "js-cookie";

export function parseCookies(req) {
  return Cookies.parse(req ? req.headers?.cookie || "" : document.cookie);
}
