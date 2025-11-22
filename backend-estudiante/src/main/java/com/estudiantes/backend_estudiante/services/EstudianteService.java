package com.estudiantes.backend_estudiante.services;

import com.estudiantes.backend_estudiante.entities.Estudiante;
import com.estudiantes.backend_estudiante.repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {
    @Autowired
    private EstudianteRepository estudianteRepository;
    // GET - Obtener todos los estudinates
    public List<Estudiante> obtenerTodos() {
        return estudianteRepository.findAll();
    }
    // GET - Obtener producto por ID
    public Optional<Estudiante> obtenerPorId(Long id) {
        return estudianteRepository.findById(id);
    }
    // POST - Crear estudiante
    public Estudiante crear(Estudiante estudiante) throws Exception {
        try {
            if(estudianteRepository.existsByEmail(estudiante.getEmail())){
                throw new Exception("El email ya existe");
            }
            return estudianteRepository.save(estudiante);
        } catch (Exception e) {
            throw e;
        }
    }
    // PUT - Actualizar estudiante
    public Estudiante actualizar(Long id, Estudiante estudianteActualizado) {
        return estudianteRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(estudianteActualizado.getNombre());
                    producto.setEmail(estudianteActualizado.getEmail());
                    producto.setCarrera(estudianteActualizado.getCarrera());
                    producto.setSemestre(estudianteActualizado.getSemestre());
                    return estudianteRepository.save(producto);
                })
                .orElseGet(() -> {
                    estudianteActualizado.setId(id);
                    return
                            estudianteRepository.save(estudianteActualizado);
                });
    }
    // DELETE - Eliminar estudiante
    public void eliminar(Long id) {
        estudianteRepository.deleteById(id);
    }
}
