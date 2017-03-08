CREATE SCHEMA ciudad_de_los_niños_development;

set search_path = ciudad_de_los_niños_development;

Create table Persona (
Dni varchar(10) ,
N_y_Ap varchar(50) not null,
Constraint pk_dni primary key (Dni)
);

Create table Padrino (
Dni varchar(10) ,
email varchar(50) not null,
tel_fijo varchar(50),
direccion varchar(50),
celular varchar(50),
fecha_nac date,
cod_postal integer,

Constraint pk_Padrino  primary key (Dni),
constraint CF_Padrino foreign key (Dni) references Persona (Dni) on delete cascade on update cascade
);

CREATE TABLE "ciudad_de_los_niños_development"."user"
(
  username character varying(20) NOT NULL,
  password character varying(150),
  id serial NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (username),
  CONSTRAINT user_id_key UNIQUE (id)
);



Create table Donante (
Dni varchar(10),
ocupacion varchar(50) ,
Cuil_cuit varchar(50),
existe boolean DEFAULT true,
Constraint pk_Donante  primary key (Dni),
constraint CF_Donante foreign key (Dni) references Padrino (Dni) on delete cascade on update cascade
);

Create domain TipoEstado as Varchar(20)
constraint estados_validos check (value in ('Sin llamar', 'ERROR', 'No acepta', 'En gestion', 'Adherido', 'Amigo', 'Baja', 'Voluntario'));

Create table Contacto (
Dni varchar(10),
fecha_primer_contacto Date,
fecha_alta date,
fecha_baja date,
fecha_rechazo_adhesion date,
estado TipoEstado,
Dni_recomendador varchar(10),
comentario Varchar(200),
relacion varchar(15),
Constraint pk_Contacto  primary key (Dni),
constraint CF_Contacto1 foreign key (Dni) references Padrino (Dni) on delete cascade on update cascade,
constraint CF_Contacto2 foreign key (Dni_recomendador) references Persona (Dni) on delete cascade on update cascade

);

Create table Programa (

Nombre_Programa varchar(50) ,
Descripcion varchar(50) ,
existe boolean DEFAULT true,
Constraint pk_Programa  primary key (Nombre_Programa)

);

Create table Medio_de_pago (
id serial ,
Constraint pk_Medio_de_pago  primary key (id)

);

Create table TipoTarjeta (
nombre_tarjeta Varchar(50),

constraint pk_tipotarjeta primary key (nombre_tarjeta)


);



Create table Tarjeta (
id Integer,
nro varchar(20),
nombre_titular varchar(50),
fecha_vencimiento date,
nombre_tarjeta varchar(50),
Codigo_verificacion int,


Constraint pk_Tarjeta  primary key (id),
constraint CF_tarjeta1 foreign key (id) references Medio_de_pago (id) on delete cascade on update cascade,
constraint CF_Tarjeta2 foreign key (nombre_tarjeta) references TipoTarjeta (nombre_tarjeta) on delete cascade on update cascade

);


Create table Debito (
id Integer,
nro_cuenta BigInt,
CBU varchar(10),
nombre_titular varchar(50),
Codigo_verificacion int,
tipo_cuenta varchar(50),
Nombre_banco varchar(50),
Sucursal_Banco varchar(50),

Constraint pk_DEBITO  primary key (id),
constraint CF_DEBITO foreign key (id) references Medio_de_pago (id) on delete cascade on update cascade

);




Create domain TipoFrecuencia as Varchar(20)
constraint frecuencias_validas check (value in ('Mensual','Semestral'));



Create table Aporta (
Dni varchar(10),
nombre_programa varchar(50),
monto float,
fecha_aporte date,
Frecuencia TipoFrecuencia,
id Integer,

Constraint pk_aporta primary key (dni,nombre_programa),
constraint CF_aporta1 foreign key (dni) references Donante (dni) on delete cascade on update cascade,
constraint CF_aporta2 foreign key (nombre_programa) references Programa (nombre_programa) on delete cascade on update cascade,
constraint CF_aporta3 foreign key (id) references Medio_de_pago (id) on delete cascade on update cascade
);


create table donantes_eliminados (
dni varchar (10),
ocupacion varchar(50) ,
Cuil_cuit varchar(50),
fecha_eliminacion Date,


usuario varchar(50),

constraint pk_donantes_eliminados primary key (dni)

);

create or replace function auditoria() returns trigger as 
	'Begin 
		insert into ciudad_de_los_niños_development.donantes_eliminados values (old.dni,old.ocupacion,old.cuil_cuit,current_date,current_user);
		return null;
	end;'
	LANGUAGE 'plpgsql';

create trigger TriggerAuditoria after delete on ciudad_de_los_niños_development.Donante for each row execute procedure auditoria();
