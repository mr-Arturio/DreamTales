import db from "@/db/database";


export default async function displayFavouritesStory(req, res) {
  try {
    const result = await db.query("SELECT * FROM stories WHERE favorites = true")
    const trueStory = result.rows
    res.status(200).json(trueStory)

  } catch (error) {
    res.status(500).json({ error: 'Error fetching data form database' })
  }

}