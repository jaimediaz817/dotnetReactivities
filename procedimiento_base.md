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
