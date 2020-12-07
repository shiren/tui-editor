import { DOMOutputSpecArray, Node as ProsemirrorNode, Fragment, Slice } from 'prosemirror-model';
import { ReplaceStep } from 'prosemirror-transform';

import Node from '@/spec/node';
import { isInTableNode, findNodeBy } from '@/wysiwyg/helper/node';
import {
  createTableHeadRow,
  createTableBodyRows,
  createCellsToAdd,
  getResolvedSelection,
  getSelectionInfo,
  getCellsPosInfo,
  getCellIndexInfo,
  getNextRowOffset,
  getPrevRowOffset,
  getNextColumnOffsets,
  getPrevColumnOffsets,
  findNextCell,
  findPrevCell
} from '@/wysiwyg/helper/table';

// @TODO move to common file and change path on markdown
import { createTextSelection } from '@/markdown/helper/manipulation';

import { EditorCommand } from '@t/spec';

export class Table extends Node {
  get name() {
    return 'table';
  }

  get schema() {
    return {
      content: 'tableHead{1} tableBody+',
      group: 'block',
      parseDOM: [{ tag: 'table' }],
      toDOM(): DOMOutputSpecArray {
        return ['table', 0];
      }
    };
  }

  private addTable(): EditorCommand {
    return (payload = { columns: 1, rows: 1, data: [] }) => (state, dispatch) => {
      const { columns, rows, data } = payload;
      const { schema, selection, tr } = state;
      const { from, to, $from } = selection;
      const collapsed = from === to;

      if (collapsed && !isInTableNode($from)) {
        const { tableHead, tableBody } = schema.nodes;

        const theadData = data && data.slice(0, columns);
        const tbodyData = data && data.slice(columns, data.length);
        const tableHeadRow = createTableHeadRow(columns, schema, theadData);
        const tableBodyRows = createTableBodyRows(rows, columns, schema, tbodyData);
        const table = schema.nodes.table.create(null, [
          tableHead.create(null, tableHeadRow),
          tableBody.create(null, tableBodyRows)
        ]);

        dispatch!(tr.replaceSelectionWith(table));

        return true;
      }

      return false;
    };
  }

  private removeTable(): EditorCommand {
    return () => (state, dispatch) => {
      const { selection, schema, tr } = state;
      const { head } = getResolvedSelection(selection);
      const { table } = schema.nodes;
      const foundTable = findNodeBy(head, ({ type }: ProsemirrorNode) => type === table);

      if (foundTable) {
        const { depth } = foundTable;
        const startCellPos = head.before(depth);
        const endCellPos = head.after(depth);
        const cursorPos = createTextSelection(tr.delete(startCellPos, endCellPos), startCellPos);

        dispatch!(tr.setSelection(cursorPos));

        return true;
      }

      return false;
    };
  }

  private addColumn(direction = 1): EditorCommand {
    return () => (state, dispatch) => {
      const { selection, tr, doc } = state;
      const { anchor, head } = getResolvedSelection(selection);

      if (anchor && head) {
        const selectionInfo = getSelectionInfo(anchor, head);
        const cellsPosInfo = getCellsPosInfo(anchor);
        const { columnCount } = selectionInfo;
        const allRowCount = cellsPosInfo.length;

        for (let rowIndex = 0; rowIndex < allRowCount; rowIndex += 1) {
          const { offset, mapOffset } =
            direction === 1
              ? getNextColumnOffsets(rowIndex, selectionInfo, cellsPosInfo)
              : getPrevColumnOffsets(rowIndex, selectionInfo, cellsPosInfo);

          const from = tr.mapping.map(mapOffset);
          const cells = createCellsToAdd(columnCount, offset, doc);

          tr.insert(from, cells);
        }

        dispatch!(tr);

        return true;
      }

      return false;
    };
  }

  private removeColumn(): EditorCommand {
    return () => (state, dispatch) => {
      const { selection, tr } = state;
      const { anchor, head } = getResolvedSelection(selection);

      if (anchor && head) {
        const selectionInfo = getSelectionInfo(anchor, head);
        const cellsPosInfo = getCellsPosInfo(anchor);
        const { columnIndex, columnCount } = selectionInfo;
        const allColumnCount = cellsPosInfo[0].length;

        const selectedAllColumn = columnCount === allColumnCount;

        if (selectedAllColumn) {
          return false;
        }

        const allRowCount = cellsPosInfo.length;
        const mapOffset = tr.mapping.maps.length;

        for (let i = 0; i < allRowCount; i += 1) {
          for (let j = 0; j < columnCount; j += 1) {
            const { offset, nodeSize } = cellsPosInfo[i][j + columnIndex];

            const from = tr.mapping.slice(mapOffset).map(offset);
            const to = from + nodeSize;

            tr.delete(from, to);
          }
        }

        dispatch!(tr);

        return true;
      }

      return false;
    };
  }

  private addRow(direction = 1): EditorCommand {
    return () => (state, dispatch) => {
      const { selection, schema, tr } = state;
      const { anchor, head } = getResolvedSelection(selection);

      if (anchor && head) {
        const selectionInfo = getSelectionInfo(anchor, head);
        const cellsPosInfo = getCellsPosInfo(anchor);
        const { rowCount } = selectionInfo;
        const allColumnCount = cellsPosInfo[0].length;
        const from =
          direction === 1
            ? getNextRowOffset(selectionInfo, cellsPosInfo)
            : getPrevRowOffset(selectionInfo, cellsPosInfo);

        if (from > -1) {
          const rows = createTableBodyRows(rowCount, allColumnCount, schema);

          dispatch!(tr.step(new ReplaceStep(from, from, new Slice(Fragment.from(rows), 0, 0))));

          return true;
        }
      }

      return false;
    };
  }

  private removeRow(): EditorCommand {
    return () => (state, dispatch) => {
      const { selection, tr } = state;
      const { anchor, head } = getResolvedSelection(selection);

      if (anchor && head) {
        const selectionInfo = getSelectionInfo(anchor, head);
        const cellsPosInfo = getCellsPosInfo(anchor);
        const { rowIndex, rowCount } = selectionInfo;
        const allRowCount = cellsPosInfo.length;

        const selectedThead = rowIndex === 0;
        const selectedAllTbodyRow = rowCount === allRowCount - 1;

        if (selectedThead || selectedAllTbodyRow) {
          return false;
        }

        const from = cellsPosInfo[rowIndex][0].offset - 1;

        const rowIdx = rowIndex + rowCount - 1;
        const colIdx = cellsPosInfo[0].length - 1;
        const { offset, nodeSize } = cellsPosInfo[rowIdx][colIdx];
        const to = offset + nodeSize + 1;

        dispatch!(tr.step(new ReplaceStep(from, to, Slice.empty)));

        return true;
      }

      return false;
    };
  }

  private alignColumn(): EditorCommand {
    return (payload = { align: 'center' }) => (state, dispatch) => {
      const { align } = payload;
      const { selection, tr } = state;
      const { anchor, head } = getResolvedSelection(selection);

      if (anchor && head) {
        const selectionInfo = getSelectionInfo(anchor, head);
        const cellsPosInfo = getCellsPosInfo(anchor);
        const { columnIndex, columnCount } = selectionInfo;
        const allRowCount = cellsPosInfo.length;

        for (let i = 0; i < allRowCount; i += 1) {
          for (let j = 0; j < columnCount; j += 1) {
            const { offset } = cellsPosInfo[i][j + columnIndex];

            tr.setNodeMarkup(offset, null, { align });
          }
        }

        dispatch!(tr);

        return true;
      }

      return false;
    };
  }

  private moveToCell(direction: number): EditorCommand {
    return () => (state, dispatch) => {
      const { selection, tr } = state;
      const { anchor, head } = getResolvedSelection(selection);

      if (anchor && head) {
        const cellsPosInfo = getCellsPosInfo(anchor);
        const cellIndex = getCellIndexInfo(anchor);
        const foundCell =
          direction === 1
            ? findNextCell(cellIndex, cellsPosInfo)
            : findPrevCell(cellIndex, cellsPosInfo);

        if (foundCell) {
          const { offset, nodeSize } = foundCell;
          const from = offset + nodeSize - 1;

          dispatch!(tr.setSelection(createTextSelection(tr, from, from)).scrollIntoView());

          return true;
        }
      }

      return false;
    };
  }

  commands() {
    return {
      addTable: this.addTable(),
      removeTable: this.removeTable(),
      addColumnToNext: this.addColumn(1),
      addColumnToPrev: this.addColumn(-1),
      removeColumn: this.removeColumn(),
      addRowToNext: this.addRow(1),
      addRowToPrev: this.addRow(-1),
      removeRow: this.removeRow(),
      alignColumn: this.alignColumn()
    };
  }

  keymaps() {
    return {
      Tab: this.moveToCell(1)(),
      'Shift-Tab': this.moveToCell(-1)()
    };
  }
}
