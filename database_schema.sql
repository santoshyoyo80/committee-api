
CREATE TABLE public.member_committees (
  id SERIAL PRIMARY KEY,
  member_id INT REFERENCES public.members(member_id) ON DELETE CASCADE,
  committee_id INT REFERENCES public.committees(committee_id) ON DELETE CASCADE
);

CREATE TABLE user_committees (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  committee_id INT REFERENCES committees(committee_id) ON DELETE CASCADE,
  role_id INT REFERENCES roles(role_id) ON DELETE CASCADE
);

CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE permissions (
  permission_id SERIAL PRIMARY KEY,
  permission_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL,   -- admin, super_admin, normal_user
  description TEXT NOT NULL                -- e.g. "read/write", "read/write/delete"
);