// This is the description of the change
// to the database
exports.up = async function up(sql) {
  await sql`
    CREATE TABLE mood (
      id integer PRIMARY KEY,
			title varchar(50) NOT NULL
    )
  `;
};

// This is the description of the REVERSE
// of the change to the database
exports.down = async function down(sql) {
  await sql`
    DROP TABLE mood
  `;
};
