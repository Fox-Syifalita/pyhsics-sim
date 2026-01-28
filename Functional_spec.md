# Function Specification  
## Newton’s Third Law Interactive Simulation

---

## 1. Physics Calculation Functions

### `calculateGravitationalForce(m1, m2, distance)`

**Description**  
Calculates the magnitude of gravitational force between two objects based on Newton’s Law of Universal Gravitation.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| m1 | number | Mass of object 1 (e.g. Earth) |
| m2 | number | Mass of object 2 (e.g. Moon) |
| distance | number | Distance between the centers of the two objects |

**Returns**
| Type | Description |
|------|-------------|
| number | Gravitational force magnitude |

**Logic**
- Uses a simplified gravitational constant for visualization
- Formula: `F = G × (m1 × m2) / distance²`
- Same force magnitude is applied to both objects

---

### `calculateActionReactionPair(forceMagnitude, directionVector)`

**Description**  
Generates a symmetric action–reaction force pair in accordance with Newton’s Third Law.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| forceMagnitude | number | Force magnitude |
| directionVector | { x: number, y: number } | Normalized direction vector |

**Returns**
| Key | Type | Description |
|-----|------|-------------|
| action | { x, y } | Force acting on object A |
| reaction | { x, y } | Equal and opposite force acting on object B |

---

## 2. Rendering Functions

### `renderOrbit(ctx, center, radius)`

**Description**  
Renders the dashed orbital path around the central body.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| ctx | CanvasRenderingContext2D | Canvas rendering context |
| center | { x, y } | Orbit center position |
| radius | number | Orbit radius |

---

### `renderBody(ctx, position, radius, color)`

**Description**  
Draws a celestial body (Earth or Moon) on the canvas.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| ctx | CanvasRenderingContext2D | Canvas rendering context |
| position | { x, y } | Body position |
| radius | number | Visual radius |
| color | string | Body color |

---

### `renderForceArrow(ctx, start, vector, color, label)`

**Description**  
Draws a force vector arrow with an optional label.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| start | { x, y } | Arrow starting point |
| vector | { x, y } | Direction and magnitude |
| color | string | Arrow color |
| label | string | Force label (e.g. F_E, F_M) |

---

## 3. Simulation Control Functions

### `updateOrbitPosition(angle, radius, center)`

**Description**  
Calculates the orbital position of the Moon based on angular displacement.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| angle | number | Angular position (radians) |
| radius | number | Orbit radius |
| center | { x, y } | Central body position |

**Returns**
| Type | Description |
|------|-------------|
| { x, y } | Updated position |

---

### `calculateAngularVelocity(distance)`

**Description**  
Computes angular velocity based on orbital distance.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| distance | number | Distance between objects |

**Returns**
| Type | Description |
|------|-------------|
| number | Angular velocity |

---

## 4. Animation Lifecycle Functions

### `startAnimationLoop()`

**Description**  
Initializes and manages the animation loop using `requestAnimationFrame`.

**Responsibilities**
- Clear canvas each frame
- Update object positions
- Recalculate forces
- Re-render bodies and force vectors

---

### `resetSimulation()`

**Description**  
Resets simulation state to default values.

**Resets**
- Mass values
- Distance
- Angular position
- Force values

---

## 5. Physics Integrity Rules

### `enforceNewtonThirdLaw(forceA, forceB)`

**Description**  
Ensures Newton’s Third Law is always satisfied.

**Rule**
- `|forceA| = |forceB|`
- Directions are opposite

---

## 6. Utility Functions

### `clampValue(value, min, max)`

**Description**  
Constrains a numeric value within defined bounds.

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| value | number | Input value |
| min | number | Minimum allowed |
| max | number | Maximum allowed |

**Returns**
| Type | Description |
|------|-------------|
| number | Clamped value |
