# 📋 Guía de Implementación - Componente Asignar Material

## 🎯 Resumen
Se ha implementado un componente completo para la asignación de materiales en el módulo de Logística. El componente permite:
- Visualizar asignaciones de material realizadas
- Crear nuevas asignaciones (seleccionar lote, cantidad, destino)
- Descontar automáticamente del stock
- Editar, devolver y eliminar asignaciones

## 📁 Archivos Implementados

### 1. Componente Principal
```
src/app/core/roles/logistica/pages/asignar-material/
├── asignar-material.ts          ✅ Componente con toda la lógica
├── asignar-material.html        ✅ Template con tabla y formulario
├── asignar-material.css         ✅ Estilos (responsive, Material Design)
└── README.md                    ✅ Documentación del componente
```

### 2. Formulario Reutilizable
```
src/app/core/roles/logistica/pages/asignar-material/formulario-asignar/
├── formulario-asignar.ts        ✅ Lógica del formulario
├── formulario-asignar.html      ✅ Template del formulario
└── formulario-asignar.css       ✅ Estilos del formulario
```

## ✅ Estado de Implementación

### ✓ Completado
- [x] Componente AsignarMaterial standalone
- [x] Tabla de asignaciones con Material Design
- [x] Formulario con validaciones reactivas
- [x] Autocomplete para selección de lotes
- [x] Descuento automático de stock
- [x] Estilos con CSS variables (blue/orange/red)
- [x] Responsive design (mobile/tablet/desktop)
- [x] Ruta configurada en routing
- [x] Menú actualizado con nueva opción
- [x] Servicios integrados (logisticaService)

### 🔄 Por Hacer (Backend)
- [ ] Endpoint para listar asignaciones: `GET /api/asignaciones-material`
- [ ] Endpoint para crear asignación: `POST /api/asignaciones-material`
- [ ] Endpoint para editar asignación: `PUT /api/asignaciones-material/:id`
- [ ] Endpoint para eliminar asignación: `DELETE /api/asignaciones-material/:id`
- [ ] Endpoint para devolver material: `POST /api/asignaciones-material/:id/devolver`
- [ ] Método para actualizar stock en loteMaterial
- [ ] Tabla en BD para registrar asignaciones

## 🚀 Cómo Usar

### 1. Acceder al Componente
**Ruta**: `/rol/logistica/asignar-material`

**Menú**: Logística → Asignar material

### 2. Vista Principal
Al cargar, verá:
- Descripción de la funcionalidad
- Tabla de asignaciones realizadas
- Botón "Nueva Asignación"

### 3. Crear Nueva Asignación
1. Click en "Nueva Asignación"
2. Completa el formulario en 4 secciones:
   - **Lote**: Selecciona material (autocomplete)
   - **Cantidad**: Ingresa cuánto asignar
   - **Destino**: Elige emergencia o voluntario
   - **Info Adicional**: Fecha y descripción
3. Click en "Guardar Asignación"

### 4. Acciones en Tabla
- **Editar**: Modifica la asignación
- **Devolver**: Retorna material al stock
- **Eliminar**: Quita el registro

## 📊 Datos del Componente

### Formulario de Asignación
```typescript
{
  loteMaterial: LoteMaterial,      // Objeto lote seleccionado
  cantidad: number,                 // Cantidad a asignar
  tipoDestino: 'emergencia' | 'voluntario',  // Tipo de destino
  destino: number,                  // ID de emergencia o voluntario
  fechaAsignacion: Date,            // Fecha de la asignación
  descripcion: string,              // Motivo/detalles
  responsable: number               // ID de usuario (desde localStorage)
}
```

### Tabla de Asignaciones
Muestra los campos:
- ID, Material, Lote, Cantidad Asignada, Destino, Fecha, Responsable, Estado, Acciones

## 🔌 Servicios Utilizados

### logisticaService
```typescript
// Método para cargar lotes disponibles
listarLoteMaterial(): Observable<LoteMaterial[]>

// Método para actualizar stock
actualizarLote(id: number, data: any): Observable<any>
```

## 🎨 Estilos Aplicados

### Tema de Color
- **Primario**: Azul (#1e3a8a) - Headers, info, estados activos
- **Acento**: Naranja (#f97316) - Bordes, botones
- **Alerta**: Rojo (#dc2626) - Estados inactivos

### Componentes Material
- Tablas con headers degradados
- Formularios con campos outline
- Autocomplete con filtrado en tiempo real
- Datepicker para fechas
- Botones con estados (hover, disabled)

## 📝 Validaciones

| Campo | Validación |
|-------|-----------|
| Lote Material | Requerido |
| Cantidad | Requerido, Min 1, Max = stock |
| Tipo Destino | Requerido |
| Destino | Requerido |
| Fecha | Requerido |
| Descripción | Requerido |

## 🔧 Configuración Necesaria

### 1. Rutas ✅ (Ya configuradas)
```typescript
// logistica.routes.ts
{
  path: 'asignar-material',
  loadComponent: () =>
    import('../logistica/pages/asignar-material/asignar-material')
      .then(m => m.AsignarMaterial)
}
```

### 2. Menú ✅ (Ya configurado)
```typescript
// menu.service.ts - LOGISTICA
{ label: 'Asignar material', route: '/rol/logistica/asignar-material' }
```

### 3. Servicio ✅ (Ya disponible)
```typescript
// logisticaService métodos necesarios:
listarLoteMaterial()
actualizarLote(id, data)
```

## 🗄️ Estructura BD Recomendada

### Tabla: asignaciones_material
```sql
CREATE TABLE asignaciones_material (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_loteMaterial INT NOT NULL,
  cantidad INT NOT NULL,
  tipo_destino VARCHAR(20),      -- 'emergencia' o 'voluntario'
  id_destino INT NOT NULL,       -- ID de emergencia o voluntario
  fecha_asignacion DATETIME,
  descripcion TEXT,
  id_voluntario INT,             -- Responsable
  estado CHAR(1),                -- 'A' activa, 'I' inactiva
  FOREIGN KEY (id_loteMaterial) REFERENCES loteMaterial(id_loteMaterial),
  FOREIGN KEY (id_voluntario) REFERENCES Voluntario(id_voluntario)
);
```

## 🛠️ Proximos Pasos

1. **Backend**: Implementar endpoints para CRUD de asignaciones
2. **Integración**: Conectar métodos del servicio con endpoints
3. **Validación**: Agregar validaciones adicionales (permisos, etc)
4. **Testing**: Pruebas unitarias y E2E
5. **Mejoras**: Historial, reportes, exportación

## 📞 Soporte

Para cualquier duda o error:
1. Revisar la consola del navegador (F12)
2. Verificar que los endpoints backend estén disponibles
3. Confirmar que los datos se cargan correctamente
4. Revisar la documentación en `README.md`

## 🎓 Referencia Rápida

**Componentes reutilizables**: FormularioAsignarComponent
- Inputs: lotesMaterial, emergencias, voluntarios, cargando
- Outputs: cancelar, guardar
- Uso: `<app-formulario-asignar [lotesMaterial]="..." (guardar)="onGuardar($event)"></app-formulario-asignar>`

**Métodos principales del componente**:
- `cargarDatos()` - Carga lotes y asignaciones
- `guardarAsignacion()` - Guarda nueva asignación
- `toggleFormulario()` - Abre/cierra formulario
- `filtrarLotesMaterial()` - Filtra búsqueda

## 📌 Notas Importantes

⚠️ **El componente usa datos simulados** - Necesita backend para funcionar completamente

✅ **Validaciones en cliente** - Valida antes de enviar

✅ **Stock validado** - No permite asignar más de lo disponible

✅ **Responsive** - Funciona en móvil, tablet y desktop

✅ **Accesible** - Etiquetas, aria-label y navegación por teclado

---

**Creado**: Mayo 2026
**Proyecto**: Sistema de Gestión de Emergencias
**Módulo**: Logística
**Rol**: LOGISTICA
