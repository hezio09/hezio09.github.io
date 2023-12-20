document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('loginForm');
  var intentosRestantes = 3;
  var bloqueado = false;

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (bloqueado) {
          alert("La página está bloqueada. Espera un momento antes de intentar de nuevo.");
          return;
      }

      var username = document.querySelector("input[type='text']").value;
      var password = document.querySelector("input[type='password']").value;

      if (username === "usuario" && password === "contraseña") {
          alert("¡Inicio de sesión exitoso!");
          window.location.href = 'Autenticador.html';
      } else {
          intentosRestantes--;

          if (intentosRestantes > 0) {
              alert("Intenta de nuevo. " + intentosRestantes + " intentos restantes.");
          } else {
              bloquearPagina();
          }
      }
  });

  function bloquearPagina() {
      bloqueado = true;
      document.getElementById('bloqueo').style.display = 'block';
      var tiempoRestante = 60; // Tiempo en segundos (1 minuto)
      var intervaloTiempo = setInterval(function() {
          tiempoRestante--;
          document.getElementById('tiempoRestante').textContent = tiempoRestante;

          if (tiempoRestante <= 0) {
              clearInterval(intervaloTiempo);
              document.getElementById('bloqueo').style.display = 'none';
              bloqueado = false;
              intentosRestantes = 3;
              alert("La página ahora está desbloqueada. Puedes intentar iniciar sesión de nuevo.");
          }
      }, 1000); // Intervalo de actualización en milisegundos (1 segundo)
  }

  // Función para desbloquear la página
  function desbloquearPagina() {
      bloqueado = false;
      document.getElementById('bloqueo').style.display = 'none';
  }

  // Evento click para el botón "Cerrar"
  document.getElementById('cerrarBloqueo').addEventListener('click', function() {
      desbloquearPagina();
  });
});
