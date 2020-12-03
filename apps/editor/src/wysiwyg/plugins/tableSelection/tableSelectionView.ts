import { ResolvedPos } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { findCell, isInCellElement } from '@/wysiwyg/helper/table';

import CellSelection from './cellSelection';

interface EventHandlers {
  mousedown: (ev: Event) => void;
  mousemove: (ev: Event) => void;
  mouseup: () => void;
}

export default class TableSelection {
  private view: EditorView;

  private handlers: EventHandlers;

  private startCellPos: ResolvedPos | null;

  constructor(view: EditorView) {
    this.view = view;

    this.handlers = {
      mousedown: this.handleMousedown.bind(this),
      mousemove: this.handleMousemove.bind(this),
      mouseup: this.handleMouseup.bind(this)
    };

    this.startCellPos = null;

    this.init();
  }

  init() {
    this.view.root.addEventListener('mousedown', this.handlers.mousedown);
  }

  handleMousedown(ev: Event) {
    const inCell = isInCellElement(ev.target as HTMLElement, this.view.dom);

    if (inCell) {
      const startCellPos = this.getCellPosition(ev as MouseEvent);

      if (startCellPos) {
        this.startCellPos = startCellPos;
      }

      this.bindEvent();
    }
  }

  handleMousemove(ev: Event) {
    const { startCellPos } = this;
    const endCellPos = this.getCellPosition(ev as MouseEvent);

    if (startCellPos && endCellPos) {
      if (startCellPos.pos === endCellPos.pos) {
        return;
      }

      ev.preventDefault();

      this.selectCells(startCellPos, endCellPos);
    }
  }

  handleMouseup() {
    this.startCellPos = null;

    this.unbindEvent();
  }

  bindEvent() {
    const { root } = this.view;

    root.addEventListener('mousemove', this.handlers.mousemove);
    root.addEventListener('mouseup', this.handlers.mouseup);
  }

  unbindEvent() {
    const { root } = this.view;

    root.removeEventListener('mousemove', this.handlers.mousemove);
    root.removeEventListener('mouseup', this.handlers.mouseup);
  }

  getCellPosition({ clientX, clientY }: MouseEvent) {
    const mousePos = this.view.posAtCoords({ left: clientX, top: clientY });

    if (mousePos) {
      const { doc, schema } = this.view.state;
      const currentPos = doc.resolve(mousePos.pos);
      const foundCell = findCell(schema, currentPos);

      if (foundCell) {
        const cellOffset = currentPos.before(foundCell.depth);

        return doc.resolve(cellOffset);
      }
    }

    return null;
  }

  selectCells(startCellPos: ResolvedPos, endCellPos: ResolvedPos) {
    const cellSelection = new CellSelection(startCellPos, endCellPos);
    const { selection, tr } = this.view.state;

    if (startCellPos && !selection.eq(cellSelection)) {
      this.view.dispatch!(tr.setSelection(cellSelection));
    }
  }

  destroy() {
    this.view.root.removeEventListener('mousedown', this.handlers.mousedown);
  }
}
