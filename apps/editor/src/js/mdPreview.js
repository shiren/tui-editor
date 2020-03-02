/**
 * @fileoverview Implements markdown preview
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import on from 'tui-code-snippet/domEvent/on';
import off from 'tui-code-snippet/domEvent/off';

import Preview from './preview';
import MarkdownRenderer from './markdownRenderer';
import domUtils from './domUtils';
import { removeOffsetInfoByNode } from './scroll/helper';

const htmlRenderer = new MarkdownRenderer({ nodeId: true });

/**
 * Class Markdown Preview
 * @param {HTMLElement} el - base element
 * @param {EventManager} eventManager - event manager
 * @param {Convertor} convertor - convertor
 * @param {boolean} isViewer - true for view only mode
 * @param {Number} delayTime - lazyRunner delay time
 * @ignore
 */
class MarkdownPreview extends Preview {
  constructor(el, eventManager, convertor, isViewer, delayTime) {
    super(el, eventManager, convertor, isViewer, delayTime);

    this._initEvent();
  }

  /**
   * Initialize event
   * @private
   */
  _initEvent() {
    this.eventManager.listen('contentChangedFromMarkdown', this.update.bind(this));
    this.eventManager.listen('previewNeedsRefresh', value => {
      this.refresh(value || '');
    });

    on(this.el, 'scroll', event => {
      this.eventManager.emit('scroll', {
        source: 'preview',
        data: domUtils.findAdjacentElementToScrollTop(
          event.srcElement.scrollTop,
          this._previewContent
        )
      });
    });
  }

  update(changed) {
    const { nodes, removedNodeRange } = changed;
    const contentEl = this._previewContent;
    const newHtml = nodes.map(node => htmlRenderer.render(node)).join('');

    if (!removedNodeRange) {
      contentEl.insertAdjacentHTML('afterbegin', newHtml);
    } else {
      const [startNodeId, endNodeId] = removedNodeRange;
      const startEl = contentEl.querySelector(`[data-nodeid="${startNodeId}"]`);
      const endEl = contentEl.querySelector(`[data-nodeid="${endNodeId}"]`);

      if (startEl) {
        startEl.insertAdjacentHTML('beforebegin', newHtml);
        let el = startEl;

        while (el !== endEl) {
          const nextEl = el.nextElementSibling;

          el.parentNode.removeChild(el);
          removeOffsetInfoByNode(el);
          el = nextEl;
        }
        if (el.parentNode) {
          el.parentNode.removeChild(el);
          removeOffsetInfoByNode(el);
        }
      }
    }
    this.eventManager.emit('previewRenderAfter', this);
  }

  /**
   * render
   * @param {string} html - html string to render
   * @override
   */
  render(html) {
    super.render(html);

    this.eventManager.emit('previewRenderAfter', this);
  }

  remove() {
    off(this.el, 'scroll');
    this.el = null;
  }
}

export default MarkdownPreview;
