export const isValidWebsiteAddress = (
  address: string,
  setIsError: (isError: boolean) => void
): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  if (regex.test(address.trim())) {
    setIsError(false);
    return true;
  } else {
    setIsError(true);
    return false;
  }
};
export const formatWebsite = (url: string): string => {
  const httpsRegex = /^https?:\/\//i;
  if (!httpsRegex.test(url)) {
    return "https://" + url;
  }
  return url;
};
