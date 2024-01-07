const { Client } = require("pg");

const client = new Client({
  user: "database_squadcast_user",
  host: "dpg-cm9v27a1hbls73ak93mg-a.oregon-postgres.render.com",
  database: "database_squadcast",
  password: "eZDRW57lrRcHG2w73caRfYfE5Lka1xQV",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000, // Adjust timeout
  query_timeout: 5000, //
});
// Define an asynchronous function to get the top movies by duration
async function getTopMoviesBy() {
  try {
    await client.connect(); // Connect to the PostgreSQL database using the client
    // Define the SQL query to retrieve the top 5 movies based on year of release
    const query = `
    SELECT m.title, COUNT(r.movie_id) AS review_count
    FROM movies m
    JOIN ratings r ON m.id = r.movie_id
    WHERE r.rating >= 7
    GROUP BY m.id, m.title
    HAVING COUNT(r.movie_id) >= 5;
    `;
    // Execute the SQL query using the client and get the result
    //const result = await client.query(query);

    // Extract the rows from the result

    // Execute the SQL query using the client and get the result
    const result = await client.query(query);

    // Print the names of movies with high ratings
    console.log(
      "\nMovies with at least five reviews and a rating of 7 or higher:\n",
    );
    result.rows.forEach((row) =>
      console.log(`${row.title} - Reviews: ${row.review_count}`),
    );
  } catch (error) {
    // Handle errors if the query execution fails
    console.error("Error executing query:", error.message);
  } finally {
    // Ensure to close the database connection regardless of success or failure
    await client.end();
  }
}
// Call the function to get and display the top movies by duration
getTopMoviesBy();
