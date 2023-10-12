CREATE TABLE CANDIDATO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255),
    rut VARCHAR(12),
    activo INT
);

CREATE TABLE REGION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    simbolo VARCHAR(10),
    activo INT
);

CREATE TABLE COMUNA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    id_region INT,
    activo INT,
    FOREIGN KEY (id_region) REFERENCES REGION(id)
);

CREATE TABLE VOTO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255),
    alias VARCHAR(50),
    rut VARCHAR(12),
    email VARCHAR(100),
    region INT,
    comuna INT,
    candidato INT,
    in_web INT,
    in_tv INT,
    in_rrss INT,
    in_amigo INT,
    activo INT,
    FOREIGN KEY (region) REFERENCES REGION(id),
    FOREIGN KEY (comuna) REFERENCES COMUNA(id),
    FOREIGN KEY (candidato) REFERENCES CANDIDATO(id)
);