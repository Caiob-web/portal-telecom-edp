CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20),
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'telecom',
  municipality VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  pdf_url TEXT,
  municipality VARCHAR(255),
  priority VARCHAR(50) DEFAULT 'normal',
  status VARCHAR(50) DEFAULT 'pending',
  base44_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notification_responses (
  id SERIAL PRIMARY KEY,
  notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  observation TEXT NOT NULL,
  image_url TEXT,
  image_filename VARCHAR(255),
  status VARCHAR(50) DEFAULT 'acknowledged',
  responded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(notification_id, user_id)
);

CREATE TABLE IF NOT EXISTS municipalities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  state VARCHAR(2) DEFAULT 'SP',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  population INTEGER,
  is_active BOOLEAN DEFAULT true
);

INSERT INTO municipalities (name, state, latitude, longitude, population) VALUES
  ('São José dos Campos', 'SP', -23.1794, -45.8869, 729737),
  ('Jacareí', 'SP', -23.2983, -45.9658, 232900),
  ('Taubaté', 'SP', -23.0262, -45.5558, 324185),
  ('Caçapava', 'SP', -23.1008, -45.7097, 94600),
  ('Pindamonhangaba', 'SP', -22.9239, -45.4616, 170000),
  ('Tremembé', 'SP', -22.9611, -45.5503, 44000),
  ('Aparecida', 'SP', -22.8461, -45.2322, 37000),
  ('Guaratinguetá', 'SP', -22.8161, -45.1947, 118000),
  ('Lorena', 'SP', -22.7328, -45.1197, 83000),
  ('Cruzeiro', 'SP', -22.5789, -44.9622, 79000),
  ('Queluz', 'SP', -22.5358, -44.7764, 12000),
  ('Lavrinhas', 'SP', -22.5681, -44.8900, 8000),
  ('Silveiras', 'SP', -22.6658, -44.8597, 6000),
  ('São José do Barreiro', 'SP', -22.6358, -44.5742, 4000),
  ('Areias', 'SP', -22.5714, -44.7047, 4000),
  ('Bananal', 'SP', -22.6831, -44.3197, 10000),
  ('Arapeí', 'SP', -22.6753, -44.4414, 3000),
  ('Cunha', 'SP', -23.0742, -44.9572, 23000),
  ('Paraibuna', 'SP', -23.3847, -45.6628, 18000),
  ('Santa Branca', 'SP', -23.3967, -45.8839, 14000),
  ('Jambeiro', 'SP', -23.2858, -45.6964, 6000),
  ('Igaratá', 'SP', -23.2031, -46.1569, 9000),
  ('Guararema', 'SP', -23.4158, -46.0339, 28000),
  ('Salesópolis', 'SP', -23.5317, -45.8453, 16000),
  ('Natividade da Serra', 'SP', -23.3728, -45.4433, 7000),
  ('Redenção da Serra', 'SP', -23.2697, -45.5453, 4000),
  ('São Luis do Paraitinga', 'SP', -23.2239, -45.3106, 10000),
  ('Potim', 'SP', -22.8342, -45.1972, 23000)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_municipality ON notifications(municipality);
CREATE INDEX IF NOT EXISTS idx_notification_responses_user ON notification_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_responses_notification ON notification_responses(notification_id);
