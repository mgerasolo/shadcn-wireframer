import { create } from "zustand";
import { Widget, Position, Size } from "@/types/widget";
import { generateId } from "./utils";

interface CanvasState {
  widgets: Widget[];
  selectedWidgetId: string | null;

  // Actions
  addWidget: (type: string, position: Position, size: Size, defaultProps: Record<string, unknown>) => string;
  removeWidget: (id: string) => void;
  updateWidgetPosition: (id: string, position: Position) => void;
  updateWidgetSize: (id: string, size: Size) => void;
  updateWidgetProps: (id: string, props: Record<string, unknown>) => void;
  updateWidgetCode: (id: string, code: string) => void;
  selectWidget: (id: string | null) => void;
  clearCanvas: () => void;
  loadWidgets: (widgets: Widget[]) => void;
  getSelectedWidget: () => Widget | null;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  widgets: [],
  selectedWidgetId: null,

  addWidget: (type, position, size, defaultProps) => {
    const id = generateId();
    const newWidget: Widget = {
      id,
      type,
      position,
      size,
      props: { ...defaultProps },
    };
    set((state) => ({
      widgets: [...state.widgets, newWidget],
      selectedWidgetId: id,
    }));
    return id;
  },

  removeWidget: (id) => {
    set((state) => ({
      widgets: state.widgets.filter((w) => w.id !== id),
      selectedWidgetId: state.selectedWidgetId === id ? null : state.selectedWidgetId,
    }));
  },

  updateWidgetPosition: (id, position) => {
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWidgetSize: (id, size) => {
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },

  updateWidgetProps: (id, props) => {
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, props: { ...w.props, ...props } } : w
      ),
    }));
  },

  updateWidgetCode: (id, code) => {
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, code } : w
      ),
    }));
  },

  selectWidget: (id) => {
    set({ selectedWidgetId: id });
  },

  clearCanvas: () => {
    set({ widgets: [], selectedWidgetId: null });
  },

  loadWidgets: (widgets) => {
    set({ widgets, selectedWidgetId: null });
  },

  getSelectedWidget: () => {
    const { widgets, selectedWidgetId } = get();
    return widgets.find((w) => w.id === selectedWidgetId) || null;
  },
}));
