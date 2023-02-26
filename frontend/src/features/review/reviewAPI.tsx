import axios from "axios";
import { MY_SERVER } from "../../env";
import Review from "../../models/Review";
import { getToken } from "../../utils/token";

const token = getToken();

export function addReview(review: Review) {
  console.log(review);
  return new Promise<{ data: Review }>((resolve) =>
    axios
      .post(MY_SERVER + "api/reviews/post/", review, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function GetAiReview(rating: any) {
  return new Promise<{ data: any }>((resolve) =>
    axios
      .post(MY_SERVER + "api/reviews/ai/", rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function getReviewsByProductID(id: number) {
  return new Promise<{ data: Review[] }>((resolve) =>
    axios
      .get(MY_SERVER + "api/reviews/get/" + id)
      .then((res) => resolve({ data: res.data }))
  );
}

export async function canPostByID(id: number): Promise<{ data: any }> {
  try {
    const res = await axios.get(MY_SERVER + "api/reviews/can/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: res.data };
  } catch (error) {
    // Handle the error here
    console.error("Error fetching canPostByID:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
}
