# Informe: Laboratorio 07 – Programación Orientada a Objetos

## 🎯 Objetivo General

Refactorizar el proyecto *Personal Budget* utilizando un enfoque de **Programación Orientada a Objetos (POO)** con funciones constructoras, encapsulando la lógica en objetos como `Movimiento` y `GestorFinanzas`, e integrando la funcionalidad de renderizado en el DOM.

---

## 🛠️ Implementación Técnica

### 1. Función Constructora `Movimiento`

Se creó una función constructora para encapsular los datos de cada ingreso o egreso, con validaciones internas:

```js
function Movimiento(nombre, monto, tipo) {
  if (!nombre || isNaN(monto) || monto <= 0 || !["ingreso", "egreso"].includes(tipo)) {
    throw new Error("Datos inválidos para el movimiento.");
  }

  this.nombre = nombre;
  this.monto = Number(monto);
  this.tipo = tipo;
  this.fecha = new Date().toLocaleDateString();
  this.id = crypto.randomUUID();
}
```

#### Métodos Asociados

- `getMontoConSigno()`: Retorna el monto con signo según el tipo.
- `getClaseCSS()`: Retorna la clase de color adecuada.
- `formatearMonto()`: Devuelve el monto en formato “+/-$”.
- `render()`: Devuelve una fila `<tr>` con la información del movimiento para insertar en el DOM.

### 2. Función Constructora `GestorFinanzas`

Esta función representa el contenedor global de todos los movimientos, encargada de gestionarlos:

```js
function GestorFinanzas() {
  this.movimientos = [];
}
```

#### Métodos Asociados

- `agregarMovimiento(movimiento)`: Añade un nuevo movimiento.
- `eliminarMovimiento(id)`: Elimina uno según su ID.
- `calcularBalance()`: Calcula el balance total.
- `buscarMovimiento(id)`: Busca un movimiento específico.

### 3. Interacción con el DOM

Se conectó la lógica orientada a objetos con la interfaz utilizando el formulario HTML para capturar los datos del usuario y representar los movimientos en una tabla dinámica.

- Al enviar el formulario, se valida la información y se instancia un nuevo objeto `Movimiento`.
- Este objeto se pasa a la función `agregarMovimiento(movimiento)`, que:
  - Lo agrega al arreglo global `movimientos`.
  - Llama a `movimiento.render()` para insertar la fila correspondiente en el DOM.
  - Actualiza el balance mostrado en pantalla.
- También se implementó la funcionalidad de eliminar movimientos:
  - Cada fila tiene un botón 🗑️.
  - Al hacer clic, se actualiza el balance restando el valor correspondiente.
  - Luego se elimina la fila del DOM.

#### 4. Métodos Asociados

- `getMontoConSigno()`: Retorna el monto con signo según el tipo.
- `getClaseCSS()`: Retorna la clase de color adecuada.
- `formatearMonto()`: Devuelve el monto en formato “+/-$”.
- `render()`: Devuelve una fila `<tr>` con la información del movimiento para insertar en el DOM.
- `agregarMovimiento(movimiento)`: Agrega un nuevo movimiento al arreglo global, actualiza el balance y muestra el movimiento en la tabla con estilo (fondo de color según tipo).

## Historias de Usuario

### HU1 - Crear Objeto “Movimiento”

> *“Como desarrollador, quiero representar cada movimiento (ingreso o egreso) con un objeto, para encapsular la validación y el almacenamiento de datos.”*

**Criterios de Aceptación:**
- Definir la función constructora `Movimiento(tipo, monto, descripcion)` que asigne valores a `this`.
- Validar datos mínimos (tipo válido, monto mayor que 0, descripción no vacía).
- Instanciar al menos un objeto usando `new Movimiento(...)`.

---

### HU2 - Refactorizar el Registro de Movimientos

> *“Como usuario, quiero seguir registrando mis ingresos y egresos, pero ahora manteniendo cada uno como un objeto independiente, con su propia lógica de validación básica.”*

**Criterios de Aceptación:**
- Reemplazar el antiguo proceso de registro por instancias de `Movimiento`.
- Mantener la funcionalidad previa (prompts o input del DOM).
- Almacenar los objetos en un array global `movimientos`.
- Verificar que los cálculos de balance sigan funcionando correctamente.

---

### HU3 - Renderizar Objetos en el DOM

> *“Como usuario, quiero ver una representación de cada movimiento en la interfaz web, facilitando la visualización de mi presupuesto.”*

**Criterios de Aceptación:**
- Crear un método `Movimiento.prototype.render()` que inserte un bloque HTML (una fila `<tr>`).
- Mostrar cada movimiento inmediatamente después de registrarlo.
- Aplicar estilos distintos a ingresos y egresos para mayor claridad visual.

## Conclusión

Este laboratorio permitió aplicar los fundamentos de la Programación Orientada a Objetos (POO) en JavaScript al refactorizar una aplicación de control de ingresos y egresos. A través del uso de una función constructora (`Movimiento`), se encapsularon tanto los datos como la lógica relacionada a cada transacción, lo que permitió un diseño más estructurado, reutilizable y escalable.

Además, se integró esta estructura con el DOM para ofrecer una experiencia interactiva al usuario, donde cada registro se muestra dinámicamente en una tabla, acompañado de su color y signo correspondiente. Se aplicaron también buenas prácticas como la validación de datos, métodos auxiliares para formateo, y separación de responsabilidades mediante funciones especializadas.

Este enfoque no solo mejora la organización del código, sino que también sienta las bases para evolucionar la aplicación hacia una arquitectura más robusta en futuras fases, como la incorporación de clases ES6, persistencia en localStorage y generación de reportes visuales.

El proyecto ahora es más mantenible, escalable y fácil de extender, cumpliendo con los objetivos del laboratorio de llevar un código plano hacia uno basado en objetos.
