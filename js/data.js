const librosIniciales = [
  {
    "id": 1,
    "titulo": "Pepito el marito",
    "autor": "Gonzalo Pity Martinez",
    "genero": "Terror",
    "disponible": true,
    "anio": 2018
  },
  {
    "id": 2,
    "titulo": "Piratas del caribe",
    "autor": "Jack",
    "genero": "Arte",
    "disponible": true,
    "anio": 2009
  },
  {
    "id": 3,
    "titulo": "Quevedo que pedo",
    "autor": "Pedro",
    "genero": "Terror",
    "disponible": true,
    "anio": 2024
  },
  {
    "id": 4,
    "titulo": "Vedo",
    "autor": "Momo",
    "genero": "Arte",
    "disponible": true,
    "anio": 2006
  }
]

const librosGuardados = localStorage.getItem("libros");

const libros = librosGuardados
    ? JSON.parse(librosGuardados)
    : librosIniciales;