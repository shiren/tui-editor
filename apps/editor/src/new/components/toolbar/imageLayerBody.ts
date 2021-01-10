import { Emitter } from '@t/event';
import { ExecCommand, HideLayer, TabInfo } from '@t/ui';
import i18n from '@/i18n/i18n';
import { Component } from '@/new/vdom/component';
import html from '@/new/vdom/template';
import { Tabs } from '../tabs';

const TYPE_UI = 'ui';

type TabType = 'url' | 'file';

interface Props {
  show: boolean;
  eventEmitter: Emitter;
  execCommand: ExecCommand;
  hideLayer: HideLayer;
}

interface State {
  activeTab: TabType;
}

export class ImageLayerBody extends Component<Props, State> {
  private tabs: TabInfo[];

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 'file'
    };
    this.tabs = [
      { name: 'file', text: 'File' },
      { name: 'url', text: 'URL' }
    ];
    this.toggleTab = this.toggleTab.bind(this);
    this.initialize = this.initialize.bind(this);
    this.execCommand = this.execCommand.bind(this);
  }

  private initialize(activeTab: TabType = 'file') {
    this.refs.url.value = '';
    this.refs.altText.value = '';
    this.refs.file.value = '';
    this.setState({ activeTab });
  }

  private execCommand() {
    const imageUrl = this.refs.url.value;
    const altText = this.refs.altText.value || 'image';

    if (imageUrl) {
      this.props.execCommand('addImage', {
        imageUrl,
        altText
      });
    } else {
      const { files } = this.refs.file;

      if (files?.length) {
        const imageFile = files.item(0)!;
        const reader = new FileReader();

        reader.onload = event => {
          this.props.execCommand('addImage', {
            imageUrl: event.target!.result,
            altText: 'image'
          });
        };
        reader.readAsDataURL(imageFile);

        // this.props.eventEmitter.emit('addImageBlobHook', imageFile, hookCallback, TYPE_UI);
      }
    }
  }

  private toggleTab(_: MouseEvent, activeTab: TabType) {
    if (activeTab !== this.state.activeTab) {
      this.initialize(activeTab);
    }
  }

  updated() {
    if (!this.props.show) {
      this.initialize();
    }
  }

  render() {
    const { activeTab } = this.state;

    return html`
      <div>
        <div class="te-tab-section">
          <${Tabs} tabs=${this.tabs} activeTab=${activeTab} onClick=${this.toggleTab} />
        </div>
        <div class="te-url-type${activeTab === 'url' ? ' te-tab-active' : ''}">
          <label for="">${i18n.get('Image URL')}</label>
          <input
            type="text"
            class="te-image-url-input"
            ref=${(el: HTMLInputElement) => (this.refs.url = el)}
          />
        </div>
        <div class="te-file-type${activeTab === 'file' ? ' te-tab-active' : ''}">
          <label for="">${i18n.get('Select image file')}</label>
          <input
            type="file"
            class="te-image-file-input"
            accept="image/*"
            ref=${(el: HTMLInputElement) => (this.refs.file = el)}
          />
        </div>
        <label for="">${i18n.get('Description')}</label>
        <input
          type="text"
          class="te-alt-text-input"
          ref=${(el: HTMLInputElement) => (this.refs.altText = el)}
        />
        <div class="te-button-section">
          <button type="button" class="te-ok-button" onClick=${this.execCommand}>
            ${i18n.get('OK')}
          </button>
          <button type="button" class="te-close-button" onClick=${this.props.hideLayer}>
            ${i18n.get('Cancel')}
          </button>
        </div>
      </div>
    `;
  }
}
