const { Member, Committee, CommitteeMember } = require('../models'); // IMPORTANT: import from index.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create multiple members for a committee
exports.createMembersForCommittee = async (req, res) => {
  try {
    const { committee_name, members } = req.body;
    const errors = [];

    const committee = await Committee.findOne({ where: { committee_name } });
    if (!committee) {
      return res.status(400).json({ errors: [`Committee '${committee_name}' not found`] });
    }

    const createdMembers = [];

    for (const m of members) {
      const { aadhaar, password } = m;

      if (!aadhaar) {
        errors.push(`Aadhaar is required for member '${m.name}'`);
        continue;
      }

      const existing = await Member.findOne({ where: { aadhaar } });
      if (existing) {
        errors.push(`Member with Aadhaar '${aadhaar}' already exists`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const member = await Member.create({
        ...m,
        committee_id: committee.committee_id,
        password: hashedPassword,
        created_date: new Date(),
        modified_date: new Date(),
      });

      await CommitteeMember.findOrCreate({
        where: { member_id: member.member_id, committee_id: committee.committee_id },
        defaults: {
          heads_count: 1,
          joining_date: new Date(),
          is_manager: false,
          joined_by: null,
        }
      });

      createdMembers.push(member);
    }

    if (errors.length > 0) {
      return res.status(207).json({ message: 'Some members could not be created', errors, createdMembers });
    }

    res.status(201).json({ message: 'All members created successfully', createdMembers });
  } catch (err) {
    console.error('Error creating members:', err);
    res.status(500).json({ errors: [err.message] });
  }
};

// Get all members of a committee
exports.getMembersByCommittee = async (req, res) => {
  try {
    const { committee_id } = req.params;

    const committee = await Committee.findByPk(committee_id, {
      include: [{
        model: Member,
        attributes: ['member_id', 'name', 'email'],
        through: { attributes: ['heads_count', 'joining_date', 'is_manager'] }
      }]
    });

    if (!committee) {
      return res.status(404).json({ error: `Committee ${committee_id} not found` });
    }

    const members = committee.Members.map(m => ({
      member_id: m.member_id,
      name: m.name,
      email: m.email,
      heads_count: m.CommitteeMember.heads_count,
      joining_date: m.CommitteeMember.joining_date,
      is_manager: m.CommitteeMember.is_manager
    }));

    res.json({
      committee_id: committee.committee_id,
      committee_name: committee.committee_name,
      cycle_frequency: committee.cycle_frequency,
      installment_amount: committee.installment_amount,
      total_installments: committee.total_installments,
      start_date: committee.start_date,
      end_date: committee.end_date,
      is_active: committee.is_active,
      created_by: committee.created_by,
      members
    });
  } catch (err) {
    console.error('Error fetching committee members:', err);
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const member = await Member.findOne({ where: { email } });
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { member_id: member.member_id, email: member.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: err.message });
  }
};
