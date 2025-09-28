
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

-- Tabla: menu
CREATE TABLE menu (
    id_menu SERIAL PRIMARY KEY,
    menombre VARCHAR(100),
    medireccion VARCHAR(255)
);

-- Tabla: menu_rol
CREATE TABLE menu_rol (
    id_menu INT REFERENCES menu(id_menu),
    id_rol INT REFERENCES rol(id_rol),
    PRIMARY KEY (id_menu, id_rol)
);


-- Insertar roles iniciales

INSERT INTO rol (nombre) VALUES
('admin'),
('profesional'),
('secretario'),
('paciente');

-- Insertar menú inicial y sus relaciones con roles

-- Autenticación y registro
INSERT INTO menu (menombre, medireccion) VALUES 
('Login', '/login'),
('Registro de Paciente', '/registro');

-- Administración (Admin)
INSERT INTO menu (menombre, medireccion) VALUES 
('Panel de Usuarios', '/usuarios'),
('Crear Usuario', '/usuarios/nuevo'),
('Editar Usuario', '/usuarios/editar/:id');

-- Gestión de Turnos (Admin, Profesional, Secretario, Paciente)
INSERT INTO menu (menombre, medireccion) VALUES 
('Turnos', '/turnos'),
('Calendario', '/turnos/calendario'),
('Crear Turno', '/turnos/nuevo'),
('Editar Turno', '/turnos/editar/:id'),
('Cancelar Turno', '/turnos/cancelar/:id'),
('Turnos Periódicos', '/turnos/periodicos');

-- Pacientes
INSERT INTO menu (menombre, medireccion) VALUES 
('Buscar Pacientes', '/pacientes/buscar'),
('Detalle del Paciente', '/pacientes/:id'),
('Editar Perfil Paciente', '/perfil/editar');

-- Documentos Médicos
INSERT INTO menu (menombre, medireccion) VALUES 
('Documentos', '/documentos'),
('Subir Documento', '/documentos/subir'),
('Ver Documento', '/documentos/:id');

-- Historia Clínica
INSERT INTO menu (menombre, medireccion) VALUES 
('Historia Clínica', '/historia-clinica/:id'),
('Nueva Nota Clínica', '/historia-clinica/nueva/:id');

-- Seguimiento Post-Consulta
INSERT INTO menu (menombre, medireccion) VALUES 
('Seguimientos', '/seguimiento'),
('Crear Seguimiento', '/seguimiento/nuevo/:id'),
('Ver Seguimiento', '/seguimiento/:id');

-- Perfil Usuario
INSERT INTO menu (menombre, medireccion) VALUES 
('Mi Perfil', '/perfil');
--('Editar Perfil', '/perfil');


--REVISAR EN MENUROL EL ID 24 EDITAR PERFIL QUE NO EXISTE EN MENU

-- Asociar menús con roles

-- ========== ADMIN ==========
INSERT INTO menu_rol (id_menu, id_rol) VALUES
(1, 1),  -- Login
(2, 1),  -- Registro (solo por si querés probar sin login)

(3, 1),  -- Usuarios
(4, 1),  -- Crear Usuario
(5, 1),  -- Editar Usuario

(23, 1), -- Mi Perfil
--(24, 1); -- Editar Perfil

-- ========== PROFESIONAL ==========
INSERT INTO menu_rol (id_menu, id_rol) VALUES
(1, 2),  -- Login

(6, 2),  -- Turnos
(7, 2),  -- Calendario
(8, 2),  -- Crear Turno
(9, 2),  -- Editar Turno
(10, 2), -- Cancelar Turno

(12, 2), -- Buscar Pacientes
(13, 2), -- Detalle Paciente

(15, 2), -- Documentos
(16, 2), -- Subir Documento
(17, 2), -- Ver Documento

(18, 2), -- Historia Clínica
(19, 2), -- Nueva Nota Clínica

(20, 2), -- Seguimientos
(21, 2), -- Crear Seguimiento
(22, 2), -- Ver Seguimiento

(23, 2), -- Mi Perfil
--(24, 2); -- Editar Perfil

-- ========== SECRETARIO ==========
INSERT INTO menu_rol (id_menu, id_rol) VALUES
(1, 3),  -- Login

(6, 3),  -- Turnos
(7, 3),  -- Calendario
(8, 3),  -- Crear Turno
(9, 3),  -- Editar Turno
(10, 3), -- Cancelar Turno
(11, 3), -- Turnos Periódicos

(12, 3), -- Buscar Pacientes
(13, 3), -- Detalle Paciente

(23, 3), -- Mi Perfil
--(24, 3); -- Editar Perfil

-- ========== PACIENTE ==========
INSERT INTO menu_rol (id_menu, id_rol) VALUES
(1, 4),  -- Login
(2, 4),  -- Registro

(6, 4),  -- Turnos
(7, 4),  -- Calendario (si querés mostrarle en vista simple)
(8, 4),  -- Crear Turno (reservar)
(10, 4), -- Cancelar Turno
(11, 4), -- Turnos Periódicos

(13, 4), -- Detalle del propio perfil/paciente

(15, 4), -- Documentos
(17, 4), -- Ver Documento

(20, 4), -- Seguimientos
(22, 4), -- Ver Seguimiento

(23, 4), -- Mi Perfil
--(24, 4); -- Editar Perfil
