import db from "@/db/database";


export default async function handler(req, res){
 if (req.method === "GET"){
    const {email} = req.body;
    try {
      const query =  'SELECT id, name, email, password FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      if (result.rowCount === 0) {
        alert('User not found.');
        
        res.status(404).send('User not found');
        return;
      }
      const user = result.rows[0];
      console.log("USER_____>", user)
      return user 
    } catch (error) {
      console.log(error)
    }
  }
res.status(405).end()

}