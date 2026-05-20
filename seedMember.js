const Member = require('./models/Member');   // correct path + case
const sequelize = require('./db');

async function seedMembers() {
  try {
    const members = [];
    for (let i = 1; i <= 100; i++) {
      members.push({
        member_name: `Member ${i}`,
        mobile: `99999999${i}`,
        aadhaar: `1234567890${String(i).padStart(2, '0')}`.slice(0, 12),
        pan: `ABCDE${String(i).padStart(5, '0')}`.slice(0, 10),
        email: `member${i}@example.com`,
        relative_name: `Relative ${i}`,
        address: `Address ${i}`,
        opening_date: new Date(),
        opening_charge: 1000,
        total_installments: 12,
        due_date: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        maturity_date: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
        mediator_name: `Mediator ${i}`,
        committee_id: 1, // assumes committee with ID=1 exists
        created_by: 'Seeder',
        created_date: new Date(),
        modified_date: new Date(),
      });
    }

    await Member.bulkCreate(members, { validate: true });
    console.log('100 members inserted successfully');
  } catch (err) {
    console.error('Error inserting members:', err);
  }
}

sequelize.authenticate()
  .then(() => seedMembers())
  .catch(err => console.error('DB connection error:', err));
