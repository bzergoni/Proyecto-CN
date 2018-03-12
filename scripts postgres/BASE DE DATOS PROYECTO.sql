CREATE SCHEMA ciudad_de_los_niños_development;

set search_path = ciudad_de_los_niños_development;

Create table Persona (
Dni varchar(20) ,
N_y_Ap varchar(50) not null,
Constraint pk_dni primary key (Dni)
);

Create table Padrino (
Dni varchar(20) ,
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
  type integer NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (username),
  CONSTRAINT user_id_key UNIQUE (id)
);



Create table Donante (
Dni varchar(20),
ocupacion varchar(50) ,
Cuil_cuit varchar(50),
existe boolean DEFAULT true,
comentario character varying(150),
fecha_alta date,
fecha_baja date,
origen character varying(100),
Constraint pk_Donante  primary key (Dni),
constraint CF_Donante foreign key (Dni) references Padrino (Dni) on delete cascade on update cascade
);

Create domain TipoEstado as Varchar(20)
constraint estados_validos check (value in ('Sin llamar', 'ERROR', 'No acepta', 'En gestion', 'Adherido', 'Amigo', 'Baja', 'Voluntario'));

Create table Contacto (
Dni varchar(20),
fecha_primer_contacto Date,
fecha_rechazo_adhesion date,
estado TipoEstado,
Dni_recomendador varchar(20),
comentario Varchar(200),
relacion varchar(100),
fecha_ult_contacto date,
Constraint pk_Contacto  primary key (Dni),
constraint CF_Contacto1 foreign key (Dni) references Padrino (Dni) on delete cascade on update cascade

);

Create table Programa (

Nombre_Programa varchar(50) ,
Descripcion varchar(350) ,
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
nro varchar(50),
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
CBU varchar(50),
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
Dni varchar(20),
nombre_programa varchar(50),
monto float,
fecha_aporte date,
Frecuencia TipoFrecuencia,
id Integer,
estado_cobro character varying(100),

Constraint pk_aporta primary key (dni,nombre_programa,id),
constraint CF_aporta1 foreign key (dni) references Donante (dni) on delete cascade on update cascade,
constraint CF_aporta2 foreign key (nombre_programa) references Programa (nombre_programa) on delete cascade on update cascade,
constraint CF_aporta3 foreign key (id) references Medio_de_pago (id) on delete cascade on update cascade
);


create table donantes_eliminados (
dni varchar (20),
ocupacion varchar(50) ,
Cuil_cuit varchar(50),
fecha_eliminacion Date,


usuario varchar(50),

constraint pk_donantes_eliminados primary key (dni)

);

CREATE TABLE "ciudad_de_los_niños_development".cobro
(
   dni character varying(20),
   nombre_programa character varying(50),
   id integer,
   fecha date,
   estado character varying(50),
   comentario character varying(200),
    monto double precision,
   CONSTRAINT pk_cobro PRIMARY KEY (dni, id, fecha, nombre_programa),
   CONSTRAINT cf_aporta FOREIGN KEY (dni, nombre_programa, id) REFERENCES "ciudad_de_los_niños_development".aporta (dni, nombre_programa, id) ON UPDATE CASCADE ON DELETE CASCADE
);





create or replace function auditoria() returns trigger as
	'Begin
		insert into ciudad_de_los_niños_development.donantes_eliminados values (old.dni,old.ocupacion,old.cuil_cuit,current_date,current_user);
		return null;
	end;'
	LANGUAGE 'plpgsql';

create trigger TriggerAuditoria after delete on ciudad_de_los_niños_development.Donante for each row execute procedure auditoria();

    create or replace function creartipotarjeta() returns trigger as
    	'DECLARE existe boolean;
    	Begin
      IF NOT EXISTS (SELECT 1 FROM ciudad_de_los_niños_development.tipotarjeta WHERE nombre_tarjeta = new.nombre_tarjeta) THEN
        insert into ciudad_de_los_niños_development.tipotarjeta values (new.nombre_tarjeta);
      END IF;
      return NEW;

    	end;'
    	LANGUAGE 'plpgsql';

    create trigger triggertarjeta before insert or update on ciudad_de_los_niños_development.tarjeta for each row execute procedure creartipotarjeta();
      drop function mesañoAFecha(int,int);
      CREATE or replace FUNCTION mesañoAFecha(mes int,año int) returns date AS
            $$
            BEGIN

            	return varchar'01'||varchar'/'||mes||varchar'/'||año;
            END;
            $$ LANGUAGE plpgsql;



       drop function crearCobros(int,int);
        CREATE or replace FUNCTION crearCobros(mes int,año int) returns void AS
            $$
            Declare reg RECORD;
            BEGIN
            	IF NOT EXISTS (SELECT * FROM ciudad_de_los_niños_development.cobro where fecha = (mesañoAFecha(mes,año)) )THEN
            		FOR reg IN SELECT * FROM ciudad_de_los_niños_development.aporta LOOP

            			INSERT INTO ciudad_de_los_niños_development.cobro VALUES (reg.dni,reg.nombre_programa,reg.id,mesañoAFecha(mes,año),'NO COBRADO',null,reg.monto);

            		END LOOP;
            	END IF;

            END;
            $$ LANGUAGE plpgsql;


            drop function seisMeses(int,int);
                        CREATE or replace FUNCTION seisMeses(x int,y int) returns boolean AS
                                    $$
                                    BEGIN
                                    	if((x=y)OR(x+6=y)OR(y+6=x))then
                        			return true;
                                    	END IF;
                        		return false;
                                    END;
                                    $$ LANGUAGE plpgsql;




            drop function crearCobros(int,int);
                         CREATE or replace FUNCTION crearCobros(mes int,año int) returns void AS
                                    $$
                                    Declare reg RECORD;
                                    BEGIN
                                    	IF NOT EXISTS (SELECT * FROM ciudad_de_los_niños_development.cobro where fecha = (mesañoAFecha(mes,año)) )THEN
                                    		FOR reg IN SELECT * FROM ciudad_de_los_niños_development.aporta LOOP


                        				IF ( cast(reg.frecuencia as varchar) = 'Mensual' OR (seisMeses(cast(date_part('month',reg.fecha_aporte) as int),mes)))THEN
                        					INSERT INTO ciudad_de_los_niños_development.cobro VALUES (reg.dni,reg.nombre_programa,reg.id,mesañoAFecha(mes,año),'NO COBRADO',null,reg.monto);
                        				END IF;
                                    		END LOOP;
                                    	END IF;

                                    END;
                                    $$ LANGUAGE plpgsql;










INSERT INTO ciudad_de_los_niños_development.user(username, password, id,type) VALUES ('admin','$2a$10$sCRGh9xP.KDDiswoY/YmS.fZQqxuTlzzz0nQAVZo6ZO2Bxs4rHASG',default,1);
