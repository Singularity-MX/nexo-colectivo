# Nexo Colectivo v1.0.0
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)

## Índice

1. [Descripción](#descripción)
2. [Objetivo](#objetivo)
3. [Ficha técnica](#ficha-técnica)
4. [Fundamento teórico](#fundamento-teórico)
5. [Arquitectura técnica implementada](#arquitectura-técnica-implementada)
6. [Limitaciones del modelo de habitabilidad](#limitaciones-del-modelo-de-habitabilidad)
7. [Requisitos](#requisitos)
8. [Uso de la herramienta](#uso-de-la-herramienta)
9. [Las 5 estaciones del rally](#las-5-estaciones-del-rally)
10. [Metodología del evento](#metodología-del-evento)
11. [Resultados esperados](#resultados-esperados)
12. [Evidencias](#evidencias)
13. [Consideraciones](#consideraciones)
14. [Recursos](#recursos)
15. [Versionamiento](#versionamiento)
16. [Contribuciones](#contribuciones)
17. [Créditos](#créditos)
18. [Sobre los colectivos organizadores](#sobre-los-colectivos-organizadores)

## Descripción

Nexo Colectivo es un encuentro intercolectivo desarrollado bajo el formato de **rally astrobiológico**, orientado a la divulgación de conceptos de astrobiología, exoplanetas y búsqueda de vida mediante una experiencia híbrida que combina estaciones físicas, actividades colaborativas y un escáner de realidad aumentada (AR) basado en reconocimiento de imágenes.

A partir de cinco estaciones, cada una representando un exoplaneta real o un análogo basado en datos científicos actuales, los participantes recorren un recorrido físico mientras desbloquean, mediante su propio dispositivo móvil, fichas científicas interactivas en 3D que describen las condiciones físicas, atmosféricas y la hipotética forma de vida asociada a cada mundo.

El evento es organizado en colaboración con cuatro colectivos de la ciudad de León, Guanajuato, unidos por la divulgación tecnológica, el bienestar social y la ciencia abierta.

## Objetivo

Que los participantes comprendan, de forma práctica y vivencial, los principios básicos de la astrobiología (zona habitable, métodos de detección de exoplanetas y búsqueda de biofirmas) mediante el recorrido físico de un rally y el uso de un escáner de realidad aumentada que vincula cada estación con su contraparte científica.

## Ficha técnica

- Nombre: Nexo Colectivo · Rally Astrobiológico
- Fecha: 28 de junio del 2026
- Hora: 09:00 AM - 12:00 PM
- Lugar: Universidad CESEE (Industrial Julián de Obregón)
- Edad recomendada: +12 años
- Cupo: Limitado
- Modalidad: Rally físico con apoyo de realidad aumentada (AR) vía dispositivo móvil

## Fundamento teórico

El rally se sustenta en la **astrobiología**, el campo científico que estudia el origen, la evolución, la distribución y el futuro de la vida tanto en la Tierra como en el resto del universo. Esta disciplina combina biología, química, geología, física y astronomía para abordar una pregunta central: ¿estamos solos?

No se busca vida idéntica a la terrestre, sino las condiciones físicas y químicas que la hacen posible: agua líquida, una fuente de energía estable y los elementos básicos de la química orgánica (carbono, hidrógeno, oxígeno, nitrógeno, fósforo y azufre).

### Pilares conceptuales abordados

1. **Origen de la vida** — cómo la química pudo organizarse en sistemas capaces de replicarse, usando la Tierra primitiva como caso de estudio.
2. **Límites de la vida (extremófilos)** — organismos terrestres que sobreviven en condiciones extremas (calor, frío, radiación, ausencia de luz), que amplían lo que consideramos "habitable".
3. **Detección de exoplanetas** — identificación de mundos fuera del sistema solar mediante métodos indirectos, principalmente el **método de tránsito** (caída de brillo de la estrella al pasar el planeta frente a ella) y la **velocidad radial** (bamboleo gravitacional de la estrella).
4. **Búsqueda de biofirmas** — análisis de la luz que atraviesa o se refleja en una atmósfera exoplanetaria, buscando huellas químicas asociadas a procesos biológicos (por ejemplo, la coexistencia de oxígeno y metano).

### Zona habitable

Es el rango de distancias orbitales alrededor de una estrella donde la temperatura de equilibrio permite que el agua exista en estado líquido sobre la superficie de un planeta rocoso. Esta zona se desplaza según el tipo y brillo de la estrella anfitriona:

T_eq ≈ T★ · √(R★ / 2a) · (1 - A)^(1/4)

donde:

- T★: temperatura de la estrella
- R★: radio de la estrella
- a: distancia orbital del planeta
- A: albedo (reflectividad) del planeta

Las estrellas enana roja (como TRAPPIST-1 y Proxima Centauri) son más frías que el Sol, por lo que su zona habitable está mucho más cerca de la estrella, lo que explica por qué sus exoplanetas tienen años tan cortos, de apenas algunos días terrestres.

### Índice de habitabilidad didáctico

Para fines del rally, se construye un **índice de habitabilidad simplificado (0-100)** por estación, que combina de forma heurística:

- Distancia orbital relativa a la zona habitable de su estrella
- Tipo y temperatura estelar
- Temperatura superficial estimada del planeta
- Evidencia (observacional o especulativa) de agua líquida

Este índice no corresponde a una métrica científica formal (como el ESI - Earth Similarity Index), sino a una aproximación pedagógica orientada a facilitar la comparación entre estaciones durante el recorrido.

## Arquitectura técnica implementada

La experiencia AR se construye sobre el siguiente stack:

- **MindAR** (`mindar-image-three`) — motor de reconocimiento de imágenes (image tracking) basado en visión computacional, utilizado para detectar el marcador físico de cada estación.
- **Three.js** — renderizado 3D de los modelos planetarios, atmósferas (shaders de Fresnel), capas de nubes y fichas científicas en formato sprite.
- **React** — interfaz de usuario del escáner (pantalla de briefing previo, HUD de escaneo, controles de inicio/detención).

### Pipeline de detección y renderizado

1. **Captura de imagen objetivo**: cada estación física cuenta con un marcador impreso, previamente compilado a un archivo `.mind`.
2. **Inicialización de cámara**: solicitud de permisos de `getUserMedia` y arranque del motor MindAR.
3. **Anclaje por estación**: se crea un `anchor` de MindAR por cada una de las 5 estaciones, asociado a su índice correspondiente dentro del marcador compuesto.
4. **Estabilización de pose**: se implementa un sistema de suavizado (interpolación lineal para posición, interpolación esférica para rotación) con zona muerta (deadzone), para reducir el jitter natural del tracking por visión computacional.
5. **Renderizado del planeta**: esfera texturizada con shaders adicionales de atmósfera (efecto Fresnel) y, en algunos casos, capa de nubes independiente con rotación propia.
6. **Renderizado de la ficha científica**: panel generado dinámicamente sobre un `canvas` 2D (datos del exoplaneta, organismo dominante, índice de habitabilidad), convertido a textura y proyectado como sprite sobre la escena 3D.

## Limitaciones del modelo de habitabilidad

Debido a la naturaleza didáctica del índice de habitabilidad utilizado en el rally, se identifican las siguientes limitaciones:

- **Ausencia de datos espectroscópicos reales en la mayoría de los casos**: la existencia de atmósfera, agua o composición química de varios de los exoplanetas presentados es, a la fecha, especulativa o basada en evidencia indirecta y aún debatida por la comunidad científica.
- **El organismo dominante de cada estación es ficticio y especulativo**: representa un ejercicio de imaginación científica (astrobiología especulativa) y no una afirmación sobre la existencia real de vida en dichos exoplanetas.
- **El índice de habitabilidad no es una métrica científica estandarizada**: combina de forma heurística variables físicas conocidas con fines exclusivamente educativos y de comparación lúdica entre estaciones.
- **Dependencia de las condiciones de captura del marcador AR**: la calidad del reconocimiento de imagen puede verse afectada por iluminación, ángulo de cámara y calidad de impresión del marcador físico.

La existencia de condiciones favorables no garantiza la presencia de vida — solo indica que, según lo que sabemos hoy, no la descarta. La astrobiología trabaja con probabilidades e inferencias, no con certezas.

## Requisitos

### Tecnológicos
- Dispositivo móvil con cámara y navegador compatible con WebGL
- Acceso a la aplicación web del proyecto
- Conexión a internet estable (para la carga inicial de assets 3D y texturas)
- Buena iluminación ambiental para el correcto funcionamiento del reconocimiento de imagen

### Material físico
- Marcadores impresos de cada una de las 5 estaciones (formato `.mind` compilado)
- Señalética de ruta del rally
- Material de apoyo para las actividades de referencia de cada estación
- Bitácora o registro de puntuación por equipo (si se opta por modalidad competitiva)

## Uso de la herramienta

La siguiente sección describe el procedimiento para utilizar el escáner AR del proyecto:

### Procedimiento

1. Acceder a la aplicación web desde un dispositivo móvil.
2. Navegar a la sección "Escáner" desde el menú principal.
3. Conceder los permisos de cámara solicitados por el navegador.
4. Apuntar la cámara al marcador físico de la estación correspondiente.
5. Esperar la detección y observar el modelo 3D del exoplaneta junto con su ficha científica.
6. Repetir el proceso en cada una de las 5 estaciones del recorrido.

## Las 5 estaciones del rally

| # | Exoplaneta | Sistema estelar | Distancia | Habitabilidad | Organismo dominante (especulativo) |
|---|---|---|---|---|---|
| 1 | Tierra | Sistema Solar | 0 (planeta natal) | 100/100 | Humanos |
| 2 | TRAPPIST-1e | TRAPPIST-1 | 40 años luz | 80/100 | Hongos bioluminiscentes |
| 3 | Kepler-452b | Kepler-452 | 1,400 años luz | 75/100 | Gigantópodos |
| 4 | K2-18b | K2-18 | 124 años luz | 70/100 | Aeromedusas |
| 5 | Proxima Centauri b | Proxima Centauri | 4.24 años luz | 65/100 | Criaturas reflectantes |

Cada estación cuenta con una actividad de referencia presencial vinculada a un concepto científico específico (por ejemplo, alta gravedad, radiación estelar o ausencia de visión convencional), diseñada para reforzar de forma corporal y lúdica el principio teórico correspondiente.

## Metodología del evento

El recorrido se estructura en formato de circuito: los equipos participantes avanzan por las 5 estaciones en el orden que determine la organización, realizando en cada una:

1. Escaneo AR del marcador y lectura de la ficha científica del exoplaneta.
2. Actividad física o lúdica de referencia, vinculada al concepto científico de la estación.
3. Registro de puntuación (si aplica modalidad competitiva tipo "Mundial Interplanetario").

Al finalizar el recorrido de las 5 estaciones, los puntos acumulados por cada equipo se suman para determinar al equipo campeón del evento.

## Resultados esperados

- Comprensión básica de los principios de habitabilidad planetaria y zona habitable
- Familiarización con los métodos reales de detección de exoplanetas (tránsito, velocidad radial)
- Introducción conceptual a la búsqueda de biofirmas atmosféricas
- Experiencia práctica con tecnología de realidad aumentada aplicada a divulgación científica
- Fortalecimiento de vínculos intercolectivos mediante una actividad colaborativa multisectorial

## Evidencias

- Registro fotográfico y audiovisual del evento
- Capturas de las interacciones con el escáner AR
- Lista de asistencia de participantes y equipos

## Consideraciones

- Garantizar condiciones adecuadas de iluminación en cada estación para el correcto funcionamiento del reconocimiento de imagen AR.
- Verificar previamente la conectividad a internet en el lugar del evento, dado que la carga inicial de assets 3D depende de esta.
- Contar con dispositivos de respaldo (tablets o smartphones) en caso de que algún participante no disponga de uno compatible.
- La actividad es adaptable a un modo de contingencia mediante material impreso de las fichas científicas, en caso de fallos técnicos con el escáner AR.

## Recursos

### Aplicación web

Disponible en el siguiente enlace:

`https://nexo-colectivo.vercel.app/` *(ajustar según dominio final de despliegue)*

### Marcadores AR

Se encuentran adjuntos en el repositorio en la siguiente ruta:
`public/targets/nexo.mind`

### Branding del evento

Se encuentra adjunto en el repositorio en la siguiente ruta:
`src/assets/branding/`

Incluye:

- Material para publicación de difusión en Instagram
- Material para publicación de difusión en Facebook
- Póster oficial del evento
- Logotipo de Nexo Colectivo

### Fotografías

Durante el evento se capturarán evidencias fotográficas con fines de documentación y difusión.
Estas podrán publicarse en las redes sociales de los colectivos organizadores.

## Versionamiento

Este proyecto utiliza control de versiones basado en Git, con el objetivo de asegurar trazabilidad, reproducibilidad y evolución incremental del sistema y la metodología del evento.

El esquema de versionamiento sigue el estándar:

**MAJOR.MINOR.PATCH**

- **MAJOR**: cambios estructurales en la metodología del rally o en la arquitectura del sistema AR.
- **MINOR**: incorporación de nuevas estaciones, funcionalidades o mejoras en el flujo de la experiencia.
- **PATCH**: corrección de errores o ajustes menores sin impacto metodológico.

### Ejemplo de versiones:

- `v1.0.0` → versión inicial del rally y la herramienta AR
- `v1.1.0` → incorporación de nueva estación o exoplaneta
- `v1.1.1` → corrección de errores de estabilización del tracking AR

## Contribuciones

Este proyecto está abierto a contribuciones por parte de los colectivos organizadores, así como de colaboradores externos interesados en divulgación científica, astrobiología y desarrollo de experiencias de realidad aumentada.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Singularity-MX/nexo-colectivo.git
cd nexo-colectivo
```

### 2. Crear una nueva rama

Se recomienda realizar el desarrollo en una rama independiente:

```bash
git checkout -b feature/nombre-de-la-mejora
```

Ejemplos:

- `feature/nueva-estacion-exoplaneta`
- `feature/mejora-estabilizacion-ar`
- `fix/error-textura-planeta`

### 3. Realizar cambios

- Mantener coherencia con la metodología del rally y el fundamento astrobiológico.
- Evitar modificaciones estructurales sin justificación técnica o pedagógica.
- Documentar adecuadamente los cambios relevantes en el código y en la documentación del proyecto.

### 4. Commit con formato estructurado

Se utiliza el siguiente estándar de commits:

```bash
tipo: descripción breve

[detalle opcional]
```

Tipos válidos:

- `feat` → nueva funcionalidad
- `fix` → corrección de errores
- `docs` → cambios en documentación
- `refactor` → reestructuración del código sin cambio funcional
- `test` → pruebas

Ejemplo:

```bash
feat: implementación de estabilización de pose por interpolación esférica

Se incorpora suavizado SLERP con zona muerta para reducir el jitter del tracking en condiciones de baja iluminación.
```

### 5. Push de la rama

```bash
git push origin feature/nombre-de-la-mejora
```

### 6. Abrir un pull request

Al abrir un PR en GitHub, utilizar la siguiente plantilla:

```markdown
## Descripción

Describe brevemente el cambio realizado.

## Tipo de cambio

- [ ] Nueva funcionalidad
- [ ] Corrección de error
- [ ] Mejora de documentación
- [ ] Refactorización

## Justificación técnica

Explica por qué este cambio es necesario desde una perspectiva técnica o metodológica.

## Impacto en el rally

- [ ] No afecta la dinámica del evento
- [ ] Modifica ligeramente la experiencia del usuario
- [ ] Requiere actualización del protocolo del rally

## Evidencia (si aplica)

Capturas de pantalla, pruebas o resultados experimentales.
```

### 7. Revisión y merge

Todos los Pull Requests serán revisados por el equipo de Singularity antes de su integración en la rama principal (`main` o `dev`), garantizando consistencia metodológica y técnica del proyecto.

## Créditos

La elaboración de este evento fue realizada en colaboración entre los colectivos **Singularity**, **Alma Canina**, **Acompaña Mente** e **IMJU León**, unidos por la divulgación tecnológica, el bienestar social y la ciencia abierta.

Herramienta y escáner AR desarrollados por: **[@replacedspace17](https://github.com/replacedspace17)**

Para colaboraciones, puedes contactarnos mediante el correo:
replacedspace17@singularitymx.org

### Redes de Singularity (coordinación técnica)

- Página web: [https://singularitymx.org](https://singularitymx.org)
- Instagram: [https://instagram.com/singularity.open](https://instagram.com/singularity.open)
- GitHub: [https://github.com/Singularity-MX](https://github.com/Singularity-MX)

## Sobre los colectivos organizadores

### Singularity

Colectivo de ciencia abierta y software libre, fundado en 2023 en la ciudad de León, Guanajuato. Parte del movimiento global **DIYbio** y la **DIYbiosphere**. Desarrolla tecnología accesible para monitorear y entender el entorno, en la intersección entre computación, biología, ingeniería y educación experimental.

- Web: [https://singularitymx.org](https://singularitymx.org)
- Instagram: [https://instagram.com/singularity.open](https://instagram.com/singularity.open)
- GitHub: [https://github.com/Singularity-MX](https://github.com/Singularity-MX)

### Alma Canina

Organización dedicada al bienestar de perros en situación de calle, mediante campañas de adopción, recolección de donativos, esterilizaciones y actividades de apoyo en colaboración con albergues locales de León.

- Instagram: [https://www.instagram.com/almacanina.leon](https://www.instagram.com/almacanina.leon)

### Acompaña Mente

Iniciativa enfocada en la promoción de la salud mental mediante talleres, pláticas y actividades formativas que fomentan el bienestar emocional, el autoconocimiento y el desarrollo personal.

### IMJU León

Instituto Municipal de las Juventudes de León. Organismo que impulsa el desarrollo integral de las juventudes mediante programas, actividades y oportunidades de participación enfocadas en educación, liderazgo, emprendimiento y bienestar social.

- Web: [http://leonjoven.gob.mx/](http://leonjoven.gob.mx/)
- Facebook: [https://www.facebook.com/IMJULeon](https://www.facebook.com/IMJULeon)
- Instagram: [https://www.instagram.com/imjuleon/](https://www.instagram.com/imjuleon/)

Si tu colectivo está interesado en participar en futuras ediciones del Nexo, puedes contactar a cualquiera de las organizaciones listadas anteriormente.