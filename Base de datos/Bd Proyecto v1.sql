create database proyecto;
use proyecto;
CREATE TABLE usuario (
    CiUsuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(30) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Contraseña VARCHAR(20) NOT NULL,
    FotoPerfil MEDIUMBLOB
);
CREATE TABLE administrador (
    IdAdmin INT PRIMARY KEY,
    FOREIGN KEY (IdAdmin)
        REFERENCES usuario (CiUsuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE cliente (
    IdCliente INT PRIMARY KEY,
    FOREIGN KEY (IdCliente)
        REFERENCES usuario (CiUsuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE proveedor (
    IdProveedor INT PRIMARY KEY,
     Experiencia TEXT,
    Habilidades TEXT,
    FOREIGN KEY (IdProveedor)
        REFERENCES usuario (CiUsuario)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE telefono_admin (
    id_ad INT PRIMARY KEY,
    IdAdmin INT NOT NULL,
    telefono INT NOT NULL,
    FOREIGN KEY (IdAdmin)
        REFERENCES administrador (IdAdmin)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE telefono_cliente (
    id_cli INT PRIMARY KEY,
    IdCliente INT NOT NULL,
    telefono INT NOT NULL,
    FOREIGN KEY (IdCliente)
        REFERENCES cliente (IdCliente)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE telefono_proveedor (
    id_prov INT PRIMARY KEY,
    IdProveedor INT NOT NULL,
    telefono INT NOT NULL,
    FOREIGN KEY (IdProveedor)
        REFERENCES proveedor (IdProveedor)
        ON DELETE CASCADE ON UPDATE CASCADE
        );
CREATE TABLE mensaje (
    IdMensaje INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Remitente INT,
    Destinatario INT,
    Texto TEXT
);
CREATE TABLE servicio (
    IdServicio INT PRIMARY KEY NOT NULL,
    titulo VARCHAR(20) NOT NULL,
    IdProveedor INT,
    Precio INT NOT NULL,
    Descripcion TEXT,
    Ubicacion VARCHAR(255),
    Imagen MEDIUMBLOB,
    fecha DATETIME,
    FOREIGN KEY (IdProveedor)
        REFERENCES proveedor (IdProveedor)
        ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE reseña (
    IdReseña INT NOT NULL,
    IdCliente INT NOT NULL PRIMARY KEY,
    IdServicio INT NOT NULL,
    Descripcion TEXT,
    Puntaje DECIMAL(2 , 1 ) NOT NULL,
    CHECK (Puntaje IN (1.0 , 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0)),
    fecha DATETIME,
    FOREIGN KEY (IdCliente)
        REFERENCES cliente (IdCliente)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (IdServicio)
        REFERENCES servicio (IdServicio)
        ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE envia (
    CiUsuario INT,
    IdMensaje INT,
    Fecha DATETIME,
    PRIMARY KEY (CiUsuario , IdMensaje),
    FOREIGN KEY (CiUsuario)
        REFERENCES usuario (CiUsuario)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IdMensaje)
        REFERENCES mensaje (IdMensaje)
        ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE contrata (
    IdCliente INT,
    IdServicio INT,
    PRIMARY KEY (IdCliente , IdServicio),
    FOREIGN KEY (IdCliente)
        REFERENCES cliente (IdCliente)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (IdServicio)
        REFERENCES servicio (IdServicio)
        ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE ofrece (
    IdProveedor INT,
    IdServicio INT,
    PRIMARY KEY (IdProveedor , IdServicio),
    FOREIGN KEY (IdProveedor)
        REFERENCES proveedor (IdProveedor)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (IdServicio)
        REFERENCES servicio (IdServicio)
        ON UPDATE CASCADE ON DELETE CASCADE
);