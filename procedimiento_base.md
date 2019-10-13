

nos metemos a la carpeta:
cd API
dotnet build

luego nos salimos a la raíz y ejecutamos:
 dotnet ef database drop -p Persistence/ -s API/

 luego nos movemos nuevamente a:  
 cd API

 y ejecutamos el proyecto en modo escucha de cambios:
 ditnet watch run
