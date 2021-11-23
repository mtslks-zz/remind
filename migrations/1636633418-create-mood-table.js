exports.up = async function up(sql) {
  await sql`
    CREATE TABLE moods (
      id integer PRIMARY KEY,
      title varchar(100) NOT NULL
    )
  `;
};

exports.down = async function down(sql) {
  await sql`
    DROP TABLE moods
  `;
};
