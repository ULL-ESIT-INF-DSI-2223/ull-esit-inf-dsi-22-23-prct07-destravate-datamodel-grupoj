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
- [Introdución](#introducción)
- [Implementación](#implementación)
  - [Usuarios](#usuarios)
  - [Grupos](#grupos)
  - [Rutas](#rutas)
  - [Retos](#retos)
  - [Gestor](#gestor)
- [Conclusiones](#conclusiones)
- [Referencias](#referencias)

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
private _ID: number; // ID único del usuario
private _nombre: string; // Nombre propio de usuario
private _actividades: Actividad; // Tipo de actividad; correr o bicicleta
private _amigosApp: number[]; // Colleción de IDs de usuarios con los que se interacciona
private _grupoAmigos: Coleccion; // Diferentes colecciones de IDs de usuarios con los que suele realizar rutas
private _entrenamiento: EstadisticasEntrenamiento; // Cantidad de km y desnivel total acumulados en la semana, mes y año
private _rutasFavoritas: number[]; // Colección de IDs de las rutas que el usuario ha realizado con mayor frecuencia
private _retosActivos: number[]; // Colección de IDs de los retos que el usuario está realizando actualmente
private _historicoRutas: HistoricoRuta[]; // Colección del historial de rutas realizadas 
```
Los métodos de la clase son los respectivos getters y setters, una función de mostrarUsuario (muestra todos los atributos con su valor), añadir amigo, que consiste en añadir el Array AmigoApp (Amigos en la aplicación) el ID de otro usuario existente, y quitar amigo, que consiste en eliminarlo.

#### usuarioColeccion.ts

Este fichero posee una clase que almacena varios elementos de la clase usuarios. Otro atributo que posee es el parametro `_ultID`, que consiste en guarda el ID registrado y sumarle itereadamente 1, para dar a los distintos usuarios un único ID y de manera ordenada. A su vez, en este fichero se encuentran enumerados como `AtributosUsuario` que muestra como se pondrían los atributos de usuario. También existen clase que ayudan a modificar el array de Usuario como `insertarUsuario`, añade Usuario a Array; `borrarUsuario`, se elimina Usuario del array; `modificarUsuario`, que cambia las entradas a los atributos de la clase; `buscarUsuarios`, retorna los usuarios correspondientes a una colección de IDs; `devolverIndexUsuario`, obtiene la posición en el array de la clase; `añadirAmigos`, añade un amigo a un usuario; `borrarAmigo`, elimina un amigo a un usuario; `mostrarUsuario`, muestra una serie de atributos de un grupo de la colección; y, por último, `existeUsuario`, verifica si el usuario pertenece a la colección.

#### jsonUsuarioColeccion.ts

Este fichero posee la clase que interactúa con el fichero JSON, `JsonUsuarioColeccion`. Esta clase sirve para guardar la información de los USuarios. A su vez, también se encuentra el esquema de la Base de Datos para Usuario:
```typescript
type schemaUsuarios = {
  usuario: { 
    _ID: number; 
    _nombre: string;
    _actividades: Actividad; 
    _amigosApp: number[]; 
    _grupoAmigos: Coleccion;
    _entrenamiento: EstadisticasEntrenamiento;
    _rutasFavoritas: number[];
    _retosActivos: number[];
    _historicoRutas: HistoricoRuta[];
  }[];
};
```

Y dentro de la clase JsonUsuarioColeccion se encuentra el constructor, y los siguientes métodos:

- `addUsuario`: Método para insertar un usuario a la colección
```typescript
addUsuario(nombre: string, actividades: Actividad, amigosApp: number[],
             grupoAmigos: Coleccion, entrenamiento: EstadisticasEntrenamiento, rutasFavoritas: number[],
             retosActivos: number[], historicoRutas: HistoricoRuta[]) {

  super.insertarUsuario(nombre, actividades, amigosApp, grupoAmigos, entrenamiento, rutasFavoritas, retosActivos, historicoRutas);
  this.storeTasks();
}
```

- `removeUsuario`: Método para eliminar un usuario de la colección
```typescript
removeUsuario(ID: number): boolean {
  let borro: boolean = super.borrarUsuario(ID);
  this.storeTasks();
  return borro;
}
```

- `modifyUsuario`:  Método para modificar un atributo de un usuario de la colección
```typescript
modifyUsuario(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
  let modifico: boolean = super.modificarUsuario(ID, atributoModificar, nuevoAtributo);
  this.storeTasks();
  return modifico;
}
```

- `showUsuario`:  Método para mostrar una serie de atributos de un usuario de la colección
```typescript
showUsuario(ordenacion: string, orientacion: string): boolean {
  let muestro: boolean = super.mostrarUsuarios(ordenacion, orientacion);
  return muestro;
}
```

- `addAmigo`: Método para añadir un amigo a un usuario
```typescript
addAmigo(ID_usuario : number, ID_amigo : number) {
  super.anadirAmigo(ID_usuario, ID_amigo);
  this.storeTasks();
}
```

- `removeAmigo`: Método para eliminar un amigo a un usuario
```typescript
removeAmigo(ID_usuario : number, ID_amigo : number) {
  super.borrarAmigo(ID_usuario, ID_amigo);
  this.storeTasks();
}
```

- `storeTasks`: Método privado para actualizar los valores del fichero JSON, con los de la colección
```typescript
private storeTasks() {
  this.database.set("usuario", [...this._usuarios.values()]).write();
}
```

#### usuarioPrompt.ts
Contiene una serie de funciones para trabajar con las distintas opciones posibles del prompt (empleando **inquirer**), relacionadas con los usuarios.

En este fichero se encuentra el enumerado `AtributosOrdenacionUsuario` que consiste en las distintas opciones por las que se puede ordenar usuarios, por el nombre del Usuario o por los kilometros totales en función de la semana actual, mes o año; la función asíncrona `insertarUsuarioPrompt` que sirve para insertar un elemento Usuario; la función asíncrona `eliminarUsuarioPrompt` que sirve para eliminar un elemento Usuario; la función asíncrona `modificarUsuarioPrompt` que sirve para modificar un determinado elemento Usuario; la función asíncrona `insertarUsuarioPrompt` que sirve para insertar un elemento Usuario

### Grupos

En el directorio **Grupos** se encuentran cuatro ficheros:

#### grupo.ts

Alberga la clase `Grupo` con los siguientes atributos:
```typescript
private _ID: number; // ID para identificar al grupo.
private _nombre: string; // nombre del grupo.
private _participantes: number[]; // alberga las IDs de los integrantes del grupo.
private _estadisticasEntrenamiento: EstadisticasEntrenamiento; // las estadísticas de entrenamiento del grupo.
private _clasificacion: Usuario[]; // la clasificación de los distintos usuarios que conforman el grupo.
private _rutasFavoritas: number[]; // el ID de las rutas favoritas
private _historicoRutas: HistoricoRuta[]; // el histórico de las rutas del grupo
private _administrador: number; // la ID del administrador del grupo, es decir, quién fue el qué lo creó.
```
Esta clase contiene todo lo necesario para gestionar un grupo.

Contiene getters y setters para cada uno de los atributos de la clase. Respecto a las funciones, `mostrarGrupo` permite mostrar los valores de los atributos de la clase; `incluirUsuario` permite añadir un usuario al grupo, es decir, la ID del usuario en cuestión.

#### grupoColeccion.ts

Contiene la clase `GrupoColeccion` y sus atributos:
- `protected _grupos : Grupo[]`, el array con los distintos grupos de la colección.
- `protected _ultID : number`, el último ID que se ha asignado.

El atributo `_ultID` se requiere debido a que los IDs de los grupos se asignan de forma automática y correlativa, es decir, se empieza por la ID número cero.

Respecto a las funciones, `insertarGrupo` permite insertar un grupo a la colección de grupos de la clase; `devolverIndexGrupo` permite devolver la posición del vector en la que se encuentra un grupo con la ID introducida (`number`); `anadirUsuario` posibilita que un usuario sea añadido a un grupo concreto, recibiendo, por tanto, tanto la ID del usuario como la del grupo; `borrarGrupo` recibe la ID del grupo y procede a su eliminación en la colección; `modificarGrupo` permite modificar alguno de los parámetros del grupo, a elección del usuario que introduce cuál es el atributo a modificar y el nuevo atributo que desea establecer en sustitución; `buscarGrupos` es un método para retornar los Grupos correspondientes a una colección de IDs; `mostrarGrupos` muestra una serie de atributos de un grupo de la colección, teniendo en cuenta factores de ordenación, es decir, si se desea ordenar de manera ascendente o descendente; `existeGrupo` verifica a través de una ID si dicho grupo existe o no; y `buscarAdministrador` retornar el ID del administrador de un grupo, recibiendo la ID del mismo y retornando la ID del usuario administrado.

#### jsonGrupoColeccion.ts

Este fichero posee la clase que interactúa con el fichero JSON, `JsonGrupoColeccion`. Esta clase sirve para guardar la información de los grupos. A su vez, también se encuentra el esquema de la Base de Datos para Grupo (`lowdb`):

```typescript

```



#### grupoPrompt.ts

Contiene una serie de funciones para trabajar con las distintas opciones posibles del prompt (empleando **inquirer**), relacionadas con los grupos.

Dichas funciones son las siguientes: `insertarGrupoPrompt` solicita los datos uno a uno para insertar un grupo, es decir, añadirlo a la clase `GrupoColeccion`; `eliminarGrupoPrompt` solicita el ID del grupo a eliminar y procede a su eliminación; `modificarGrupoPrompt` para modificar un determinado elemento, que es indicado por el usuario; `mostrarGrupoPrompt` para mostrar los grupos según unos criterios de ordenación introducido en las opciones; Por último, `promptGrupos`, que se encarga de gestionar todas las posibilidades dentro de grupos, es decir, las funciones anteriomente comentadas que permiten modificar, 

Se hace uso de funciones de la clase `JsonGrupoColeccion` para llevar a cabo las tareas como eliminar, incluir o mostrar usuarios. 

Las funciones que reciben como parámetro la ID del administrador del grupo lo hacen para garantizar que es el propietario de dicho grupo, en caso de que no lo sea no podría realizar cambios. Algunas funciones para finalizar su ejecucción llaman a la función prompt principal, es decir, al menú inicial. 


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
Este fichero almacena la clase `RutaColeccion` que almacena un array de varios elementos de la clase `Ruta`. Otro atributo que posee es el parametro `_ultID`, que consiste en guarda el último ID registrado y sumarle itereadamente 1 a la hora de crear una nueva ruta. Como el resto de colecciones, la rutas se deben poder mostrar, crear, modificar y eliminar por ello definimos los siguientes métodos: 

`insertarRuta()`: Este método recibirá todos los atributos necesarios para instanciar un nuevo objeto `Ruta`, menos el *ID*, que lo obtiene del atributo `_ultID`, y con todos los datos crea una nueva `Ruta` y la inserta en la colección.

`borrarRuta()`: Este método permite borrar una ruta de la colección, a partir del *ID* de la Ruta a eliminar. Para ello recorre la colección de rutas y si el ID introducido por parametro coincide con el de la Ruta, pues entonces guarda la posición en el vector, para despues eliminar el elemento con `splice()`.

`modificarRuta()`: Este método recibe el ID de la ruta a modificar, una *string* con el nombre del atributo a eliminar, y otra *string* con el nuevo valor del atributo. Para modificar el atributo, primero busca la ruta que es con el ID, y a continuación, en un `switch-case` segun el atributo que sea, lo modifica con el nuevo valor. 

`mostrarRuta()`: Este método permite mostrar todas las rutas del sistema ordenadas según ciertos atributos. Para ello recibe dos cadenas con el atributo por el que ordenar y el orden de ordenación, ascendente o descendente, y con un `switch-case`, según el atributo y la ordenación introducidas, ordena la colección con el método `sort()`.

En esta clase tambien definimos un método para retornar las Rutas correspondientes a una colección de IDs, `buscarRutas(rutasIds: number[]) : Ruta[]`. Para ello vamos recorriendo la colección y los Ids introducidos y cuando haya un coincidencia, añadimos la ruta en un array para devolver.


#### jsonRutaColeccion.ts
Este fichero posee la clase que interactúa con el fichero JSON, `JsonRutaColeccion`. Esta clase sirve para guardar la información de las Rutas. A su vez, también se encuentra el esquema de la Base de Datos para Ruta (`lowdb`):
```typescript
type schemaRutas = {
  ruta: {
    _ID: number;
    _nombre: string;
    _geolocalizacionInicio: Coordenada;
    _geolocalizacionFinal: Coordenada;
    _longitud: number;
    _desnivelMedio: number;
    _usuariosRealizaron: number[];
    _tipoActividad: Actividad;
    _calificacionMedia: number;
  }[];
}
```

Esta clase hereda de la clase `RutaColeccion`, y en esta definimos los métodos que invocan a otros de la heredada y que despues llaman a un método interno que sirve para guardar la información en el Json.

Dentro de la clase `JsonRutaColeccion` se encuentra el constructor que lee las Rutas por fichero, y los siguientes métodos:

- `addRuta`: Método para insertar una Ruta a la colección
```typescript
addRuta(nombre: string, geolocalizacionInicio: Coordenada, geolocalizacionFinal: Coordenada, longitud: number, 
        desnivelMedio: number, usuariosRealizaron: number[], tipoActividad: Actividad, calificacionMedia: number) {
    
  super.insertarRuta(nombre, geolocalizacionInicio, geolocalizacionFinal, longitud, desnivelMedio, usuariosRealizaron, tipoActividad, calificacionMedia);
  this.storeTasks();
}
```

- `removeRuta`: Método para eliminar una Ruta de la colección
```typescript
removeRuta(ID: number): boolean {
  let borro: boolean = super.borrarRuta(ID);
  this.storeTasks();
  return borro;
}
```

- `modifyRuta`:  Método para modificar un atributo de una ruta de la colección
```typescript
modifyRuta(ID: number, atributoModificar: string, nuevoAtributo: string): boolean {
  let modifico: boolean = super.modificarRuta(ID, atributoModificar, nuevoAtributo);
  this.storeTasks();
  return modifico;
}
```

- `showRuta`:  Método para mostrar una serie de atributos de una ruta de la colección
```typescript
showRuta(ordenacion: string, orientacion: string): boolean {
  let muestro: boolean = super.mostrarRuta(ordenacion, orientacion);
  return muestro;
}
```

- `storeTasks`: Método privado para actualizar los valores del fichero JSON, con los de la colección
```typescript
private storeTasks() {
  this.database.set("usuario", [...this._usuarios.values()]).write();
}
```

#### jsonRutaColeccion.ts
Contiene una serie de funciones para trabajar con las distintas opciones posibles del prompt (empleando **inquirer**), relacionadas con las Rutas.

Dichas funciones son las siguientes: 
- `insertarRutaPrompt()` solicita los datos uno a uno para insertar una ruta, es decir, añadirla a la clase `RutaColeccion`.
- `eliminarRutaPrompt()` solicita el ID de la Ruta a eliminar y procede a su eliminación llamando al método de la clase.
- `modificarRutaPrompt()` solicita el ID de la Ruta a modificar, el atributo a modificar y el nuevo valor, y procede a modificarlo llamando al método de la clase.
- `mostrarRutaPrompt()` muestra una lista de opciones de atributos para la ordenación y vizualización, y tras el usuario elegir una, junto a la opcion de ascendente o descendente, llama a la método de la clase encargado de mostrar las Rutas.

Se hace uso de funciones de la clase `JsonRutaColeccion` para llevar a cabo las tareas como eliminar, incluir o mostrar usuarios. 

Las funciones que reciben como parámetro la ID del administrador del grupo lo hacen para garantizar que es el propietario de dicho grupo, en caso de que no lo sea no podría realizar cambios. Algunas funciones para finalizar su ejecucción llaman a la función prompt principal, es decir, al menú inicial. 


### Retos
### Gestor

- Atributos
- FUnciones
- Colecciones
- Json

## Pruebas 


## Conclusiones

## Referencias