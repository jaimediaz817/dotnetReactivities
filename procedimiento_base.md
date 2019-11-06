nos metemos a la carpeta:
cd API
dotnet build

luego nos salimos a la raíz y ejecutamos:
dotnet ef database drop -p Persistence/ -s API/

luego nos movemos nuevamente a:  
 cd API

y ejecutamos el proyecto en modo escucha de cambios:
ditnet watch run

cd API

##  I D E N T I T Y
- Se crea un fichero AppUser.cs en la raíz de DOMAIN

- Luego se abre el adminsitrador de paquetes Nuguets:
Ctrl + Shift + P
- Buscar:
Microsoft.ApsNetCore.Identity.EntityFrameworkCore + ENTER

- seleccionamos la versión desplegada:
- seleccionamos la versión 2.2.0 
- Luego lo agregamos en el proyecto Domain (Project)

- Ahregamos finalmente la lirbería:
using Microsoft.AspNetCore.Identity;

- Luego intentar generar las migraciones después de haber agregado lineas en el DBCONTEXT:
[COMANDO]
 dotnet ef migrations add "addedIdentity" -p Persistence/ -s API/


### Configuración del usuario:
- Una vez se ha configurado la query de login (autenticación), se procederá a crear un controlador

- Creando controlador <AppUser>





## Creando el proyecto transversal + DEPENDENCIAS:
[COMANDO]
dotnet new classlib -n Infrastructure 

- posteriormente agregar la solución:
dotnet sln add Infrastructure/

NOTA: la instraestructura dependerá del proyectode aplicación

- agregando la dependencia de aplicación desde el proyecto transversal:
dotnet add reference ../Application/

- Luego desde el proyecto de la API, se agrega la referencia del proyecto transversal Infrastucture:
dotnet add reference ../Infrastructure/

- Reestablecer nuevamente todo (desde la carpeta raíz del proyecto general):
dotnet restore


## Adicionando mecanismo al startup.cs

En la configuración del startup hay que agregar un paquete: JwtRegisterClaimNames.NameId:

- ABRIR EL ADMINISTRADOR DE PACKETES NUGUETS
luego ingresar: 
>System.IdentityModel.Tokens.Jwt


## Agregando AUTORIZACIÓN


Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE1NjA2ODAzMDIsImV4cCI6MTU2MTI4NTEwMiwiaWF0IjoxNTYwNjgwMzAyfQ.L30BjZTrhLdoJcALcliMpGf8pDM-RQgMAcw7ViDfsDA67QazSOq8BB9Buc0P9BHGjLaQ51xK21-dBk_vGq4vWA

Bearer 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJqZGlheiIsIm5iZiI6MTU3MzA2MjUyMSwiZXhwIjoxNTczNjY3MzIxLCJpYXQiOjE1NzMwNjI1MjF9.-MOxtR6idaucHnA0MgY51Sp3m4VCVxNC8suLfjSS5Ig


## corroborar la versión de user-secrets:
dotnet user-secrets

- ir a la raíz y escribir el comando:
dotnet user-secrets set "TokenKey" "super secret key" -p API/

- Listar las claves secretas generadas:
dotnet user-secrets list -p API/









# ================================ FRONTEND ==================================
==============================================================================

Instalar MobX:
en la raíz del proyecto frontend: client-app:

npm install --save mobx mobx-react-lite

Historial de Mob-X

## Toasted React:

React-toastify
npm install --save react-toastify

## INSTALACIÓN DE REACT FORM

está en la versión 3.0 hasta la fecha
npm install --save react-final-form final-form

## DATETIME - PICKER

- URL:
  https://jquense.github.io/react-widgets/api/DateTimePicker/

- Previamente hay que instalar localization Globalice.js
  URL:
  https://jquense.github.io/react-widgets/localization/

## INSTALAR EL SIGUIENTE PAQUETE:

[COMANDO]
npm install react-widgets-date-fns
NOTA: siguiendo instrucciones precisas del profesor recomienda instalar exactamente
estas dependencias:

[COMANDO]
npm install react-widgets@4.4.11 react-widgets-date-fns@4.0.26 date-fns@2.0.0-alpha.13

-- Luego instalar:
install @types/react-widgets-date-fns


## Validaciones en formularios:
npm install --save relavidate

- la versión para este curso debe ser:
 npm install --save revalidate@1.2.0

- Adaptación a TS:
npm install @types/revalidate
