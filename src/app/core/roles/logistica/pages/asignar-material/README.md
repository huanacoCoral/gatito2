# Componente Asignar Material

## Descripción General
El componente **Asignar Material** permite gestionar la asignación de materiales disponibles en stock a emergencias específicas o voluntarios. El stock se descuenta automáticamente al realizar la asignación.

## Estructura

```
asignar-material/
├── asignar-material.ts          # Componente principal
├── asignar-material.html        # Template principal
├── asignar-material.css         # Estilos principales
├── formulario-asignar/
│   ├── formulario-asignar.ts    # Formulario reutilizable
│   ├── formulario-asignar.html  # Template del formulario
│   └── formulario-asignar.css   # Estilos del formulario
└── README.md                    # Este archivo
```

## Funcionalidades

### 1. **Vista Principal - Tabla de Asignaciones**
Muestra todas las asignaciones de material realizadas con las siguientes columnas:
- **ID**: Identificador único
- **Material**: Tipo de material asignado
- **Lote**: Número de lote
- **Cantidad Asignada**: Unidades asignadas
- **Destino**: Emergencia o Voluntario (nombre)
- **Fecha**: Fecha de asignación
- **Responsable**: Usuario que realizó la asignación
- **Estado**: Activa/Inactiva
- **Acciones**: Editar, Devolver, Eliminar

### 2. **Formulario de Asignación**
Formulario con 4 secciones:

#### Sección 1: Seleccionar Material
- **Autocomplete de Lote**: Filtra lotes disponibles con stock
- **Info del Lote**: Muestra tipo y stock disponible

#### Sección 2: Cantidad
- Input numérico con validación de máximo (stock disponible)
- Hint que indica máximo disponible

#### Sección 3: Destino
- Tipo de destino: Emergencia o Voluntario (select)
- Destino específico: Se carga dinámicamente según tipo

#### Sección 4: Información Adicional
- Fecha de asignación (datepicker)
- Descripción (textarea)

## Datos y Modelos

### Interface - Lote Material
```typescript
interface LoteMaterial {
  id_loteMaterial: number;
  tipo: string;
  stock: number;
  // otros campos...
}
```

### Interface - Asignación
```typescript
interface Asignacion {
  id: number;
  id_loteMaterial: number;
  cantidad: number;
  tipoDestino: 'emergencia' | 'voluntario';
  destinoId: number;
  fechaAsignacion: Date;
  descripcion: string;
  id_voluntario: number;
  estado: 'A' | 'I';
  loteMaterial: LoteMaterial;
  responsableNombre: string;
}
```

## Integración con Servicios

### logisticaService
```typescript
// Métodos utilizados:

// Cargar lotes de material disponibles
listarLoteMaterial(): Observable<LoteMaterial[]>

// Actualizar stock del lote
actualizarLote(id: number, data: any): Observable<any>
```

## Flujo de Asignación

1. **Usuario navega a** `/rol/logistica/asignar-material`
2. **Carga inicial**: Se obtienen los lotes con stock > 0
3. **Usuario abre** formulario de nueva asignación
4. **Selecciona**:
   - Lote de material (autocomplete)
   - Cantidad a asignar (validación: max = stock disponible)
   - Tipo de destino (emergencia o voluntario)
   - Destino específico (se carga según tipo)
   - Fecha y descripción
5. **Al guardar**:
   - Se valida que el formulario sea válido
   - Se actualiza el stock del lote: `nuevoStock = stock - cantidad`
   - Se crea registro de asignación en BD
   - Se recarga la tabla de asignaciones
   - Se limpia el formulario

## Validaciones

| Campo | Validación |
|-------|-----------|
| Lote Material | Requerido |
| Cantidad | Requerido, Min: 1, Max: stock disponible |
| Tipo Destino | Requerido |
| Destino | Requerido |
| Fecha | Requerido |
| Descripción | Requerido |

## Estilos y Temas

### Colores (CSS Variables)
- **Primario**: `--primary-blue` (#1e3a8a) - Cabeceras, info, estados activos
- **Acento**: `--primary-orange` (#f97316) - Bordes, highlights
- **Alerta**: `--primary-red` (#dc2626) - Estados inactivos, warnings

### Componentes Material
- **Tablas**: Headers con gradiente azul-naranja, filas alternadas, hover effect
- **Forms**: Campos outline con validación visual
- **Autocomplete**: Filtrado en tiempo real con hover effect naranja
- **Badges**: Estados con colores distintivos
- **Botones**: Primary (azul), Accent (naranja), Warn (rojo)

## Acciones en Tabla

### Editar
```typescript
editarAsignacion(asignacion: any) {
  // TODO: Abrir formulario para editar asignación existente
  // Cargar datos en el formulario
  // Al guardar: actualizar registros de stock y asignación
}
```

### Devolver Material
```typescript
devolverMaterial(asignacion: any) {
  // Aumentar stock del lote: stock += cantidad devuelta
  // Cambiar estado de asignación a 'Devuelta'
  // Registrar devolución en historial
}
```

### Eliminar
```typescript
eliminarAsignacion(asignacion: any) {
  // Solicitar confirmación
  // Si se confirma: eliminar registro
  // Devolver stock al lote si está en estado Activa
}
```

## Ejemplo de Uso

```typescript
// Dentro del componente asignar-material.ts
import { AsignarMaterial } from './asignar-material';

// El componente se carga automáticamente por la ruta:
// /rol/logistica/asignar-material

// El menú de LOGISTICA incluye:
// { label: 'Asignar material', route: '/rol/logistica/asignar-material' }
```

## Estados de Componente

### Vista Principal (mostrarFormulario = false)
- Tabla con asignaciones existentes
- Botón "Nueva Asignación"
- Tabla vacía si no hay asignaciones

### Vista Formulario (mostrarFormulario = true)
- Formulario con 4 secciones
- Botones Cancelar y Guardar
- Indicador de carga mientras se guarda

## Métodos Principales

### `cargarDatos()`
Carga los lotes disponibles y las asignaciones existentes

### `guardarAsignacion()`
Valida, actualiza stock y registra la asignación

### `registrarAsignacion(formValue, cantidad)`
Crea el objeto de datos y lo envía al servicio

### `limpiarFormulario()`
Resetea el formulario y el estado

### `toggleFormulario()`
Alterna entre vista de tabla y formulario

### `filtrarLotesMaterial(valor)`
Filtra lotes según búsqueda de usuario

### `obtenerNombreDestino(tipo, id)`
Obtiene el nombre del destino (emergencia o voluntario)

## Mejoras Futuras

- [ ] Implementar edición de asignaciones
- [ ] Implementar devolución de material
- [ ] Agregar validación de disponibilidad en tiempo real
- [ ] Historial de cambios por asignación
- [ ] Exportar tabla a PDF/Excel
- [ ] Filtros avanzados en tabla
- [ ] Búsqueda y paginación mejoradas
- [ ] Notificaciones cuando stock está bajo

## Notas Importantes

1. **Stock Negativo**: El sistema impide asignar más material del disponible mediante validadores
2. **Transacciones**: Al asignar, primero se actualiza el lote, luego se registra la asignación
3. **Responsable**: Se obtiene automáticamente del localStorage (usuario actual)
4. **Fecha**: Por defecto es la fecha actual, pero puede modificarse
5. **Estado**: Todas las nuevas asignaciones tienen estado 'A' (Activa)

## Relaciones BD

```
loteMaterial
├── id_loteMaterial
├── tipo
├── stock
└── ...

Emergencia_utilizo_registroMaterial
├── id_emergencia
├── id_registroMaterial
├── cantidad
└── fecha

informeIngresoMaterial (similar pero para ingreso)
├── id_voluntario
├── id_loteMaterial
├── cantidad
└── fecha
```

## Troubleshooting

### Tabla vacía
- Verificar que existan lotes con stock > 0
- Revisar endpoint `listarLoteMaterial()` en servicio

### Autocomplete no filtra
- Verificar que `filtrarLotesMaterial()` se ejecuta
- Revisar estructura de datos del lote (debe tener propiedad `tipo`)

### Stock no se actualiza
- Verificar endpoint `actualizarLote()` en servicio
- Revisar respuesta del backend

### Formulario no se envía
- Verificar validadores en `inicializarFormulario()`
- Revisar que todos los campos requeridos tengan valor

## Referencias

- [Material Design Docs](https://material.angular.io/)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- Proyecto: Sistema de Gestión de Emergencias
- Rol: LOGISTICA
