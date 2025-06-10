export const validemail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)

}

export const Initials = (name) => {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(/\s+/); 
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i]) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};
