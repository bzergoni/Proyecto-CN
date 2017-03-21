--Inserciones Bruno
--Agregar persona
insert into ciudad_de_los_niños_development.persona values (17589342,'Federico Nuñez');
insert into ciudad_de_los_niños_development.persona values (32456915,'Mariela Pucheta');

--Agregar donante
insert into ciudad_de_los_niños_development.padrino values (17589342,'fnuñez81@gmail.com','	4644600','Echeverria 823','154361225','05/11/1965',2653);
insert into ciudad_de_los_niños_development.donante values (17589342,'Abogado','20-17589342-4');

--Agregar contacto
insert into ciudad_de_los_niños_development.padrino values (32456915,'maripuche@gmail.com.ar','4640615','Echeverria 831','154360023','12/03/1990',2653);
insert into ciudad_de_los_niños_development.contacto values (32456915,'07/02/2010','10/02/2010','12/02/2010','13/02/2010','Baja',17589342,'Amigable. Estudiante de Computacion','Vecina');

--Crear tipotarjeta
insert into ciudad_de_los_niños_development.TipoTarjeta values ('BBVA FRANCES');

--Crear tarjeta
insert into ciudad_de_los_niños_development.Medio_de_pago values (default);

insert into ciudad_de_los_niños_development.Tarjeta values (lastval(),957947954,'Federico Nuñez','23/09/2019','BBVA FRANCES',903147958);

--creamos programa
insert into ciudad_de_los_niños_development.programa values ('VIDA','Programa de ayuda a los niños');

--insertamos la relacion aporta
insert into ciudad_de_los_niños_development.Aporta values (17589342,'VIDA',4320.00,'Semestral',lastval());

--inserciones joaquin
--Agregar persona
insert into ciudad_de_los_niños_development.persona values (18167022,'Luis Fabian Sarmiento');
insert into ciudad_de_los_niños_development.persona values (35465981,'Roque Peña');

--Agregar donante
insert into ciudad_de_los_niños_development.padrino values (18167022,'luifa_sarmiento@hotmail.com','4652803','Tucuman','155638929','25/05/73',5807);
insert into ciudad_de_los_niños_development.donante values (18167022,'Arquitecto','20-18167022-4');
--Agregar contacto
insert into ciudad_de_los_niños_development.padrino values (35465981,'r-peña@gmail.com','4687092','Moreno 134','154876123','10/05/94',5807);

insert into ciudad_de_los_niños_development.contacto values (35465981,'23/12/13','08/01/14','12/01/14','15/01/14','Baja',18167022,'Trabajador','Amigo');

--Crear tipotarjeta
insert into ciudad_de_los_niños_development.TipoTarjeta values ('HSBC');

--Crear tarjeta
insert into ciudad_de_los_niños_development.Medio_de_pago values (default);

insert into ciudad_de_los_niños_development.Tarjeta values (lastval(),123789765,'Luis Fabian Sarmiento','18/03/17','HSBC',987123567);


--creamos programa
insert into ciudad_de_los_niños_development.programa values ('Campamento y Recreacion','Actividad al aire libre, de oseo y esparcimiento');

--insertamos la relacion aporta
insert into ciudad_de_los_niños_development.Aporta values (18167022,'Campamento y Recreacion',2500.00,'Semestral',lastval());

--Inserciones vale
--Agregar persona
insert into ciudad_de_los_niños_development.persona values (33222111,'Jorge Gomez');-- va a ser el contacto
insert into ciudad_de_los_niños_development.persona values (11222333,'Ernesto Perez'); --Va a ser el Donante

--Agregar donante
insert into ciudad_de_los_niños_development.padrino values (11222333,'ErnestitoAlfajor@gmail.com',null,'Mendoza 12','358344556','05-10-1930',5800);
insert into ciudad_de_los_niños_development.donante values (11222333,'Kiosquero','20-11222333-8');
--Agregar contacto
insert into ciudad_de_los_niños_development.padrino values (33222111,'jorgitojorge@yahoo.com','035833311','sarmiento 253',null,'27-06-96',6140);

insert into ciudad_de_los_niños_development.contacto values (33222111,'21-10-40','22-10-40',NULL,NULL,'Adherido',11222333,'Persona Solidaria','Amigos');


--Crear debito
insert into ciudad_de_los_niños_development.Medio_de_pago values (default);
insert into ciudad_de_los_niños_development.Debito values (lastval(),123456,'8123123123','Ernesto Perez',38882,'Cuenta de ahorro','Banco Nacion','Sucursal Rio Cuarto');

--creamos programa
insert into ciudad_de_los_niños_development.programa values ('Alimentacion','Programa para los almuerzos');

--insertamos la relacion aporta
insert into ciudad_de_los_niños_development.Aporta values (11222333,'Alimentacion',2000,'Mensual',lastval());

insert into ciudad_de_los_niños_development.Aporta values (11222333,'Campamento y Recreacion',1000,'Mensual',lastval());

insert into ciudad_de_los_niños_development.Aporta values (11222333,'VIDA',200,'Mensual',lastval());


