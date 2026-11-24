# Ruta Legal

Aplicación abierta para bicicletas eléctricas, pensada como un Organic Maps para quienes se mueven en bici con motor. La idea completa:

- Decir por dónde puede circular una bici eléctrica y por dónde no, según su motor.
- Decir si puede usar la ciclorruta y a qué velocidad.
- Más adelante: mapa sin conexión con OpenStreetMap, rutas que evitan vías prohibidas y cuidan la batería, puntos de carga y registro de consumo.

## Qué hay hoy

Una página (`index.html`) donde pones potencia, velocidad máxima, peso y si tu bici tiene acelerador. Te responde si puedes usar la ciclorruta, la velocidad máxima en ciclorruta y en calzada, y qué papeles y equipo te piden.

Las reglas no están en el código sino en `reglas/colombia.json`. Así cualquiera puede corregirlas sin saber programar.

## Cómo verla

- Con doble clic en `index.html` funciona, usando una copia de respaldo de las reglas.
- Publicada en GitHub Pages lee `reglas/colombia.json` y siempre muestra las reglas actualizadas.

## Cómo corregir o agregar reglas

1. Abre `reglas/colombia.json`.
2. Cambia el valor que esté mal y la fecha de `revisadas`.
3. Agrega en `fuentes` el enlace a la norma que respalda el cambio.

Para otra ciudad o país, copia `colombia.json` con otro nombre (por ejemplo `medellin.json`) y ajusta los valores. La página todavía carga solo `colombia.json`; el selector de región está pendiente.

| Campo | Qué significa |
| --- | --- |
| `ciclorrutaKmh` | Velocidad máxima en ciclorruta y ciclovía |
| `calzadaKmh` | Velocidad máxima en vías permitidas |
| `potenciaMaxW` | Potencia máxima para ser bicicleta de pedaleo asistido |
| `sinPapeles` | Por encima de este peso o velocidad se piden matrícula, SOAT y licencia |
| `laminaDesde` | Fecha desde la que es obligatoria la lámina de identificación |

## Reglas de Colombia que usa hoy

Basadas en la Ley 2486 de 2025 y la resolución de MinTransporte, revisadas el 23 de noviembre de 2026:

- Bicicleta de pedaleo asistido de hasta 1.000 W, sin acelerador autónomo: puede usar ciclorrutas.
- 25 km/h en ciclorrutas y ciclovías, 40 km/h en vías permitidas.
- Si la bici llega a 40 km/h, solo entra a la ciclorruta limitada a 25 km/h.
- Más de 60 kg o 40 km/h: matrícula, SOAT y licencia.
- Casco certificado, ropa reflectiva y luces de noche.
- Desde el 1 de enero de 2027: lámina de identificación con los datos técnicos.

Aviso: normas anteriores hablaban de 350 W y 500 W, y Bogotá ha aplicado criterios propios. Esto no es asesoría legal. Confirma con la Secretaría de Movilidad de tu ciudad.

## Siguientes pasos

1. Publicar en GitHub Pages.
2. Mapa con OpenStreetMap y Leaflet.
3. Rutas con BRouter o Valhalla usando el perfil de la bici.
4. Selector de ciudad.
5. App de celular.

## Licencia

MIT. Ver `LICENSE`.
