// Constructor Movimiento con validación
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

Movimiento.prototype.getMontoConSigno = function () {
  return this.tipo === "egreso" ? -this.monto : this.monto;
};

Movimiento.prototype.getClaseCSS = function () {
  return this.tipo === "ingreso" ? "text-green-600" : "text-red-600";
};

Movimiento.prototype.formatearMonto = function () {
  return `${this.getMontoConSigno() >= 0 ? "+" : "-"}$${Math.abs(this.monto).toFixed(2)}`;
};

Movimiento.prototype.render = function () {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${this.fecha}</td>
    <td>${this.nombre}</td>
    <td class="${this.getClaseCSS()}">${this.formatearMonto()}</td>
    <td>${this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1)}</td>
    <td><button class="eliminar" data-id="${this.id}">🗑️</button></td>
  `;
  return fila;
};

// Clase GestorFinanzas
function GestorFinanzas() {
  this.movimientos = [];
}

GestorFinanzas.prototype.agregarMovimiento = function (movimiento) {
  this.movimientos.push(movimiento);
};

GestorFinanzas.prototype.eliminarMovimiento = function (id) {
  this.movimientos = this.movimientos.filter(mov => mov.id !== id);
};

GestorFinanzas.prototype.calcularBalance = function () {
  return this.movimientos.reduce((acc, mov) => acc + mov.getMontoConSigno(), 0);
};

GestorFinanzas.prototype.buscarMovimiento = function (id) {
  return this.movimientos.find(mov => mov.id === id);
};

// Instancia global del gestor
const gestor = new GestorFinanzas();

// Elementos del DOM
const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tabla-movimientos");
const balance = document.getElementById("balance");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = formulario.nombre.value.trim();
  const monto = Number(formulario.monto.value);
  const tipo = formulario.tipo.value;

  try {
    const nuevoMovimiento = new Movimiento(nombre, monto, tipo);
    gestor.agregarMovimiento(nuevoMovimiento);
    actualizarVista();
    formulario.reset();
  } catch (error) {
    alert(error.message); // Puedes mejorar esto con mensajes en el DOM
  }
});

tabla.addEventListener("click", function (e) {
  if (e.target.classList.contains("eliminar")) {
    const id = e.target.dataset.id;
    gestor.eliminarMovimiento(id);
    actualizarVista();
  }
});

// Función para actualizar la vista
function actualizarVista() {
  tabla.innerHTML = "";
  gestor.movimientos.forEach(mov => {
    const fila = mov.render();
    tabla.appendChild(fila);
  });

  balance.textContent = `$${gestor.calcularBalance().toFixed(2)}`;
}
