
-- Tabla: rol
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla: usuario
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(30),
    mail VARCHAR(150) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    id_rol INT REFERENCES rol(id_rol)
);

-- Tabla: paciente
CREATE TABLE paciente (
    id_paciente INT PRIMARY KEY,
    fecha_nac DATE NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES usuario(id_usuario)
);

-- Tabla: profesional
CREATE TABLE profesional (
    id_profesional INT PRIMARY KEY,
    profesion VARCHAR(100),
    especialidad VARCHAR(100),
    FOREIGN KEY (id_profesional) REFERENCES usuario(id_usuario)
);

-- Tabla: obra_social
CREATE TABLE obra_social (
    id_obra_social SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: plan
CREATE TABLE plan (
    id_plan SERIAL PRIMARY KEY,
    tipo VARCHAR(100),
    id_obra_social INT REFERENCES obra_social(id_obra_social)
);

-- Tabla: paciente_plan
CREATE TABLE paciente_plan (
    id_paciente INT REFERENCES paciente(id_paciente),
    id_plan INT REFERENCES plan(id_plan),
    nro_afiliado VARCHAR(50),
    PRIMARY KEY (id_paciente, id_plan)
);

-- Tabla: disponibilidad
CREATE TABLE disponibilidad (
    id_disponibilidad SERIAL PRIMARY KEY,
    id_profesional INT REFERENCES profesional(id_profesional),
    dia_semana VARCHAR(20),
    hora_inicio TIME,
    hora_fin TIME
);

-- Tabla: turno
CREATE TABLE turno (
    id_turno SERIAL PRIMARY KEY,
    id_profesional INT REFERENCES profesional(id_profesional),
    id_paciente INT REFERENCES paciente(id_paciente),
    fecha DATE,
    hora_inicio TIME,
    hora_fin TIME,
    estado VARCHAR(50)
);

-- Tabla: turno_periodico
CREATE TABLE turno_periodico (
    id_turno_periodico SERIAL PRIMARY KEY,
    id_paciente INT REFERENCES paciente(id_paciente),
    id_profesional INT REFERENCES profesional(id_profesional),
    frecuencia VARCHAR(20),
    dia_semana VARCHAR(20),
    hora_inicio TIME,
    hora_fin TIME,
    fecha_inicio DATE,
    fecha_fin DATE
);

-- Tabla: nota_clinica
CREATE TABLE nota_clinica (
    id_nota_clinica SERIAL PRIMARY KEY,
    id_turno INT REFERENCES turno(id_turno),
    detalle TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: documento_medico
CREATE TABLE documento_medico (
    id_documento SERIAL PRIMARY KEY,
    id_turno INT REFERENCES turno(id_turno),
    id_profesional INT REFERENCES profesional(id_profesional),
    tipo_documento VARCHAR(50),
    url VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    compartido_con_paciente BOOLEAN DEFAULT FALSE
);

-- Tabla: recordatorio
CREATE TABLE recordatorio (
    id_recordatorio SERIAL PRIMARY KEY,
    id_turno INT REFERENCES turno(id_turno),
    fecha_envio TIMESTAMP,
    mensaje VARCHAR(255)
);

-- Tabla: seguimiento
CREATE TABLE seguimiento (
    id_seguimiento SERIAL PRIMARY KEY,
    id_turno INT REFERENCES turno(id_turno),
    id_paciente INT REFERENCES paciente(id_paciente),
    fecha_envio TIMESTAMP,
    nota TEXT,
    enlace VARCHAR(255),
    frecuencia VARCHAR(50)
);

-- Insertar roles iniciales

INSERT INTO rol (nombre) VALUES
('admin'),
('profesional'),
('secretario'),
('paciente');


CREATE TABLE profesional_plan (
  id_profesional INT REFERENCES profesional(id_profesional),
  id_plan INT REFERENCES plan(id_plan),
  PRIMARY KEY (id_profesional, id_plan)
);