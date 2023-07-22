export const asReadibleHex = (userId?: string, startLength = 6, endLength = 4, separator = "...") => {
    if (!userId || !userId.startsWith("0x")) {
      return userId; // Return the original string if it doesn't start with "0x"
    }
    return userId.substring(0, startLength) + separator + userId.substring(userId.length - endLength);
  }