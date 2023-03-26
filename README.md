# Práctica 7 - DeStravaTe

<p align="center">
  <a href="https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupoj?branch=main">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupoj/badge.svg?branch=main">
  </a>
  <a href="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupoj/actions/workflows/node.js.yml">
    <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct07-destravate-datamodel-grupoj/actions/workflows/node.js.yml/badge.svg">
  </a>
</p>

## Índice
1. [Introdución](#introducción)
2. [Implementación](#implementación)
  2.1. [Usuarios](#usuarios)
  2.2. [Grupos](#grupos)
  2.3. [Rutas](#rutas)
  2.4. [Retos](#retos)
  2.5. [Gestor](#gestor)
3. [Conclusiones](#conclusiones)
4. [Referencias](#referencias)

## Introducción

En esta práctica grupal se requiere del desarrollo de un programa que englobe una serie de conceptos como son unos usuarios, grupos, rutas y retos, todos ellos relacionados entre sí. Los grupos estarán compuestos por usuarios, los usuarios serán miembros de grupos, los retos y las rutas serán realiadas por los distintos usuarios, entre otras relaciones.

Se introducirán conceptos nuevos sobre interfaces interactivas y almacenamiento y gestión de conjuntos de información. Además, se exige la utilización de elementos ya conocidos como TypeDoc, la metodología TDD o BDD, los principios SOLID y el cubrimiento de código con Coveralls.


## Implementación

Hemos estructurado el proyecto en una serie de carpetas de trabajo que nos permiten trabajar y visualizar el conjunto del programa de manera más ordenada. Teniendo en cuenta ésto las carpetas se estructuran de la siguiente forma:

### Usuarios

En el directorio **Usuarios** se encuentran cuatro ficheros:

#### usuario.ts
Para esta práctica se crea una clase llamada usuario que se encuentra en el fichero usuario.ts. Esta clase contiene los siguientes atributos:
```typescript
private _ID: number, ID único del usuario
private _nombre: string, Nombre propio de usuario
private _actividades: Actividad, Tipo de actividad; correr o bicicleta
private _amigosApp: number[], Colleción de IDs de usuarios con los que se interacciona
private _grupoAmigos: Coleccion, Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
private _entrenamiento: EstadisticasEntrenamiento, Cantidad de km y desnivel total acumulados en la semana, mes y año
private _rutasFavoritas: number[], Colección de IDs de las rutas que el usuario ha realizado con mayor frecuencia
private _retosActivos: number[], Colección de IDs de los retos que el usuario está realizando actualmente
private _historicoRutas: HistoricoRuta[], Colección del historial de rutas realizadas 
```
Los métodos de la clase son los respectivos getters y setters, una función de mostrarUsuario (muestra todos los atributos con su valor), añadir amigo, que consiste en añadir el Array AmigoApp (Amigos en la aplicación) el ID de otro usuario existente, y quitar amigo, que consiste en eliminarlo.

#### usuarioColeccion.ts

Este fichero posee una clase que almacena varios elementos de la clase usuarios. Otro atributo que posee es el parametro _ultID, que consiste en guarda el ID registrado y sumarle itereadamente 1, para dar a los distintos usuarios un único ID y de manera ordenada. A su vez, en este fichero se encuentran enumerados como AtributosUsuario que muestra como se pondrían los atributos de usuario. También existen clase que ayudan a modificar el array de Usuario como insertarUsuario, añade Usuario a Array; borrarUsuario, se elimina Usuario del array; modifyUsuario, 

### Grupos

En el directorio **Grupos** se encuentran cuatro ficheros:

#### grupo.ts

Alberga la clase `Grupo` con los siguientes atributos:
```typescript
private _ID : number, ID para identificar al grupo.
private _nombre : string, nombre del grupo.
private _participantes : number[], alberga las IDs de los integrantes del grupo.
private _estadisticasEntrenamiento : EstadisticasEntrenamiento, las estadísticas de entrenamiento del grupo.
private _clasificacion : Usuario[], la clasificación de los distintos usuarios que conforman el grupo.
private _rutasFavoritas : number[], el ID de las rutas favoritas
private _historicoRutas : HistoricoRuta[], el histórico de las rutas del grupo
private _administrador: number, la ID del administrador del grupo, es decir, quién fue el qué lo creó.
```
Esta clase contiene todo lo necesario para gestionar un grupo.

Contiene getters y setters para cada uno de los atributos de la clase. Respecto a las funciones, `mostrarGrupo` permite mostrar los valores de los atributos de la clase; `incluirUsuario` permite añadir un usuario al grupo, es decir, la ID del usuario en cuestión.

#### grupoColeccion.ts

Contiene la clase `GrupoColeccion` y sus atributos:
- `protected _grupos : Grupo[]`, el array con los distintos grupos de la colección.
- `protected _ultID : number`, el último ID que se ha asignado.

El atributo `_ultID` se requiere debido a que los IDs de los grupos se asignan de forma automática y correlativa, es decir, se empieza por la ID número cero.

Respecto a las funciones, `insertarGrupo` permite insertar un grupo a la colección de grupos de la clase; `devolverIndexGrupo` permite devolver la posición del vector en la que se encuentra un grupo con la ID introducida (`number`); `anadirUsuario` posibilita que un usuario sea añadido a un grupo concreto, recibiendo, por tanto, tanto la ID d


lowdb, archivos json. para ello extendemos de grupo collection tenemos un constructor que coge todos los elementos y los va guardando en json, en caso de que esté vacío crea uno nuevo...
  

### Rutas

En el directorio **Rutas** se encuentran al igual que en los anteriores cuatro ficheros:

#### ruta.ts
Para esta práctica se crea una clase llamada ruta que se encuentra en el fichero ruta.ts. Esta clase contiene los siguientes atributos:
```typescript
private _ID: number; // ID único de la ruta.
private _nombre: string; // Nombre de la ruta.
private _geolocalizacionInicio: Coordenada; // Geolocalización del inicio (coordenadas).
private _geolocalizacionFinal: Coordenada; // Geolocalización del final de la ruta (coordenadas).
private _longitud: number; // Longitud de la ruta en kilómetros.
private _desnivelMedio: number; // Desnivel medio de la ruta.
private _usuariosRealizaron: number[]; // Usuarios que han realizado la ruta (IDs).
private _tipoActividad: Actividad; // Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.
private _calificacionMedia: number; // Calificación media de la ruta.
```
Los métodos de la clase son los respectivos getters y setters y una función de `mostrarRuta`, que muestra todos los atributos con su valor.

#### rutaColeccion.ts

Este fichero almacena la clase `RutaColeccion` que almacena un array de varios elementos de la clase `Ruta`. Otro atributo que posee es el parametro `_ultID`, que consiste en guarda el último ID registrado y sumarle itereadamente 1 a la hora de crear una nueva ruta. Como el resto de colecciones, la rutas se deben poder crear, modificar y eliminar por ello definimos los siguientes métodos: 

`insertarRuta`
```typescript
insertarRuta(nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
             desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {

  this._rutas.push(new Ruta(++this._ultID, nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia));
}
```


### Retos
### Gestor

- Atributos
- FUnciones
- Colecciones
- Json

## Pruebas 


## Conclusiones

## Referencias