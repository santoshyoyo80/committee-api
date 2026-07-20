
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