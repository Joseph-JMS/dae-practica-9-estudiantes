package com.estudiantes.backend_estudiante.repositories;

import com.estudiantes.backend_estudiante.entities.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    boolean existsByEmail(String email);
}
