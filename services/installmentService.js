const { CommitteeInstallments, InstallmentBounces } = require('../models');

async function getMemberInstallments(member_id, committee_id) {
  try {
    const installments = await CommitteeInstallments.findAll({
      where: { member_id, committee_id },
      attributes: ['installment_id', 'installment_no', 'amount', 'due_date', 'status'],
      include: [{
        model: InstallmentBounces,
        attributes: ['bounce_id', 'penalty_amount', 'note', 'is_paid', 'paid_at', 'created_at']
      }],
      order: [['due_date', 'ASC']]
    });

    return installments.map(i => ({
      installment_id: i.installment_id,
      installment_no: i.installment_no,
      amount: i.amount,
      due_date: i.due_date,
      status: i.status,
      bounces: i.InstallmentBounces.map(b => ({
        bounce_id: b.bounce_id,
        penalty_amount: b.penalty_amount,
        note: b.note,
        is_paid: b.is_paid,
        paid_at: b.paid_at,
        created_at: b.created_at
      }))
    }));
  } catch (err) {
    console.error('Error fetching Committee Installments:', err);
    throw err;
  }
}

module.exports = { getMemberInstallments };
