/**
 * DTO for Committee with Member Access Level
 * Used when returning committee information along with permission level
 */
class CommitteeAccessDTO {
  constructor(committee, permissionLevel) {
    this.committee_id = committee.committee_id;
    this.committee_name = committee.committee_name;
    this.cycle_frequency = committee.cycle_frequency;
    this.installment_amount = committee.installment_amount;
    this.total_installments = committee.total_installments;
    this.start_date = committee.start_date;
    this.end_date = committee.end_date;
    this.is_active = committee.is_active;
    this.created_by = committee.created_by;
    this.permission_level = permissionLevel;
  }

  static fromAccess(access) {
    return new CommitteeAccessDTO(access.Committee, access.permission_level);
  }

  static fromAccessArray(accessArray) {
    return accessArray.map(access => CommitteeAccessDTO.fromAccess(access));
  }
}

module.exports = CommitteeAccessDTO;
