import { Component, OnInit } from '@angular/core';
import { Estudiante, EstudianteService } from '../services/estudiante.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-estudiantes',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-estudiantes.html',
  styleUrl: './lista-estudiantes.css',
})
export class ListaEstudiantes {

  estudiantes: Estudiante[] = [];
  loading = true;
  error = '';
  showForm = false;
  editMode = false;
  selected: Estudiante = { id: 0, nombre: '', email: '', carrera: '', semestre: 1 };
  correoDuplicado: boolean = false;

  constructor(private estudiantesService: EstudianteService) {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.loading = true;
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los estudiantes';
        console.error(err);
        this.loading = false;
      }
    });
  }

  abrirFormulario(est?: Estudiante) {
    if (est) {
      this.editMode = true;
      this.selected = { ...est };
    } else {
      this.editMode = false;
      this.selected = { id: 0, nombre: '', email: '', carrera: '', semestre: 1 };
    }
    this.showForm = true;
  }

  cerrarFormulario() {
    this.showForm = false;
  }

  guardar(form: any) {
    if (form.invalid) return;

    this.correoDuplicado = false;
    const existeCorreo = this.estudiantes.some(
      e =>
        e.email.toLowerCase() === this.selected.email.toLowerCase() &&
        e.id !== this.selected.id
    );

    if (existeCorreo) {
      this.correoDuplicado = true;    // <-- activar mensaje
      return;                         // no enviar al backend
    }

    if (this.editMode) {
      this.estudiantesService.actualizarEstudiante(this.selected).subscribe({
        next: () => {
          this.cargarEstudiantes();
          this.cerrarFormulario();
        }
      });
    } else {
      const { id, ...nuevo } = this.selected;
      this.estudiantesService.crearEstudiante(nuevo).subscribe({
        next: () => {
          this.cargarEstudiantes();
          this.cerrarFormulario();
        }
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar este estudiante?')) {
      this.estudiantesService.eliminarEstudiante(id).subscribe({
        next: () => this.cargarEstudiantes()
      });
    }
  }
}
