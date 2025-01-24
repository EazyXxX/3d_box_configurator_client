export interface Vertex {
  x: number;
  y: number;
  z: number;
}

export interface Triangle {
  v1: Vertex;
  v2: Vertex;
  v3: Vertex;
}

export interface BoxData {
  triangles: Triangle[];
}

export interface BoxDimensions {
  length: number;
  width: number;
  height: number;
}
