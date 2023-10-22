import PQueue from "p-queue";
import axios from "axios";
const jikanQueue = new PQueue({
  concurrency: 1,
  intervalCap: 1,
  interval: 900,
});

// function getCurrentTime() {
//   const now = new Date();
//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   const seconds = String(now.getSeconds()).padStart(2, "0");

//   return `${hours}:${minutes}:${seconds}`;
// }

const baseURL = "https://api.jikan.moe/v4/";
export async function queueRequest(endpoint) {
  return jikanQueue.add(async () => {
    // console.log(endpoint + " *** executed  at: ***" + getCurrentTime());
    return await axios.get(`${baseURL + endpoint}`).catch((error) => {});
  });
}
