import Moralis from "moralis";

export const initMoralis = async () => {
  if (!Moralis.Core.isStarted) {
    try {
      return await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });
    } catch (error) {
      console.log("Error initializing Moralis");
      console.log(error);
    }
  }
  // If Moralis is already initialized, return null
  return null;
};
