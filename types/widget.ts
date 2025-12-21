export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Widget {
  id: string;
  type: string;
  position: Position;
  size: Size;
  props: Record<string, unknown>;
  code?: string;
}

export interface PropDefinition {
  name: string;
  type: "text" | "number" | "boolean" | "select" | "color";
  label: string;
  defaultValue: unknown;
  options?: { label: string; value: string }[];
}

export interface ComponentDefinition {
  type: string;
  name: string;
  category: "layout" | "metrics" | "charts" | "tables" | "ui";
  icon: string;
  defaultSize: Size;
  defaultProps: Record<string, unknown>;
  editableProps: PropDefinition[];
}

export type WidgetMap = Record<string, Widget>;
