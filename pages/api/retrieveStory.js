import db from "/db/databse";

export default async function connectResponse(req, res) {
  try {
    const client = await db.connect()
    const result = await client.query('SELECT * FROM story;');
    
    const story = result.rows;
    client.release();
    res.status(200).json(story)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from database' })
  }
}


