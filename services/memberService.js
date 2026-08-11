const { Member, CommitteeMember, CommitteeInstallments, InstallmentBounces } = require('../models');

async function getMember(committee_id, member_id) {
  const member = await Member.findOne({
    where: { member_id },
    attributes: ['member_id', 'name', 'email', 'mobile', 'aadhaar', 'pan', 'address'],
    include: [
      {
        model: CommitteeMember,
        where: { committee_id },
        attributes: ['heads_count', 'joining_date', 'is_manager']
      },
      {
        model: CommitteeInstallments,
        attributes: ['installment_id', 'amount', 'due_date', 'status'],
        include: [
          {
            model: InstallmentBounces,
            as: 'bounces',   // ✅ must match alias in index.js
            attributes: [
              'bounce_id',
              'penalty_amount',
              'note',
              'decided_by',
              'decidedby_name',
              'is_paid',
              'paid_at',
              'created_at'
            ]
          }
        ]
      }
    ]
  });

  if (!member) {
    return null;
  }

  return {
    member_id: member.member_id,
    name: member.name,
    email: member.email,
    mobile: member.mobile,
    aadhaar: member.aadhaar,
    pan: member.pan,
    address: member.address,
    heads_count: member.CommitteeMembers[0].heads_count,
    joining_date: member.CommitteeMembers[0].joining_date,
    is_manager: member.CommitteeMembers[0].is_manager,
    total_bounce_amount: member.CommitteeInstallments.reduce((total, installment) => {
      return total + installment.bounces.reduce((bounceTotal, bounce) => {
        if (bounce.is_paid === false && bounce.penalty_amount) {
          return bounceTotal + parseFloat(bounce.penalty_amount);
        }
        return bounceTotal;
      }, 0);
    }, 0),

    installments: member.CommitteeInstallments.map(inst => ({
      installment_id: inst.installment_id,
      amount: inst.amount,
      due_date: inst.due_date,
      status: inst.status,
      bounces: inst.bounces.map(b => ({
        bounce_id: b.bounce_id,
        penalty_amount: b.penalty_amount,
        note: b.note,
        decided_by: b.decided_by,
        decidedby_name: b.decidedby_name,
        is_paid: b.is_paid,
        paid_at: b.paid_at,
        created_at: b.created_at
      }))
    }))
  };
}

module.exports = { getMember };
