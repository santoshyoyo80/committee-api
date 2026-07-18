const Member = require('../models/member');
const Committee = require('../models/committee');

// Create member
exports.createMember = async (req, res) => {
  try {
    const { committee_id, aadhaar } = req.body;
    const errors = await validateMemberInput({ committee_id, aadhaar });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const member = await Member.create({
      ...req.body,
      created_date: new Date(),
      modified_date: new Date(),
    });

    res.status(201).json(member);
  } catch (err) {
    console.error('Error creating member:', err);
    res.status(500).json({ errors: [err.message] });
  }
};

// Get members with pagination
exports.getMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    let totalRecords = null;
    let totalPages = null;

    // Only run count query for first page
    if (page === 1) {
      totalRecords = await Member.count();
      totalPages = Math.ceil(totalRecords / limit);
    }

    const members = await Member.findAll({
      include: Committee,
      limit,
      offset,
      order: [['member_id', 'ASC']]
    });

    const startRecord = offset + 1;
    const endRecord = offset + members.length;

    res.json({
      totalRecords,          // only present on page 1
      totalPages,            // only present on page 1
      currentPage: page,
      pageSize: limit,
      showing: `Showing records ${startRecord}-${endRecord}${totalRecords ? ` of ${totalRecords}` : ''}`,
      members
    });
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ errors: [err.message] });
  }
};

// Validation helper
async function validateMemberInput({ committee_id, aadhaar }) {
  const errors = [];

  // Committee check
  const committee = await Committee.findByPk(committee_id);
  if (!committee) errors.push('Committee not found for committee_id');

  // Aadhaar required
  if (!aadhaar) errors.push('Aadhaar is required');

  // Aadhaar uniqueness
  if (aadhaar) {
    const existing = await Member.findOne({ where: { aadhaar } });
    if (existing) errors.push(`Member with Aadhaar '${aadhaar}' already exists`);
  }

  return errors;
}


// POST: login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find member by email
    const member = await Member.findOne({ where: { email } });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Step 2: Compare password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Step 3: Generate JWT
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
});