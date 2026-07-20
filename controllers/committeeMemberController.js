const Member = require('../models/member');
const Committee = require('../models/committee');
const CommitteeMember = require('../models/committee_member'); // join table model
const bcrypt = require('bcryptjs');

// Create multiple members for a committee
exports.createMembersForCommittee = async (req, res) => {
  try {
    const { committee_name, members } = req.body;
    const errors = [];

    // Find committee by name
    const committee = await Committee.findOne({ where: { committee_name: committee_name } });
    if (!committee) {
      return res.status(400).json({ errors: [`Committee '${committee_name}' not found`] });
    }

    const createdMembers = [];

    for (const m of members) {
      const { aadhaar, password } = m;

      // Validate Aadhaar
      if (!aadhaar) {
        errors.push(`Aadhaar is required for member '${m.name}'`);
        continue;
      }

      // Check uniqueness
      const existing = await Member.findOne({ where: { aadhaar } });
      if (existing) {
        errors.push(`Member with Aadhaar '${aadhaar}' already exists`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create member
      const member = await Member.create({
        ...m,
        committee_id: committee.committee_id,
        password: hashedPassword,
        created_date: new Date(),
        modified_date: new Date(),
      });

      // Ensure committee_members entry exists
      const existingLink = await CommitteeMember.findOne({
        where: {
          member_id: member.member_id,
          committee_id: committee.committee_id,
        },
      });

      if (!existingLink) {
        await CommitteeMember.create({
          member_id: member.member_id,
          committee_id: committee.committee_id,
          heads_count: 1,
          joining_date: new Date(),
          is_manager: false,
          joined_by: null, // you can set to current user id if available
        });
      }

      createdMembers.push(member);
    }

    if (errors.length > 0) {
      return res.status(207).json({
        message: 'Some members could not be created',
        errors,
        createdMembers,
      });
    }

    res.status(201).json({
      message: 'All members created successfully',
      createdMembers,
    });
  } catch (err) {
    console.error('Error creating members:', err);
    res.status(500).json({ errors: [err.message] });
  }
};

// Login (unchanged)
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
