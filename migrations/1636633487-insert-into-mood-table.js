const mood = [
  { id: 1, title: 'Not good' },
  { id: 2, title: 'Could be better' },
  { id: 3, title: 'Average' },
  { id: 4, title: 'Pretty well' },
  { id: 5, title: 'Really good!' },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO mood ${sql(mood, 'id', 'title')}
  `;
};

exports.down = async function down(sql) {
  for (const mod of mood) {
    await sql`
      DELETE FROM
        mood
      WHERE
      title = ${mod.title}
    `;
  }
};
