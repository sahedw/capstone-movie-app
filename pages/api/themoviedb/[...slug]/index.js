async function handler(req, res) {
  try {
    const baseUrl = "https://api.themoviedb.org/3";
    const path = req.query.slug.reduce((acc, cur) => acc + "/" + cur, "");
    const { slug, ...query } = req.query;
    const url =
      baseUrl +
      path +
      "?" +
      new URLSearchParams({
        api_key: process.env.API_KEY,
        ...query,
      }).toString();
    console.log(url);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      return res.status(200).json(data);
    } else {
      throw new Error(`status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error" });
  }
}
export default handler;
