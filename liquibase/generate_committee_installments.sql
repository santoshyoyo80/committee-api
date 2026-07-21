CREATE OR REPLACE FUNCTION generate_committee_installments(p_committee_id INT)
RETURNS VOID AS $$
DECLARE
    committee RECORD;
    member RECORD;
    due_date DATE;
BEGIN
    -- Fetch committee details
    SELECT * INTO committee
    FROM committees
    WHERE committee_id = p_committee_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Committee with id % not found', p_committee_id;
    END IF;

    -- Loop through all members of the committee
    FOR member IN
        SELECT * FROM committee_members WHERE committee_id = p_committee_id
    LOOP
        -- Generate installments based on frequency
        FOR i IN 1..committee.total_installments LOOP
            due_date := committee.start_date;

            IF committee.cycle_frequency = 'monthly' THEN
                due_date := committee.start_date + (i - 1) * INTERVAL '1 month';
            ELSIF committee.cycle_frequency = 'weekly' THEN
                due_date := committee.start_date + (i - 1) * INTERVAL '1 week';
            ELSIF committee.cycle_frequency = 'quarterly' THEN
                due_date := committee.start_date + (i - 1) * INTERVAL '3 month';
            END IF;

            -- Insert one row per head
            FOR h IN 1..member.heads_count LOOP
                INSERT INTO committee_installments (
                    committee_id,
                    member_id,
                    installment_no,
                    due_date,
                    amount,
                    status
                )
                VALUES (
                    committee.committee_id,
                    member.member_id,
                    i,
                    due_date,
                    committee.installment_amount,
                    'pending'
                );
            END LOOP;
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
