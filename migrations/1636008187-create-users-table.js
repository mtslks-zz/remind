exports.up = async function up(sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			first_name varchar(40) NOT NULL,
			last_name varchar(40) NOT NULL,
			email varchar(40) NOT NULL,
			username varchar(40) UNIQUE NOT NULL,
			password_hash varchar(100) NOT NULL
    )
  `;
};

exports.down = async function down(sql) {
  await sql`
    DROP TABLE users
  `;
};
