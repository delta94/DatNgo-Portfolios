export const getCookieFromReq = (req, cookie) => {
  const cookies = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith(`${cookie}=`));

  if (!cookies) {
    return undefined;
  }

  return cookies.split("=")[1];
};

export const shortenText = (text, maxLength = 124) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, maxLength)} ...`;
  }

  return text;
};
